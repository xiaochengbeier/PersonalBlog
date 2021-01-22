import { ResetPassEntry } from "@/entry/ResetPassEntry";
import axios from "axios";
import { API } from "./API";
import {ResponseDataType} from "../entry/ResDataEntry"
export  class UserService  {
    /**
     * 根据邮箱向该用户邮箱发送重置密码验证码
     * @param email 邮箱
     */
    static async sendCode(email: string){
       const sendRestul =await   axios.get<ResponseDataType>(API.USER_API+"/scode",{
            params:{email}
        });
        return sendRestul.data;
    }
    /**
     * 重置密码
     * @param rpass 重置密码数据对象
     */
    static async resetPass(rpass: ResetPassEntry){
        const rpassResult = await axios.put<ResponseDataType>(API.USER_API+"/repass",null,{
            params:rpass
        });
        return rpassResult.data;
    }
    /**
     * 根据新老密码修改密码
     * @param uppass 修改密码对象
     */
    
    static async updatePass(uppass:  {email: string;oldPass: string;newPass: string}){
       const updatePassRes =  await axios.put<ResponseDataType>(API.USER_API+"/uppass",uppass);
        return  updatePassRes.data;
    }
    /**
     * 根据用户账号更新其生日
     * @param upbirth 更新生日接口
     */
    static async updateBirth(upbirth: {email: string;birth: string}){
      const upbirthResult = await  axios.put(API.USER_API+"/upbith",upbirth);
      return upbirthResult;
    }
    /**
     * 根据用户账号修改用户名
     * @param upname 修改用户名数据对象
     */                              
    static async updateName(upname: {email: string;name: string}){
      const upnameResult  = await axios.put<ResponseDataType>(API.USER_API+"/upname",upname);
      return upnameResult.data;
    }
    //  /user/getbypk 
    static async findUserByPk(userId: number){
      const findUserByPkResult =   await axios.get<ResponseDataType>(API.USER_API+"/getbypk?userId="+userId);
      return findUserByPkResult.data;
    }
    // /upposter  更新头像 {poster,uid}
    static async upposter(poster: string,uid: number){
     const upposterResult =  await axios.put<ResponseDataType>(API.USER_API+"/upposter",{poster,uid});
     return upposterResult.data;
    }
}
