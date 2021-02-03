import {Sequelize}  from  "sequelize";
import {Config} from "../../etc/etc"
const sequelize = new  Sequelize(Config.mysql.database,Config.mysql.user,Config.mysql.pass,{
    host:Config.mysql.host,
    port: Config.mysql.port,
    dialect:"mysql",
    logging:console.log
});
export {sequelize};