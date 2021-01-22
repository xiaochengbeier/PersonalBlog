import { plainToClass } from "class-transformer";
import { ValidationError } from "class-validator";
import { Atmaping, Blog,Tag } from "../db";
import { BlogAttributes } from "../db/models/blog";
import BlogEntity from "../entities/BlogEntity";
import { SearchConditionEntity } from "../entities/SearchConditionEntity";
import sequelize,{Op} from "sequelize"

export  class BlogService{
  /**
   * 向数据库添加文章 如果返回的是一个数组表示数据校验失败格式不正确
   * @param bolog 博客文章对象
   */
  static async addBlog(bolog:BlogAttributes):Promise<ValidationError[]|object>{
    // 将bolog转换为 BlogEntity 类型
    const bologEntity =  plainToClass<BlogEntity,any>(BlogEntity,bolog);
    const valiDateResult =  await bologEntity.validateTthis();
    if(valiDateResult.length !== 0){
      return valiDateResult;
    }
    bolog.tag = JSON.stringify(bolog.tag);
    const createResult =   await Blog.create(bolog);
    if(createResult){
      const createObj:any =  createResult.toJSON()
       const tages = JSON.parse(bolog.tag);
       await BlogService.insertTagFromBlog( tages);
       await  BlogService.mappingTagAndBlog(createObj.blogId, tages)
       return createObj;
    }
  }
  /**
   * 根据博客id 和标签id在映射表中添加对象
   * @param bologId 博客id
   * @param bolog  添加的博客内容对象
   */
  private static async mappingTagAndBlog(bologId:number,tags:string[]){
    for(const tagname of tags){
      // 根据标签名 在标签表中 查询看是否有此标签 如果有就不需要插入标签表
      const findResult =  await Tag.findOne({where:{
         tagname
       }})
      // 如果没有那么将此标签插入标签表
       if(findResult !== null){
         // 获得tagId
         const findObj:any = findResult.toJSON();
         const tagId = findObj.tagId;
        //  根据 tagId 和 bologId 在映射表中查找
        const findeResultBy2Id = await Atmaping.findOne({where:{[Op.and]:[{articleId:bologId},{tagId}]}});
        if(findeResultBy2Id === null){
         await Atmaping.create({articleId:bologId,tagId});
        }
       }
    }
  }
  /**
   * 根据博客添中的标签向标签库中添加标签数据
   * @param bolog 博客文章对象
   */
  private static async  insertTagFromBlog(tags:string[]){
    for(const tagname of tags){
      // 根据标签名 在标签表中 查询看是否有此标签 如果有就不需要插入标签表
      const findResult =  await Tag.findOne({where:{
         tagname
       }})
      // 如果没有那么将此标签插入标签表
       if(findResult == null){
         await  Tag.create({tagname,number:1});
       }else{ // 表示已经存在该标签但是我们又添加了一篇这种标签的博客 需要把其数量加一
        await   Tag.update({number:sequelize.literal('`number` +1') as any},{where:{tagname}});
       }
    }
  }
  /**
   * 根据id删除博客文章
   * @param blogId 博客id
   */
  static async deleteBlogById(blogId:number){
     const num =  await Blog.destroy({where:{blogId}});
     if(num >0){
       return true;
     }
     return false;
  }
  /**
   * 根据博客id修改 博客内容
   * @param blogId  博客id
   * @param bolog 博客内容
   */
  static async updateBlogById(blogId:number,bolog:BlogAttributes){
     // 将bolog转换为 BlogEntity 类型
     const bologEntity =  plainToClass<BlogEntity,any>(BlogEntity,bolog);
     const valiDateResult =  await bologEntity.validateTthis(true);
     if(valiDateResult.length !== 0){
       return valiDateResult;
     }
     const [num,blo] = await Blog.update(bolog,{where:{blogId}});
     if(num > 0){
       return true;
     }
     return false;
  }
  /**
   * 根据查询条件查询排序顺序根据阅读量排序 如果相同根据 点赞量 降序排序
   * @param condition 查询条件
   */
  static async searchBlogByCondition(condition:SearchConditionEntity){
     condition = plainToClass(SearchConditionEntity,condition);
     const validateSearch =  await  condition.validateThis();
     if(validateSearch.length !== 0){
       return validateSearch;
     }
     const  {rows,count}  = await  Blog.findAndCountAll({
         where:{
          [Op.or]:condition.key&&[
             {tag:{  [Op.like]:`%${condition.key}%`}},
             {title:{ [Op.like]:`%${condition.key}%`}}
          ]
         },
         limit:condition.size,
         offset:(condition.page -1 )*(condition.size),
         order:[['reads', 'DESC'],['likes', 'DESC']],
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
  /**
   * 根据博客id查询数据
   * @returns 如果返回的 是false 表示该数据不存在
   * @param blogId 根据博客id查询数据
   */
  static async searchBlogByBlogId(blogId:number){
     const findResult =   await Blog.findByPk(blogId);
     if(findResult === null){
       return false;
     }
     return findResult.toJSON();
  }
  /**
   * 查询指定用户发表的文章
   * @param userId  用户id
   * @param condition  查询条件分页信息
   */
  static async searchBlogByUserId(userId:number,condition:SearchConditionEntity){
    condition = plainToClass(SearchConditionEntity,condition);
    const validateSearch =  await  condition.validateThis();
    if(validateSearch.length !== 0){
      return validateSearch;
    }
    const  {rows,count}  = await Blog.findAndCountAll({
      where:{
        userId,
        [Op.or]:[
          {tag:{  [Op.like]:`%${condition.key}%`}},
          {title:{ [Op.like]:`%${condition.key}%`}}
        ]
      },
      limit:condition.size,
      offset:(condition.page -1 )*condition.size,
      // 根据发布时间排序
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
     return obj;
  }
  /**
   * 增加阅读量
   * @param blogId 文章id
   */
   static async  addReads(blogId:number){
     const [num ,bl]=  await   Blog.update({
        reads:sequelize.literal('`reads` +1') as any,
      },{where:{
        blogId
      }});
      if(num > 0){
        return true;
      }
      return false;
   }
   /**
    * 增加点赞量
    * @param blogId 文章id
    */
   static async addLikes(blogId:number){
      const [num ,bl]=  await   Blog.update({
        likes:sequelize.literal('`likes` +1') as any,
      },{where:{
        blogId
      }});
      if(num > 0){
        return true;
      }
      return false;
   }
}
// BlogService.searchBlogByBlogId(3).then(d=>{
//  console.log(d);
// });
// BlogService.searchBlogByUserId(25,{key:"java",page:1,size:5}).then(data=>{
//   console.log(data);
// });