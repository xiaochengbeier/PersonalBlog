<template>
<!-- autoplay -->
  <a-carousel autoplay >
    <div :style="getRandomStyle()" class="word-wrap-div">
      Talk is cheap. Show me the code
    </div>
    <div class="word-wrap-div" :style="getRandomStyle()" v-for="(item,index) in rabows" :key="item+index">
      {{item}}
   </div>
  </a-carousel>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {RainbowService} from "../services/RainbowService";
    @Component
    export default class PicDispaly extends Vue {
      rabows = [];
      async created(){
        const rainbows =  await RainbowService.getRanbow();
        if(rainbows != undefined){
          this.rabows = rainbows as never;
        }
      }
      getRandom(min: number,max: number){
        return Math.random() *(max - min) + min;
     }
      getRandomColor(){
          const r = this.getRandom(0,255);
          const g = this.getRandom(0,255);
          const b = this.getRandom(0,255);
          return `rgb(${r},${g},${b})`;
      }
      getRandomSize(){
          return this.getRandom(14,24) +"px";
      }
      getRandomStyle(){
          return{
              fontSize: this.getRandomSize(),
              color: this.getRandomColor()
          }
      }
    }
</script>
<style scoped>
/* For demo */
.word-wrap-div{
  text-indent: 0px;
  height: 100%;
  display: block !important;
  box-sizing: border-box;
  padding: 30px;
  line-height: 40px;
}
.ant-carousel{
    border-radius: 5px;
     box-shadow: 1px 1px 4px rgb(202, 199, 199) inset,
    2px 2px 4px rgb(187, 182, 182) inset,
    -1px -1px 4px rgb(112, 111, 111) inset,
    -2px -2px 4px rgb(61, 60, 60) inset,
    1px 1px 4px rgb(202, 199, 199) ,
    2px 2px 4px rgb(187, 182, 182) ,
    -1px -1px 4px rgb(112, 111, 111) ,
    -2px -2px 4px rgb(61, 60, 60) ;
}
.ant-carousel >>> .slick-slide {
  text-align: left;
  text-indent: 2rem;
  height: 200px;
  line-height: 160px;
  background: rgba(202, 198, 198,.1);
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>