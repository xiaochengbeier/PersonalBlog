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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserService_1 = __importDefault(require("../services/UserService"));
const ResponseHandler_1 = require("./ResponseHandler");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
/**
 * 此接口根据邮箱发送重置密码验证码
 */
userRouter.get("/scode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   获得用户邮箱
    const email = req.query.email;
    // 向该用户发送重置密码验证码
    const code = yield UserService_1.default.sendResetPassCode(email);
    // 将code存入session对象中
    if (code) {
        req.session[email] = code;
        // 响应请求表示发送验证码成功
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "验证码已经发送" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "邮件发送失败可能是该邮箱不存在" });
}));
/**
 * 重置密码接口
 */
userRouter.put("/repass", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const pass = req.query.pass;
    const code = +req.query.code;
    // 首先校验 验证码是否正确
    const scode = +req.session[email];
    console.log("repass===>", email, pass, code, scode);
    if (code !== scode) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "重置密码失败" });
        // 将对应的校验码数据从session对象上删除
        req.session.destroy(() => false);
        return;
    }
    // 如果校验成功 将密码使用 md5加密修改其密码
    const updataResult = yield UserService_1.default.restPass(email, pass);
    if (updataResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "重置成功" });
        // 将对应的校验码数据从session对象上删除
        req.session.destroy(() => false);
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "重置密码于数据库操作时失败" });
    // 将对应的校验码数据从session对象上删除
    req.session.destroy(() => false);
}));
/**
 * 更新密码接口
 */
userRouter.put("/uppass", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPass, newPass } = req.body;
    const updataResult = yield UserService_1.default.updatePass(email, oldPass, newPass);
    if (updataResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "密码更新成功" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "密码更新失败旧密码不正确" });
}));
/**
 * 重置生日接口
 */
userRouter.put("/upbith", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, birth } = req.body;
    const birthDate = new Date(birth);
    const updataResult = yield UserService_1.default.updateBirth(email, birthDate);
    if (updataResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "生日更新成功" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "生日更新失败" });
}));
/**
 * 重置生日接口
 */
userRouter.put("/upname", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    const updataResult = yield UserService_1.default.updateName(email, name);
    if (updataResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "用户名更新成功" });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "用户名更新失败" });
}));
userRouter.get("/getbypk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const findByPkResult = yield UserService_1.default.getUserById(+userId);
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "查询用户信息成功", data: findByPkResult });
}));
/**
 * 更换头像
 */
userRouter.put("/upposter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { poster, uid } = req.body;
    const upposterResult = yield UserService_1.default.changePoster(poster, uid);
    if (upposterResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "更新头像成功", data: true });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "更新头像失败", data: false });
}));
