import express from "express";
import { BlogService } from "../services/BlogService";
import { ResponseHandler } from "./ResponseHandler";
const blogRouter = express.Router();
// 添加文章接口
blogRouter.post("/",async (req,res)=>{
   const {userId, title, content, tag} =  req.body;
   const addResult = await  BlogService.addBlog({userId,title,content,tag,ctime:new Date()});
   if(addResult instanceof Array){
       ResponseHandler.responseData(res,{code:500,msg:"fail",des:"插入数据失败",data:addResult});
       return;
   }
   ResponseHandler.responseData(res,{code:200,msg:"success",des:"插入博客成功",data:addResult});
});
// 删除文章接口
blogRouter.delete("/:id",async (req,res)=>{
    const {id} = req.params;
    const deleteResult =  await BlogService.deleteBlogById(+id);
    if(deleteResult){
        ResponseHandler.responseData(res,{code:500,msg:"success",des:"删除博客成功"});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"删除数据失败"});
})
// 修改博客接口
blogRouter.put("/",async (req,res)=>{
    const {blogId, title, content, tag} = req.body;
    const updateResult = await BlogService.updateBlogById(blogId,{title, content, tag});
    if(updateResult instanceof Array ){
         ResponseHandler.responseData(res,{code:500,msg:"fail",des:"修改数据失败",data:updateResult});
         return ;
    }
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"修改博客成功"});
})
// 根据用户id查询其发表文章
blogRouter.get("/user",async(req,res)=>{
    const {userId,key,page,size} = req.query as any;
    const findResult = await  BlogService.searchBlogByUserId(userId,{key,page,size});
    if(findResult instanceof Array){
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"根据条件查询指定用户发表的文章失败",data:findResult});
        return ;
    }
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"根据用户查询其博客文章成功",data:findResult});
});
// 根据用户id查询博客文章
blogRouter.get("/:id",async(req,res)=>{
    const {id} = req.params;
    const byIdResult = await BlogService.searchBlogByBlogId(+id);
    if(byIdResult === false){
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"查询数据失败请确认改id是否存在"});
        return ;
    }
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"根据id查询博客成功",data:byIdResult});
});
// 根据条件查询
blogRouter.get("/",async(req,res)=>{
    const   {size,page,key} = req.query as any;
    const byConditonResult = await  BlogService.searchBlogByCondition({size,page,key});
    if(byConditonResult instanceof Array){
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"根据条件查询失败",data: byConditonResult});
        return ;
    }
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"查询博客成功",data:byConditonResult});
});
// 增加阅读
blogRouter.put("/addr/:id",async (req,res)=>{
    const {id} = req.params;
    const addResult =  await  BlogService.addReads(+id);
    if( addResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"增加阅读量成功"});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"增加阅读量失败"});
})
// 增加点赞
blogRouter.put("/addl/:id",async (req,res)=>{
    const {id} = req.params;
    const addResult =  await  BlogService.addLikes(+id);
    if( addResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"点赞成功"});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"点赞失败"});
})

export  {blogRouter}