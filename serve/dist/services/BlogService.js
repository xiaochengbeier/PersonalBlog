"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.BlogService = void 0;
const class_transformer_1 = require("class-transformer");
const db_1 = require("../db");
const BlogEntity_1 = __importDefault(require("../entities/BlogEntity"));
const SearchConditionEntity_1 = require("../entities/SearchConditionEntity");
const sequelize_1 = __importStar(require("sequelize"));
class BlogService {
    /**
     * 向数据库添加文章 如果返回的是一个数组表示数据校验失败格式不正确
     * @param bolog 博客文章对象
     */
    static addBlog(bolog) {
        return __awaiter(this, void 0, void 0, function* () {
            // 将bolog转换为 BlogEntity 类型
            const bologEntity = class_transformer_1.plainToClass(BlogEntity_1.default, bolog);
            const valiDateResult = yield bologEntity.validateTthis();
            if (valiDateResult.length !== 0) {
                return valiDateResult;
            }
            bolog.tag = JSON.stringify(bolog.tag);
            const createResult = yield db_1.Blog.create(bolog);
            if (createResult) {
                const createObj = createResult.toJSON();
                const tages = JSON.parse(bolog.tag);
                yield BlogService.insertTagFromBlog(tages);
                yield BlogService.mappingTagAndBlog(createObj.blogId, tages);
                return createObj;
            }
        });
    }
    /**
     * 根据博客id 和标签id在映射表中添加对象
     * @param bologId 博客id
     * @param bolog  添加的博客内容对象
     */
    static mappingTagAndBlog(bologId, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const tagname of tags) {
                // 根据标签名 在标签表中 查询看是否有此标签 如果有就不需要插入标签表
                const findResult = yield db_1.Tag.findOne({ where: {
                        tagname
                    } });
                // 如果没有那么将此标签插入标签表
                if (findResult !== null) {
                    // 获得tagId
                    const findObj = findResult.toJSON();
                    const tagId = findObj.tagId;
                    //  根据 tagId 和 bologId 在映射表中查找
                    const findeResultBy2Id = yield db_1.Atmaping.findOne({ where: { [sequelize_1.Op.and]: [{ articleId: bologId }, { tagId }] } });
                    if (findeResultBy2Id === null) {
                        yield db_1.Atmaping.create({ articleId: bologId, tagId });
                    }
                }
            }
        });
    }
    /**
     * 根据博客添中的标签向标签库中添加标签数据
     * @param bolog 博客文章对象
     */
    static insertTagFromBlog(tags) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const tagname of tags) {
                // 根据标签名 在标签表中 查询看是否有此标签 如果有就不需要插入标签表
                const findResult = yield db_1.Tag.findOne({ where: {
                        tagname
                    } });
                // 如果没有那么将此标签插入标签表
                if (findResult == null) {
                    yield db_1.Tag.create({ tagname, number: 1 });
                }
                else { // 表示已经存在该标签但是我们又添加了一篇这种标签的博客 需要把其数量加一
                    yield db_1.Tag.update({ number: sequelize_1.default.literal('`number` +1') }, { where: { tagname } });
                }
            }
        });
    }
    /**
     * 根据id删除博客文章
     * @param blogId 博客id
     */
    static deleteBlogById(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const num = yield db_1.Blog.destroy({ where: { blogId } });
            if (num > 0) {
                return true;
            }
            return false;
        });
    }
    /**
     * 根据博客id修改 博客内容
     * @param blogId  博客id
     * @param bolog 博客内容
     */
    static updateBlogById(blogId, bolog) {
        return __awaiter(this, void 0, void 0, function* () {
            // 将bolog转换为 BlogEntity 类型
            const bologEntity = class_transformer_1.plainToClass(BlogEntity_1.default, bolog);
            const valiDateResult = yield bologEntity.validateTthis(true);
            if (valiDateResult.length !== 0) {
                return valiDateResult;
            }
            const [num, blo] = yield db_1.Blog.update(bolog, { where: { blogId } });
            if (num > 0) {
                return true;
            }
            return false;
        });
    }
    /**
     * 根据查询条件查询排序顺序根据阅读量排序 如果相同根据 点赞量 降序排序
     * @param condition 查询条件
     */
    static searchBlogByCondition(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            condition = class_transformer_1.plainToClass(SearchConditionEntity_1.SearchConditionEntity, condition);
            const validateSearch = yield condition.validateThis();
            if (validateSearch.length !== 0) {
                return validateSearch;
            }
            const { rows, count } = yield db_1.Blog.findAndCountAll({
                where: {
                    [sequelize_1.Op.or]: condition.key && [
                        { tag: { [sequelize_1.Op.like]: `%${condition.key}%` } },
                        { title: { [sequelize_1.Op.like]: `%${condition.key}%` } }
                    ]
                },
                limit: condition.size,
                offset: (condition.page - 1) * (condition.size),
                order: [['reads', 'DESC'], ['likes', 'DESC']],
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
    /**
     * 根据博客id查询数据
     * @returns 如果返回的 是false 表示该数据不存在
     * @param blogId 根据博客id查询数据
     */
    static searchBlogByBlogId(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findResult = yield db_1.Blog.findByPk(blogId);
            if (findResult === null) {
                return false;
            }
            return findResult.toJSON();
        });
    }
    /**
     * 查询指定用户发表的文章
     * @param userId  用户id
     * @param condition  查询条件分页信息
     */
    static searchBlogByUserId(userId, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            condition = class_transformer_1.plainToClass(SearchConditionEntity_1.SearchConditionEntity, condition);
            const validateSearch = yield condition.validateThis();
            if (validateSearch.length !== 0) {
                return validateSearch;
            }
            const { rows, count } = yield db_1.Blog.findAndCountAll({
                where: {
                    userId,
                    [sequelize_1.Op.or]: [
                        { tag: { [sequelize_1.Op.like]: `%${condition.key}%` } },
                        { title: { [sequelize_1.Op.like]: `%${condition.key}%` } }
                    ]
                },
                limit: condition.size,
                offset: (condition.page - 1) * condition.size,
                // 根据发布时间排序
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
            return obj;
        });
    }
    /**
     * 增加阅读量
     * @param blogId 文章id
     */
    static addReads(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [num, bl] = yield db_1.Blog.update({
                reads: sequelize_1.default.literal('`reads` +1'),
            }, { where: {
                    blogId
                } });
            if (num > 0) {
                return true;
            }
            return false;
        });
    }
    /**
     * 增加点赞量
     * @param blogId 文章id
     */
    static addLikes(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [num, bl] = yield db_1.Blog.update({
                likes: sequelize_1.default.literal('`likes` +1'),
            }, { where: {
                    blogId
                } });
            if (num > 0) {
                return true;
            }
            return false;
        });
    }
}
exports.BlogService = BlogService;
// BlogService.searchBlogByBlogId(3).then(d=>{
//  console.log(d);
// });
// BlogService.searchBlogByUserId(25,{key:"java",page:1,size:5}).then(data=>{
//   console.log(data);
// });
