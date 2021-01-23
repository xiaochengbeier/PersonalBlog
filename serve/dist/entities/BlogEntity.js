"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class BlogEntity {
    /**
     * 校验当前对象数据
     * @param isSkipMissing 是否跳过校验为空的数据默认值 为 fasle 不跳过
     */
    validateTthis(isSkipMissing = false) {
        return class_validator_1.validate(this, { skipMissingProperties: isSkipMissing });
    }
}
__decorate([
    class_transformer_1.Type(() => Number)
], BlogEntity.prototype, "blogId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "userId不能为空" }),
    class_transformer_1.Type(() => Number)
], BlogEntity.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "title不能为空" }),
    class_transformer_1.Type(() => String)
], BlogEntity.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "content不能为空" }),
    class_transformer_1.Type(() => String)
], BlogEntity.prototype, "content", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "tag不能为空" }),
    class_transformer_1.Type(() => String)
], BlogEntity.prototype, "tag", void 0);
__decorate([
    class_validator_1.IsDate({ message: "创建时间必须日期格式" })
], BlogEntity.prototype, "ctime", void 0);
exports.default = BlogEntity;
