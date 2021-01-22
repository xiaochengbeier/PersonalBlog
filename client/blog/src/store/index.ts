import Vue from 'vue'
import Vuex from 'vuex'
import {loginStore,LoginState} from "./login"
import {registerStore,RegisterStore} from "./register"
import {searchStore} from "./search"
Vue.use(Vuex)
export type  StoreRootType = LoginState | RegisterStore;
export default new Vuex.Store<StoreRootType>({
  modules: {
    login: loginStore,
    register: registerStore,
    search: searchStore,
  }
})
