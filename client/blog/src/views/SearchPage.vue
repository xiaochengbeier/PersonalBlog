<template>
  <div class="search-page md-with">
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
            <a slot="title" class="name-title">{{ item.title}}</a>
        </a-list-item-meta>
        </a-list-item>
      </a-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {BlogService} from '../services/BlogService';
import {SearchConditionEntity} from "../entry/SearchConditionEntry";
import {getTextFromNodeText} from "../utils/index"
Component.registerHooks([
  'beforeRouteUpdate'
])
@Component
export default class MyArticle extends Vue {
      loading= true;
      loadingMore= false;
      loadMoreTxt = "加载更多";
      showLoadingMore= true;
      lock = true;
      data= [];
      key = "";
      page = 1;
      size = 5;
      created() {
        this.key = this.$route.query.cw as string;
        this.getData(res => {
          this.loading = false;
          this.data = res;
        })
      }
      beforeRouteUpdate(to, from, next) {
            this.page = 1;
            this.key = to.query.cw;
            this.getData(res => {
              this.loading = false;
              this.data = res;
            })
            next()
      }
    getRandom(){
        return Math.random();
    }
    async getData(callback){
       const search: SearchConditionEntity = {
         key: this.key,
         page: this.page,
         size: this.size
       };
      const findResult: any =   await  BlogService.getByCondition(search);
       this.$store.commit("search/setSpeed",false);
      if(findResult.code === 200){
        findResult.data.datas.forEach(item=>{
                item.content = getTextFromNodeText(item.content);
        })
        callback(findResult.data.datas);
      }
    }
     goArticleDetail(item){
      const uid = item.userId;
      const bid = item.blogId;
      BlogService.addReads(bid);
      this.$router.push(`/blogshow?uid=${uid}&bid=${bid}`);
    }
    onLoadMore() {
         // 如果lock 等于false 那么 表示锁定状态
      if(!this.lock){
        return;
      }
       this.$store.commit("search/setSpeed",true);
      // 上锁
      this.lock = false;
      this.loadingMore = true;
      this.page = this.page +1;
      this.getData(res => {
        if(res.length === 0){
          this.loadMoreTxt = "没有更多了";
          this.$store.commit("search/setSpeed",false);
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
<style scoped>
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
.search-page{
    margin-top: 30px;
    padding:0px 10px;
}
.a-list-item{
     transition: all 500ms;
     margin-bottom: 20px;
      background-color: rgba(209, 201, 201, 0.3);
}
.a-list-item:hover{
    background-color: rgba(65, 57, 57,.5);
}
</style>
