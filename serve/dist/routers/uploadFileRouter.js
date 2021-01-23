"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const ResponseHandler_1 = require("./ResponseHandler");
const fileFloderPath = path_1.default.resolve(__dirname, "../../public/upload");
console.log("pahts==>", fileFloderPath);
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, fileFloderPath);
    },
    filename(req, file, cb) {
        // 获得文件扩展名
        const exName = path_1.default.extname(file.originalname);
        cb(null, Date.now() + "-" + uuid_1.v1().substr(0, 5) + exName);
    }
});
const allowExten = [".jpg", ".jpeg", ".png", ".gif"];
function fileFilter(req, file, cb) {
    // 获得文件扩展名
    const exName = path_1.default.extname(file.originalname).toLocaleLowerCase();
    if (allowExten.includes(exName)) {
        cb(null, true);
    }
    else {
        cb(new multer_1.MulterError("LIMIT_FIELD_VALUE", "'文件只支持 (.jpg ,  .jpeg , .png, .gif) 格式"));
    }
}
const upload = multer_1.default({
    storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter
}).single("poster");
const uploadFileRouter = express_1.default.Router();
exports.uploadFileRouter = uploadFileRouter;
uploadFileRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "文件上传失败", data: [err.message] });
            return;
        }
        else if (err) {
            throw err;
        }
        // 没有报错则将文件路径返回
        const uploadFilePath = `/upload/${req.file.filename}`;
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "上传文件成功", data: [uploadFilePath] });
    });
}));
