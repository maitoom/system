<template>
    <div>
    <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a :href="img.url"><img :src="img.img"></a></mt-swipe-item>           
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgs:[],
            }
        }
    },
    props:['url'],
    created(){
        this.$ajax.get(this.url)
        .then(res=>{
            this.imgs=res.data.message;
        })
    }
</script>
<style>
.mint-swipe{
    max-height:187px;
}
.mint-swipe img {
    height: 100%;
}
</style>