<template>
  <a-card hoverable style="width: 100%;margin:auto; position: relative;">
    <img
     class="d-sx-none d-md-block"
      slot="cover"
      alt="example"
      :src="poster"
    />
    
    <template slot="actions" class="ant-card-actions">
      <div v-if="isPick" class="pick">
        <a-button :loading="loading" type="danger" @click="pickSomeBody(false)">
          取消关注
        </a-button>
      </div>
      <div v-else class="pick">
         <a-button :loading="loading" type="primary" @click="pickSomeBody(true)">
           立马关注
         </a-button>
      </div>
      <div>
         <a-button  ghost type="primary">
              <a-icon key="ellipsis" type="ellipsis" />
              被关注{{picks}}
         </a-button>  
      </div>
     
    </template>
    <a-card-meta :title="name" description="伟大的创作者">
      <a-avatar
        slot="avatar"
        :src="poster"
      />
    </a-card-meta>
  </a-card>
</template>
<script lang="ts">
import { Component, Vue,Prop} from 'vue-property-decorator';
import { PickerService } from '../services/PickerService';
import {PickerEntry} from "../entry/PickerEntry";
import {checkLogin} from "../store/checkLogin"
@Component
export default class AuthorInfo extends Vue {
  @Prop() private name!: string;
  @Prop() private poster!: string;
  @Prop() private isPick!: boolean;
  @Prop() private picks!: number;
  @Prop() private uid!: number;
  @Prop() private changPickCallBack!: Function;
  loading = false; 
  // flag 为 true 表示关注 为 false 表示取消关注
 async pickSomeBody(flag){
   const user = this.$store.state.login.user;
   const checkResult =  checkLogin(this);
   if(!checkResult){
     return;
   }
   const myid = user.userId;
   this.loading = true;
    if(flag){
      const pick: PickerEntry = {picker: myid,checked: this.uid};
      console.log(pick,"---pick--form-shoHe--");
      const pickResult = await PickerService.pickSomebody(pick);
      if(pickResult.code === 200){//关注成功
        this.changPickCallBack( true,1);
      }
      this.loading = false;
    }else{
        const pick: PickerEntry = {picker: myid,checked: this.uid};
        const pickResult = await PickerService.unpickSomebody(pick);
        if(pickResult.code === 200){//取消关注成功
          this.changPickCallBack( false,-1);
        }
      this.loading = false;
    }
  }
}
</script>
<style scoped>
    .show-info{
        position:absolute;
        width: 100%;
        display: flex;
        top: 0px;
        left: 0px;
        right: 0px;
        padding-top: 10px;
        background-color: rgba(59, 46, 46,.5);
    }
    .show-info .img{
        height: 90px;
        width: 90px;
        border: 1px solid rgb(246, 244, 244);
        margin: 10px auto;
        border-radius: 10px;
        padding: 5px;
    }
    .show-info .img img{
        width: 100%;
        height: 100%;
    }
    .show-info h3{
        font-weight: bolder;
        color:rgb(255, 255, 255);
    }
    .show-info>div{
       flex: 1 1;
    }
   
</style>