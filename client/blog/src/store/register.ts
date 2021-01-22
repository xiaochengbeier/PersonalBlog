import {Module} from "vuex";
import {RegisterService} from "../services/RegisterService"
export interface RegisterStore{
    isRegisting: boolean;
    isTrue: boolean;
}
export const registerStore: Module<RegisterStore,any> = {
    namespaced:true,
    // 和注册相关数据
    state: {
        isRegisting:false,
        isTrue: false,
    },
    // 和注册相关 mutations
    mutations:{
        // 设置是否正在注册中
        setIsRegisting(state: RegisterStore,isRegisting: boolean){
            console.log(state.isRegisting,"----isLOADINGSRE");
            state.isRegisting = isRegisting;
        },
        // 设置是否发送邮件验证
        setIsTrue(state: RegisterStore,isTrue: boolean){
            state.isTrue = isTrue;
        }
    },
    actions: {
      async  registerAction({commit},regObj: {email: string;pass: string}){
          commit("setIsRegisting",true);
          // 向后台传输数据 注册用户 
          const regiResult = await  RegisterService.register(regObj);
          if(regiResult.data.code === 200){
              commit("setIsTrue",true);
          } 
          commit("setIsRegisting",false);
          return regiResult.data;
        }
    }
}