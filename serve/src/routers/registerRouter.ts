import express, {  Request, Response } from "express";
import { ResponseHandler } from "./ResponseHandler";
import { RegisterService } from "../services/RegisterService";
import {Config} from "../etc/etc"
const registerRouter =  express.Router();
/**
 * 用户注册接口
 */
registerRouter.post("/",async (req:Request,res:Response)=>{
    // 获得邮箱密码
    const {email,pass} =  req.body as any;
    const url = req.protocol+"://"+req.hostname+":"+Config.port;
    const registerFind = await  RegisterService.registerCount(email,pass,url);
    if(registerFind){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"已经注册前往验证"});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"注册失败此账号可能已经存在"});
});
/**
 * 用户校验接口
 */
registerRouter.get("/verify",async (req,res)=>{
    const {jwt,id} = req.query;
    const result =   await RegisterService.registerVerify(jwt as any, +id as any);
    if(result){
        res.redirect("/reglog");
        return;
    }
    res.redirect("/regfail");
  })
export {registerRouter};