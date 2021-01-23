"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriticService = void 0;
const class_transformer_1 = require("class-transformer");
const db_1 = require("../db");
const CriticEntiy_1 = require("../entities/CriticEntiy");
const SearchConditionEntity_1 = require("../entities/SearchConditionEntity");
const UserService_1 = __importDefault(require("./UserService"));
class CriticService {
    /**
     * 添加一条评论
     * @param critic 评论对象
     */
    static addCritic(critic) {
        return __awaiter(this, void 0, void 0, function* () {
            const criticObj = class_transformer_1.plainToClass(CriticEntiy_1.CriticEntiy, critic);
            const validateResult = yield criticObj.validateThis();
            if (validateResult.length === 0) {
                const createResult = yield db_1.Critics.create(criticObj);
                return createResult.toJSON();
            }
            return validateResult;
        });
    }
    /**
     * 根据文章id查询对应的评论
     * @param articleId 文章id
     * @param condition 查询条件
     */
    static getCriticByBlogId(articleId, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            condition = class_transformer_1.plainToClass(SearchConditionEntity_1.SearchConditionEntity, condition);
            const validateResult = yield condition.validateThis(true);
            if (validateResult.length > 0) {
                return validateResult;
            }
            const { rows, count } = yield db_1.Critics.findAndCountAll({
                where: {
                    articleId,
                    parent: -1
                },
                limit: +condition.size,
                offset: (+condition.page - 1) * (+condition.size),
                order: [['ctime', 'DESC']]
            });
            const obj = { count: 0, datas: [] };
            if (count <= 0 && rows.length === 0) {
                return obj;
            }
            obj.count = count;
            rows.map(item => {
                obj.datas.push(item.toJSON());
            });
            for (const item of obj.datas) {
                const talker = item.talker;
                const talkerObj = yield UserService_1.default.getUserById(talker);
                item.author = talkerObj.name;
                item.avatar = talkerObj.poster;
                item.datetime = item.createdAt;
                item.children = [];
                console.log(obj, "--obj--");
                yield CriticService.getChildrentByPaid(item.criticId, item.talker, item.children);
            }
            return obj;
        });
    }
    static getChildrentByPaid(paid, ppid, childrenCollect) {
        return __awaiter(this, void 0, void 0, function* () {
            // 获得此评论回复的对象
            const paretn = yield UserService_1.default.getUserById(ppid);
            // 根据父级id查询数据
            const children = yield db_1.Critics.findAll({
                where: {
                    parent: paid
                }
            });
            // 将查询的数据转换为对象
            if (children != null && children.length !== 0) {
                // 将查询的数据转换为对象
                for (const item of children) {
                    const criticObj = item.toJSON();
                    criticObj.datetime = criticObj.createdAt;
                    // 将其回复的对象挂载到对象上
                    criticObj.parentName = paretn.name;
                    criticObj.parentAvatar = paretn.poster;
                    // 查询talker 对象
                    const talkerObj = yield UserService_1.default.getUserById(criticObj.talker);
                    criticObj.author = talkerObj.name;
                    criticObj.avatar = talkerObj.poster;
                    childrenCollect.push(criticObj);
                    // 根据该条评论的id 继续递归查询其评论回复
                    yield CriticService.getChildrentByPaid(criticObj.criticId, criticObj.talker, childrenCollect);
                }
            }
        });
    }
    /**
     * 根据父级id查询评论 完成评论回复功能
     * @param parent 父级评论id
     * @param condition 查询条件
     */
    static getCriticByParentId(parent, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            condition = class_transformer_1.plainToClass(SearchConditionEntity_1.SearchConditionEntity, condition);
            const validateResult = yield condition.validateThis(true);
            if (validateResult.length > 0) {
                return validateResult;
            }
            const { rows, count } = yield db_1.Critics.findAndCountAll({
                where: {
                    parent
                },
                limit: +condition.size,
                offset: (+condition.page - 1) * (+condition.size),
                order: ['ctime']
            });
            const obj = { count: 0, datas: [] };
            if (count <= 0 && rows.length === 0) {
                return obj;
            }
            obj.count = count;
            rows.map(item => {
                obj.datas.push(item.toJSON());
            });
            return obj;
        });
    }
}
exports.CriticService = CriticService;
