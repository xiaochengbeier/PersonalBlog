<template>
    <div class="rich-plate">
        <div class="ariticle-title">
            <div class="title-name">标题:</div>
            <span :class="{titleNotEmpty:isShowEmptyError&&titleContent=='', notEmptyInit: true}">标题和文章内容不能为空</span>
            <div class="title-content">
                <a-input v-model="titleContent" placeholder="文章标题" />
            </div>
        </div>
        <div ref="richWrap">
        </div>
         <button @click="getHtml"  class="submit-article">
           发表文章
         </button>
          <a-modal
            title="请选择您的文章标签"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            >
            <div class="tags-wrap">
                <div class="choosed-tages">
                    <div class="tages">已选标签</div>
                    <div class="tages-conten">
                        <span v-for="(item,index) in choosedTages" :key="item">{{item}} 
                            <a-icon @click="cancleTag(index)" type="close" />
                        </span>
                    </div>
                </div>
                <div class="custom-tages">
                    <a-input-search
                    placeholder="请输入符合您当前文章的标签"
                    enter-button="添加标签"
                    v-model="coustomTag"
                    @search="onSearch"
                    />
                </div>
                <div class="tags-li">
                    <div class="tages">可选标签</div>
                    <div class="tages-conten">
                        <span @click="choose(index)" v-for="(item,index) in tags" :key="item">{{item}}</span>
                    </div>
                 </div>
            </div >
          </a-modal>
    </div>
</template>
<script lang="ts">
import {Component,Vue} from "vue-property-decorator";
import hljs from 'highlight.js';
import E  from "wangeditor";
import Editor from "wangeditor";
import {UploadFileService} from "../services/UploadFileService";
import {BlogService} from "../services/BlogService";
import {BlogEntry} from "../entry/BlogEntry"
import xss from "xss";
@Component
export default class RichText extends Vue {
    private editor!:  Editor;
    visible = false;
    aritcleContent = "";
    titleContent = "";
    coustomTag = "";
    choosedTages = [];
    confirmLoading = false;
    isShowEmptyError = false;
    tags = ["前端","后端","移动端","运维","其他"];
    $refs!: {
        richWrap: Element;
    }
    // 取消已选择的标签
    cancleTag(index){
        const cancelResult =  this.choosedTages.splice(index,1);
        this.tags.push(...cancelResult);
    }
    // 选择标签
    choose(index){
        const value = this.tags[index];
        this.choosedTages.push(value as never);
        this.tags.splice(index,1);
    }
    mounted(){
        const editor = new E(this.$refs.richWrap)
        // 配置上传文件接口
        editor.config.uploadImgServer = '/upload';
        // 限制上传图片类型
        editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif'];
        // 限制上传文件大小
        editor.config.uploadImgMaxSize = 1 * 1024 * 1024; // 1M
        editor.config.uploadImgMaxLength = 1 ;// 一次最多上传 5 个图片
        editor.config.uploadFileName= "poster";
        editor.highlight = hljs;
        editor.config.zIndex = 10;
        editor.config.languageType = [
                'JavaScript',
                'C',
                'C#',
                'C++',
                'CSS',
                'Java',
                'JSON',
                'TypeScript',
                'Html',
                'XML',
                'SQL',
                'Markdown'
            ];
        editor.config.languageTab = '    ';
        editor.create();
        this.editor = editor;
        editor.config.customUploadImg = async function (resultFiles, insertImgFn) {
                // resultFiles 是 input 中选中的文件列表
                // insertImgFn 是获取图片 url 后，插入到编辑器的方法
              const uploadResult =   await  UploadFileService.uploadFile({file:resultFiles[0],filename:resultFiles[0].name});
                // 上传图片，返回结果，将图片插入到编辑器中
                insertImgFn(uploadResult.data.data[0])
        }
    }
    // 添加自定义标签
    onSearch(value){
        if(value === "" || this.tags.includes(value)){
            return;
        }
        this.tags.push(value);
        this.coustomTag = "";
    }
    handleCancel(){
        this.visible = false;
    }
   async handleOk(){
        const blog: BlogEntry  = {
            title: this.titleContent,
            content: this.aritcleContent,
            userId: this.$store.state.login.user.userId,
            tag: JSON.stringify(this.choosedTages)
        }
        this.confirmLoading = true;
        const addBlogResult: any  =  await  BlogService.addBlog(blog);
       if(addBlogResult.code === 200){
            this.$message.success("发表博客文章成功");
        }else{
            this.$message.error(addBlogResult.des);
        }
        this.confirmLoading = false;
        this.visible = false;
    }
    getHtml(){
        const html =  this.editor.txt.html();
        if(this.titleContent == ""){
            this.isShowEmptyError = true;
            return;
        }
        if(html == ""){
            this.$message.error("亲! ! 咱们这边文章内容也不能为空哦 ");
            return;
        }
        
        this.aritcleContent = xss(html as string);
        this.visible = true;
    }
}

</script>
<style >
    .custom-tages{
       padding: 20px 0px;
       margin: 5px 0px;
       background-color: rgba(0, 0, 0, 0.2);
    }
    .tages-conten{
        border: 1px solid rgb(5, 243, 5);
        border-radius: 5px;
        min-height: 50px;
    }
    .tages-conten span{
        display: inline-block;
        margin: 5px 10px;
        padding: 5px 10px;
        position: relative;
        border-radius: 4px;
        background-color: rgba(74, 238, 10,.3);
        font-weight: bolder;
        cursor: pointer;
    }
    .anticon.anticon-close{
        position:absolute;
        right: 0px;
        top: 0px;
        background-color:rgba(2, 2, 2,.9);
        color: rgb(255, 255, 255);
        font-weight: bolder;
        border-radius: 50%;
        cursor: pointer;
    }
    .tags-wrap .tages{
        background: rgb(0, 0, 0);
        color: rgb(255, 255, 255);
        font-weight: bolder;
        padding: 3px;
        border-radius: 4px;
        display: inline-block;
    }
    .ariticle-title{
       background-color: rgba(0, 0, 0, 0.3);
       display: flex;
       height: 50px;
       padding: 0px 20px;
       align-items: center;
       position: relative;
    }
    .notEmptyInit{
        transition: all 1s ease-in-out;
        position:absolute;
        opacity: 0;
        top: 3px;
        left: 0px;
        right: 0px;
        margin: auto;
    }
    .ariticle-title .titleNotEmpty{
        position:absolute;
        width: 50%;
        top: -20px;
         opacity: 1;
        color: red;
        border-radius: 7px;
        border:1px solid black;
        left: 0px;
        right: 0px;
        margin: auto;
    }
    .ariticle-title  .title-content{
        flex: 1 1 auto;
    }
    .ariticle-title .title-name{
        flex: 0 0 20%;
        background-color: rgba(0, 0, 0, 0.5);
        color: rgb(255, 255, 255);
        font-weight: bolder;
        font-size: 18px;
        margin-right: 10px;
        border-radius: 5px;
    }
    .w-e-text-container{
        background-color: rgba(0, 0, 0, 0.5);
        color: rgb(255, 255, 255);
        text-align: left;
    }
    .w-e-panel-tab-content textarea{
        background-color: black;
        color:rgb(255, 255, 255);
    }
   .w-e-text pre code{
        background-color: black;
        text-align: left;
        padding-left: 20px;
    }
    .hljs-attribute {
        color: #3b3be0;
        font-weight: bolder;
    }
   .w-e-text pre code .hljs-keyword{
       color: #3b3be0;
        font-weight: bolder;
   }
   .submit-article{
       width: 80%;
       height: 50px;
       text-align: center;
       line-height: 50px;
       border-radius: 8px;
       cursor: pointer;
       border: none;
       outline: none;
       margin: 15px auto;
       font-weight: bolder;
       font-size: 18px;
       color: rgb(255, 255, 255);
       background-color: rgba(23, 115, 219,.7);
   }
   .rich-plate{
        position: relative;
   } 
   .w-e-toolbar{
      position: relative;
   }
   .w-e-toolbar .w-e-menu{
       position: static;
   }
   /* [data-title="代码"] */
   .w-e-toolbar .w-e-menu:nth-last-of-type(6){
       position: static;
   } 
  .w-e-toolbar .w-e-menu .w-e-panel-container{
      width: 80% !important;
      margin-left: 0px !important;
      left: 10px;
  }
   #test{
       text-align: left! important;
   }
</style>