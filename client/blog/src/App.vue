<template>
  <div id="app">
    <div class="nav">
       <NaveHeader/>
    </div>
   
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component ,Vue} from "vue-property-decorator";
import NaveHeader  from "./components/NaveHeader.vue";
 @Component({
   components:{
     NaveHeader
   }
 })
export default class HelloWorld extends Vue {
 
  
}
</script>
<style>
.nav{
  position: fixed;
  top: 0px;
  z-index: 999;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
