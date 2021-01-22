<template>
  <div class="form-wrap md-with">
     <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
     <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="ruleForm.email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="pass">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :style="{textAlign:'center'}" :wrapper-col="{ span: 24}">
      <a-button type="primary" :loading="loginLoading" @click="submitForm('ruleForm')">
        登录
      </a-button>
    </a-form-model-item>
     <a-form-model-item :style="{textAlign:'center'}" :wrapper-col="{ span: 24}">
        <router-link to="/resetpass">忘记密码？</router-link>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script lang="ts">
import { Component ,Vue} from "vue-property-decorator";
import { FormModel } from 'ant-design-vue';
import {Store} from "vuex";
import {StoreRootType} from "../store/index"
Vue.use(FormModel);
@Component
export default class RegisterForm extends Vue {
   checkPending = 0;
    ruleForm = {
        pass: '',
        email: '',
    };
    $refs!: {
        ruleForm: FormModel;
    };
    get loginLoading() {
       return this.$store.state.login.isLoading!;
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
        callback();
      }
    };
    submitForm(ruleForm: string) {
      this.$refs[ruleForm].validate(async (valid: boolean) => {
        if (valid) {
         const loginResult = await this.$store.dispatch("login/loginAction",{email: this.ruleForm.email , pass: this.ruleForm.pass})
         console.log(loginResult,"-loginResult--");
         if(loginResult.code === 200){
           this.$message.success("登录成功",1, ()=>{
            //  登录成功返回非首页
             this.$router.back();
           })
         }else{
              this.$message.error(loginResult.des);
         }
        } else {
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
