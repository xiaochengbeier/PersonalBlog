<template>
  <div>
      <div class="edit-itme">
            <a-collapse class="edit-comp">
      <a-collapse-panel key="1" header="修改头像">
        <p><UploadPoster/></p>
      </a-collapse-panel>
     </a-collapse>
      </div>
      <div class="edit-itme">
           <a-collapse class="edit-comp">
         <a-collapse-panel key="2" header="修改用户名" >
           <p><UserName/></p>
          </a-collapse-panel>
     </a-collapse>
      </div>
      <div class="edit-itme">
           <a-collapse class="edit-comp">
         <a-collapse-panel key="3" header="修改密码">
            <p><EditPass/></p>
         </a-collapse-panel>
     </a-collapse>
      </div> 
  </div>
</template>
<script>
import {Component,Vue} from "vue-property-decorator";
import UploadPoster from "./UploadPoster.vue";
import UserName from "./EditUsername.vue"
import EditPass from "./EditPass.vue"
@Component({
    components:{
        UploadPoster,
        UserName,
        EditPass
    }
})
export default class EditInfo extends Vue{
    
}
</script>
<style >
    .edit-comp{
        background-color: rgba(221, 218, 218,.5);
        color: rgb(148, 165, 180);
        font-weight: bolder;
    }
   .edit-comp .ant-collapse-content {
        background-color: rgba(221, 218, 218,.2) !important;
    }
   .edit-itme{
          margin-bottom: 40px;
    }
</style>