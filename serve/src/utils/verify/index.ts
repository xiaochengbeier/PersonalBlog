import { sign,verify} from "jsonwebtoken";
/**
 * @return jwt 字符串
 * @param payload jwt 负载数据
 * @param secretOrPrivateKey  加密秘钥
 * @param expiresIn  过期时间
 */
export function signJwt( payload: object,
    secretOrPrivateKey: string,
    expiresIn: number,){
    return sign(payload,secretOrPrivateKey,{expiresIn});
}
/**
 * @return  如果返回 false 表示验证失败
 * @param token jwt 字符串
 * @param secretOrPublicKey  秘钥
 */
export function verifyJwt(token: string, secretOrPublicKey:string){
    try {
       return  verify(token,secretOrPublicKey);
      } catch(err) {
        return false;
      }
}