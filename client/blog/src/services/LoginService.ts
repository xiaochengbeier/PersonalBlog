import { ResponseDataType } from "@/entry/ResDataEntry";
import axios from "axios";
import { API } from "./API";
export class LoginService {
    /**
     * 登录操作
     * @param login 登录信息
     */
   static async login(login: {email: string;pass: string}){
    const loginResult = await   axios.post<ResponseDataType>(API.LOGIN_API,login);
    return loginResult;
   }
   /**
    * 获得用户登录的信息
    */
   static async whoAmI(){
    const whoAmIResult = await   axios.get<ResponseDataType>(API.LOGIN_API+"/whoAmI");
    return whoAmIResult;
   }
}
