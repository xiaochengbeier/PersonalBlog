"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.Project = exports.User = exports.Tag = exports.Register = exports.Picker = exports.Critics = exports.Blog = exports.Atmaping = void 0;
const atmaping_1 = require("./atmaping");
Object.defineProperty(exports, "Atmaping", { enumerable: true, get: function () { return atmaping_1.Atmaping; } });
const blog_1 = require("./blog");
Object.defineProperty(exports, "Blog", { enumerable: true, get: function () { return blog_1.Blog; } });
const critics_1 = require("./critics");
Object.defineProperty(exports, "Critics", { enumerable: true, get: function () { return critics_1.Critics; } });
const picker_1 = require("./picker");
Object.defineProperty(exports, "Picker", { enumerable: true, get: function () { return picker_1.Picker; } });
const register_1 = require("./register");
Object.defineProperty(exports, "Register", { enumerable: true, get: function () { return register_1.Register; } });
const tag_1 = require("./tag");
Object.defineProperty(exports, "Tag", { enumerable: true, get: function () { return tag_1.Tag; } });
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const project_1 = require("./project");
Object.defineProperty(exports, "Project", { enumerable: true, get: function () { return project_1.Project; } });
function initModels(sequelize) {
    atmaping_1.Atmaping.initModel(sequelize);
    blog_1.Blog.initModel(sequelize);
    critics_1.Critics.initModel(sequelize);
    picker_1.Picker.initModel(sequelize);
    register_1.Register.initModel(sequelize);
    tag_1.Tag.initModel(sequelize);
    user_1.User.initModel(sequelize);
    project_1.Project.initModel(sequelize);
    project_1.Project.belongsTo(user_1.User, { foreignKey: "userId" });
    user_1.User.hasMany(project_1.Project, { foreignKey: "userId" });
    atmaping_1.Atmaping.belongsTo(blog_1.Blog, { foreignKey: "articleId" });
    blog_1.Blog.hasMany(atmaping_1.Atmaping, { foreignKey: "articleId" });
    atmaping_1.Atmaping.belongsTo(tag_1.Tag, { foreignKey: "tagId" });
    tag_1.Tag.hasMany(atmaping_1.Atmaping, { foreignKey: "tagId" });
    blog_1.Blog.belongsTo(user_1.User, { foreignKey: "userId" });
    user_1.User.hasMany(blog_1.Blog, { foreignKey: "userId" });
    critics_1.Critics.belongsTo(blog_1.Blog, { foreignKey: "articleId" });
    blog_1.Blog.hasMany(critics_1.Critics, { foreignKey: "articleId" });
    critics_1.Critics.belongsTo(user_1.User, { foreignKey: "talker" });
    user_1.User.hasMany(critics_1.Critics, { foreignKey: "talker" });
    picker_1.Picker.belongsTo(user_1.User, { foreignKey: "picker" });
    user_1.User.hasMany(picker_1.Picker, { foreignKey: "picker" });
    picker_1.Picker.belongsTo(user_1.User, { foreignKey: "checked" });
    user_1.User.hasMany(picker_1.Picker, { foreignKey: "checked" });
    return {
        Atmaping: atmaping_1.Atmaping,
        Blog: blog_1.Blog,
        Critics: critics_1.Critics,
        Picker: picker_1.Picker,
        Register: register_1.Register,
        Tag: tag_1.Tag,
        User: user_1.User,
    };
}
exports.initModels = initModels;
