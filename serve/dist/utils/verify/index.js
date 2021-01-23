"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * @return jwt 字符串
 * @param payload jwt 负载数据
 * @param secretOrPrivateKey  加密秘钥
 * @param expiresIn  过期时间
 */
function signJwt(payload, secretOrPrivateKey, expiresIn) {
    return jsonwebtoken_1.sign(payload, secretOrPrivateKey, { expiresIn });
}
exports.signJwt = signJwt;
/**
 * @return  如果返回 false 表示验证失败
 * @param token jwt 字符串
 * @param secretOrPublicKey  秘钥
 */
function verifyJwt(token, secretOrPublicKey) {
    try {
        return jsonwebtoken_1.verify(token, secretOrPublicKey);
    }
    catch (err) {
        return false;
    }
}
exports.verifyJwt = verifyJwt;
