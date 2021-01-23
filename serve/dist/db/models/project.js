"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_1 = require("sequelize");
class Project extends sequelize_1.Model {
    static initModel(sequelize) {
        Project.init({
            projectId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "项目表主键"
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
            content: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
                comment: "项目访问路径",
            },
            source: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
                comment: "源码路径",
            }
        }, {
            sequelize,
            tableName: 'project',
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
                        { name: "projectId" },
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
        return Project;
    }
}
exports.Project = Project;
