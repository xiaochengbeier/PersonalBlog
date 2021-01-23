"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriticEntiy = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CriticEntiy {
    validateThis(isSkip = false) {
        return class_validator_1.validate(this, { skipMissingProperties: isSkip });
    }
}
__decorate([
    class_transformer_1.Type(() => Number)
], CriticEntiy.prototype, "criticId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "articleId 不能为空" }),
    class_transformer_1.Type(() => Number)
], CriticEntiy.prototype, "articleId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "content 不能为空" }),
    class_transformer_1.Type(() => String)
], CriticEntiy.prototype, "content", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "talker 不能为空" }),
    class_transformer_1.Type(() => Number)
], CriticEntiy.prototype, "talker", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "ctime 不能为空" })
], CriticEntiy.prototype, "ctime", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "parent 不能为空" }),
    class_transformer_1.Type(() => Number)
], CriticEntiy.prototype, "parent", void 0);
exports.CriticEntiy = CriticEntiy;
