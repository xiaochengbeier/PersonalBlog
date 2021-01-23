"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const sequelize_1 = require("sequelize");
class Register extends sequelize_1.Model {
    static initModel(sequelize) {
        Register.init({
            registerId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "注册表id"
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "用户邮箱"
            },
            pass: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "密码"
            },
            key: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "校验秘钥"
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
                comment: "是否校验成功"
            }
        }, {
            sequelize,
            tableName: 'register',
            timestamps: true,
            paranoid: true,
            updatedAt: true,
            deletedAt: true,
            createdAt: true,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "registerId" },
                    ]
                },
            ]
        });
        return Register;
    }
}
exports.Register = Register;
