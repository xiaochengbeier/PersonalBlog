<template>
  <div class="form-wrap md-with">
     <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
     <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="ruleForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="新密码" prop="pass">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item  has-feedback label="确认密码" prop="checkPass">
      <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </a-form-model-item>
     <a-form-model-item class="verify-wrap"  has-feedback label="验证码" prop="verify">
      <a-input v-model="ruleForm.verify" type="text" autocomplete="off" />
      <a-button class="verify-btn" :loading="verifyLoading" @click="sendVerify" type="primary">
          {{btnText===0?"发送":btnText+"(s)"}}
      </a-button>
    </a-form-model-item>
    <a-form-model-item :style="{textAlign:'center'}" :wrapper-col="{ span: 24}">
      <a-button type="primary" :loading="loading" @click="submitForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script lang="ts">
import { Component ,Vue,Prop} from "vue-property-decorator";
import { FormModel } from 'ant-design-vue';
import {UserService} from "../services/UserService";
import {ResetPassEntry} from "../entry/ResetPassEntry"
Vue.use(FormModel);
@Component
export default class RestPassForm extends Vue {
    // 发送验证码loading
    verifyLoading = false;
    btnText = 0;
    loading = false;
    timer: any = null;
    ruleForm = {
        pass: '',
        checkPass: '',
        email: '',
        verify: '',
    };
    $refs!: {
        ruleForm: FormModel;
    };
     checkPending = 0;
    // 倒数六十秒方法
    secondReverse(){
      if(this.timer !== null){
        return;
      }
      this.timer =  setInterval(()=>{
        this.btnText = this.btnText +1;
        if(this.btnText > 60){
          clearInterval(this.timer);
          this.btnText = 0;
          this.verifyLoading = false;
          this.timer = null;
        }
      },1000)
    }
    // 发送验证码
   async sendVerify(){
      this.$refs['ruleForm'].validateField("email",(errMess)=>{
        if(!errMess){
            this.verifyLoading = true;
            this.secondReverse();
            UserService.sendCode(this.ruleForm.email).then(data=>{
               if(data.code === 200){
                 this.$message.success("验证码已经发送到您的邮箱请注意查收");
               }
            });
        }
      })
    //  await  UserService.sendCode();
    }
    checkVerify(rule: object, value:  string, callback: Function){
       if (!value) {
        return callback(new Error('请您输入验证码'));
      }
    }
    checkEmail = (rule: object, value:  string, callback: Function) => {
      clearTimeout(this.checkPending);
      if (!value) {
        return callback(new Error('请您输入邮箱'));
      }
      this.checkPending = setTimeout(() => {
          const  t  = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
        if (t.test(value)) {
            callback();
        } else {
             callback(new Error('您输入的邮箱格式不正确'));
        }
      }, 1000);
    };
     validatePass = (rule: object, value:  string, callback: Function)=> {
      if (value === '') {
        callback(new Error('请您输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass',()=>{console.log("validateField('checkPass'")});
        }
        callback();
      }
    };
    validatePass2 =(rule: object, value:  string, callback: Function) => {
      if (value === '') {
        callback(new Error('请您再一次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次密码不符合请您重新输入"));
      } else {
        callback();
      }
    };
    async resetPass(){
        const ruleForm = this.ruleForm;
        if(ruleForm.pass == ""|| ruleForm.checkPass==""|| ruleForm.verify == ""){
          return;
        }
         this.loading = true;
        //  分发action 向后台传输数据 发送验证邮箱的邮件
        const resetPass: ResetPassEntry ={
          email: this.ruleForm.email,
          pass: this.ruleForm.pass,
          code: +this.ruleForm.verify
        } 
         const regiResult =  await UserService.resetPass(resetPass);
         if(regiResult.code === 200){
           //注册提示成功注册并验证然后跳转到登录页
            this.$message.success('重置密码成功请重新登录',2,()=>{
               this.$router.back();
            });
          }else{
            //注册失败
            this.loading = false;
            this.$message.error(regiResult.des);
         }
    }
    //   2391651465@qq.com 
   
    submitForm(ruleForm: string) {
      this.$refs[ruleForm].validate((valid: boolean) => {
        console.log(valid,"--valid--");
      });
      this.resetPass();
   
   
   }
    layout = {
        labelCol: {span: 4,offset:1},
        wrapperCol: { span: 14 },
    };
    
     rules= {
        pass: [{ validator: this.validatePass, trigger: 'change' }],
        checkPass: [{ validator: this.validatePass2, trigger: 'change' }],
        email: [{ validator: this.checkEmail, trigger: 'change' }],
        verify: [{ validator: this.checkVerify, trigger: 'change' }],
    };
}
</script>
<style  scoped>
  .form-wrap {
    padding: 30px;
    border-radius: 20px;
    text-shadow: 1px 1px 2px rgb(40, 241, 4),1px 1px 2px rgb(54, 51, 51),-1px -1px 2px rgb(54, 51, 51);
    background-color: rgba(255, 255, 255,.3);
  }
  .verify-wrap{
    position: relative;
  }
  .verify-btn{
    position: absolute;
    padding-right: 20px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
  }
</style>
