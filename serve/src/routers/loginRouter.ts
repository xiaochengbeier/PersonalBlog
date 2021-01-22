import express, { Request, Response } from "express";
import UserService from "../services/UserService";
import { ResponseHandler } from "./ResponseHandler";
const loginRouter = express.Router();
loginRouter.post("/",async (req:Request,res:Response)=>{
    const {email,pass} = req.body;
    const loginResult = await  UserService.login(email,pass);
    if(loginResult === false){
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"登录失败用户或者密码错误",data:false});
        return;
    }
    // 登录成功给响应头写入 authorization
    ResponseHandler.publishAuthorization(res,loginResult,60*60*24);
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"登录成功",data:true});
})
// 根据authorization 校验获取用户身份
loginRouter.get("/whoAmI",async (req,res)=>{
    const userInfo = req.body.loginIfo;
    if(userInfo){
        const findById =  await UserService.getUserById(userInfo.userId);
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"获取用户信息成功",data:findById});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"获取用户信息失败",data:userInfo});
});
export {loginRouter};