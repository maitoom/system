<template>
    <div class="tmpl" style="height:577PX">
        <nav-bar title="商品列表"></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
        <ul class="mui-table-view mui-grid-view">
            <li v-for="prod in prods" :key="prod.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <router-link :to="{name:'goods.detail',query:{id:prod.id}}">
                    <img class="mui-media-object" src="http://182.254.146.100:8080/upload/201504/20/thumb_201504200046589514.jpg">
                    <div class="mui-media-body">{{prod.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{prod.sell_price}}</span>
                            <s>￥{{prod.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{prod.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default{
    data(){
        return{
            pageIndex:1,
            prods:[],
            allLoaded:false,
            isAutoFill:false,
        }
    },
    created(){
        this.loadMore();
    },
    methods:{
        loadBottom(){
            this.loadMoreConcat();
        },
        loadMore(){
            this.$ajax.get('getgoods?pageindex=1')
        .then(res=>{
            this.prods=res.data.message;
        })
        },
        loadMoreConcat(){
            this.$ajax.get('getgoods?pageindex='+(++this.pageIndex))
        .then(res=>{
            this.prods=this.prods.concat(res.data.message);
            if(res.data.message.length!=10){
                this.allLoaded=true;
            }
            this.$refs.loadmore.onBottomLoaded();
            
        })
        }
    }

}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
