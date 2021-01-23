<template>
  <div>
      <a-list
            class="demo-loadmore-list"
            :rowKey="getRandom()"
            :loading="loading"
            item-layout="horizontal"
            :data-source="data"
        >
        <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="onLoadMore">
            {{loadMoreTxt}}
        </a-button>
        </div>
        <a-list-item  @click="goArticleDetail(item)" class="a-list-item" slot="renderItem" slot-scope="item">
        <a slot="actions">阅读: {{item.reads}}</a>
        <a slot="actions">喜欢: {{item.likes}}</a>
        <a-list-item-meta
            :description="item.content"
        >
            <a slot="title" class="name-title">{{ item.title }}</a>
        </a-list-item-meta>
        </a-list-item>
      </a-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {BlogService} from "../services/BlogService"
import {getTextFromNodeText} from "../utils/index"
@Component
export default class MyArticle extends Vue {
      loading= true;
      loadMoreTxt = "加载更多";
      loadingMore= false;
      showLoadingMore= true;
      lock = true;
      size = 5;
      page = 1;
      data= [];
      created() {
        this.getData((res: any[]) => {
          console.log(res,"--myAritcle0---");
        this.loading = false;
        this.data = res as never;
      })
      }
    goArticleDetail(item){
      const uid = item.userId;
      const bid = item.blogId;
      // 阅读量加一
      BlogService.addReads(bid);
      this.$router.push(`/blogshow?uid=${uid}&bid=${bid}`);
    }
    getRandom(){
        return Math.random();
    }
     getData(callback){
       const id = this.$route.params.id;
       BlogService.getByUserIdAndCondition(+id,{size: this.size,key:"_",page: this.page}).then((res: any)=>{
           if(res.code === 200){
            res.data.datas.forEach(item=>{
                item.content = getTextFromNodeText(item.content);
            })
            callback(res.data.datas);
          }
       });
    }
    onLoadMore() {
       // 如果lock 等于false 那么 表示锁定状态
      if(!this.lock){
        return;
      }
      // 上锁
      this.lock = false;
      this.loadingMore = true;
      this.page = this.page +1;
      this.getData(res => {
        if(res.length === 0){
          this.loadMoreTxt = "没有更多了";
        }
        this.data = this.data.concat(res);
        this.loadingMore = false;
        // 解锁
        this.lock = true;
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    }
  }
</script>
<style scoped >
.name-title{
  font-weight: bolder;
  color: rgb(255, 255, 255) !important;
  font-size: 18px;
}
.ant-list-item-meta-description{
  color: rgb(163, 162, 159)!important;
  padding-right: 10px;
  padding-bottom: 15px;
}
.demo-loadmore-list {
  min-height: 250px;
  color: aliceblue;
  cursor: pointer;
}
.a-list-item{
     transition: all 500ms;
     margin-bottom: 20px;
     background-color: rgba(209, 201, 201, 0.3);
}
.a-list-item:hover{
    background-color: rgba(65, 57, 57,.5);
}
.a-list-item.ant-list-item{
  position: relative;
}

</style>
