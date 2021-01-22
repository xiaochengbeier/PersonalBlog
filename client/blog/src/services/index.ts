import axios from "axios"
import {BlogService} from "./BlogService"
import {CriticService} from "./CriticService"
import {LoginService} from "./LoginService"
import {PickerService} from "./PickerService"
import {RegisterService} from "./RegisterService"
import {UploadFileService} from "./UploadFileService"
import {UserService} from "./UserService"

axios.interceptors.request.use((req)=>{
    // 判断localStorage中是否存储有 authorization 如果有附带到请求头
   const authorization =  localStorage.getItem("authorization");
   if(authorization){
       req.headers.authorization = authorization;
   }
    return req;
})

axios.interceptors.response.use((res)=>{
    // 如果说响应头中有 authorization 那么将他存到localStorage中
    if(res.headers.authorization){
        localStorage.setItem("authorization",res.headers.authorization);
    }else{
        // 没有说明 authorization 过期了 那么清除 localStorage中的authorization 
        localStorage.removeItem("authorization");
    }
    return res;
})
export {
    BlogService,
    CriticService,
    LoginService,
    PickerService,
    RegisterService,
    UploadFileService,
    UserService
}