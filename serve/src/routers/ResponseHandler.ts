import { Request, Response } from "express";
import { signJwt,verifyJwt } from "../utils/verify";
const SECREATE = "JLSHJDLS";
export interface ResponseDataType{
        code:200|500|400,
        msg:"success"|"fail",
        des:any
        data?:object|any
}
export  class ResponseHandler {
   static responseData(res:Response,data:ResponseDataType){
          res.send(data);
   }
   /**
    * @param res Response对象
    * @param payload  存到jwt 中的数据
    * @param expiresIn 过期时间单位为 秒
    */
   static publishAuthorization(res:Response,payload: object,expiresIn: number){
      const jwtStr =   signJwt(payload,SECREATE,expiresIn);
      res.setHeader("authorization",jwtStr);
   }
   /**
    * @returns 如果返回false 表示校验失败
    * @param req Request
    */
   static verifyAuthorization(req:Request){
        //      如果 header上有 authorization 字段那么获取并且校验
        const token = req.headers.authorization;
        console.log("--verify--authorization--",token);
        if(token){
              return verifyJwt(token,SECREATE);
        }
        return false;
   }
}
