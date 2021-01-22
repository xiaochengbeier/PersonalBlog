import axios from "axios";
import {API} from './API';
import {ResponseDataType} from '../entry/ResDataEntry'
export  class ProjectService {
        /**
         * 查询项目
         * @param uid 
         * @param size 
         * @param page 
         */
        static async getProjectByUid(uid: number,size: number,page: number){
          const findRes = await  axios.get<ResponseDataType>(API.PROJECT_API+`?uid=${uid}&size=${size}&page=${page}`,);
          return findRes.data;
        }
        /**
         * 添加项目
         * @param proje 
         */
        static async addProject(proje: {uid: number; content: string; source: string}){
            // {uid,content}
             const addResult =   await axios.post<ResponseDataType>(API.PROJECT_API,proje);
             return addResult.data;
        }
}
