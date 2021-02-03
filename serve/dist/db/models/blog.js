"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const sequelize_1 = require("sequelize");
class Blog extends sequelize_1.Model {
    static initModel(sequelize) {
        Blog.init({
            blogId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "博客表主键"
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "用户id",
                references: {
                    model: 'user',
                    key: 'userId'
                }
            },
            title: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "博客标题"
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                comment: "博客内容"
            },
            tag: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                comment: "博客标签"
            },
            likes: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 10,
                comment: "博客点赞数量"
            },
            ctime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
                comment: "博客创建时间"
            },
            reads: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 10,
                comment: "博客阅读量"
            }
        }, {
            sequelize,
            tableName: 'blog',
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
                        { name: "blogId" },
                    ]
                },
                {
                    name: "foreign_userId",
                    using: "BTREE",
                    fields: [
                        { name: "userId" },
                    ]
                },
            ]
        });
        return Blog;
    }
}
exports.Blog = Blog;
