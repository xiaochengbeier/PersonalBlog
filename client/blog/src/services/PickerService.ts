import { PickerEntry } from "@/entry/PickerEntry";
import { SearchConditionEntity } from "@/entry/SearchConditionEntry";
import axios from "axios";
import { API } from "./API";
import {ResponseDataType} from "../entry/ResDataEntry"
export  class PickerService  {
    /**
     * 关注某人
     * @param pick 关注数据对象
     */
    static async pickSomebody(pick: PickerEntry){
      const pickResult =   await axios.post<ResponseDataType>(API.PICKER_API,pick);
      return pickResult.data;
    }
    /**
     * 取消关注某人
     * @param pick 关注对象
     */
    static async unpickSomebody(pick: PickerEntry){
      const unpick = await axios.delete<ResponseDataType>(API.PICKER_API,{
          params:pick
      });
      return unpick.data;
    }
    /**
     * 根据用户id 查询其关注的人
     * @param id 用户id
     * @param condi  分页条件
     */
    static async iPicked(id: number,condi: SearchConditionEntity){
        const params = {id,...condi};
        const iPicked =  await axios.get<ResponseDataType>(API.PICKER_API+"/ipick",{
            params
        });
        return iPicked.data;
    }
    /**
     * 查询该用户被多少人关注
     * @param id 用户id
     */
    static async howManyPickMe(id: number){
       const howManyPickMeRes = await axios.get<ResponseDataType>(API.PICKER_API+"/"+id);
       return howManyPickMeRes.data;
    }
    // /ispick  picker, checked
    static async isPicked(picker: number, checked: number){
     const isPicked =   await axios.get<ResponseDataType>(API.PICKER_API+"/ispick?picker="+picker+"&checked="+checked);
     return isPicked.data;
    }
}
