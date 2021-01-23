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
exports.blogRouter = void 0;
const express_1 = __importDefault(require("express"));
const BlogService_1 = require("../services/BlogService");
const ResponseHandler_1 = require("./ResponseHandler");
const blogRouter = express_1.default.Router();
exports.blogRouter = blogRouter;
// 添加文章接口
blogRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, title, content, tag } = req.body;
    const addResult = yield BlogService_1.BlogService.addBlog({ userId, title, content, tag, ctime: new Date() });
    if (addResult instanceof Array) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "插入数据失败", data: addResult });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "插入博客成功", data: addResult });
}));
// 删除文章接口
blogRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteResult = yield BlogService_1.BlogService.deleteBlogById(+id);
    if (deleteResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "success", des: "删除博客成功" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "删除数据失败" });
}));
// 修改博客接口
blogRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, title, content, tag } = req.body;
    const updateResult = yield BlogService_1.BlogService.updateBlogById(blogId, { title, content, tag });
    if (updateResult instanceof Array) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "修改数据失败", data: updateResult });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "修改博客成功" });
}));
// 根据用户id查询其发表文章
blogRouter.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, key, page, size } = req.query;
    const findResult = yield BlogService_1.BlogService.searchBlogByUserId(userId, { key, page, size });
    if (findResult instanceof Array) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "根据条件查询指定用户发表的文章失败", data: findResult });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "根据用户查询其博客文章成功", data: findResult });
}));
// 根据用户id查询博客文章
blogRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const byIdResult = yield BlogService_1.BlogService.searchBlogByBlogId(+id);
    if (byIdResult === false) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "查询数据失败请确认改id是否存在" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "根据id查询博客成功", data: byIdResult });
}));
// 根据条件查询
blogRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, key } = req.query;
    const byConditonResult = yield BlogService_1.BlogService.searchBlogByCondition({ size, page, key });
    if (byConditonResult instanceof Array) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "根据条件查询失败", data: byConditonResult });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "查询博客成功", data: byConditonResult });
}));
// 增加阅读
blogRouter.put("/addr/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const addResult = yield BlogService_1.BlogService.addReads(+id);
    if (addResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "增加阅读量成功" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "增加阅读量失败" });
}));
// 增加点赞
blogRouter.put("/addl/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const addResult = yield BlogService_1.BlogService.addLikes(+id);
    if (addResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "点赞成功" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "点赞失败" });
}));
