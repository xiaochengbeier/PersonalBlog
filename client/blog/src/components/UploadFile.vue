<template>
  <div class="clearfix">
    <a-upload
      action="/upproject"
      accept=".zip"
      name="project"
      :default-file-list="defaultFileList"
      @change="handleChange"
    >
     <a-button> <a-icon type="upload" /> 上传新项目 </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts" >
import { Component, Vue,Prop } from 'vue-property-decorator';
@Component
export default class  UploadFile  extends Vue {
    @Prop()  private upprojectCallBack!: Function
    defaultFileList = [];
    handleChange({ file, fileList }) {
      if (file.status !== 'uploading') {
         this.defaultFileList.push(file as never);
         const response = fileList[0].response;
          if(response.code === 200){
            this.upprojectCallBack(response.data);
          }
      }
    }
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-list-item-info {
  background-color: rgba(253, 253, 253,.7);
  color: rgb(34, 251, 6);
  font-weight: bolder;
  border-radius: 7px;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

</style>
