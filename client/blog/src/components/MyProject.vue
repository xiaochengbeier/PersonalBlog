<template>
  <div>
    <a-list-item v-if="!isShowMe"  class="a-list-item" slot="renderItem" >
        <div   class="upload-project">
           <span class="remainder">☆ 上传项目仅仅支持 .zip 格式</span>
           <hr>
           <span class="remainder">☆  单次上传大小不得超过 10M</span>
            <UploadFile :upprojectCallBack="upprojectCallBack"/>
        </div>
    </a-list-item>

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
           {{loadText}}  
        </a-button>
        </div>
        <a-list-item class="a-list-item " slot="renderItem" slot-scope="item">
         
        <iframe scrolling="auto"   class="project-iframe box-shadow" :src="item.ifram">
          <p>您的浏览器不支持  iframe 标签。</p>
        </iframe>
         <a  :href="item.content" target="_blank">详情</a>
         <a :href="item.source">源码</a>
        </a-list-item>
      </a-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue,Prop} from 'vue-property-decorator';
import UploadFile  from "./UploadFile.vue";
import {ProjectService} from "../services/ProjectService";
@Component({
    components:{
        UploadFile
    }
})
export default class MyProject extends Vue {
      @Prop() private isShowMe!: boolean;
      loading= true;
      loadText="加载更多"
      loadingMore= false;
      page =1;
      size = 5;
      showLoadingMore= true;
      data: any[]= [];
      created() {
        this.getData(res => {
          this.loading = false;
          this.data = res;
        })
      }
      upprojectCallBack({path,sourceFile}){
          const me = this.$store.state.login.user;
          ProjectService.addProject({uid: me.userId,content: path,source: sourceFile}).then(data=>{
            if(data.code === 200){
              const item: any = {content: path ,source: sourceFile,ifram: path.replace(/index.html/g,"")};
              this.data.unshift(item)
            }
          });
      }
    getRandom(){
        return Math.random();
    }
     getData(callback){
       const uid = this.$route.params.id;
       ProjectService.getProjectByUid(+uid,this.size,this.page).then((res: any)=>{
         if(res.code === 200){
           res.data.datas.forEach(item => {
             item.ifram =  item.content.replace(/index.html/g,"")
           });
           callback(res.data.datas);
         }
       })
    }
    onLoadMore() {
      this.loadingMore = true;
      this.page = this.page +1;
      this.getData(res => {
        if(res.length === 0){
          this.loadText = "没有更多啦";
          this.loadingMore = false;
          return ;
        }
        this.data = this.data.concat(res);
        this.loadingMore = false;
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    }
  }
</script>
<style>
.demo-loadmore-list {
  min-height: 250px;
  color: aliceblue;
  cursor: pointer;
}
.a-list-item{
     transition: all 500ms;
     margin-bottom: 20px;
      background-color: rgba(209, 201, 201, 0.3);
      padding-right: 20px;
      padding-left: 10px;
}
.a-list-item:hover{
    background-color: rgba(65, 57, 57,.5);
}
.upload-project{
    padding-left: 20px;
    width: 100%;
    text-align: left;
}
.remainder{
  padding: 0px 10px;
  color: rgb(88, 240, 0);
}
.project-iframe{
  overflow: auto;
  width: 70%;
}
</style>
