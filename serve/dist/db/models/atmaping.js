"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atmaping = void 0;
const sequelize_1 = require("sequelize");
class Atmaping extends sequelize_1.Model {
    static initModel(sequelize) {
        Atmaping.init({
            atmId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "文章标签映射表id"
            },
            articleId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "博客文章id",
                references: {
                    model: 'blog',
                    key: 'blogId'
                }
            },
            tagId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "标签id",
                references: {
                    model: 'tag',
                    key: 'tagId'
                }
            }
        }, {
            sequelize,
            tableName: 'atmaping',
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
                        { name: "atmId" },
                    ]
                },
                {
                    name: "foreign_articleId",
                    using: "BTREE",
                    fields: [
                        { name: "articleId" },
                    ]
                },
                {
                    name: "foreign_tagId",
                    using: "BTREE",
                    fields: [
                        { name: "tagId" },
                    ]
                },
            ]
        });
        return Atmaping;
    }
}
exports.Atmaping = Atmaping;
