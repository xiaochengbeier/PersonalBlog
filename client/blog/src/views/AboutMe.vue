<template>
   <div class="aboutMe md-with">
    <a-row type="flex">
      <a-col :md="8" class="d-sx-none d-md-block">
         <div class="menu-wrap">
             <Menu/>
         </div>
      </a-col>
      <a-col :md="16" :sm="24" :xs="24">
       <div class="edit-wrap">
           <router-view></router-view>
       </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Menu  from "../components/Menu.vue";
import EditInfo from "../components/EditInfo.vue";
import MyProject from "../components/MyProject.vue"
@Component({
    components:{
        Menu,
        EditInfo,
        MyProject
    }
})
export default class AboutMe extends Vue {
}
</script>
<style  scoped>
    .aboutMe{
        margin-top: 10px;
    }
    .edit-wrap{
        width: 80%;
        margin: auto;
    }
</style>