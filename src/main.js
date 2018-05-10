'use strict'
import Vue from 'vue';
import App from'./app.vue';
import Home from'./components/home/home.vue';
import Member from'./components/member/member.vue';
import Shopcart from'./components/shopcart/shopcart.vue';
import Search from'./components/search/search.vue';
import NewsList from'./components/news/newsList.vue';
import NewsDetail from'./components/news/newsDetail.vue';
import PhotoShare from'./components/photo/photoShare.vue';
import PhotoDetail from'./components/photo/photoDetail.vue';
import GoodsList from'./components/goods/goodsList.vue';
import GoodsDetail from'./components/goods/goodsDetail.vue';
import GoodsComment from'./components/goods/goodsComment.vue';



import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
import'./static/vender/mui/dist/css/mui.css';
import'./static/css/global.css';
import Axios from 'axios';
Vue.prototype.$ajax=Axios;
Axios.defaults.baseURL='http://182.254.146.100/api/';
Axios.interceptors.request.use(function(){
    Mint.Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function(){
    Mint.Indicator.close();
    return config;
});

import Moment from 'moment';
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

Vue.filter('convertDate',function(value){return Moment(value).format('YYYY-MM-DD');
});


import NavBar from './components/common/navBar.vue';
import Comment from './components/common/comment.vue';
import MySwipe from'./components/common/mySwipe.vue';
Vue.component('navBar',NavBar);
Vue.component('comment',Comment);
Vue.component('mySwipe',MySwipe);



let router=new VueRouter({
    linkActiveClass:'mui-active',
    routes:[
    {path:'/',redirect:{name:'home'}},
    {name:'home',path:'/home',component:Home},
    {name:'member',path:'/member',component:Member},
    {name:'shopcart',path:'/shopcart',component:Shopcart},
    {name:'search',path:'/search',component:Search},
    {name:'news.list',path:'/news/list',component:NewsList},
    {name:'news.detail',path:'/news/detail',component:NewsDetail},
    {name:'photo.share',path:'/photo/share',component:PhotoShare},
    {name:'photo.detail',path:'/photo/detail/:id',component:PhotoDetail},
    {name:'goods.list',path:'/goods/list',component:GoodsList},
    {name:'goods.detail',path:'/goods/detail',component:GoodsDetail},
    {name:'goods.comment',path:'/goods/comment',component:GoodsComment},
     {name:'goods.pictureInfo',path:'/goods/pictureInfo',component:NewsDetail},
    ]
});

new Vue({
    el:'#app',
    router,
    render:c=>c(App)
})