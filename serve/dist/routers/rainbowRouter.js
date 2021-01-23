"use strict";
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
exports.rainbowRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ResponseHandler_1 = require("./ResponseHandler");
const rainbowRouter = express_1.default.Router();
exports.rainbowRouter = rainbowRouter;
const url = "https://chp.shadiao.app/api.php";
rainbowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const arr = [];
    for (let i = 0; i <= 3; i++) {
        const resultt = axios_1.default.get(url);
        arr.push(resultt);
    }
    let responseArr = [];
    // axios 并发处理
    yield axios_1.default.all(arr).then(axios_1.default.spread((...argus) => {
        responseArr = argus.map(item => item.data);
    }));
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "请求数据成功", data: responseArr });
}));
