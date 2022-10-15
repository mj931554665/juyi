<template>
  <div class="deviceInfo">
    <el-row type="flex" align="middle">
      <el-col :span="6">设备名称:</el-col>
      <el-col :span="18">
        <el-select
          v-model="deviceActive"
          placeholder="请选择"
          filterable
          size="small"
          clearable
        >
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.equipmentNo"
            :value="item.equipmentNo"
          >
          </el-option> </el-select
      ></el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="6">开始时间:</el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="start"
          type="datetime"
          :editable="false"
          :clearable="false"
          align="right"
          size="small"
          placeholder="选择日期时间"
          default-time="12:00:00"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="6">结束时间:</el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="end"
          type="datetime"
          :editable="false"
          :clearable="false"
          align="right"
          size="small"
          placeholder="选择日期时间"
          default-time="12:00:00"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle">
      <el-col :span="6">速度大于</el-col>
      <el-col :span="6"
        ><el-input
          v-model="speedInput"
          maxlength="4"
          minlength="1"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        >
          <span slot="suffix"></span></el-input
      ></el-col>
      <el-col :span="1"></el-col>
      <el-col :span="11">km/h</el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="20">速度大于{{ speedInput }}时突出显示</el-col>
      <el-col :span="4">
        <el-switch
          v-model="speedValue"
          active-color="#13ce66"
          inactive-color="#DBDEE5"
        >
        </el-switch
      ></el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="20">高风险事件显示</el-col>
      <el-col :span="4">
        <el-switch
          v-model="highRiskValue"
          active-color="#13ce66"
          inactive-color="#DBDEE5"
        >
        </el-switch
      ></el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="20">中风险事件显示</el-col>
      <el-col :span="4">
        <el-switch
          v-model="mediumRiskValue"
          active-color="#13ce66"
          inactive-color="#DBDEE5"
        >
        </el-switch
      ></el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="20">低风险事件显示</el-col>
      <el-col :span="4">
        <el-switch
          v-model="lowRiskValue"
          active-color="#13ce66"
          inactive-color="#DBDEE5"
        >
        </el-switch
      ></el-col>
    </el-row>
    <el-row type="flex" justify="space-between" align="center">
      <el-col :span="20">电子围栏显示</el-col>
      <el-col :span="4">
        <el-switch
          v-model="fenceValue"
          active-color="#13ce66"
          inactive-color="#DBDEE5"
        >
        </el-switch
      ></el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="24"
        ><el-button
          style="width: 80%; transform: translateX(10%)"
          size="small"
          type="primary"
          round
          @click="initDeviceInfo"
          >查询</el-button
        ></el-col
      >
    </el-row>
  </div>
</template>
<script>
// 引入时间格式化
import { dateFormat } from "@/utils/validate";
import {historyTrackDetail} from "@/api/zqData";
import {customerScreen} from '@/api/jyData';

export default {
  created() {
    this.initDeviceInfo();
  },
  props: {
    equipmentNo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 设备列表及选中设备
      deviceList: [],
      deviceActive: this.equipmentNo,
      // 开始时间及结束时间
      start: new Date().setHours(0, 0, 0),
      end: new Date().setHours(23, 59, 59),
      speedInput: 50,
      speedValue: false, //速度显示开关
      highRiskValue: false, //高风险显示开关
      mediumRiskValue: false, //中风险显示开关
      lowRiskValue: false, //低风险显示开关
      fenceValue: false, //电子围栏显示开关
    };
  },
  methods: {
    initDeviceInfo() {
      // 获取设备列表
      customerScreen().then((res) => {
        // console.log("设备列表", res.data);
        this.deviceList = res.data
      });
      let startDate = dateFormat(this.start, "yyyy-MM-dd HH:mm:ss");
      let endDate = dateFormat(this.end, "yyyy-MM-dd HH:mm:ss");
      //获取设备轨迹信息
      let params2={
        startDate: startDate,
        endDate: endDate,
        vehicleCode: this.deviceActive,
      }
      historyTrackDetail(params2).then((res) => {
          let data = res.data;
          // 设置地图中心点
          this.mapCenter = [
            data.centerPointLongtitude,
            data.centerPointLatitude,
          ];
          // 获取轨迹列表并渲染表格
          this.TrackList = data.listPoint; // 轨迹点列表
          this.totalSteps = data.listPoint.length; // 进度条总步数
          this.mileageStr = data.mileageStr; // 轨迹里程
          // 获取轨迹经纬度在地图上进行渲染
          let lineArr = [];
          data.listPoint.forEach((item) => {
            lineArr.push([item.longitude, item.latitude]);
          });
          this.trackLine = lineArr;
          // this.startTrack();
        });
    },
  },
};
</script>
