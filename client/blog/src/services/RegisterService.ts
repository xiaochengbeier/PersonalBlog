import { ResponseDataType } from "@/entry/ResDataEntry";
import axios from "axios";
import { API } from "./API";

export  class RegisterService  {
  /**
   * 用户注册
   * @param regi 注册用户信息
   */
  static async  register(regi: {email: string;pass: string}){
    const regiResult = await  axios.post<ResponseDataType>(API.REGIST_API,regi);
    return regiResult;
  }
}
