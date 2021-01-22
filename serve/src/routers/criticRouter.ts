import express from "express";
import { CriticService } from "../services/CriticService";
import { ResponseHandler } from "./ResponseHandler";
const criticRouter = express.Router();
// 添加评论相关接口
criticRouter.post("/",async (req,res)=>{
    const {articleId, content, talker,parent} =   req.body;
    const addCriticResult = await CriticService.addCritic({articleId, content, talker,parent,ctime:new Date()});
    if(addCriticResult instanceof Array){
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"添加评论数据失败",data:addCriticResult});
        return;
    }
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"添加评论数据成功",data:addCriticResult});
});
// 根据文章id查询数据
criticRouter.get("/bybid",async (req,res)=>{
    const {bid,size,page} = req.query as any;
    const byBlogIdResult = await CriticService.getCriticByBlogId(+bid,{size,page});
    if(byBlogIdResult instanceof Array){
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"根据博客文章id查询数据失败",data:byBlogIdResult});
        return;
    }
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"根据博客文章id查询数据成功",data:byBlogIdResult});
});
// 根据父级id查询数据
criticRouter.get("/bypid",async (req,res)=>{
    const {parent,size,page} = req.query as any;
    const byParentIdResult = await CriticService.getCriticByParentId(+parent,{size,page});
    if(byParentIdResult instanceof Array){
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"根据评论父级id查询数据失败",data:byParentIdResult});
        return;
    }
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"根据评论父级id查询数据成功",data:byParentIdResult});
});
export {criticRouter};