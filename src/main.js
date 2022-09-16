import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/restcss.css";
import axios from "axios";
import "./assets/iconfont/iconfont.css";
import api from "./api/request";
import '@/permission'
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;

import EchartsData from "./utils/EchartsData";
Vue.prototype.$EchartsData = EchartsData;

Vue.use(ElementUI);

import VueAMap from "vue-amap"; //引入高德地图

// 高德地图
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: "09c0d8fba098058de0784ccb61dd8e93",
  plugin: [
    // 这里根据自己项目按需引入插件
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.MouseTool", //鼠标工具插件
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.MarkerClusterer", //点聚合插件
    "AMap.MoveAnimation", //动画插件
    "AMap.Geocoder", //地理编码
  ],
});

import BaiduMap from "vue-baidu-map"; // 导入百度地图
// 进行全局注册，一次性引入百度地图组件库的所有组件
// ak为官方提供的密钥
Vue.use(BaiduMap, {
  ak: "T8B8zgUb0GHqWukNqftovGWsrVm0C7IB",
});
import * as echarts from "echarts";

Vue.prototype.$echarts = echarts;

// 修改网页标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
