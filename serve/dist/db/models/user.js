"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        User.init({
            userId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "用户表id"
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "用户邮箱",
                unique: "email_index"
            },
            pass: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "用户密码"
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "用户名字"
            },
            birth: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: "0000-00-00 00:00:00",
                comment: "用户生日"
            },
            ctime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: "0000-00-00 00:00:00",
                comment: "用户注册时间"
            },
            poster: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
                defaultValue: "/upload/commonPoster.jpg",
                comment: "用户头像"
            },
            leve: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 6,
                comment: "用户级别"
            }
        }, {
            sequelize,
            tableName: 'user',
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
                        { name: "userId" },
                    ]
                },
                {
                    name: "email_index",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "email" },
                    ]
                },
            ]
        });
        return User;
    }
}
exports.User = User;
