<template>
    <div class="login-reg md-with sm-m">
    
         <div>
         
            <RestPassForm/>
         </div>
    </div>
   
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RestPassForm from "../components/ResetPass.vue";

@Component({
    components:{
        RestPassForm
    }
})
export default class ResetPassPage extends Vue {
      
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