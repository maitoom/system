<template>
    <div class='tmpl'>
    <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(goods,index) in goodsList" :key="goods.id" class="p-list">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.thumb_path">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span>{{goods.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import prodTool from '../common/prodTools.js';
import connect from '../common/connect.js';
export default {
    data(){
        return{
            goodsList:[],
        }
    },
    created(){
        let prods = prodTool.getProds();
        if(Object.keys(prods).length===0) return;
        let url = 'goods/getshopcartlist/';
        let url += Object.keys(prods).join(',');
        this.$ajax.get(url)
        .then(res=>{
            this.goodsList=res.data.message;
            this.goodsList.forEach((ele,index)=>{
                if(prods[ele.id]){
                    // ele.num=prods[ele.id];
                    // ele.isPicked=true;
                    this.$set(ele,'num',prods[ele.id]);
                    this.$set(ele,'isPicked',true);
                }
            })
        })
    },
    methods:{
        add(i){
            this.goodsList[i].num++;
            connect.$emit('addShopCart',1);
            prodTools.addOrUpdate({
                id:this.goodsList[i].id,
                num:1,
            })
        },
        sub(i){
            if(this.goodsList[i].num<=1) return;
            this.goodsList[i].num--;
            connect.$emit('addShopCart',-1);
            prodTools.addOrUpdate({
                id:this.goodsList[i].id,
                num:-1,
            })
        },
        del(i){
            let goods=this.goodsList[i];
            prodTools.delete(goods.id);
            connect.$emit('addShopCart',goods.num);
            this.goodsList.splice(i,1);
        }
    },
    computed:{
        payment(){
            let num = 0;
            let sum = 0;
            this.goodsList.foreach((ele)=>{
                if(ele.isPicked){
                    sum += ele.num*ele.sell_price;
                    num +=ele.num;
                }
            })
            return{
                num,sum
            };
        }

    }
}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
