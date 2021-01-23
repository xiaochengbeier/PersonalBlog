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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const RainbowService_1 = require("./RainbowService");
class PickerService {
    /**
     * 关注某个人
     * @param pick 关注数据信息对象
     */
    static pick(pick) {
        return __awaiter(this, void 0, void 0, function* () {
            const findResult = yield db_1.Picker.findOne({ where: {
                    picker: pick.picker,
                    checked: pick.checked
                } });
            if (findResult !== null) {
                const findObj = findResult.toJSON();
                return findObj;
            }
            const createResult = yield db_1.Picker.create(pick);
            return createResult;
        });
    }
    //    取消关注
    static unpick(pick) {
        return __awaiter(this, void 0, void 0, function* () {
            const desResult = yield db_1.Picker.destroy({ where: {
                    picker: pick.picker,
                    checked: pick.checked
                } });
            return desResult ? true : false;
        });
    }
    /**
     * 查询谁关注了我的有多少人
     * @param checked 我的id
     */
    static manyPickMe(checked) {
        return __awaiter(this, void 0, void 0, function* () {
            const countResult = yield db_1.Picker.count({ where: {
                    checked
                } });
            return countResult;
        });
    }
    /**
     * 查询我关注了谁
     * @param picker
     */
    static iPicked(picker, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows, count } = yield db_1.Picker.findAndCountAll({
                where: {
                    picker
                },
                limit: +condition.size,
                offset: (+condition.page - 1) * (+condition.size),
                order: [['ctime', "DESC"]]
            });
            const checkedIdArr = [];
            if (rows.length > 0) {
                rows.forEach(item => {
                    const pickObj = item.toJSON();
                    const checkedId = pickObj.checked;
                    checkedIdArr.push(checkedId);
                });
            }
            console.log("-- checkedIdArr--", checkedIdArr, rows.length > 0);
            const checkedUser = [];
            for (const item of checkedIdArr) {
                const findResult = yield db_1.User.findOne({
                    attributes: ["userId", "name", "leve", "email", "createdAt", "poster"],
                    where: { userId: +item },
                });
                if (findResult !== null) {
                    const findUserObj = findResult.toJSON();
                    const rainbow = yield RainbowService_1.RainbowService.getOneRainbow();
                    findUserObj.rainbow = rainbow;
                    checkedUser.push(findUserObj);
                }
            }
            return { count, datas: checkedUser };
        });
    }
    /**
     * 查询某人是否关注了某人
     * @param picker 观察者
     * @param checked 被观察者
     */
    static isPicked(picker, checked) {
        return __awaiter(this, void 0, void 0, function* () {
            const findResult = yield db_1.Picker.findOne({ where: {
                    picker,
                    checked
                } });
            if (findResult != null) {
                return true;
            }
            return false;
        });
    }
}
exports.default = PickerService;
