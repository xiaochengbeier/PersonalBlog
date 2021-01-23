"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
const verify_1 = require("../utils/verify");
const SECREATE = "JLSHJDLS";
class ResponseHandler {
    static responseData(res, data) {
        res.send(data);
    }
    /**
     * @param res Response对象
     * @param payload  存到jwt 中的数据
     * @param expiresIn 过期时间单位为 秒
     */
    static publishAuthorization(res, payload, expiresIn) {
        const jwtStr = verify_1.signJwt(payload, SECREATE, expiresIn);
        res.setHeader("authorization", jwtStr);
    }
    /**
     * @returns 如果返回false 表示校验失败
     * @param req Request
     */
    static verifyAuthorization(req) {
        //      如果 header上有 authorization 字段那么获取并且校验
        const token = req.headers.authorization;
        console.log("--verify--authorization--", token);
        if (token) {
            return verify_1.verifyJwt(token, SECREATE);
        }
        return false;
    }
}
exports.ResponseHandler = ResponseHandler;
