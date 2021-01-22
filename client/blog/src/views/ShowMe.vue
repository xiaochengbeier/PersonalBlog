<template>
   <div class="aboutMe md-with">
    <a-row type="flex">
      <a-col :md="7" class="d-sx-none d-md-block">
         <div class="menu-wrap">
             <AuthorInfo :changPickCallBack="changPickCallBack" :uid="authorInfo.uid" :isPick="authorInfo.isPick" :picks="authorInfo.picks" :poster="authorInfo.poster" :name="authorInfo.name"/>
         </div>
      </a-col>
      <a-col :md="17" :sm="24" :xs="24">
       <div class="edit-wrap">
         <div class="article-top  d-sm-block d-md-none">
             <AuthorInfo :changPickCallBack="changPickCallBack" :uid="authorInfo.uid" :isPick="authorInfo.isPick" :picks="authorInfo.picks" :poster="authorInfo.poster" :name="authorInfo.name"/>   
         </div> 
       </div>
       <div class="article-content">
          <div class="title">
              <router-link :to="'/showme/myproject/'+authorInfo.uid" tag="div"><span class="showme-item-title">他的项目</span> </router-link>
              <router-link :to="'/showme/mypick/'+authorInfo.uid" tag="div"><span class="showme-item-title">他的关注</span> </router-link>
              <router-link :to="'/showme/myarticle/'+authorInfo.uid" tag="div"><span class="showme-item-title">他的文章</span> </router-link>
          </div>
          <div class="content">
              <router-view></router-view>
          </div>
       </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue,Watch,Prop } from 'vue-property-decorator';
import { formatCodeHtml } from 'wangeditor/dist/menus/code';
import AuthorInfo from "../components/AuthorInfo.vue";
import{AuthorInfoType} from "../entry/AuthorInfoEntry";
import {UserService} from "../services/UserService";
import {PickerService} from '../services/PickerService';
import {BlogService} from '../services/BlogService';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
@Component({
   components:{
      AuthorInfo
   }
})
export default class ShowMe extends Vue {
   authorInfo: AuthorInfoType = {
      name: "", poster: "", isPick: false, picks: 20
   };
   changPickCallBack(isPick,picks){
      this.authorInfo.isPick = isPick;
      this.authorInfo.picks = this.authorInfo.picks+picks;
   }
 async beforeRouteUpdate(to,from,next){
     let  uid = to.params.id;
     if(to.query.uid){
        uid = to.query.uid;
     }
     await  this.getUserInfo(uid);
     next();
  }
  async created(){
      const uid  = +this.$route.query.uid;
       console.log(this.$route);
      await  this.getUserInfo(uid);
      this.$router.push("/showme/myarticle/"+uid);
   }
   async getUserInfo(uid){
      this.authorInfo.uid = uid;
      //根据uid 查寻该用户信息
      const findUserByPk: any =  await UserService.findUserByPk(+uid);
      if(findUserByPk.code === 200){
         this.authorInfo.name = findUserByPk.data.name;
         this.authorInfo.poster = findUserByPk.data.poster;
      }
      //查询有多少人关注了它
      const pickHis: any = await PickerService.howManyPickMe(+uid);
      if(pickHis.code === 200&& pickHis.data.num > 10){
         this.authorInfo.picks =  pickHis.data.num;
      }
      //判断我是否关注了该用户
      // 从登陆信息中拿到我的id
      if(this.$store.state.login.user){
         const myid = this.$store.state.login.user.userId;
         const isPick: any = await PickerService.isPicked(+myid,+uid);
         if(isPick.code === 200){
            this.authorInfo.isPick = isPick.data == true?true:false;
         }
      }
   }
}
</script>
<style  scoped>
   .menu-wrap{
      margin-top: 20px;
   }
   .article-content  .title .router-link-active{
       background-color: rgba(255, 255, 255, 0.5);
       font-weight: bolder;
   }
   .article-content .title h3{
      color: rgb(255, 255, 255);
      font-weight: bolder;
      background-color: rgba(20, 20, 20,.7);
   }
   .article-content  .title {
       display: flex;
       justify-content: space-around;
       align-items: center;
       height: 40px;
       line-height: 40px;
       height: 50px;
       margin-bottom: 30px;
       border-bottom: 1px solid rgb(250, 250, 250);
   }
   .article-content  .title div{
       cursor: pointer;
       flex: 1 1 auto;
   }
   .article-content,.article-common{
      background-color: rgba(189, 177, 177, 0.2);
      color: aliceblue;
      margin-top: 20px;
   }
</style>