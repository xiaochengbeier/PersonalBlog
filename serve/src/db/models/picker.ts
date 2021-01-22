import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { User, userId } from './user';

export interface PickerAttributes {
  pickerId?: number;
  picker: number;
  checked: number;
  ctime?: Date;
}

export type pickerPk = "pickerId";
export type pickerId = Picker[pickerPk];
export type pickerCreationAttributes = Optional<PickerAttributes, pickerPk>;

export class Picker extends Model<PickerAttributes, pickerCreationAttributes> implements PickerAttributes {
  pickerId!: number;
  picker!: number;
  checked!: number;
  ctime!: Date;

  // picker belongsTo user
  getuser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setuser!: Sequelize.BelongsToSetAssociationMixin<User, userId>;
  createuser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  // picker belongsTo user
  // getuser!: Sequelize.BelongsToGetAssociationMixin<user>;
  // setuser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  // createuser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Picker {
    Picker.init({
    pickerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "关注表id"
    },
    picker: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "做出关注行为的人",
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    checked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "被关注的人",
      references: {
        model: 'user',
        key: 'userId'
      }
    },
    ctime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      comment: "关注时间"
    }
  }, {
    sequelize,
    tableName: 'picker',
    timestamps: true,
    paranoid:true,
    updatedAt:true,
    deletedAt:true,
    createdAt:true,
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
