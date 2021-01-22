<template>
  <div class="form-wrap md-with">
     <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
     <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="ruleForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="pass">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item  has-feedback label="确认密码" prop="checkPass">
      <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :style="{textAlign:'center'}" :wrapper-col="{ span: 24}">
      <a-button type="primary" :loading="loading" @click="submitForm('ruleForm')">
        注册
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script lang="ts">
import { Component ,Vue,Prop} from "vue-property-decorator";
import { FormModel } from 'ant-design-vue';
import {RegisterService} from "../services/RegisterService"
Vue.use(FormModel);
@Component
export default class RegisterForm extends Vue {
    // 当注册完毕切换到登录页面
    @Prop() changeForm!: Function;
    ruleForm = {
        pass: '',
        checkPass: '',
        email: '',
    };
    $refs!: {
        ruleForm: FormModel;
    };
     checkPending = 0;
    // 从state中获得 是否正在注册的状态
    get loading() {
       return this.$store.state.register.isRegisting!;
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
    submitForm(ruleForm: string) {
      this.$refs[ruleForm].validate(async (valid: boolean) => {
        if (valid) {
        //  分发action 向后台传输数据 发送验证邮箱的邮件
         const regiResult =  await this.$store.dispatch("register/registerAction",{email: this.ruleForm.email,pass: this.ruleForm.pass})
         if(regiResult.code === 200){
           //注册提示成功注册并验证然后跳转到登录页
            this.$message.success('注册成功请前往您的邮箱激活完成验证然后登录',2,()=>{
              this.changeForm();
            });
          }else{
           //注册失败
            this.$message.error(regiResult.des);
         }
        
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    layout = {
        labelCol: {span: 4,offset:1},
        wrapperCol: { span: 14 },
    };
    
     rules= {
        pass: [{ validator: this.validatePass, trigger: 'change' }],
        checkPass: [{ validator: this.validatePass2, trigger: 'change' }],
        email: [{ validator: this.checkEmail, trigger: 'change' }],
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
</style>
