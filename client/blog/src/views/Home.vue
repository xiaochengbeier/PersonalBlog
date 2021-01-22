<template>
  <div class="home md-with">
    <a-row type="flex">
      <a-col :md="8"  class="d-sx-none d-md-block">
        <div class="left-card">
            <div class="luck-dog">
              <LuckDog/>
            </div>
            <div class="tag-warp">
              <Tags/>
            </div>
        </div>
      </a-col>
      <a-col :md="16"  :xs="24">
       
        <div class="pick-dis">
           <PicDisplay/>
        </div>
        <div class="pick-dis">
           <TodayHot/>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LuckDog from '../components/LuckDog.vue'; 
import Tags from "../components/Tags.vue";
import PicDisplay from "../components/PicDispaly.vue";
import TodayHot from "../components/TodayHot.vue";
@Component({
  components: {
    LuckDog,
    Tags,
    PicDisplay,
    TodayHot
  },
})
export default class Home extends Vue {
}
</script>
<style  scoped>
  .home{
    margin-top: 30px;
  }
  .tag-warp{
    margin-top: 20px;
  }
  .left-card{
    width: 250px;
    margin: auto;
  }
  .pick-dis{
    width: 90%;
    margin: 0px auto  20px auto;
  }
</style>
