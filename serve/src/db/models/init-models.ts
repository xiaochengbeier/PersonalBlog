import type { Sequelize, Model } from "sequelize";
import { Atmaping } from "./atmaping";
import type { AtmapingAttributes, atmapingCreationAttributes } from "./atmaping";
import { Blog } from "./blog";
import type { BlogAttributes, blogCreationAttributes } from "./blog";
import { Critics } from "./critics";
import type { CriticsAttributes, criticsCreationAttributes } from "./critics";
import { Picker } from "./picker";
import type { PickerAttributes, pickerCreationAttributes } from "./picker";
import { Register } from "./register";
import type { RegisterAttributes, registerCreationAttributes } from "./register";
import { Tag } from "./tag";
import type { TagAttributes, tagCreationAttributes } from "./tag";
import { User } from "./user";
import type { UserAttributes, userCreationAttributes } from "./user";
import {Project} from "./project";
import {ProjectAttributes,projectCreationAttributes} from "./project"
export {
  Atmaping ,
  Blog ,
  Critics,
  Picker ,
  Register ,
  Tag,
  User,
  Project
};

export type {
  AtmapingAttributes ,
  atmapingCreationAttributes,
  BlogAttributes ,
  blogCreationAttributes,
  CriticsAttributes ,
  criticsCreationAttributes,
  PickerAttributes ,
  pickerCreationAttributes,
  RegisterAttributes ,
  registerCreationAttributes,
  TagAttributes,
  tagCreationAttributes,
  UserAttributes ,
  userCreationAttributes,
  ProjectAttributes,
  projectCreationAttributes
};

export function initModels(sequelize: Sequelize) {
  Atmaping.initModel(sequelize);
  Blog.initModel(sequelize);
  Critics.initModel(sequelize);
  Picker.initModel(sequelize);
  Register.initModel(sequelize);
  Tag.initModel(sequelize);
  User.initModel(sequelize);
  Project.initModel(sequelize);

  Project.belongsTo(User,{foreignKey:"userId"});
  User.hasMany(Project,{foreignKey: "userId"});
  Atmaping.belongsTo(Blog, { foreignKey: "articleId"});
  Blog.hasMany(Atmaping, { foreignKey: "articleId"});
  Atmaping.belongsTo(Tag, { foreignKey: "tagId"});
  Tag.hasMany(Atmaping, { foreignKey: "tagId"});
  Blog.belongsTo(User, { foreignKey: "userId"});
  User.hasMany(Blog, { foreignKey: "userId"});
  Critics.belongsTo(Blog, { foreignKey: "articleId"});
  Blog.hasMany(Critics, { foreignKey: "articleId"});
  Critics.belongsTo(User, { foreignKey: "talker"});
  User.hasMany(Critics, { foreignKey: "talker"});
  Picker.belongsTo(User, { foreignKey: "picker"});
  User.hasMany(Picker, { foreignKey: "picker"});
  Picker.belongsTo(User, { foreignKey: "checked"});
  User.hasMany(Picker, { foreignKey: "checked"});

  return {
  Atmaping,
  Blog,
  Critics,
  Picker,
  Register,
  Tag,
  User,
  };
}
