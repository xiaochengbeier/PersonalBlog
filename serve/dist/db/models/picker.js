"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Picker = void 0;
const sequelize_1 = require("sequelize");
class Picker extends sequelize_1.Model {
    // picker belongsTo user
    // getuser!: Sequelize.BelongsToGetAssociationMixin<user>;
    // setuser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
    // createuser!: Sequelize.BelongsToCreateAssociationMixin<user>;
    static initModel(sequelize) {
        Picker.init({
            pickerId: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "关注表id"
            },
            picker: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "做出关注行为的人",
                references: {
                    model: 'user',
                    key: 'userId'
                }
            },
            checked: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                comment: "被关注的人",
                references: {
                    model: 'user',
                    key: 'userId'
                }
            },
            ctime: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
                comment: "关注时间"
            }
        }, {
            sequelize,
            tableName: 'picker',
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
                        { name: "pickerId" },
                    ]
                },
                {
                    name: "foreign_checked",
                    using: "BTREE",
                    fields: [
                        { name: "checked" },
                    ]
                },
                {
                    name: "picker",
                    using: "BTREE",
                    fields: [
                        { name: "picker" },
                    ]
                },
            ]
        });
        return Picker;
    }
}
exports.Picker = Picker;
