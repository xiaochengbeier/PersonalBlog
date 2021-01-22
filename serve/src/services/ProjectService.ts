import { Certificate } from "crypto";
import {Project} from "../db";
import {SearchConditionEntity} from "../entities/SearchConditionEntity"
export  class ProjectService{
    static async findProjectByUid(userId: number,search: SearchConditionEntity){
        const {rows,count}  =  await   Project.findAndCountAll({
            where:{
                userId
            },
            offset: (search.page - 1) * search.size,
            limit: search.size
        });
        const result = {count,datas:[]};
        if(count>0){
            rows.forEach(item=>{
                result.datas.push(item.toJSON());
            });
        }
        return result;
    }
    /**
     * 添加项目
     * @param userId 用户id
     * @param content  项目访问路径
     */
   static async addProject(userId: number,content: string,source){
      const createProj = await  Project.create({userId,content,source});
      if(createProj){
          return createProj.toJSON();
      }
      return false;
   }
}
