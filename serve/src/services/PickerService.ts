import { Where } from "sequelize/types/lib/utils";
import { Picker, User } from "../db";
import { PickerAttributes } from "../db/models/picker";
import { RainbowService } from "./RainbowService";

export default class PickerService {
    /**
     * 关注某个人
     * @param pick 关注数据信息对象
     */
   static async pick(pick:PickerAttributes){
   const findResult = await Picker.findOne({where:{
        picker:pick.picker,
        checked:pick.checked
    }});
    if(findResult !== null){
        const findObj = findResult.toJSON();
        return findObj;
    }
    const createResult =  await Picker.create(pick);
    return createResult;
   }
   //    取消关注
   static async unpick(pick:PickerAttributes){
      const desResult  = await  Picker.destroy({where:{
            picker:pick.picker,
            checked:pick.checked
        }});
     return desResult?true:false;
   }
   /**
    * 查询谁关注了我的有多少人
    * @param checked 我的id
    */
   static async manyPickMe(checked:number){
    const countResult = await Picker.count({where:{
        checked
    }});
    return countResult;
   }
   /**
    * 查询我关注了谁
    * @param picker
    */
   static async iPicked(picker:number,condition:{page:number,size:number}){
    const {rows,count} = await  Picker.findAndCountAll({
          where:{
              picker
          },
          limit:+condition.size,
          offset:(+condition.page - 1)*(+condition.size),
          order:[['ctime',"DESC"]]
      });
    const checkedIdArr = [];
    if(rows.length > 0){
        rows.forEach(item=>{
            const pickObj:any  = item.toJSON();
            const checkedId = pickObj.checked;
            checkedIdArr.push(checkedId);
        })
    }
    console.log("-- checkedIdArr--", checkedIdArr,rows.length>0);
    const checkedUser = [];
     for(const item of checkedIdArr){
      const findResult =   await  User.findOne({
          attributes:["userId","name","leve","email","createdAt","poster"],
          where:{userId:+item},
        });
      if(findResult !== null){
          const findUserObj: any = findResult.toJSON();
          const rainbow =  await RainbowService.getOneRainbow();
          findUserObj.rainbow = rainbow;
          checkedUser.push(findUserObj);
      }
    }
    return{count,datas:checkedUser};
   }
   /**
    * 查询某人是否关注了某人
    * @param picker 观察者
    * @param checked 被观察者
    */
   static async isPicked(picker: number, checked: number){
    const findResult = await Picker.findOne({where:{
         picker,
         checked
     }});
     if(findResult != null){
         return true;
     }
     return false;
   }
}
