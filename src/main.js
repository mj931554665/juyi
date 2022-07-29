import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/restcss.css'

import api from './api/request'
Vue.prototype.$api = api

import EchartsData from './utils/EchartsData'
Vue.prototype.$EchartsData = EchartsData

Vue.use(ElementUI);
/* // import VueAMap from 'vue-amap'; //引入高德地图
// // 高德地图
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: '09c0d8fba098058de0784ccb61dd8e93',
//   plugin: [                // 这里根据自己项目按需引入插件
//     "AMap.Autocomplete",
//     "AMap.PlaceSearch",
//     "AMap.Scale",
//     "AMap.OverView",
//     "AMap.ToolBar",
//     "AMap.MapType",
//     "AMap.PolyEditor",
//     "AMap.CircleEditor",
//     "AMap.Geocoder"
//   ]
// }); */

import BaiduMap from 'vue-baidu-map';// 导入百度地图
// 进行全局注册，一次性引入百度地图组件库的所有组件
// ak为官方提供的密钥
Vue.use(BaiduMap, {
  ak: 'T8B8zgUb0GHqWukNqftovGWsrVm0C7IB'
})
import * as echarts from "echarts";

Vue.prototype.$echarts = echarts


// 修改网页标题
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
