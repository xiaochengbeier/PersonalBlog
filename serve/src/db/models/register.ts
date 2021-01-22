import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface RegisterAttributes {
  registerId: number;
  email: string;
  pass: string;
  key: string;
  status: boolean;
}

export type registerPk = "registerId";
export type registerId = Register[registerPk];
export type registerCreationAttributes = Optional<RegisterAttributes, registerPk>;

export class Register extends Model<RegisterAttributes, registerCreationAttributes> implements RegisterAttributes {
  registerId!: number;
  email!: string;
  pass!: string;
  key!: string;
  status!: boolean;


  static initModel(sequelize: Sequelize.Sequelize): typeof Register {
    Register.init({
    registerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "注册表id"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户邮箱"
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "密码"
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "校验秘钥"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否校验成功"
    }
  }, {
    sequelize,
    tableName: 'register',
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
          { name: "registerId" },
        ]
      },
    ]
  });
  return Register;
  }
}
