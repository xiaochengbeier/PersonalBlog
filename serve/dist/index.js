"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routers/userRouter");
const express_session_1 = __importDefault(require("express-session"));
const registerRouter_1 = require("./routers/registerRouter");
const loginRouter_1 = require("./routers/loginRouter");
const permissionRouter_1 = require("./routers/permissionRouter");
const blogRouter_1 = require("./routers/blogRouter");
const criticRouter_1 = require("./routers/criticRouter");
const pickRouter_1 = require("./routers/pickRouter");
const uploadFileRouter_1 = require("./routers/uploadFileRouter");
const uploadProject_1 = require("./routers/uploadProject");
const path_1 = __importDefault(require("path"));
const etc_1 = require("./etc/etc");
const rainbowRouter_1 = require("./routers/rainbowRouter");
const projectRouter_1 = require("./routers/projectRouter");
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const app = express_1.default();
// 静态资源中间件
const pathName = path_1.default.resolve(__dirname, "../public");
app.use(connect_history_api_fallback_1.default({
    rewrites: [
        {
            from: /\/api\/regist\/verify?.*$/,
            to(context) {
                return context.parsedUrl.path;
            }
        }
    ]
}));
app.use(express_1.default.static(pathName));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_session_1.default({
    secret: "jlsljdkjlss",
    resave: false,
    saveUninitialized: true
}));
app.use("/", permissionRouter_1.permissionRouter);
// 注册
app.use("/api/regist", registerRouter_1.registerRouter);
// 登录
app.use("/api/login", loginRouter_1.loginRouter);
// 和用户操作相关接口
app.use("/api/user", userRouter_1.userRouter);
// 博客相关操作接口
app.use("/api/blog", blogRouter_1.blogRouter);
// 和评论相关操作
app.use("/api/critic", criticRouter_1.criticRouter);
// 关注操作相关接口
app.use("/api/pick", pickRouter_1.pickRouter);
// 励志标语
app.use("/api/rainbow", rainbowRouter_1.rainbowRouter);
// 项目接口
app.use("/api/project", projectRouter_1.projectRouter);
// 文件上传接口
app.use("/api/upload", uploadFileRouter_1.uploadFileRouter);
// 上传项目文件接口
app.use("/api/upproject", uploadProject_1.uploadProjectRouter);
app.listen(etc_1.Config.port);
