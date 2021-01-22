import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "./ResponseHandler";
const whiteList = [
    {method:"POST",path:"/login"},
    {method:"GET",path:"/rainbow"}
];
const permissionRouter = (req:Request,res:Response,next:NextFunction)=>{
    // 获得 请求资源路径如果在白名单内直接通过无需校验
    console.log(req.method,req.path,"---white---");
    let  isWhite = false;
    for(const item of whiteList){
        if(item.method === req.method && item.path === req.path){
            isWhite = true;
            break;
        }
    }
    if(isWhite){
        next();
        return;
    }
    // 拿到 authorization校验
    const verifyResult =   ResponseHandler.verifyAuthorization(req);
    if(verifyResult === false){
        // 如果说校验失败那么直接进行下一步 响应头将不在携带 authorization
        res.removeHeader("authorization");
        next();
        return ;
    }else{
        // 如果校验成功那么直接将 authorization添加到响应头中
        res.setHeader("authorization",req.headers.authorization);
        // 将用户信息携带到请求头
        req.body.loginIfo = verifyResult;
        console.log("校验成功",verifyResult);
        next();
    }
}
export {permissionRouter};