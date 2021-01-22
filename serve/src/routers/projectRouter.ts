import { PRIORITY_ABOVE_NORMAL } from "constants";
import express, { Request, Response } from "express";
import {ProjectService} from "../services/ProjectService"
import { ResponseHandler } from "./ResponseHandler";
const projectRouter = express.Router();
// 根据用户id 获得项目
projectRouter.get("/",async(req: Request,res: Response)=>{
    const {uid,size,page} = req.query;
    const findResult =  await ProjectService.findProjectByUid(+uid,{size: +size,page: +page});
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"查询项目成功",data:findResult});
});
// 添加项目
projectRouter.post("/",async(req: Request,res: Response)=>{
    const {uid,content,source} = req.body;
    const addResult =  await ProjectService.addProject(+uid,content,source);
    if(addResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"添加项目成功",data:addResult});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"添加项目失败",data:false});
});
export {projectRouter};