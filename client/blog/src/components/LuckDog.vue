<template>
  <a-card hoverable style="width: 100%; position: relative;">
    <div class="show-info">
        <div class="doying">
            <h3>抖音</h3>
            <div class="img">
                <img
                style=""
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            </div>
        </div>
        <div class="gongzhong">
             <h3>微信</h3>
             <div class="img">
                 <img
                    slot="cover"
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
             </div>
        </div>
    </div>
    <img
      slot="cover"
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    />
    
    <template slot="actions" class="ant-card-actions">
      <a-icon key="setting" type="setting" />
      <a-icon key="edit" type="edit" />
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-card-meta title="小城贝尔" description="今日运气最佳人选">
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </a-card-meta>
  </a-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    
  },
})
export default class LluckDog extends Vue {
}
</script>
<style scoped>
    .show-info{
        position:absolute;
        width: 100%;
        display: flex;
        top: 0px;
        left: 0px;
        right: 0px;
        padding-top: 10px;
        background-color: rgba(59, 46, 46,.5);
    }
    .show-info .img{
        height: 90px;
        width: 90px;
        border: 1px solid rgb(246, 244, 244);
        margin: 10px auto;
        border-radius: 10px;
        padding: 5px;
    }
    .show-info .img img{
        width: 100%;
        height: 100%;
    }
    .show-info h3{
        font-weight: bolder;
        color:rgb(255, 255, 255);
    }
    .show-info>div{
       flex: 1 1;
    }
   
</style>