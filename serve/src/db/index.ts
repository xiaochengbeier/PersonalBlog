import {
    initModels,
    Atmaping ,
    Blog ,
    Critics,
    Picker ,
    Register ,
    Tag,
    User,
    Project,
} from "./models/init-models"
import {sequelize} from "./sequelize/index"
initModels(sequelize);
// sequelize.sync({alter:true});
export{
    Atmaping ,
    Blog ,
    Critics,
    Picker ,
    Register ,
    Tag,
    User,
    Project,
};