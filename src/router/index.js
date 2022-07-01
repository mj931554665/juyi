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


Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 设备列表
  {
    path: '/deviceList',
    name: 'deviceList',
    component: DeviceList
  },
  // 电子围栏
  {
    path: '/electricFence',
    name: 'electricFence',
    component: ElectricFence
  },
  // 设备工况
  {
    path: '/equipmentCondition',
    name: 'equipmentCondition',
    component: EquipmentCondition
  },
  // 设备报警
  {
    path: '/deviceAlarm',
    name: 'deviceAlarm',
    component: DeviceAlarm
  },
  // 设备详情
  {
    path: '/deviceDetails',
    name: 'deviceDetails',
    component: DeviceDetails
  },
  // 实时监控 
  {
    path: '/realTimeMonitoring',
    name: 'realTimeMonitoring',
    component: RealTimeMonitoring
  },
  // 历史轨迹
  {
    path: '/historicalTrack',
    name: 'historicalTrack',
    component: HistoricalTrack
  },
  // 风险报警
  {
    path: '/riskAlert',
    name: 'riskAlert',
    component: RiskAlert
  },
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
