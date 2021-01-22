import express from "express";
import multer, { MulterError } from "multer";
import path from "path";
import {v1 as uuid} from "uuid"
import { ResponseHandler } from "./ResponseHandler";
const fileFloderPath = path.resolve(__dirname,"../../public/upload");
console.log("pahts==>",fileFloderPath);
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, fileFloderPath);
    },
    filename(req, file, cb) {
      // 获得文件扩展名
      const exName = path.extname(file.originalname);
      cb(null, Date.now() + "-"+ uuid().substr(0,5)+exName)
    }
  })
const allowExten = [".jpg",".jpeg",".png",".gif"];
function  fileFilter(req, file, cb){
     // 获得文件扩展名
     const exName = path.extname(file.originalname).toLocaleLowerCase();
     if(allowExten.includes(exName)){
         cb(null,true);
     }else{
         cb(new MulterError("LIMIT_FIELD_VALUE","'文件只支持 (.jpg ,  .jpeg , .png, .gif) 格式"));
     }
}
const upload = multer({
   storage,
   limits:{
       fileSize:1024*1024
   },
   fileFilter
}).single("poster");

const uploadFileRouter = express.Router();
uploadFileRouter.post("/",async (req,res)=>{
    upload(req, res, (err)=>{
        if (err instanceof multer.MulterError) {
          ResponseHandler.responseData(res,{code:500,msg:"fail",des:"文件上传失败",data:[err.message]});
          return;
        } else if (err) {
           throw err;
        }
        // 没有报错则将文件路径返回
        const uploadFilePath = `/upload/${req.file.filename}`;
        ResponseHandler.responseData(res,{code:200,msg:"success",des:"上传文件成功",data:[uploadFilePath]});
      })
});


export {uploadFileRouter};