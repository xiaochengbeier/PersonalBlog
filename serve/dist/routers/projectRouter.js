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
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProjectService_1 = require("../services/ProjectService");
const ResponseHandler_1 = require("./ResponseHandler");
const projectRouter = express_1.default.Router();
exports.projectRouter = projectRouter;
// 根据用户id 获得项目
projectRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, size, page } = req.query;
    const findResult = yield ProjectService_1.ProjectService.findProjectByUid(+uid, { size: +size, page: +page });
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "查询项目成功", data: findResult });
}));
// 添加项目
projectRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, content, source } = req.body;
    const addResult = yield ProjectService_1.ProjectService.addProject(+uid, content, source);
    if (addResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "添加项目成功", data: addResult });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "添加项目失败", data: false });
}));
