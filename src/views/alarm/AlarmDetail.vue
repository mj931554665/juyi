<template>
  <div class="alarmDetail">
    <div>
      <div class="baseInfo">
        <p class="dom"></p>
        <p class="message">设备信息</p>
      </div>
      <div class="detail">
        <el-row :gutter="20">
          <el-col :span="7" :offset="3">
            <span>设备名称：</span><span>{{ deviceName }}</span>
          </el-col>
          <el-col :span="7">
            <span>设备编号：</span><span>{{ equipmentNo }}</span>
          </el-col>
          <el-col :span="7">
            <span>车牌号：</span><span>{{ plateNo }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 40px">
          <el-col :span="7" :offset="3">
            <span>设备吨位：</span><span>{{ equipmentTons }}</span>
          </el-col>
          <el-col :span="7">
            <span>设备类型：</span><span>{{ equipmentType }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin-top: 40px">
      <div class="baseInfo">
        <p class="dom"></p>
        <p class="message">风险信息</p>
      </div>
      <div class="detail">
        <el-row :gutter="20">
          <el-col :span="3" class="alarm"></el-col>
          <el-col :span="21" style="padding: 0">
            <el-row>
              <el-col
                :span="12"
                style="font-size: 19px; font-weight: bold; color: #2c2b30"
                >{{ alarmEventName }}</el-col
              >
              <el-col :span="12" style="font-size: 15px; color: #909399"
                ><span>风险类型：</span><span>{{ alarmType }}</span></el-col
              >
            </el-row>
            <el-row style="margin: 22px 0; color: #404040">
              <span>事件描述：</span>
              <span>{{ eventDesc }}</span>
            </el-row>
            <el-row style="margin: 22px 0; color: #404040">
              <span>事件后果：</span>
              <span>{{ eventEffect }}</span>
            </el-row>
            <el-row>
              <el-col :span="12">{{ address }}</el-col>
              <el-col :span="12" style="text-align: right">{{
                locationTime
              }}</el-col>
            </el-row>
            <el-row style="width: 100%; height: 350px; margin-top: 5px">
            </el-row>
            <el-row style="margin: 30px 0">
              <el-col :span="22" :offset="2">
                <span>处理状态：</span><span>未处理</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlarmDetail",
  props: {
    alarmDetailInfo: {
      type: Object,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      deviceName: "", //设备名称
      equipmentNo: "", //设备编号
      plateNo: "", //车牌号
      equipmentTons: "", //设备吨位
      equipmentType: "", //设备类型
      alarmEventName: "", //风险事件名称
      alarmType: "", //风险类型
      eventDesc: "", //事件描述
      eventEffect: "", //事件后果
      address: "", //地址
      locationTime: "", //时间
      lat: "", //纬度
      lng: "", //经度
      dealStatus: "", //处理状态
    };
  },
  created() {
    this.deviceName = this.alarmDetailInfo.baseInfo.name;
    this.equipmentNo = this.alarmDetailInfo.baseInfo.equipmentNo;
    this.plateNo = this.alarmDetailInfo.baseInfo.plateNo;
    this.equipmentTons = this.alarmDetailInfo.baseInfo.modelLabel;
    this.equipmentType = this.alarmDetailInfo.baseInfo.typeLabel;
    this.alarmEventName = this.alarmDetailInfo.alarmName;
    this.alarmType = this.alarmDetailInfo.alarmFromLabel;
    this.eventDesc = this.alarmDetailInfo.alarmDesc;
    this.eventEffect = this.alarmDetailInfo.alarmDanger;
    this.address = this.alarmDetailInfo.baseInfo.address;
    this.locationTime = this.alarmDetailInfo.baseInfo.locationTime;
    this.lat = this.alarmDetailInfo.lat;
    this.lng = this.alarmDetailInfo.lng;
    let status = this.alarmDetailInfo.dealStatus;
    if (status === 0) {
      this.dealStatus = "未处理";
    } else if (status === 1) {
      this.dealStatus = "已解决";
    } else {
      this.dealStatus = "已知晓";
    }
  },
};
</script>

<style lang="less">
.alarmDetail {
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  .baseInfo {
    display: flex;
    .dom {
      border: 1px red solid;
      margin-right: 5px;
      width: 5px;
      height: 13px;
      background-color: red;
      margin-top: 2px;
    }
    .message {
      font-weight: bold;
      font-size: 17px;
    }
  }
  .detail {
    margin-top: 40px;
    font-size: 15px;
    color: #666666;
    .alarm {
      width: 40px;
      height: 100px;
      background: url("../../assets/images/kzuqi/alarm.png") no-repeat;
      background-size: 100%;
      margin: 0 15px 0 20px;
    }
  }
}
</style>
