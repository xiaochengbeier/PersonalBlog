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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const db_1 = require("../db");
class ProjectService {
    static findProjectByUid(userId, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows, count } = yield db_1.Project.findAndCountAll({
                where: {
                    userId
                },
                offset: (search.page - 1) * search.size,
                limit: search.size
            });
            const result = { count, datas: [] };
            if (count > 0) {
                rows.forEach(item => {
                    result.datas.push(item.toJSON());
                });
            }
            return result;
        });
    }
    /**
     * 添加项目
     * @param userId 用户id
     * @param content  项目访问路径
     */
    static addProject(userId, content, source) {
        return __awaiter(this, void 0, void 0, function* () {
            const createProj = yield db_1.Project.create({ userId, content, source });
            if (createProj) {
                return createProj.toJSON();
            }
            return false;
        });
    }
}
exports.ProjectService = ProjectService;
