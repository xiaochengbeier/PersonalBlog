import express from "express";
import PickerService from "../services/PickerService";
import { ResponseHandler } from "./ResponseHandler";
const pickRouter = express.Router();
/**
 * 关注某个人
 */
pickRouter.post("/",async (req,res)=>{
    const {picker, checked} = req.body;
    const pickResult =  await PickerService.pick({picker, checked, ctime:new Date()});
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"关注成功",data:pickResult});
})
pickRouter.delete("/",async (req,res)=>{
    const {picker, checked} = req.query as any;
    const unpickResult =  await PickerService.unpick({picker:+picker,checked:+checked});
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"取消关注成功",data:{flag:unpickResult}});
});
/**
 * 我关注的人
 */
pickRouter.get("/ipick",async (req,res)=>{
    const {id,size,page} = req.query as any;
    const findResult =  await PickerService.iPicked(+id,{size:+size,page:+page});
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"我关注的用户",data:findResult});
})
/**
 * 查询某人是否关注某人
 */
pickRouter.get("/ispick",async (req,res)=>{
    const {picker, checked} = req.query;
    const findResult =  await PickerService.isPicked(+picker,+checked);
    if(findResult){
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"已经关注",data:true});
        return;
    }
    ResponseHandler.responseData(res,{code:500,msg:"fail",des:"没有关注",data:false});
});
/**
 * 有多少人关注我
 */
pickRouter.get("/:id",async (req,res)=>{
    const {id} = req.params;
    const pickMe = await PickerService.manyPickMe(+id);
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"关注我的人",data:{num:pickMe}});
})
export {pickRouter};