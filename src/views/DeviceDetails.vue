<template>
  <div class="DeviceDetails">
    <div class="mainBox" v-if="isshow">
      <div class="column">
        <FloatCard :more="true">
          <span slot="header">实时视频</span>
          <span
            slot="more"
            class="moreContent"
            @click="routerChange('realTimeMonitoring')"
            v-if="showVideo"
          >
            更多
            <i class="el-icon-arrow-right"></i>
          </span>
          <div slot="content" class="module1">
            <template v-if="showVideo">
              <div class="item-detail">
                <div class="detail-line">
                  <el-radio-group
                    v-model="channel"
                    @change="initVideo(equipmentNo)"
                    class="channel-content"
                  >
                    <el-radio-button
                      v-for="(aisle, index) in VideoChannelState.slice(0, 8)"
                      :label="index + 1"
                      :key="index"
                      :class="aisle === '1' ? 'channel-disabled' : ''"
                    >
                      <p
                        v-if="false"
                        class="dot"
                        :style="
                          'background:' +
                          (aisle === '0' ? '#13ca40' : '#d8d8d8')
                        "
                      ></p>
                      通道{{ index + 1 }}
                    </el-radio-button>
                  </el-radio-group>
                </div>
              </div>

              <div class="videoBox">
                <div style="height: 100%; width: 100%; background-color: red">
                  <CstorLivePlayer :src="videosrc"></CstorLivePlayer>
                </div>
              </div>
            </template>
            <el-empty
              style="height: 320px"
              v-else
              description="未安装视频终端或视频终端不在线"
            ></el-empty>
          </div>
        </FloatCard>
        <FloatCard>
          <span slot="header">设备数据</span>
          <div slot="content" class="module2">
            <el-tabs v-model="module2" @tab-click="handleClick">
              <el-tab-pane label="近7日油耗详情" name="first" class="container">
                <template v-if="deviceDetails.weekAnalysisData">
                  <p>
                    总计：{{ deviceDetails.baseInfo.weekOilCost }}&nbsp;L /
                    {{ deviceDetails.baseInfo.weekWorkTime }}&nbsp;h
                  </p>
                  <div class="content">
                    <EchartsComp :options="chart1"></EchartsComp>
                    <!-- <div class="chart loadCurve"></div> -->
                  </div>
                </template>
                <el-empty
                  style="height: 180px; width: 376px"
                  v-else
                  description=" "
                ></el-empty>
              </el-tab-pane>
              <el-tab-pane label="累计数据" name="second">
                <template v-if="deviceDetails.workConditionData">
                  <p>累计数据</p>
                  <div class="dataArea">
                    <div class="panel">
                      <h6>
                        {{ deviceDetails.workConditionData.totalOilCost
                        }}<span>&nbsp;L</span>
                      </h6>
                      <p>发动机总油耗</p>
                    </div>
                    <div class="panel">
                      <h6>
                        {{ deviceDetails.workConditionData.totalEnginWorkTime
                        }}<span>&nbsp;h</span>
                      </h6>
                      <p>累计工作时长</p>
                    </div>
                    <div class="panel">
                      <h6>
                        {{ deviceDetails.workConditionData.onTime
                        }}<span>&nbsp;h</span>
                      </h6>
                      <p>累计开机时长</p>
                    </div>
                    <div class="panel">
                      <h6>
                        {{ deviceDetails.workConditionData.workQuantity
                        }}<span>&nbsp;次</span>
                      </h6>
                      <p>累计吊载次数</p>
                    </div>
                    <div class="panel">
                      <h6>
                        {{ deviceDetails.weekAnalysisData.overLoadWorkQuantity
                        }}<span>&nbsp;次</span>
                      </h6>
                      <p>累计超载次数</p>
                    </div>
                    <div class="panel">
                      <h6>
                        {{
                          deviceDetails.workConditionData.storageBatteryVoltage
                            ? deviceDetails.workConditionData
                                .storageBatteryVoltage
                            : "--"
                        }}<span>&nbsp;V</span>
                      </h6>
                      <p>蓄电池电压</p>
                    </div>
                  </div>
                </template>
                <el-empty
                  style="height: 180px; width: 376px"
                  v-else
                  description=" "
                ></el-empty>
              </el-tab-pane>
            </el-tabs>
          </div>
        </FloatCard>
      </div>
      <div class="column">
        <FloatCard>
          <span slot="header">设备实时工况</span>
          <div slot="content" class="module3">
            <div class="devicePic" v-if="deviceDetails.workConditionData">
              <div class="ldd">
                <div class="mainHookRatios" title="主钩倍率">
                  {{ deviceDetails.workConditionData.mainHookRatios }}
                </div>
                <div class="mainHookRatedWeight" title="主钩额重">
                  {{ deviceDetails.workConditionData.mainHookRatedWeight }}
                </div>
                <div class="mainHookActualWeight" title="主钩实重">
                  {{ deviceDetails.workConditionData.mainHookActualWeight }}
                </div>
                <div class="mainHookRadius" title="主钩半径">
                  {{ deviceDetails.workConditionData.mainHookRadius
                  }}<span>&nbsp;m</span>
                </div>
                <div class="enginSpeed" title="发动机转数">
                  {{ deviceDetails.workConditionData.enginSpeed }}
                </div>
                <div class="totalEnginWorkTim" title="工作时长">
                  {{ deviceDetails.workConditionData.totalEnginWorkTime
                  }}<span>&nbsp;h</span>
                </div>
                <div class="torquePercent" title="力矩百分比">
                  {{ deviceDetails.workConditionData.torquePercent
                  }}<span>%</span>
                </div>
                <div class="windSpeed" title="风速">
                  {{ deviceDetails.workConditionData.windSpeed
                  }}<span>&nbsp;m/s</span>
                </div>
                <div class="unknownData1">-- m</div>
                <div class="unknownData2">50.3 m</div>
                <div class="mainHookAngle" title="主钩角度">
                  {{ deviceDetails.workConditionData.mainHookAngle
                  }}<span>&nbsp;°</span>
                </div>
                <div class="slaveHookRatios" title="副钩倍率">
                  {{ deviceDetails.workConditionData.slaveHookRatios }}
                </div>
                <div class="slaveHookRatedWeight" title="副钩额重">
                  {{ deviceDetails.workConditionData.slaveHookRatedWeight }}
                </div>
                <div class="slaveHookActualWeight" title="副钩实重">
                  {{ deviceDetails.workConditionData.slaveHookActualWeight }}
                </div>
                <div class="slaveHookRadius" title="副钩半径">
                  {{ deviceDetails.workConditionData.slaveHookRadius
                  }}<span>&nbsp;m</span>
                </div>
                <div class="slaveHookAngle" title="副钩半径">
                  {{ deviceDetails.workConditionData.slaveHookAngle }}
                  <span>°</span>
                </div>
                <div class="fuelMeter" title="燃油油量">
                  <div class="oilPercentage">
                    <EchartsComp :options="chart2"></EchartsComp>
                  </div>
                  <span>油量</span>
                </div>
              </div>
            </div>
            <el-empty
              style="height: 254px"
              v-else
              description="此设备无工况数据"
            ></el-empty>
            <div class="device_location">
              <p class="position">
                <label>
                  <i class="el-icon-location-outline"></i>
                  {{ deviceDetails.baseInfo.address }}
                </label>
              </p>
              <p>
                <i class="el-icon-time"></i>
                定位时间：{{ deviceDetails.baseInfo.locationTime }}
              </p>
              <p>
                <i class="el-icon-time"></i>
                工况时间：{{
                  deviceDetails.workConditionData
                    ? deviceDetails.workConditionData.workingConditionTime
                    : "--"
                }}
              </p>
            </div>
          </div>
        </FloatCard>
        <FloatCard>
          <span slot="header">状态信息</span>
          <div slot="content" class="module4">
            <el-tabs
              v-model="module4"
              @tab-click="handleClick"
              style="padding-left: 20px"
              v-if="deviceDetails.workConditionData"
            >
              <el-tab-pane label="开关量" name="first">
                <div class="switch">
                  <p class="title">
                    <span
                      >更新时间：{{
                        deviceDetails.weekAnalysisData
                          ? deviceDetails.weekAnalysisData.dataUpdateTime
                          : "--"
                      }}</span
                    >
                  </p>
                  <div class="switchContent">
                    <div>
                      <span>强制状态</span>
                      <span
                        :class="
                          deviceDetails.workConditionData.forceState == 0
                            ? 'switchStatus'
                            : ''
                        "
                      ></span>
                    </div>
                    <div>
                      <span>超载解除状态</span>
                      <span
                        :class="
                          deviceDetails.workConditionData.overLoadState == 0
                            ? 'switchStatus'
                            : ''
                        "
                      ></span>
                    </div>
                    <div>
                      <span>上电信号</span>
                      <span
                        :class="
                          deviceDetails.workConditionData.upState == 0
                            ? 'switchStatus'
                            : ''
                        "
                      ></span>
                    </div>
                    <div>
                      <span>钥匙ON</span
                      >{{ deviceDetails.workConditionData.onState }}
                    </div>
                    <div>
                      <span>钥匙START</span
                      >{{ deviceDetails.workConditionData.startState }}
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="警报" name="second">
                <!-- <p class="title">警报</p> -->
                <div class="alarms">
                  <div>
                    <span>高度限位</span>
                    <span
                      :class="
                        deviceDetails.workConditionData.heightLimit == '0'
                          ? 'alarmStatusGreen'
                          : 'alarmStatusRed'
                      "
                    ></span>
                  </div>
                  <div>
                    <span>超载报警</span>
                    <span
                      :class="
                        deviceDetails.workConditionData.overLoadAlarm == '0'
                          ? 'alarmStatusGreen'
                          : 'alarmStatusRed'
                      "
                    ></span>
                  </div>
                  <div>
                    <span>主卷三圈保护</span>
                    <span
                      :class="
                        deviceDetails.workConditionData.mainProtect == '0'
                          ? 'alarmStatusGreen'
                          : 'alarmStatusRed'
                      "
                    ></span>
                  </div>
                  <div>
                    <span>副卷三圈保护</span>
                    <span
                      :class="
                        deviceDetails.workConditionData.secondProtect == '0'
                          ? 'alarmStatusGreen'
                          : 'alarmStatusRed'
                      "
                    ></span>
                  </div>
                  <div>
                    <span>机油压力报警</span>
                    {{ deviceDetails.workConditionData.enginOilPressureAlarm }}
                  </div>
                  <div>
                    <span>水温高报警</span>
                    {{
                      deviceDetails.workConditionData.enginWaterTemperatureAlarm
                    }}
                  </div>
                  <div>
                    <span>水位报警</span>
                    {{ deviceDetails.workConditionData.waterLevelAlarm }}
                  </div>
                  <div>
                    <span>电池报警</span>
                    {{ deviceDetails.workConditionData.chargeAlarm }}
                  </div>
                  <div>
                    <span>低气压报警</span>
                    {{ deviceDetails.workConditionData.lowPressureAlarm }}
                  </div>
                  <div>
                    <span>机油液位报警</span>
                    {{ deviceDetails.workConditionData.oilLevelAlarm }}
                  </div>
                  <div>
                    <span>关闭发动机指示灯</span>
                    {{ deviceDetails.workConditionData.closeEngineLight }}
                  </div>
                  <div>
                    <span>检查发动机指示灯</span>
                    {{ deviceDetails.workConditionData.checkEnginLight }}
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <el-empty
              style="height: 270px"
              v-else
              description="此设备无状态信息"
            ></el-empty>
          </div>
        </FloatCard>
      </div>
      <div class="column">
        <FloatCard :more="false">
          <span slot="header">设备信息</span>
          <span v-if="false" slot="more" class="moreContent">
            更多
            <i class="el-icon-arrow-right"></i>
          </span>
          <div slot="content" class="module5">
            <div class="detail">
              <p>设备名称：&nbsp;{{ deviceDetails.baseInfo.name }}</p>
              <p>
                设备类型：&nbsp;{{
                  deviceDetails.baseInfo.typeLabel
                    ? deviceDetails.baseInfo.typeLabel
                    : "--"
                }}
              </p>
              <p>
                设备编号：&nbsp;{{
                  deviceDetails.baseInfo.equipmentNo
                    ? deviceDetails.baseInfo.equipmentNo
                    : "--"
                }}
              </p>
              <p>
                设备型号：&nbsp;{{
                  deviceDetails.baseInfo.modelLabel
                    ? deviceDetails.baseInfo.modelLabel
                    : "--"
                }}
              </p>
              <p>
                责&nbsp;任&nbsp;人&nbsp;：&nbsp;{{
                  deviceDetails.baseInfo.staffName
                    ? deviceDetails.baseInfo.staffName
                    : "--"
                }}
              </p>
              <p>
                权限类型：&nbsp;{{
                  deviceDetails.baseInfo.permissionTypeLabel
                    ? deviceDetails.baseInfo.permissionTypeLabel
                    : "--"
                }}
              </p>
              <p>
                动力类型：&nbsp;{{
                  deviceDetails.baseInfo.powerTypeLable
                    ? deviceDetails.baseInfo.powerTypeLable
                    : "--"
                }}
              </p>
              <p>
                定位状态：&nbsp;{{
                  deviceDetails.baseInfo.locationState ? "已定位" : "未定位"
                }}
              </p>
            </div>
          </div>
        </FloatCard>
        <FloatCard :more="true">
          <span slot="header">风险事件统计</span>
          <span slot="more" class="moreContent" @click="goAlarm('all')">
            更多
            <i class="el-icon-arrow-right"></i>
          </span>
          <div slot="content" class="module6">
            <div class="detail-line">
              <div class="riskEvent r1" @click="goAlarm('height')">
                <i style="color: #ff4620" class="el-icon-warning"></i>
                <div>
                  <h6>{{ highRisk }}</h6>
                  <p>高风险事件</p>
                </div>
              </div>
              <div class="riskEvent r2" @click="goAlarm('medium')">
                <i style="color: #ff9a00" class="el-icon-warning"></i>
                <div>
                  <h6>{{ mediumRisk }}</h6>
                  <p>中风险事件</p>
                </div>
              </div>
              <div class="riskEvent r3" @click="goAlarm('low')">
                <i style="color: #fbc800" class="el-icon-warning"></i>
                <div>
                  <h6>{{ lowRisk }}</h6>
                  <p>低风险事件</p>
                </div>
              </div>
            </div>
          </div>
        </FloatCard>
      </div>
    </div>
  </div>
</template>

<script>
import FloatCard from "@/components/FloatCard.vue";
// 引入图表组件
import EchartsComp from "@/components/EchartsComponent.vue";
// 引入在线视频播放组件
import CstorLivePlayer from "cstor-live-player";
import "cstor-live-player/dist/cstor-live-player.css";
import mixin from "../utils/mixin";
import {detailWithWorkConditionData,vehicleCode,videoChannelState,videoPlay} from "@/api/zqData";

export default {
  mixins: [mixin],
  components: {
    FloatCard,
    EchartsComp,
    CstorLivePlayer,
  },
  data() {
    return {
      // 整个页面是否显示（未获取到数据就暂时不显示
      isshow: false,
      // 设备实时工况数据
      deviceDetails: {},
      //----工况信息部分--------------------------
      // 模块二tab页标识数据
      module2: "first",
      // 模块四tab页标识数据
      module4: "first",
      // 近七日设备工作时间和油耗图表配置数据
      chart1: {},
      // 设备实时油耗图表配置数据
      chart2: {},
      //----实时视频部分--------------------------
      // 设备编号值
      equipmentNo: "",
      // 获取到的实时监控通道信息
      VideoChannelState: [],
      //用户选中的通道
      channel: 1,
      oldChannel: 0,
      // 实时监控视频链接
      videosrc: "",
      showVideo: false,
      // 高中低风险事件数
      highRisk: 0,
      mediumRisk: 0,
      lowRisk: 0,
    };
  },
  computed: {
    // 传入的设备id值，如没有就使用默认设备id值
    id() {
      let id;
      if (this.$route.params.id) {
        id = this.$route.params.id;
      } else if (this.$route.query.deviceInfo) {
        id = this.$route.query.deviceInfo.id;
      }
      return id ? id : "c1e221866ab84ae28aeb89f975a667c4";
    },
  },
  destroyed() {
    this.stopHeartBeat(this.oldChannel);
  },
  created() {
    // 获取设备信息
    this.getDeviceDetails();
  },
  methods: {
    initChannel(vehicleCodes) {
      vehicleCode({vehicleCodes:vehicleCodes}).then((val) => {
        let data = val.data[0];
        // 赋值获取到的数据
        this.VideoCarByVehicleCode = data;
        if (data == undefined) {
          return;
        }
        videoChannelState({terminalId:data.terminalId}).then((val) => {
          this.showVideo = true;
          // 把通道信息分割成数组
          let data = val.data[0].split(",").map(Number);
          // 通道信息赋值给data数据在页面显示状态
          this.VideoChannelState = data;
          // console.log("this.VideoChannelState", this.VideoChannelState);
        });
      });
    },
    // 获取视频并赋值函数
    initVideo(equipmentNo) {
      let params={
        // 整车编号
        vehicleCode: equipmentNo,
        // 终端类型 1上车 2下车
        videoTerType: 1,
        // 通道号
        channel: this.channel,
        // 视频地址类型0 rtmp 1http-flv
        videoAddrType: 1,
        // 视频清晰度 0高清 1流畅
        streamType: 0,
      }
      videoPlay(params).then(val => {
        this.stopHeartBeat(this.oldChannel) //停止上一个视频的心跳
        if (val.data.data == null) {
          return;
        }
        let data = val.data.split("|");
        this.videosrc = data[1];
        this.setHeartBeat(data[2],this.channel);
        this.oldChannel=this.channel //记录这一次的视频通道
      });
    },
    // elementui切换tab页函数，勿删
    handleClick(tab, event){

    },
    // 获取设备详细工况信息
    getDeviceDetails() {
      detailWithWorkConditionData(this.id).then((res) => {
        let data = res.data;
        // 赋值设备实时工况数据
        this.deviceDetails = data;
        // 获取到数据之后显示页面
        this.isshow = true;
        // 为第一个图表（近7日数据）传入设备数据，把返回的图表配置信息赋值
        if (data.weekAnalysisData) {
          this.chart1 = this.$EchartsData.Dchart1(
            data.weekAnalysisData.details
          );
        }
        // 为第二个图表（油量百分比）传入设备数据，把返回的图表配置信息赋值
        if (data.workConditionData) {
          this.chart2 = this.$EchartsData.Dchart2(
            data.workConditionData.remainingOilPercent
          );
        }
        this.equipmentNo = data.baseInfo.equipmentNo;
        // this.equipmentNo='CC0260CB5362'
        this.initChannel(this.equipmentNo);
        this.initVideo(this.equipmentNo);
      });
      // 获取设备近期风险信息
      let time = new Date().getTime();
      this.$api.getnewAlarm(this.id, time).then((res) => {
        let data = res.data.data;
        this.lowRisk = data[2].amount;
        this.mediumRisk = data[1].amount;
        this.highRisk = data[0].amount;
      });
    },
    // 切换路由
    routerChange(path) {
      this.stopHeartBeat(this.oldChannel);
      this.$router.push({
        name: path,
        params: {
          equipmentNo: this.equipmentNo,
          id: this.id,
        },
      });
    },
    goAlarm(riskLevel) {
      this.$router.push({
        name: "deviceAlarm",
        params: {
          deviceDetails: this.deviceDetails,
          riskLevel: riskLevel,
        },
      });
    },
  },
};
</script>

<style lang="less">
.DeviceDetails {
  font-size: 1.6em;
  height: calc(100vh - 80px);
  .mainBox {
    display: flex;
    min-width: 1024px;
    max-width: 1920px;
    margin: 10px auto;
    padding: 10px 35px 0;
    .column {
      .el-tabs__active-bar.is-top {
        background-color: #f2ce91;
      }
      .el-tabs__item.is-top.is-active {
        color: #f2ce91;
      }
      .el-tabs__item.is-top:hover {
        color: #f2ce91;
      }
      flex: 6;
      .module1 {
        height: 320px;
        .detail-line {
          position: relative;
          height: 100px;
          z-index: 9;

          .channel-content {
            z-index: 50;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;
            height: 74px;
            overflow: hidden;
            background-color: #fff0;
            .el-radio-button__inner {
              position: relative;
              width: 80%;
              height: 25px;
              margin: 5px 10px;
              line-height: 25.6px;
              color: #999;
              background: #fff;
              border: 1px solid #d8d8d8;
              border-radius: 3.2px;
              cursor: pointer;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: none;
              .dot {
                position: absolute;
                top: 8px;
                left: 4px;
                display: block;
                margin: 2.4px;
                content: "";
                width: 4px;
                height: 4px;
                background: #13ca40;
                border-radius: 50%;
              }
            }
            .el-radio-button__inner:hover {
              border-color: #f2ce91;
              color: #f2ce91;
            }
          }
          .is-active {
            .el-radio-button__inner {
              background: #fcf5e9;
              color: #fbb134;
            }
          }
          .channel-content:hover {
            // overflow: auto !important;
            height: 74px !important;
          }
        }
        .videoBox {
          position: relative;
          top: -25px;
          height: calc(100% - 74px);
        }
        .noVideo {
          height: 55%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .videoStatus,
          .hasVideo {
            margin: 0 auto;
            width: 170px;
            height: 90px;
            background-size: 100%;
            background-repeat: no-repeat;
          }

          .videoStatus {
            background-image: url("@/assets/images/kzuqi/noVideoOnline.png");
          }

          .hasVideo {
            width: 150px;
            height: 100px;
            margin-bottom: 20px;
            background-image: url("@/assets/images/kzuqi/noVideo.png");
          }

          p {
            text-align: center;
            color: rgba(173, 200, 205, 0.6);
            font-size: 12px;
          }
        }
      }
      .module2 {
        height: 270px;
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          p {
            width: 80%;
          }
          .content {
            height: 204px;
            width: 376px;
          }
        }
        .dataArea {
          margin-top: 20px;
          min-width: 376px;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;

          .panel {
            position: relative;
            width: 29%;
            height: 54px;
            margin: 6px;
            border: 1px solid #000;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: url("@/assets/images/digitalScreen/line\(1\).png")
              rgba(255, 255, 255, 0.13);

            &::before {
              content: "";
              position: absolute;
              top: -6px;
              left: -6px;
              width: 100%;
              border-left: 1px solid #000;
              border-top: 1px solid #000;
            }

            &::after {
              content: "";
              position: absolute;
              top: -6px;
              left: -6px;
              width: 10px;
              height: 5px;
              border-left: 1px solid #000;
              border-top: 1px solid #000;
            }

            h6 {
              font-size: 20px;

              &::after {
                content: "";
                position: absolute;
                bottom: -1px;
                right: -1px;

                border-left: 10px solid transparent;
                border-right: 10px solid #333;
                border-top: 10px solid transparent;
                width: 0;
                height: 0;
              }

              span {
                font-size: 10px;
              }
            }

            p {
              margin-top: 5px;
              font-size: 12px;
              color: #000;
            }
          }
        }
      }
      .module3 {
        height: 320px;
        .devicePic {
          display: flex;
          justify-content: center;
          text-align: center;
          border-bottom: 1px dashed gray;
          .ldd {
            position: relative;
            width: 380px;
            height: 254px;
            background: url("@/assets/test/ldd3.png") no-repeat;
            background-size: contain;
            font-size: 14px;
            > div {
              font-size: 12px;
            }
            .fuelMeter {
              position: absolute;
              top: 186px;
              left: 274px;
              .oilPercentage {
                width: 120px;
                height: 80px;
                z-index: 99;
              }
              span {
                position: absolute;
                font-size: 12px;
                top: 25px;
                left: 50%;
                transform: translatex(-50%);
              }
            }
            .mainHookRatios {
              position: absolute;
              top: 14px;
              left: 60px;
              color: #fff;
            }
            .mainHookRatedWeight {
              position: absolute;
              top: 79px;
              left: 22px;
              color: #818181;
              width: 33px;
            }
            .mainHookActualWeight {
              position: absolute;
              top: 79px;
              left: 60px;
              color: #818181;
              width: 33px;
            }
            .mainHookRadius {
              position: absolute;
              width: 50px;
              top: 130px;
              left: 44px;
              color: #fff;
            }
            .enginSpeed {
              position: absolute;
              width: 57px;
              top: 179px;
              left: 39px;
              color: #000;
            }
            .totalEnginWorkTim {
              position: absolute;
              width: 57px;
              top: 204px;
              left: 39px;
              color: #000;
            }
            .torquePercent {
              position: absolute;
              top: 12px;
              left: 176px;
              color: #818181;
            }
            .windSpeed {
              position: absolute;
              top: 39px;
              left: 158px;
              color: #818181;
            }
            .unknownData1 {
              position: absolute;
              top: 72px;
              left: 142px;
              color: #818181;
            }
            .unknownData2 {
              position: absolute;
              top: 139px;
              left: 106px;
              color: #818181;
            }
            .mainHookAngle {
              position: absolute;
              top: 206px;
              left: 228px;
              color: #818181;
            }
            .slaveHookRatios {
              position: absolute;
              top: 14px;
              right: 44px;
              color: #fff;
            }
            .slaveHookRatedWeight {
              position: absolute;
              top: 79px;
              right: 57px;
              color: #818181;
              width: 33px;
            }
            .slaveHookActualWeight {
              position: absolute;
              top: 79px;
              right: 19px;
              color: #818181;
              width: 33px;
            }
            .slaveHookRadius {
              position: absolute;
              width: 50px;
              top: 130px;
              right: 18px;
              color: #fff;
            }
            .slaveHookAngle {
              position: absolute;
              width: 50px;
              top: 168px;
              right: 18px;
              color: #fff;
            }
          }
        }
        .device_location {
          text-align: center;
          color: #142628;
          // height: 61px;
          .position {
            font-size: 14px;
            display: flex;
            align-items: center;
            height: 31px;
            margin-top: 6px;
          }
          p {
            margin-top: 3px;
          }
        }
      }
      .module4 {
        height: 270px;
        .title {
          display: flex;
          justify-content: space-between;
          font-size: 25px;
          padding-bottom: 20px;

          span {
            font-size: 16px;
          }

          border-bottom: 1px dashed gray;
        }
        .switch {
          .switchContent {
            display: flex;
            flex-wrap: wrap;

            div {
              width: 170px;
              margin-top: 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .switchStatus {
                margin-right: 30px;
                background: #d0d0d0;
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
              }
            }
          }
        }

        .alarms {
          display: flex;
          flex-wrap: wrap;

          div {
            width: 170px;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .alarmStatusRed {
              margin-right: 30px;
              background: red;
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
            }
            .alarmStatusGreen {
              margin-right: 30px;
              background: #35ff03;
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
            }
          }
        }
      }
      .module5 {
        height: 320px;
        .detail {
          // height: 100%;
          p {
            padding: 24px 10px 0 10px;
          }
        }
      }
      .module6 {
        height: 255px;
        .detail-line {
          height: 100%;
          padding-bottom: 26px;
          .riskEvent {
            display: flex;
            background-color: #f3f3f3;
            border-radius: 5px;
            margin-top: 15px;
            cursor: pointer;
            i {
              font-size: 55px;
              padding: 5px;
              margin-right: 30px;
            }
            div {
              display: flex;
              flex-direction: column;
              text-align: center;
              align-items: center;
              justify-content: center;
              h6 {
                font-size: 18px;
                font-weight: 700;
                padding-bottom: 5px;
              }
            }
          }
        }
      }
    }
    .column:nth-child(2) {
      flex: 8;
      margin: 0 10px 0;
      height: 100%;
    }
  }
}
</style>
