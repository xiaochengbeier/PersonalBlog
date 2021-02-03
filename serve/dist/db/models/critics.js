"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Critics = void 0;
const sequelize_1 = require("sequelize");
class Critics extends sequelize_1.Model {
    static initModel(sequelize) {
        Critics.init({
            criticId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "评论表主键"
            },
            articleId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "被评论文章id",
                references: {
                    model: 'blog',
                    key: 'blogId'
                }
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                comment: "评论内容"
            },
            talker: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "评论者",
                references: {
                    model: 'user',
                    key: 'userId'
                }
            },
            ctime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
                comment: "创建时间"
            },
            parent: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                comment: "评论的父级做评论回复使用"
            }
        }, {
            sequelize,
            tableName: 'critics',
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
                        { name: "criticId" },
                    ]
                },
                {
                    name: "foreign_aritcleId_critic",
                    using: "BTREE",
                    fields: [
                        { name: "articleId" },
                    ]
                },
                {
                    name: "foreign_talk_critic",
                    using: "BTREE",
                    fields: [
                        { name: "talker" },
                    ]
                },
            ]
        });
        return Critics;
    }
}
exports.Critics = Critics;
