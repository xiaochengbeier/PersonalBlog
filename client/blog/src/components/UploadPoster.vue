<template>
  <div class="clearfix">
    <a-upload
      action="/upload"
      name="poster"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 2">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          上传新头像
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
import {Component,Vue}from "vue-property-decorator";
import { UserService } from "../services/UserService";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component
export default class UploadPoster extends Vue{
      previewVisible = false;
      previewImage =  '';
      fileList = [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: this.$store.state.login.user.poster,
        }
      ];
      handleCancel() {
      this.previewVisible = false;
    }
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    }
   async handleChange({ fileList }) {
         this.fileList = fileList;
         if(fileList[1].status == "done"){
           const newPoster = fileList[1].response.data[0];
           const loginUser = this.$store.state.login.user;
           loginUser.poster = newPoster;
          //  更新头像
           const upposterRes =  await  UserService.upposter(newPoster,loginUser.userId);
           if(upposterRes.code === 200){
             this.$message.success("更新头像成功",()=>{
                this.fileList.shift();
             });
           }else{
             this.fileList.pop();
           }
         }
    }
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
