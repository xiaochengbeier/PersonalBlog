<template>
 <div class="comment-items">
  <a-comment v-for="(item) in  comments" :key="item.author + getRandom()">
          <span slot="actions" key="comment-nested-reply-to">
            <div class="replay" @click="replay(item)">
              回复
            </div>
          </span>
          <a class="author-wrap" slot="author">{{item.author}}</a>
          <div class="replay-wrap"  v-if="item.parent != -1"  slot="author">
              <span>回复</span>
              <a class="author-wrap" slot="author">{{item.parentName}}</a>
          </div>
           <a-tooltip slot="datetime" >
            <span>{{formatDate(item.datetime)}}</span>
          </a-tooltip>
          <a-avatar
            slot="avatar"
            :src="item.avatar"
            alt="小城贝尔"
          />
          <p slot="content">
           {{item.content}}
          </p> 
          <div v-if="item.children">
            <CoomonItem :replayCallBack="replayCallBack" :comments="item.children"/>
          </div>
  </a-comment>
     <a-modal
      :title="'回复 '+ replayObj.author"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>
        <a-input @change="replayInputChange" :value="replayContent" placeholder="回复内容" />
      </p>
    </a-modal>
 </div>
</template>
<script lang="ts">
  import {Component ,Vue,Prop} from "vue-property-decorator";
  import {Comment} from "ant-design-vue";
  import {checkLogin} from "../store/checkLogin";
  import moment from 'moment';
  export   interface CommentItemType extends Comment{
    children?: CommentItemType [];
    parent?: number;
    parentName?: string;
  } 
  @Component
  export default class CoomonItem extends Vue {
    private visible = false;
    private confirmLoading = false;
    private replayObj = {};
    private replayContent = "";
    @Prop() private comments!: CommentItemType[];
    @Prop() private replayCallBack!: Function;
    replay(item){
       // 首先进行登录校验没有登录不能回复
        const checkResult =  checkLogin(this);
        if (!checkResult) {
            return;
        }
      this.visible = true;
      this.replayObj = item;
    }
    async handleOk(){
       this.confirmLoading = true;
        await  this.replayCallBack(this.replayObj,this.replayContent);
         this.visible = false;
        this.confirmLoading = true;
        this.replayContent = "";
    }
    handleCancel(){
       this.visible = false;
       this.replayContent = "";
    }
    replayInputChange(ev){
      this.replayContent = ev.target.value;
    }
    getRandom(){
      return Math.random()*1000;
    }
    formatDate(data){
     return  moment.utc(data).format("YYYY-MM-DD HH:mm:ss");
    }
  }
</script>
<style  scoped>
  .author-wrap{
    font-weight: bolder;
    font-size: 14px;
    color: rgb(9, 107, 194);
    background-color: rgba(29, 30, 31, 0.7);
    border-radius: 3px;
  }
  .replay-wrap{
     background-color: rgba(255, 255, 255,0);
    display: inline-block;
  }
  .replay-wrap span{
    margin: 0px 10px;
    font-weight: bolder;
    color: rgb(241, 11, 230);
  }
  .replay{
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
    color:white;
    font-weight: bold;
  }
</style>