<template>
    <div>
        <mt-header  title="管理系统"></mt-header name="router" model="out-in">
        <transition>
        <router-view></router-view>
        </transition>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item"
            :to="{name:'home'}" >
                <span class="mui-icon icon-shouye"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon icon-huiyuan"><span class="mui-badge">{{pickNum}}</span></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                <span class="mui-icon icon-qicheqianlian-"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
import default connect from './components/common/connect.js';
import prodTools from './components/common/prodTools.js';
    export default {
        data(){
            return {
                pickNum:prodTools.getTotalCount(),
            }
        },
        created(){
            connect.$on('addShopCart',num=>{
                 this.pickNum+=num;
            })
        }
    }
</script>
<style scoped>
.router-enter-active,.router-leave-active{
    transition: opacity .5s
}
.router-enter,.router-leave-to{
    opacity: 0
}    
</style>