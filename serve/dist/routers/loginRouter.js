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
exports.loginRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserService_1 = __importDefault(require("../services/UserService"));
const ResponseHandler_1 = require("./ResponseHandler");
const loginRouter = express_1.default.Router();
exports.loginRouter = loginRouter;
loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pass } = req.body;
    const loginResult = yield UserService_1.default.login(email, pass);
    if (loginResult === false) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "登录失败用户或者密码错误", data: false });
        return;
    }
    // 登录成功给响应头写入 authorization
    ResponseHandler_1.ResponseHandler.publishAuthorization(res, loginResult, 60 * 60 * 24);
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "登录成功", data: true });
}));
// 根据authorization 校验获取用户身份
loginRouter.get("/whoAmI", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body.loginIfo;
    if (userInfo) {
        const findById = yield UserService_1.default.getUserById(userInfo.userId);
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "获取用户信息成功", data: findById });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "获取用户信息失败", data: userInfo });
}));
