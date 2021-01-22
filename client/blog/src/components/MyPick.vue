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
        <a-list-item @click="goUserDeatail(item.userId)" class="a-list-item" slot="renderItem" slot-scope="item">
        <a-list-item-meta
            :description="item.rainbow"
        >
            <a slot="title" class="name-title" >{{ item.name }}</a>
            <a-avatar
            slot="avatar"
            :src="item.poster"
            />
        </a-list-item-meta>
        </a-list-item>
      </a-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import {PickerService} from "../services/PickerService"
@Component
export default class MyPick extends Vue {
      loading= true;
      loadingMore= false;
      loadMoreTxt = "加载更多";
      showLoadingMore= true;
      size = 5;
      lock = true;
      page =1;
      data= [];
    goUserDeatail(userId){
      this.$router.push("/showme?uid="+userId)
    }
    created() {
        this.getData(res => {
        this.loading = false;
        this.data = res;
      })
    }
    getRandom(){
        return Math.random();
    }
     getData(callback){
       const id = this.$route.params.id;
       PickerService.iPicked(+id,{size:this.size,page: this.page}).then((res: any)=>{
          if(res.code === 200){
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
}
.a-list-item:hover{
    background-color: rgba(65, 57, 57,.5);
}
.ant-avatar.ant-avatar-circle.ant-avatar-image{
  height: 50px;
  width: 50px;
}
.name-title{
  font-weight: bolder;
  color: rgb(255, 255, 255) !important;
  font-size: 18px;
}
.ant-list-item-meta-description{
  color: rgb(163, 162, 159)!important;
  padding-right: 10px;
}
</style>
