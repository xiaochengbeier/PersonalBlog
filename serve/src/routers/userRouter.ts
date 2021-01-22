import express, { Request, Response } from "express"
import UserService from "../services/UserService";
import { ResponseHandler } from "./ResponseHandler";
const userRouter =   express.Router();
/**
 * 此接口根据邮箱发送重置密码验证码
 */
userRouter.get("/scode",async (req,res)=>{
     //   获得用户邮箱
    const email =  req.query.email as any;
    // 向该用户发送重置密码验证码
    const code =  await UserService.sendResetPassCode(email);
    // 将code存入session对象中
    if(code){
        req.session[email] = code;
        // 响应请求表示发送验证码成功
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"验证码已经发送"});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"邮件发送失败可能是该邮箱不存在"});
});
/**
 * 重置密码接口
 */
userRouter.put("/repass",async (req,res)=>{
    const email =  req.query.email as any;
    const pass = req.query.pass as any;
    const code = +req.query.code as any;
    // 首先校验 验证码是否正确
    const scode = +req.session[email];
    console.log("repass===>",email,pass,code,scode);
    if(code !== scode){
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"重置密码失败"});
         // 将对应的校验码数据从session对象上删除
         req.session.destroy(()=>false);
        return;
    }
    // 如果校验成功 将密码使用 md5加密修改其密码
    const updataResult  = await UserService.restPass(email,pass);
    if(updataResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"重置成功"});
        // 将对应的校验码数据从session对象上删除
        req.session.destroy(()=>false);
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"重置密码于数据库操作时失败"});
    // 将对应的校验码数据从session对象上删除
    req.session.destroy(()=>false);
});
/**
 * 更新密码接口
 */
userRouter.put("/uppass",async (req:Request,res:Response)=>{
    const {email,oldPass,newPass} = req.body;
    const updataResult =  await UserService.updatePass(email,oldPass,newPass);
    if(updataResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"密码更新成功"});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"密码更新失败旧密码不正确"});
})
/**
 * 重置生日接口
 */
userRouter.put("/upbith",async (req:Request,res:Response)=>{
    const  {email, birth} = req.body;
    const birthDate = new Date(birth);
    const updataResult =  await UserService.updateBirth(email, birthDate);
    if(updataResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"生日更新成功"});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"生日更新失败"});
});
/**
 * 重置生日接口
 */
userRouter.put("/upname",async (req:Request,res:Response)=>{
    const  {email,name} = req.body;
    const updataResult =  await UserService.updateName(email,name);
    if(updataResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"用户名更新成功"});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"用户名更新失败"});
});
userRouter.get("/getbypk",async (req:Request,res:Response)=>{
    const {userId} = req.query;
    const findByPkResult =  await UserService.getUserById(+userId);
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"查询用户信息成功",data:findByPkResult});
})
/**
 * 更换头像
 */
userRouter.put("/upposter",async (req: Request, res: Response)=>{
    const {poster,uid} = req.body;
    const upposterResult = await UserService.changePoster(poster,uid);
    if(upposterResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"更新头像成功",data: true});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"更新头像失败",data:false});
});
export {userRouter};