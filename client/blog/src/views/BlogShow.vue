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
             <h3>{{blogInfo.title}}</h3>
          </div>
          <div class="content">
             <div  class="w-e-text-container" v-html="blogInfo.content" id="test">
             </div>
          </div>
          <div class="likes">
             <a-button :loading="loading" @click="addLikes" type="primary" icon="smile">
               {{"喜欢 "+likes}}
            </a-button>
          </div>
       </div>
       <div class="article-common">
          <Common :bid="blogId"/>
       </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthorInfo from "../components/AuthorInfo.vue";
import Common from "../components/Common.vue";
import {BlogService} from "../services/BlogService";
import {UserService} from "../services/UserService";
import {PickerService} from "../services/PickerService";
import {AuthorInfoType} from "../entry/AuthorInfoEntry";
@Component({
   components:{
      AuthorInfo,
      Common
   }
})
export default class BlogShow extends Vue {
   blogId!: number;
   likes = 0;
   blogInfo = {};
   loading= false;
   authorInfo: AuthorInfoType = {
      name: "", poster: "", isPick: false, picks: 20
   };
   async addLikes(){
    this.loading = true;
    const addRes = await  BlogService.addLikes(this.blogId);
    this.likes++;
    this.loading = false;
   }
   changPickCallBack(isPick,picks){
      this.authorInfo.isPick = isPick;
      this.authorInfo.picks = this.authorInfo.picks+picks;
   }
   async created(){
      const uid = this.$route.query.uid;
      const bid = this.$route.query.bid;
      this.blogId = +bid;
      this.authorInfo.uid = +uid;
      //根据uid 查寻该用户信息
      const findUserByPk: any =  await UserService.findUserByPk(+uid);
      if(findUserByPk.code === 200){
         this.authorInfo.name = findUserByPk.data.name;
         this.authorInfo.poster = findUserByPk.data.poster;
      }
      // 根据bid 查询博客文章信息
      const findBlogById = await BlogService.getByBlogId(+bid);
      if(findBlogById.code === 200){
         this.blogInfo = findBlogById.data;
         this.likes =  findBlogById.data.likes;
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
      console.log(this.$route.query,"----query",this.blogInfo,"-picks--", pickHis);
   }
}
</script>
<style  scoped>
   .likes{
      padding-bottom: 30px;
   }
   .menu-wrap{
      max-width: 270px;
      margin:40px  auto;
   }
   .article-content .title h3{
      color: rgb(255, 255, 255);
      font-weight: bolder;
      background-color: rgba(20, 20, 20,.7);
   }
   .content{
      text-align: left;
      padding: 20px;
   }
   .content p{
       padding-left: 10px;
   }
   .w-e-text-container{
      background-color: rgba(0, 0, 0, 0);
   }
   .content .w-e-text-container code{
      background-color: black !important;
      padding: 10px;
   }
   .article-content,.article-common{
      background-color: rgba(189, 177, 177, 0.2);
      color: aliceblue;
      margin-top: 20px;
   }
   /* table 样式 */
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
table td,
table th {
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 3px 5px;
}
table th {
  border-bottom: 2px solid #ccc;
  text-align: center;
}

/* blockquote 样式 */
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}

/* code 样式 */
code {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  background-color: #f1f1f1;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 0 3px;
}
pre code {
  display: block;
}

/* ul ol 样式 */
ul, ol {
  margin: 10px 0 10px 20px;
}
</style>