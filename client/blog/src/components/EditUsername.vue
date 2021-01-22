<template>
  <div class="form-wrap md-with">
     <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
     <a-form-model-item has-feedback label="用户名: " prop="name">
      <a-input v-model="ruleForm.name" />
    </a-form-model-item>
    <a-form-model-item :style="{textAlign:'center'}" :wrapper-col="{ span: 24}">
      <a-button  type="primary" :loading="loading" @click="submitForm('ruleForm')">
        确认修改
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script lang="ts">
import { Component ,Vue} from "vue-property-decorator";
import { FormModel } from 'ant-design-vue';
import {UserService}  from "../services/UserService";
Vue.use(FormModel);
@Component
export default class RegisterForm extends Vue {
    loading = false;
    ruleForm = {
        name: '',
    };
    $refs!: {
        ruleForm: FormModel;
    };

     validateName = (rule: object, value:  string, callback: Function)=> {
      if (value === '') {
        callback(new Error('新用户名'));
      } else {
        callback();
      }
    };
    submitForm(ruleForm: string) {
      this.loading = true;
      const loginUser = this.$store.state.login.user;
      this.$refs[ruleForm].validate(async (valid: boolean) => {
        if (valid) {
         const upnameRes = await UserService.updateName({email: loginUser.email,name: this.ruleForm.name});
         if(upnameRes.code === 200){
           this.$message.success("更新用户名成功");
           loginUser.name = this.ruleForm.name;
           this.ruleForm.name = "";
        }else{
           this.$message.error(upnameRes.des);
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
        name: [{ validator: this.validateName, trigger: 'change' }],
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
