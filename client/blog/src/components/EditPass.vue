<template>
  <div class="form-wrap md-with">
     <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
     <a-form-model-item has-feedback label="旧密码" prop="oldPass">
      <a-input v-model="ruleForm.oldPass" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="新密码" prop="pass">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item  has-feedback label="确认密码" prop="checkPass">
      <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :style="{textAlign:'center'}" :wrapper-col="{ span: 24}">
      <a-button type="primary" :loading="loading" @click="submitForm('ruleForm')">
        确认修改
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script lang="ts">
import { Component ,Vue} from "vue-property-decorator";
import { FormModel } from 'ant-design-vue';
import {UserService} from "../services/UserService"
Vue.use(FormModel);
@Component
export default class RegisterForm extends Vue {
   loading = false;
    ruleForm = {
        pass: '',
        checkPass: '',
        oldPass: '',
    };
    $refs!: {
        ruleForm: FormModel;
    };
     checkPending = 0;
      checkOldPass = (rule: object, value:  string, callback: Function) => {
      clearTimeout(this.checkPending);
      if (!value) {
        return callback(new Error('请您输入邮箱'));
      }
      this.checkPending = setTimeout(() => {
         if (value !== '') {
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
      const me = this.$store.state.login.user;
      this.$refs[ruleForm].validate(async (valid: boolean) => {
        this.loading = true;
        if (valid) {
          const uppassRes = await  UserService.updatePass({email: me.email,oldPass: this.ruleForm.oldPass,newPass: this.ruleForm.pass});
          if(uppassRes.code === 200){
            this.$message.success("更新密码成功");
            this.ruleForm.pass = "";
            this.ruleForm.checkPass = "";
            this.ruleForm.oldPass = "";
            //退出登录
            this.$store.dispatch("login/logoutAction");
            //跳转到登录页面
            this.$router.replace("/reglog");
          }else{
            this.$message.error(uppassRes.des);
          }
        } else {
          return false;
        }
        this.loading = false;
      });
    }
    layout = {
        labelCol: {span: 7,offset:1},
        wrapperCol: { span: 14 },
    };
    
     rules= {
        pass: [{ validator: this.validatePass, trigger: 'change' }],
        checkPass: [{ validator: this.validatePass2, trigger: 'change' }],
        oldPass: [{ validator: this.checkOldPass, trigger: 'change' }],
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
