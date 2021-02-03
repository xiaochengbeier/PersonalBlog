"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const etc_1 = require("../../etc/etc");
const sequelize = new sequelize_1.Sequelize(etc_1.Config.mysql.database, etc_1.Config.mysql.user, etc_1.Config.mysql.pass, {
    host: etc_1.Config.mysql.host,
    port: etc_1.Config.mysql.port,
    dialect: "mysql",
    logging: console.log
});
exports.sequelize = sequelize;
