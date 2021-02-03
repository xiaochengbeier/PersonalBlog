<template>
    <div class="login-reg md-with sm-m">
         <div>
           <p class="fail">哎呀 ！ 妈呀  验证失败啦 在重新注册一次试试</p>
         </div>

         <button class="reRegi" @click="reRegis">重新注册</button>
    </div>
   
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class RegistFail extends Vue {
      reRegis(){
          this.$router.replace("/reglog");
      }
}
</script>
<style  scoped>
     .login-reg{
         margin: 20px auto;
     }
     .fail{
         color: rgb(21, 0, 211);
         height: 200px;
         margin-top: 50px;
         line-height: 100px;
         border-radius: 10px;
         font-weight: bolder;
         font-size: 15px;
         background-image: linear-gradient(rgb(236, 75, 75),rgb(60, 211, 60),green,pink); 
        }
        .reRegi{
            height: 40px;
            font-weight: bolder;
            outline: none;
            cursor: pointer;
            border: none;
            width: 100px;
            border-radius: 10px;
        }
</style>