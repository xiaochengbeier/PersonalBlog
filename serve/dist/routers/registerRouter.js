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
exports.registerRouter = void 0;
const express_1 = __importDefault(require("express"));
const ResponseHandler_1 = require("./ResponseHandler");
const RegisterService_1 = require("../services/RegisterService");
const registerRouter = express_1.default.Router();
exports.registerRouter = registerRouter;
/**
 * 用户注册接口
 */
registerRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 获得邮箱密码
    const { email, pass } = req.body;
    console.log(req.hostname, "-hostname---", req.protocol);
    const url = req.protocol + "://" + req.hostname + ":8888";
    const registerFind = yield RegisterService_1.RegisterService.registerCount(email, pass, url);
    if (registerFind) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "已经注册前往验证" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "注册失败此账号可能已经存在" });
}));
/**
 * 用户校验接口
 */
registerRouter.get("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jwt, id } = req.query;
    const result = yield RegisterService_1.RegisterService.registerVerify(jwt, +id);
    if (result) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "校验成功可以进行登录操作" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "校验失败" });
}));
