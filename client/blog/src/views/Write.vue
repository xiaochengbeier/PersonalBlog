<template>
    <div class="write-wrap md-with">
        <p>大佬请下笔</p>
        <RichText/>
    </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import RichText from "../components/RichText.vue"
@Component({
    components:{
        RichText
    }
})
export default class Write extends  Vue  {

}

</script>
<style  scoped>
    .write-wrap{
        background-color:rgba(255, 255, 255,.2);
        margin-top: 10px;
        border-radius: 5px;
    }
    .write-wrap p{
        color: rgb(255, 255, 255);
        font-weight: bolder;
        font-size: 20px;
    }
</style>