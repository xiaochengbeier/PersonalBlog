"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("blog", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    logging: console.log
});
exports.sequelize = sequelize;
