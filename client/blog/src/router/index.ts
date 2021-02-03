import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store/index"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/aboutme',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutMe.vue'),
    children:[
      {path:"myarticle/:id",component: ()=> import("../components/MyArticle.vue")},
      {path:"mypick/:id",component:()=>import("../components/MyPick.vue")},
      {path:"myproject/:id",component: ()=> import("../components/MyProject.vue"), 
         props:(route)=>{
            return{
              isShowMe: false
            }
         }
      },
      {path:"editinfo/:id",component: ()=>import("../components/EditInfo.vue")}
    ]
  },
  { 
    path:"/showme",
    component: ()=> import("../views/ShowMe.vue"),
    children:[
      {path:"myarticle/:id",component: ()=> import("../components/MyArticle.vue")},
      {path:"mypick/:id",component:()=>import("../components/MyPick.vue")},
      {path:"myproject/:id",component: ()=> import("../components/MyProject.vue"),
          props:(route)=>{
            console.log("isShowMe true");
            return{
              isShowMe: true
            }
          }
      },
    ]
  },
  {
    path: '/blogshow',
    component: ()=> import("../views/BlogShow.vue")
  },
  {
    path: '/resetpass',
    component: ()=> import("../views/ResetPassPage.vue")
  },
  {
    path: '/reglog',
    component: ()=> import("../views/RegistLogin.vue")
  },
  {
    path: '/write',
    beforeEnter(to,from,next){
     const state: any =   store.state;
     if(state.login.user){
       next();
     }else{
      next("/reglog");
     }
    },
    component: ()=> import("../views/Write.vue")
  },
  {
    path: '/search',
    component: ()=> import("../views/SearchPage.vue")
  },
  {
    path:'/regfail',
    component: ()=>import("../views/RegistFail.vue")
  }

]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass:'title-active',
  base: process.env.BASE_URL,
  routes
})

export default router
