import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/restcss.css'
import api from './api/request'
Vue.prototype.$api = api
Vue.use(ElementUI);
import BaiduMap from 'vue-baidu-map';// 导入地图

// 进行全局注册，一次性引入百度地图组件库的所有组件
// ak为官方提供的密钥
Vue.use(BaiduMap, {
  ak: 'T8B8zgUb0GHqWukNqftovGWsrVm0C7IB'
})
import * as echarts from "echarts";

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
