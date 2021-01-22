import express from "express";
import axios from "axios";
import { ResponseHandler } from "./ResponseHandler";
const rainbowRouter = express.Router();
const  url = "https://chp.shadiao.app/api.php";
rainbowRouter.get("/",async(req,res)=>{
    const arr  = [];
    for(let i = 0;i <=3 ; i++){
        const resultt =  axios.get(url);
        arr.push(resultt);
    }
    let  responseArr = [];
    // axios 并发处理
    await axios.all(arr).then(axios.spread((...argus)=>{
       responseArr = argus.map(item=>item.data);
    }));
    ResponseHandler.responseData(res,{code:200,msg:"success",des:"请求数据成功",data:responseArr});
})
export {rainbowRouter};