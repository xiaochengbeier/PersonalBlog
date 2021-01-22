<template>
   <div class="content">
        <a-form-item>
          <a-textarea :rows="1"  :value="value" @change="handleChange" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            提交评论
          </a-button>
        </a-form-item>
           <CoomonItem :replayCallBack="replayCallBack" :comments="comments"/>
   </div>
 
</template>

<script lang="ts">
import { Component, Vue,Prop } from 'vue-property-decorator';
import {Comment} from "ant-design-vue";
import CoomonItem, { CommentItemType } from "./CoomonItem.vue"
import {checkLogin} from "../store/checkLogin";
import {CriticService} from "../services/CriticService";
import {CriticEntry} from "../entry/CriticEntry"
import moment from 'moment';
@Component({
  components:{
    CoomonItem 
  }
})
export default class Common extends Vue {
      @Prop() private bid!: number;
      comments: CommentItemType[] = [];
      submitting= false;
      value= '';
      moment=  moment;
    // 回复评论修改评论数组
  async replayCallBack(obj,val){
      const me = this.$store.state.login.user;
      // 构建回复评论对象
      const objRe = {
          parentName: obj.author,
          author: me.name,
          avatar: me.poster,
          content: val,
          parent: obj.articleId,
          datetime: new Date(),
      };
       const critic: CriticEntry = {
          articleId: this.bid,
          content: val,
          talker: me.userId,
          ctime: new Date,
          parent: obj.criticId,
        };
        await  CriticService.addCritic(critic);
      //将评论加入到对应的孩子数组中
      const commonObj =   this.findChildrenByChild(obj);
      console.log(commonObj,"----commonObj---");
      if(commonObj && commonObj.children ){
        // commonObj.children.push(objRe as CommentItemType);
       const newCommArr =   this.comments.map(item=>{
          if(item === commonObj){
            if(item.children){
              item.children.push(objRe as CommentItemType);
            }
          }
          return item;
        })
        this.comments = newCommArr;
      }
      // console.log(obj,val,"---commojbj---",this.comments);
     
    }
    // 根据回调获得的被评论对象找到其所在的孩子数组
    findChildrenByChild(obj){
      // 遍历评论数组
      for(let i =  0;i < this.comments.length ;i++){
        if(obj === this.comments[i]){
          return this.comments[i];
        }else{//如果不是评论那么查看是否是回复的评论
        const children = this.comments[i].children;
          if(children != null){
            for(let j = 0;j < children.length;j++){
              if(children[j] === obj){
                return this.comments[i];
              }
            }
          }
        }
      }
    }
     async handleSubmit() {
        // 首先进行登录校验没有登录不能回复
        const checkResult =  checkLogin(this);
        if (!this.value ||  !checkResult) {
            return;
        }
        this.submitting = true;

        const me = this.$store.state.login.user;
        const newComments = {
            author: me.name,
            avatar: me.poster,
            content: this.value,
            datetime: new Date(),
            parent: -1,
            children: [] as CommentItemType []
        }
        const critic: CriticEntry = {
          articleId: this.bid,
          content: this.value,
          talker: me.userId,
          ctime: new Date,
          parent: -1,
        };
        await  CriticService.addCritic(critic);
        this.submitting = false;
        this.comments = [
          newComments as CommentItemType,
          ...this.comments,
        ];
        this.value = '';
     
    }
    handleChange(e) {
      this.value = e.target.value;
    }
    // 获取评论并加入到数组中
    async getCriticFromNet(){
      const findCritic: any =    await  CriticService.getCriticByBid(this.bid,{size: 20,page:1});
    console.log( findCritic,"根据文章id请求评论 时机在 created的时候");
    if(findCritic.code === 200 && findCritic.data.datas.length > 0){
        const criticArr = findCritic.data.datas;
        console.log(criticArr,"--criticArr");
        this.comments = [...this.comments,...criticArr];
      }
    }
    // 根据文章id请求评论 时机在 created的时候
   async created(){
     await this.getCriticFromNet();
    }
}
</script>
<style  scoped>
  .content{
    width: 80%;
    margin: auto;
    border-radius: 10px;
    background-color: rgba(219, 213, 213, 0.4);
    overflow: auto;
    max-height: 500px;
  }
</style>
