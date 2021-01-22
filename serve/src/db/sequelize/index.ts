import {Sequelize}  from  "sequelize";
const sequelize = new  Sequelize("blog","root","root",{
    host:"localhost",
    dialect:"mysql",
    logging:console.log
});
export {sequelize};