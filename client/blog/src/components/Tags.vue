<template>
    <div  class="tags-ele">
      <ul class="tags-ele-warp">
          <li  :style="getRandomStyle()" v-for="(item) in tags" :key="item+getRandom(100,500)">{{item}}</li>
      </ul>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    
  },
})
export default class Tags extends Vue {
    tags = ["Java","JavaScript","Python","C","C#","C++","PHP","Java","JavaScript","Java","JavaScript","Python","C","C#","C++","PHP","Java","JavaScript","Python","C","C#","C++","PHP","0C", "Swift","Go"];
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
<style  scoped>
    .tags-ele{
        width: 100%;
        height: 300px;
        overflow: hidden;
        border-radius: 5px;
        padding: 9px;
        border: 1px solid rgb(243, 243, 243);
        box-shadow: 1px 1px 4px rgb(202, 199, 199) inset,
                    2px 2px 4px rgb(187, 182, 182) inset,
                    -1px -1px 4px rgb(112, 111, 111) inset,
                    -2px -2px 4px rgb(61, 60, 60) inset,
                    1px 1px 4px rgb(202, 199, 199) ,
                    2px 2px 4px rgb(187, 182, 182) ,
                    -1px -1px 4px rgb(112, 111, 111) ,
                    -2px -2px 4px rgb(61, 60, 60) ;
    }
    .tags-ele-warp{
        height: 100%;
        width: 100%;
        padding: 0px;
        list-style: none;
    }
    .tags-ele-warp::after{
        content: "";
        display: block;
        clear: both;
    }
    .tags-ele-warp li{
        margin: 2px;
        float: left;
        cursor: pointer;
        transition: all 500ms ease-in-out;
    }
    .tags-ele-warp li:hover{
        transform: scale(1.4);
    }

</style>