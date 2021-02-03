import express from "express"
import { userRouter } from "./routers/userRouter";
import session from "express-session"
import { registerRouter } from "./routers/registerRouter";
import { loginRouter } from "./routers/loginRouter";
import { permissionRouter } from "./routers/permissionRouter";
import { blogRouter } from "./routers/blogRouter";
import { criticRouter } from "./routers/criticRouter";
import { pickRouter } from "./routers/pickRouter";
import { uploadFileRouter } from "./routers/uploadFileRouter";
import {uploadProjectRouter} from "./routers/uploadProject"
import path from "path";
import{Config} from "./etc/etc";
import { rainbowRouter } from "./routers/rainbowRouter";
import { projectRouter } from "./routers/projectRouter";
import history from "connect-history-api-fallback";
const app = express();
// 静态资源中间件
const pathName = path.resolve(__dirname,"../public");
app.use(history({
  rewrites: [
    {
      from: /\/api\/regist\/verify?.*$/,
      to(context) {
        return  context.parsedUrl.path;
      }
    }
  ]
}));
app.use(express.static(pathName));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret:"jlsljdkjlss",
  resave: false,
  saveUninitialized: true
}));
app.use("/",permissionRouter);
// 注册
app.use("/api/regist",registerRouter);
// 登录
app.use("/api/login",loginRouter);
// 和用户操作相关接口
app.use("/api/user",userRouter);
// 博客相关操作接口
app.use("/api/blog",blogRouter);
// 和评论相关操作
app.use("/api/critic",criticRouter);
// 关注操作相关接口
app.use("/api/pick",pickRouter);
// 励志标语
app.use("/api/rainbow",rainbowRouter);
// 项目接口
app.use("/api/project",projectRouter);
// 文件上传接口
app.use("/api/upload",uploadFileRouter);
// 上传项目文件接口
app.use("/api/upproject",uploadProjectRouter);
app.listen(Config.port);