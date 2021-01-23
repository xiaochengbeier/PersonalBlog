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
exports.criticRouter = void 0;
const express_1 = __importDefault(require("express"));
const CriticService_1 = require("../services/CriticService");
const ResponseHandler_1 = require("./ResponseHandler");
const criticRouter = express_1.default.Router();
exports.criticRouter = criticRouter;
// 添加评论相关接口
criticRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleId, content, talker, parent } = req.body;
    const addCriticResult = yield CriticService_1.CriticService.addCritic({ articleId, content, talker, parent, ctime: new Date() });
    if (addCriticResult instanceof Array) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "添加评论数据失败", data: addCriticResult });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "添加评论数据成功", data: addCriticResult });
}));
// 根据文章id查询数据
criticRouter.get("/bybid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bid, size, page } = req.query;
    const byBlogIdResult = yield CriticService_1.CriticService.getCriticByBlogId(+bid, { size, page });
    if (byBlogIdResult instanceof Array) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "根据博客文章id查询数据失败", data: byBlogIdResult });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "根据博客文章id查询数据成功", data: byBlogIdResult });
}));
// 根据父级id查询数据
criticRouter.get("/bypid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parent, size, page } = req.query;
    const byParentIdResult = yield CriticService_1.CriticService.getCriticByParentId(+parent, { size, page });
    if (byParentIdResult instanceof Array) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "根据评论父级id查询数据失败", data: byParentIdResult });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "根据评论父级id查询数据成功", data: byParentIdResult });
}));
