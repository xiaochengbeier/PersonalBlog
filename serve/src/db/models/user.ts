import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import type { Blog, blogId } from './blog';
import type { Critics, criticsId } from './critics';
import type { Picker, pickerId } from './picker';
import type {Project,projectId} from "./project"

export interface UserAttributes {
  userId: number;
  email: string;
  pass: string;
  name: string;
  birth: Date;
  ctime: Date;
  leve?:number;
  poster?:string;
}

export type userPk = "userId";
export type userId = User[userPk];
export type userCreationAttributes = Optional<UserAttributes, userPk>;

export class User extends Model<UserAttributes, userCreationAttributes> implements UserAttributes {
  userId!: number;
  email!: string;
  pass!: string;
  name!: string;
  birth!: Date;
  ctime!: Date;
  leve?:number;
  poster?:string;
  // user hasMany blog
  getblogs!: Sequelize.HasManyGetAssociationsMixin<Blog>;
  setblogs!: Sequelize.HasManySetAssociationsMixin<Blog, blogId>;
  addblog!: Sequelize.HasManyAddAssociationsMixin<Blog, blogId>;
  removeblog!: Sequelize.HasManyRemoveAssociationsMixin<Blog, blogId>;
  hasblog!: Sequelize.HasManyHasAssociationsMixin<Blog, blogId>;
  countblogs!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany critics
  getcritics!: Sequelize.HasManyGetAssociationsMixin<Critics>;
  setcritics!: Sequelize.HasManySetAssociationsMixin<Critics, criticsId>;
  addcritics!: Sequelize.HasManyAddAssociationsMixin<Critics, criticsId>;
  removecritics!: Sequelize.HasManyRemoveAssociationsMixin<Critics, criticsId>;
  hascritics!: Sequelize.HasManyHasAssociationsMixin<Critics, criticsId>;
  countcritics!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany picker
  getpickers!: Sequelize.HasManyGetAssociationsMixin<Picker>;
  setpickers!: Sequelize.HasManySetAssociationsMixin<Picker, pickerId>;
  addpicker!: Sequelize.HasManyAddAssociationsMixin<Picker, pickerId>;
  removepicker!: Sequelize.HasManyRemoveAssociationsMixin<Picker, pickerId>;
  haspicker!: Sequelize.HasManyHasAssociationsMixin<Picker, pickerId>;
  countpickers!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany project
  getprojects!: Sequelize.HasManyGetAssociationsMixin<Project>;
  setprojects!: Sequelize.HasManySetAssociationsMixin<Project, projectId>;
  addproject!: Sequelize.HasManyAddAssociationsMixin<Project, projectId>;
  removeproject!: Sequelize.HasManyRemoveAssociationsMixin<Project, projectId>;
  hasproject!: Sequelize.HasManyHasAssociationsMixin<Project, projectId>;
  countprojects!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    User.init({
    userId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "用户表id"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户邮箱",
      unique: "email_index"
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户密码"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户名字"
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date("2000-12-12"),
      comment: "用户生日"
    },
    ctime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      comment: "用户注册时间"
    },
    poster:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"/upload/commonPoster.jpg",
      comment: "用户头像"
    },
    leve:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:6,
      comment: "用户级别"
    }
  }, {
    sequelize,
    tableName: 'user',
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
