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
const md5_1 = __importDefault(require("md5"));
const db_1 = require("../db");
const email_1 = require("../utils/email");
class UserService {
    /**
     * 根据邮箱向用户邮箱发送 四位校验码
     * @param email  邮箱
     */
    static sendResetPassCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // 根据邮箱查询用户名字
            const findResult = yield db_1.User.findOne({
                where: {
                    email
                }
            });
            const findObj = findResult.toJSON();
            if (!findObj.name) {
                return false;
            }
            // 随机生成四位数字
            const code = Math.floor((Math.random() * 99999));
            email_1.resetPassSendMailTo(email, code, findObj.name);
            return code;
        });
    }
    /**
     * @returns  返回的是重置数据库结果
     * @param email 重置密码邮箱
     * @param pass  密码 注意该方法会对其 md5加密 传入参数的时候就不需要了
     */
    static restPass(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            pass = md5_1.default(pass);
            const [times, userArr] = yield db_1.User.update({ pass }, { where: { email } });
            console.log(times, userArr, "----times, userArr");
            if (times > 0) {
                return true;
            }
            return false;
        });
    }
    /**
     * @returns 如果范湖false 表示登录失败 如果返回的是一个用户对象表示登录成功
     * @param email 邮箱账号
     * @param pass  密码
     */
    static login(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            //   对密码进行md5加密
            const passMd = md5_1.default(pass);
            //  根据邮箱查询数据
            const findResult = yield db_1.User.findOne({
                attributes: ["userId", "email", "pass", "name", "birth", "ctime", "poster"],
                where: { email }
            });
            const userObj = findResult.toJSON();
            // 获得密码
            if (userObj.pass === passMd) {
                delete userObj.pass;
                return userObj;
            }
            return false;
        });
    }
    /**
     * @returns Promise<boolean> true表示修改成功 false表示原始密码 不正确或者数据库操作失败
     * @param email  邮箱账号
     * @param oldPass  老密码
     * @param newPass 新密码
     */
    static updatePass(email, oldPass, newPass) {
        return __awaiter(this, void 0, void 0, function* () {
            // 首先对旧密码进行md5加密 然后根据数据库比对
            const oldMd = md5_1.default(oldPass);
            // 根据email查询该用户获得数据库密码
            const user = yield db_1.User.findOne({
                where: {
                    email
                }
            });
            const userObj = user.toJSON();
            // 对比数据库密码和老密码md5字符串
            if (userObj.pass !== oldMd) {
                return false;
            }
            // 如果对比相同那么就修改数据库将新密码通过md5加密存入数据库
            const newMd = md5_1.default(newPass);
            const [num, use] = yield db_1.User.update({ pass: newMd }, {
                where: {
                    email
                }
            });
            if (num === 0) {
                return false;
            }
            return true;
        });
    }
    /**
     * @returns Promise<boolean> true表示修改成功
     * @param email 用户邮箱账号
     * @param name  新用户名
     */
    static updateName(email, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [num, user] = yield db_1.User.update({ name }, { where: { email } });
            if (num > 0) {
                return true;
            }
            return false;
        });
    }
    /**
     * @returns Promise<boolean> true表示修改成功
     * @param email 用户邮箱账号
     * @param birth 新的出生日期
     */
    static updateBirth(email, birth) {
        return __awaiter(this, void 0, void 0, function* () {
            const [num, user] = yield db_1.User.update({ birth }, { where: { email } });
            if (num > 0) {
                return true;
            }
            return false;
        });
    }
    /**
     * 根据用户id 获得用户信息
     */
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findByIdResult = yield db_1.User.findByPk(userId, {
                attributes: ["userId", "email", "pass", "name", "birth", "ctime", "poster"]
            });
            return findByIdResult.toJSON();
        });
    }
    /**
     * 更换用户头像
     * @param poster 头像字符串
     * @param userId 用户id
     */
    static changePoster(poster, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [num, use] = yield db_1.User.update({ poster }, { where: { userId } });
            if (num > 0) {
                return true;
            }
            return false;
        });
    }
}
exports.default = UserService;
