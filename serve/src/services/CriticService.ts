import { plainToClass } from "class-transformer";
import { ValidationError } from "class-validator";
import { Critics } from "../db";
import { CriticsAttributes } from "../db/models/critics";
import { CriticEntiy } from "../entities/CriticEntiy";
import { SearchConditionEntity } from "../entities/SearchConditionEntity";
import UserService  from "./UserService"

export  class CriticService {
    /**
     * 添加一条评论
     * @param critic 评论对象
     */
    static async addCritic(critic:CriticsAttributes):Promise<ValidationError[]|object>{
       const  criticObj =   plainToClass(CriticEntiy,critic);
       const validateResult = await criticObj.validateThis();
       if(validateResult.length === 0){
         const createResult = await  Critics.create(criticObj);
         return createResult.toJSON();
       }
       return validateResult;
    }
    /**
     * 根据文章id查询对应的评论
     * @param articleId 文章id
     * @param condition 查询条件
     */
    static async getCriticByBlogId(articleId:number,condition:SearchConditionEntity){
        condition = plainToClass(SearchConditionEntity,condition);
        const validateResult =   await condition.validateThis(true);
        if(validateResult.length > 0){
            return validateResult;
        }
        const { rows,count} = await   Critics.findAndCountAll({
            where:{
                articleId,
                parent: -1
            },
            limit:+condition.size,
            offset:(+condition.page - 1)*(+condition.size),
            order:[['ctime', 'DESC']]
        });
        const obj = {count:0,datas:[]};
        if(count <= 0 && rows.length === 0){
          return obj;
        }
        obj.count = count;
        rows.map(item=>{
          obj.datas.push(item.toJSON());
        })
      for(const item of obj.datas){
        const talker = item.talker;
        const talkerObj: any =  await UserService.getUserById(talker);
        item.author = talkerObj.name;
        item.avatar = talkerObj.poster;
        item.datetime = item.createdAt;
        item.children = [];
        console.log(obj,"--obj--");
        await  CriticService.getChildrentByPaid(item.criticId,item.talker,item.children);
      }
       return obj;
    }
    static async getChildrentByPaid(paid: number,ppid: number,childrenCollect: any[]){
      // 获得此评论回复的对象
      const paretn: any = await UserService.getUserById(ppid);
      // 根据父级id查询数据
      const children = await  Critics.findAll({
          where:{
            parent: paid
          }
      });
      // 将查询的数据转换为对象
      if(children != null && children.length !== 0){
        // 将查询的数据转换为对象
        for(const item of children){
          const criticObj: any = item.toJSON();
          criticObj.datetime =  criticObj.createdAt;
          // 将其回复的对象挂载到对象上
          criticObj.parentName = paretn.name;
          criticObj.parentAvatar = paretn.poster;
          // 查询talker 对象
          const talkerObj: any=  await UserService.getUserById(criticObj.talker);
          criticObj.author = talkerObj.name;
          criticObj.avatar = talkerObj.poster;
          childrenCollect.push(criticObj);
          // 根据该条评论的id 继续递归查询其评论回复
          await CriticService.getChildrentByPaid(criticObj.criticId,criticObj.talker,childrenCollect);
        }
      }
    }
    /**
     * 根据父级id查询评论 完成评论回复功能
     * @param parent 父级评论id
     * @param condition 查询条件
     */
    static async getCriticByParentId(parent:number,condition:SearchConditionEntity){
        condition = plainToClass(SearchConditionEntity,condition);
        const validateResult =   await condition.validateThis(true);
        if(validateResult.length > 0){
            return validateResult;
        }
        const { rows,count} = await   Critics.findAndCountAll({
            where:{
                parent
            },
            limit:+condition.size,
            offset:(+condition.page - 1)*(+condition.size),
            order:['ctime']
        });
        const obj = {count:0,datas:[]};
        if(count <= 0 && rows.length === 0){
          return obj;
        }
        obj.count = count;
        rows.map(item=>{
          obj.datas.push(item.toJSON());
        })
       return obj;
    }
}
