<template>
  <div style="width: 256px">
    <a-menu
      class="menu"
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
    >
      <a-menu-item key="1">
        <a-icon type="pie-chart" />
        <span>
          <router-link tag="span" :to="'/aboutme/mypick/'+id">我的关注</router-link>
        </span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="desktop" />
        <span>
              <router-link tag="span" :to="'/aboutme/myproject/'+id">我的项目</router-link>
                
          </span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>
              <router-link tag="span" :to="'/aboutme/myarticle/'+id"> 我的文章</router-link>
         </span>
      </a-menu-item>
      <a-menu-item key="4">
        <a-icon type="inbox" />
        <span>
                <router-link tag="span" :to="'/aboutme/editinfo/'+id"> 个人信息</router-link>
         </span>
      </a-menu-item>
    </a-menu>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Menu extends Vue {
  id!: number; 
  created(){
    console.log("this.$store.state.login.user.userId--->",this.$store.state.login.user.userId);
    this.id = this.$store.state.login.user.userId;
  }

}
</script>
<style scoped>
    .menu{
        background-color: rgba(139, 133, 133,.2);
        color: rgb(148, 165, 180);
        font-weight: bolder;
    }    
</style>
