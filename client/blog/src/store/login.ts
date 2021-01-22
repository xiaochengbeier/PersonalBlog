import { LoginService } from "@/services";
import { Module} from "vuex";
/**
 * 登录有关 store 对象的 state信息
 */
export interface LoginState{
    user: object|null;
    isLoading: boolean;
}
const loginStore: Module<LoginState,any>={
    namespaced: true,
    state: {
        user:null,
        isLoading:false
    },
    mutations: {
        setUser(state,{user}){
            state.user = user;
        },
        setIsLoading(state,{isLoading}){
            console.log("setIsLoading----",isLoading);
            state.isLoading = isLoading;
        }
    },
    actions: {
       async loginAction({commit,dispatch},payload: {email: string;pass: string}){
        //  首先将 isLoading 设置为 true
        commit("setIsLoading",{isLoading: true});
        const resp = await LoginService.login(payload);
        await dispatch("whoAmIAction");
        //  请求完毕之后将isLoading设置为 false
        commit("setIsLoading",{isLoading: false});
        // 返回登录结果
        return resp.data;
       },
      // 根据 authorization 获得 用户信息
       async whoAmIAction({commit}){
          const whoAmI =   await LoginService.whoAmI();
          commit("setUser",{user:whoAmI.data.data});
       },
      // 退出登录
      logoutAction({commit}){
        // 将localStorage 中的有关authorization 清除并且清除 state中的用户数据
        localStorage.removeItem("authorization");
        commit("setUser",{user:null});
      }
    }

}
export {loginStore};