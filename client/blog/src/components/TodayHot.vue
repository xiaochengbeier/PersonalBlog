<template>
    <div class="today-hot box-shadow">
        <h3 class="text-shadow">今日热门</h3>
        <div v-for="(item) in blogsHot" @click="goBlogInfo(item.userId,item.blogId)" :key="item.blogId" class="hot-arit">
           <div class="content">
                <h4 class="title text-shadow">{{item.title}}</h4>
                <p class="introduce">
                   {{item.content}}
                </p>
                <div class="info">
                    <div class="reads">
                        <span>阅读量:</span>
                        <span>{{item.reads}}</span>
                    </div>
                    <div class="likes">
                   <span>点赞量:</span>
                    <span>{{item.likes}}</span>
               </div>
           </div>
           </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {BlogService} from "../services/BlogService";
    import { SearchConditionEntity } from "../entry/SearchConditionEntry";
    @Component
    export default class PicDispaly extends Vue {
        blogsHot = [];
        // 当组件加载立即查询排名前无名的文章
        async created(){
            const hotSearch: SearchConditionEntity ={
                key:"_",
                page:1,
                size:5
            }
          const hotData =   await  BlogService.getByCondition(hotSearch);
          if(hotData.code === 200){
              const data = hotData.data as any;
              if(data&& data.datas){
                 const showHotBlogData =   data.datas.map(item=>{
                      return{
                          blogId: item.blogId,
                          content: item.content,
                          likes: item.likes,
                          reads: item.reads,
                          userId: item.userId,
                          title: item.title
                      }
                  });
                  this.blogsHot =  showHotBlogData;
              }
            
          }
        }
        // 点击链接到详情页
        goBlogInfo(userId,blogId){
            this.$router.push("/blogshow?uid="+userId+"&bid="+blogId);
        }
    }
</script>
<style scoped>
/* For demo */
.content{
      height: 100px;
      font-weight: bolder;
      margin: 15px 0px;
      border: 1px solid rgb(243, 240, 240);
      border-radius: 5px;
      box-shadow: 2px 2px 5px rgb(243, 240, 240), 3px 3px 5px rgb(141, 140, 140), 4px 4px 5px rgb(75, 72, 72);
      cursor: pointer;
      color: rgb(214, 209, 209);
}
.title{
  text-align: left;
  text-indent: 2rem;
  padding: 3px;
  border-bottom: 1px dashed rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}
.introduce{
  height: 42px;
  font-size: 14px;
  line-height: 14px;
  overflow: hidden;
  margin: 0px;
  padding: 0px 10px;
}
.info{
    display: flex;
    justify-content: space-around;
    background-color: rgba(88, 91, 93,.5);
}
.today-hot{
    position: relative;
    border-radius: 5px;
     height: 400px;
     overflow: auto;
     padding: 20px;
     padding-top: 30px;
}
.today-hot h3{
    text-align: left;
    color: rgb(236, 36, 36);
    font-weight: bolder;
    position: absolute;
    font-size: 18px;
    top: 10px;
}
.hot-arit{
    margin-bottom: 10px;
}
</style>