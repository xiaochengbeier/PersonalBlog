import { BlogEntry } from "@/entry/BlogEntry";
import { ResponseDataType } from "@/entry/ResDataEntry";
import { SearchConditionEntity } from "@/entry/SearchConditionEntry";
import axios, { AxiosResponse } from "axios";
import { API } from "./API";
export  class BlogService{
       /**1
        *通过网络请求向后台发送添加blog请求
        * @param blog 博客数据对象
        */
        static async addBlog(blog: BlogEntry){
            const addBlogResult = await axios.post<ResponseDataType>(API.BLOG_API,blog);
            console.log(addBlogResult,"---addBlogResult");
             return addBlogResult.data;
        }
        /**2
         * 根据博客 id删除数据
         * @param bid 博客id
         */
        static async deleteBlog(bid: number){
           const deleteBlog =  await axios.delete(API.BLOG_API+"/"+bid);
           return deleteBlog;
        }
        /**3
         * 
         * @param blog 更新博客对象
         */
        static async updateBlog(blog: BlogEntry){
            const updateResult =   await axios.post(API.BLOG_API,blog);
            return updateResult;
        }
        /**4
         * 根据博客id查询博客
         * @param bid 博客id
         */
        static async getByBlogId(bid: number){
          const getById =   await axios.get(API.BLOG_API+"/"+bid);
           return getById.data;
        }
        /**5
         * 根据条件查询博客
         * @param searCondi 查询条件
         */
        static async getByCondition(searCondi: SearchConditionEntity):   Promise<ResponseDataType>{
            const getByConditonResult  = await axios.get<ResponseDataType>(API.BLOG_API,{
                params:searCondi
            });
            return getByConditonResult.data;
        }
        /**6
         * 查询指定用户的文章内容
         * @param id 用户id
         * @param searCondi 查询条件 
         */
        static async getByUserIdAndCondition(id: number,searCondi: SearchConditionEntity){
            searCondi.userId = id;
            const byUserIdAanCondi = await axios.get<ResponseDataType>(API.BLOG_API+"/user",{
                params:searCondi
            });
            return byUserIdAanCondi.data;
        }
        /**7
         *  根据博客id 增加点赞量
         * @param bid 根据博客id 增加点赞量
         */
        static async addLikes(id: number){
            const addLikesRes = await axios.put<ResponseDataType>(API.BLOG_API+"/addl/"+id);
            return addLikesRes.data;
        }
        /**8
         * 根据博客 id 增加阅读量
         * @param bid 博客id
         */
        static async addReads(id: number){
            const addReadRes = await axios.put<ResponseDataType>(API.BLOG_API+"/addr/"+id);
            return addReadRes.data;
        }
}
