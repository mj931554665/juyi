import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页
import HomeView from '@/views/Home.vue'
// 设备列表
import DeviceList from "@/views/DeviceList.vue";
// 电子围栏
import ElectricFence from "@/views/ElectricFence.vue"
// 设备工况
import EquipmentCondition from "@/views/EquipmentCondition.vue"
// 设备报警
import DeviceAlarm from "@/views/DeviceAlarm.vue"
// 设备详情
import DeviceDetails from '@/views/DeviceDetails.vue'
// 实时监控
import RealTimeMonitoring from '@/views/RealTimeMonitoring.vue'
// 历史轨迹
import HistoricalTrack from '@/views/HistoricalTrack.vue'
// 风险报警
import RiskAlert from '@/views/RiskAlert.vue'
// 数字大屏页
import JuYiDigitalScreen from "@/views/JuYiDigitalScreen.vue";

Vue.use(VueRouter)
// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
const routes = [
  // 数字大屏页
  {
    path: '/screen',
    name: 'screen',
    component: JuYiDigitalScreen
  },
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  // 登录页
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/',
    name: 'index',
    meta:{
      title:"首页"
    },
    children: [
      // 首页
      {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta:{
          title:"首页"
        }
      },
        //设备管理
      {
        path: '/deviceManage',
        name: 'deviceManage',
        children:[
          // 设备列表
          {
            path: 'deviceList',
            name: 'deviceList',
            component: DeviceList,
            meta:{
              title:"设备列表"
            }
          },
          // 设备详情
          {
            path: 'deviceDetails',
            name: 'deviceDetails',
            component: DeviceDetails,
            meta:{
              title:"设备详情"
            }
          },
          // 实时监控
          {
            path: 'realTimeMonitoring',
            name: 'realTimeMonitoring',
            component: RealTimeMonitoring,
            meta:{
              title:"实时监控"
            }
          },
          // 历史轨迹
          {
            path: 'historicalTrack',
            name: 'historicalTrack',
            component: HistoricalTrack,
            meta:{
              title:"历史轨迹"
            }
          },
          // 设备报警
          {
            path: 'deviceAlarm',
            name: 'deviceAlarm',
            component: DeviceAlarm,
            meta:{
              title:"设备报警"
            }
          },
        ],
        component: ()=>import('../views/DeviceManage.vue'),
        // redirect: 'deviceManage',
      },
      // 电子围栏
      {
        path: '/electricFence',
        name: 'electricFence',
        component: ElectricFence,
        meta:{
          title:"电子围栏"
        }
      },
      // 设备工况
      {
        path: '/equipmentCondition',
        name: 'equipmentCondition',
        component: EquipmentCondition,
        meta:{
          title:"设备工况"
        }
      },
      // 风险报警
      {
        path: '/riskAlert',
        name: 'riskAlert',
        component: RiskAlert,
        meta:{
          title:"风险报警"
        }
      },
    ],
    redirect: '/home',
    component: () => import('../views/index.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
