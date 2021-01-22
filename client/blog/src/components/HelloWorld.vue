<template>
  <div class="hello">
    <button >点我</button>
    <h1>{{ msg }}{{name}}</h1>
      <a-button type="primary">
      Primary
    </a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Button}  from "ant-design-vue";
Vue.use(Button);
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @Prop() private name!: string;
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
