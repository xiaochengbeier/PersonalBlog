<template>
    <div class="login-reg md-with sm-m">
         <div class="login-reg-change">
             <div :class="{login:true,active:isLoig}" @click="changeIsLogin(true)">
                 登录
             </div>
             <div :class="{regi:true,active:!isLoig}" @click="changeIsLogin(false)">
                 注册
             </div>
         </div>
         <div>
         
            <transition 
                duration="500"
                enter-active-class="animate__animated animate__bounceInDown"
                leave-active-class="animate__animated animate__bounceOutDown"
                mode="out-in"
                >
                    <div v-if="isLoig"  key="login">
                        <LoginForm/>
                    </div>
                    <div  v-else key="reg">
                        <RegisterForm :changeForm="changeForm"/>
                    </div>
            </transition>
            
         </div>
    </div>
   
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
@Component({
    components:{
        LoginForm,
        RegisterForm
     
    }
})
export default class RegistLogin extends Vue {
  isLoig = true;
  changeForm(){
      this.isLoig = true;
      console.log("changeForm");
  }
  changeIsLogin(val){
      this.isLoig = val;
  }
      
}
</script>
<style  scoped>
     .login-reg{
         margin: 20px auto;
     }
     .login-reg-change{
         width: 50%;
         display: flex;
         margin: auto;
         height: 50px;
         justify-content: center;
         align-items: center;
     }
     .login-reg-change div{
         flex: 1 1;
         padding: 10px 0px;
         cursor: pointer;
         font-weight: bolder;
         color: aliceblue;
     } 
     .login-reg-change .active{
          background-color: rgba(255, 255, 255,.3);
     }
</style>