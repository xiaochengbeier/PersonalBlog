import { CriticEntry } from "@/entry/CriticEntry";
import { SearchConditionEntity } from "@/entry/SearchConditionEntry";
import axios from "axios";
import {ResponseDataType} from "../entry/ResDataEntry"
import { API } from "./API";

export class CriticService  {
    /**
     * 添加一条评论
     * @param critic 评论对象
     */
   static async addCritic(critic: CriticEntry){
      const addCritic =   await axios.post<ResponseDataType>(API.CRITIC_API,critic);
      return addCritic.data;
    }
    /**
     * 根据文章id获得评论
     * @param bid 
     */
    static async getCriticByBid(articleId: number,condi: SearchConditionEntity){
        const obj = {bid:articleId,...condi};
        const getByBlogIdResult = await axios.get<ResponseDataType>(API.CRITIC_API+"/bybid",{
            params:obj
        });
        return getByBlogIdResult.data;
    }
    /**
     * 根据 父级id 查询评论
     * @param parent 评论父级id
     * @param condi  分页查询配置选项
     */
    static async getCriticByPid(parent: number,condi: SearchConditionEntity){
        const params = {parent,...condi}
        const getCriticByPidRes = await axios.get(API.CRITIC_API+"/bypid",{
            params
        });
        return  getCriticByPidRes;
    }

}
