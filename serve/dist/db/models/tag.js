"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const sequelize_1 = require("sequelize");
class Tag extends sequelize_1.Model {
    static initModel(sequelize) {
        Tag.init({
            tagId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "标签id"
            },
            tagname: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "标签名字",
                unique: "unique_tagename"
            },
            number: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "此标签对应的文章数量"
            }
        }, {
            sequelize,
            tableName: 'tag',
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
                        { name: "tagId" },
                    ]
                },
                {
                    name: "unique_tagename",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "tagname" },
                    ]
                },
            ]
        });
        return Tag;
    }
}
exports.Tag = Tag;
