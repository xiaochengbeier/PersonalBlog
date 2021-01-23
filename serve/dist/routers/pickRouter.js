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
exports.pickRouter = void 0;
const express_1 = __importDefault(require("express"));
const PickerService_1 = __importDefault(require("../services/PickerService"));
const ResponseHandler_1 = require("./ResponseHandler");
const pickRouter = express_1.default.Router();
exports.pickRouter = pickRouter;
/**
 * 关注某个人
 */
pickRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { picker, checked } = req.body;
    const pickResult = yield PickerService_1.default.pick({ picker, checked, ctime: new Date() });
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "关注成功", data: pickResult });
}));
pickRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { picker, checked } = req.query;
    const unpickResult = yield PickerService_1.default.unpick({ picker: +picker, checked: +checked });
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "取消关注成功", data: { flag: unpickResult } });
}));
/**
 * 我关注的人
 */
pickRouter.get("/ipick", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, size, page } = req.query;
    const findResult = yield PickerService_1.default.iPicked(+id, { size: +size, page: +page });
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "我关注的用户", data: findResult });
}));
/**
 * 查询某人是否关注某人
 */
pickRouter.get("/ispick", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { picker, checked } = req.query;
    const findResult = yield PickerService_1.default.isPicked(+picker, +checked);
    if (findResult) {
        ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "已经关注", data: true });
        return;
    }
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 500, msg: "fail", des: "没有关注", data: false });
}));
/**
 * 有多少人关注我
 */
pickRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pickMe = yield PickerService_1.default.manyPickMe(+id);
    ResponseHandler_1.ResponseHandler.responseData(res, { code: 200, msg: "success", des: "关注我的人", data: { num: pickMe } });
}));
