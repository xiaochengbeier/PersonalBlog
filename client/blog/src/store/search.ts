import {Module} from "vuex";
import Mutation from "wangeditor/dist/utils/observer/mutation";
export interface SearchStore{
    speed: boolean;
}
export const searchStore: Module<SearchStore,any> = {
    namespaced: true,
    state:{
        speed: false
    },
    mutations:{
        setSpeed(state,payload){
            state.speed = payload;
        }
    }
};