import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/css/global.css";
import 'highlight.js/styles/vs.css';
import "animate.css";
Vue.config.productionTip = false
Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
