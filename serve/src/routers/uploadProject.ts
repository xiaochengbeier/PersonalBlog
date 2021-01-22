import express, { Request } from "express";
import  multer, { MulterError } from "multer";
import path from "path";
import {v1 as uuid} from "uuid"
import { ResponseHandler } from "./ResponseHandler";
import compressing from "compressing";

const fileFloderPath = path.resolve(__dirname,"../../public/project");
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
const allowExten = [".zip"];
function  fileFilter(req, file, cb){
    // 获得文件扩展名
    const exName = path.extname(file.originalname).toLocaleLowerCase();
    if(allowExten.includes(exName)){
        cb(null,true);
    }else{
        cb(new MulterError("LIMIT_FIELD_VALUE","'文件只支持 (.zip) 格式"));
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits:{
        // 一个文件不能超过10m
        fileSize:1024*1024*10
    },
}).single("project");
// 解压已经上传的文件
async function uncompress(file: string){
    // 获得已经上传压缩包的路径
    try{
        const filePath =uuid().substr(0,9);
        const uncomp =    await compressing.zip.uncompress(fileFloderPath+"/"+file,fileFloderPath+"/"+filePath+"/");
        return filePath;
    }catch(e){
        console.log(e);
        return false;
    }
}
const uploadProjectRouter = express.Router();
uploadProjectRouter.post("/",async (req,res)=>{
    upload(req, res,async (err)=>{
        if (err instanceof multer.MulterError) {
          ResponseHandler.responseData(res,{code:500,msg:"fail",des:"文件上传失败",data:[err.message]});
          return;
        } else if (err) {
           throw err;
        }
        // 没有报错则将文件路径返回
        const unpresResult =    await uncompress(req.file.filename);
        const baseName = path.basename(req.file.originalname).split(".")[0];
        if(unpresResult !== false){
            const uploadFilePath = `/project/${unpresResult}/${baseName}/index.html`;
            const sourceFile = `/project/${req.file.filename}`
            ResponseHandler.responseData(res,{code:200,msg:"success",des:"上传文件成功",data:{path: uploadFilePath,sourceFile}});
            return;
        }
        ResponseHandler.responseData(res,{code:500,msg:"fail",des:"上传项目",data:false});
       })
});
export{uploadProjectRouter};


