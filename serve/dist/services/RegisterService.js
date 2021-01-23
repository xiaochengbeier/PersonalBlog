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
exports.RegisterService = void 0;
const db_1 = require("../db");
const uuid_1 = require("uuid");
const md5_1 = __importDefault(require("md5"));
const verify_1 = require("../utils/verify");
const email_1 = require("../utils/email");
class RegisterService {
    /**
     * @param email 注册邮箱账号
     * @param password  注册密码
     * @return 返回false 表示账号已经存在无法注册
     */
    static registerCount(email, password, host) {
        return __awaiter(this, void 0, void 0, function* () {
            // 首先判断此账号是否已经存在 如果存在表示已经注册过了
            // 根据邮箱账号在user表中查询
            const findResult = yield db_1.User.findOne({
                where: {
                    email
                }
            });
            // 账号已经存在无法注册
            if (findResult != null) {
                return false;
            }
            // 通过md5对密码加密
            const pass = md5_1.default(password);
            // 通过uuid生成一个秘钥
            const secrete = uuid_1.v4();
            // 将账户密码存入以及秘钥存入数据库
            const createResult = yield db_1.Register.create({ email, pass, key: secrete, status: false });
            const registObj = createResult.toJSON();
            // 生成 jwt 字符串
            const jwtStr = verify_1.signJwt({ email, pass }, secrete, 60 * 60);
            // 给用户发送邮件等待验证
            email_1.sendMailTo(email, host + "/regist/verify?jwt=" + jwtStr + "&id=" + registObj.registerId, email);
            return true;
        });
    }
    /**
     * @param jwt  jwt 字符串
     * @param secrete  秘钥
     */
    static registerVerify(jwt, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // 根据id从数据库判断是否已经激活
            const findByPkResult = yield db_1.Register.findByPk(id);
            const findObj = findByPkResult.toJSON();
            // 如果已经校验过了直接返回true
            if (findObj.status) {
                return true;
            }
            //    根据
            const verifyResult = verify_1.verifyJwt(jwt, findObj.key);
            //    校验失败返回false
            if (verifyResult === false) {
                return false;
            }
            //    校验成功 首先将注册表 status 设置为 true表示验证通过
            yield db_1.Register.update({ status: true }, {
                where: {
                    registerId: findObj.registerId
                }
            });
            //   将用户的账号密码存入用户表
            yield db_1.User.create({ name: "用户名", email: verifyResult.email, pass: verifyResult.pass, birth: new Date("1999-10-12"), ctime: new Date() });
            return true;
        });
    }
}
exports.RegisterService = RegisterService;
