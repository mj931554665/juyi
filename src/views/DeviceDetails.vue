<template>
  <div class="DeviceDetails">
    <!-- <NavbarComponent :breadCrumbList="breadCrumbList"></NavbarComponent> -->

    <div class="mainBox">
      <div class="column">
        <FloatCard :more="true">
          <span slot="header">实时视频</span>
          <span
            slot="more"
            class="moreContent"
            @click="routerChange('realTimeMonitoring')"
          >
            更多
            <i class="el-icon-arrow-right"></i>
          </span>
          <div slot="content" class="module1">
            <div class="item-detail">
              <div class="detail-line">
                <div class="channel-content">
                  <div>
                    <div title="通道1" class="channel-item active">
                      <div>通道1</div>
                    </div>
                  </div>
                  <div>
                    <div title="通道2" class="channel-item active">
                      <div>通道2</div>
                    </div>
                  </div>
                  <div>
                    <div title="通道3" class="channel-item active">
                      <div>通道3</div>
                    </div>
                  </div>
                  <div>
                    <div title="通道4" class="channel-item active">
                      <div>通道4</div>
                    </div>
                  </div>
                  <div>
                    <div title="通道5" class="channel-item active">
                      <div>通道5</div>
                    </div>
                  </div>
                  <div>
                    <div title="通道6" class="channel-item active">
                      <div>通道6</div>
                    </div>
                  </div>
                  <div>
                    <div title="通道7" class="channel-item active">
                      <div>通道7</div>
                    </div>
                  </div>
                  <div>
                    <div title="通道8" class="channel-item active">
                      <div>通道8</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="videoBox">
              <div class="videoSize" style="height: 214px">
                <video src="@/assets/test/videotest.mp4"></video>
              </div>
              <div id="videoBottomBox0" class="videoBottomBox">
                <div style="float: left; padding-left: 1em">
                  通道1
                  <div class="el-dropdown" style="cursor: pointer">
                    <span>
                      <i title="选择像素" class="el-icon-setting"></i>
                    </span>
                  </div>
                  0Kbps
                </div>
                <i title="录像" class="el-icon-video-camera-solid"></i>
                <i title="截图" class="el-icon-camera-solid"></i>
                <i title="全屏" class="el-icon-full-screen"></i>
              </div>
            </div>
          </div>
        </FloatCard>
        <FloatCard>
          <span slot="header">设备数据</span>
          <div slot="content" class="module2">
            <el-tabs v-model="module2" @tab-click="handleClick">
              <el-tab-pane label="近7日油耗详情" name="first">
                <p>
                  总计：{{ deviceDetails.baseInfo.weekOilCost }}&nbsp;L /
                  {{ deviceDetails.baseInfo.weekWorkTime }}&nbsp;h
                </p>
                <div class="content">
                  <div class="chart loadCurve"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="累计数据" name="second">
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
              </el-tab-pane>
            </el-tabs>
          </div>
        </FloatCard>
      </div>
      <div class="column">
        <FloatCard>
          <span slot="header">设备状态</span>
          <div slot="content" class="module3">
            <div class="devicePic">
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
                  <div class="oilPercentage"></div>
                  <span>油量</span>
                </div>
              </div>
            </div>
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
                  deviceDetails.workConditionData.workingConditionTime
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
            >
              <el-tab-pane label="开关量" name="first">
                <div class="switch">
                  <p class="title">
                    <span
                      >更新时间：{{
                        deviceDetails.weekAnalysisData.dataUpdateTime
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
          </div>
        </FloatCard>
      </div>
      <div class="column">
        <FloatCard :more="true">
          <span slot="header">设备信息</span>
          <span slot="more" class="moreContent">
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
          <span
            slot="more"
            class="moreContent"
            @click="routerChange('deviceAlarm')"
          >
            更多
            <i class="el-icon-arrow-right"></i>
          </span>
          <div slot="content" class="module6">
            <div class="detail-line">
              <div class="riskEvent r1">
                <i style="color: #ff4620" class="el-icon-warning"></i>
                <div>
                  <h6>0</h6>
                  <p>高风险事件</p>
                </div>
              </div>
              <div class="riskEvent r2">
                <i style="color: #ff9a00" class="el-icon-warning"></i>
                <div>
                  <h6>0</h6>
                  <p>中风险事件</p>
                </div>
              </div>
              <div class="riskEvent r3">
                <i style="color: #fbc800" class="el-icon-warning"></i>
                <div>
                  <h6>0</h6>
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
// import NavbarComponent from "@/components/NavbarComponent";
import FloatCard from "@/components/FloatCard.vue";
import MyEcharts from "@/components/EchartsComponent.vue";
export default {
  components: {
    // NavbarComponent,
    FloatCard,
    MyEcharts,
  },
  data() {
    return {
      // 模块二tab页标识数据
      module2: "first",
      // 模块四tab页标识数据
      module4: "first",
      // 设备工况数据详情
      deviceDetails: JSON.parse(
        localStorage.getItem("DeviceDetails_deviceDetails")
      ),
      weekData: JSON.parse(localStorage.getItem("DeviceDetails_deviceDetails"))
        .weekAnalysisData.details,
    };
  },
  computed: {
    // 传入的设备id值，如没有就使用默认设备id值
    id() {
      return this.$route.params.id
        ? this.$route.params.id
        : "c1e221866ab84ae28aeb89f975a667c4";
    },
    // 导航面包屑
    breadCrumbList() {
      this.$route.matched.shift();
      return this.$route.matched;
    },
    // 七日工作时长和油耗图表数据
    // 近七日日期
    dataDate() {
      // 声明图表x轴初始变量
      let dataX = [];
      // 对数据进行遍历，提取日期数据并转换格式
      this.weekData.forEach((item) => {
        if (item.dataDate.slice(4, 8)[0] == 0) {
          // 截取拼接字符
          dataX.push(
            item.dataDate.slice(5, 6) + "/" + item.dataDate.slice(6, 8)
          );
        } else {
          dataX.push(
            item.dataDate.slice(4, 6) + "月" + item.dataDate.slice(6, 8)
          );
        }
      });
      return dataX;
    },
    // 近七日耗油量
    dataOilCost() {
      let dataY1 = [];
      // 对数据进行遍历，提取耗油量数据
      this.weekData.forEach((item) => {
        dataY1.push(item.oilCost);
      });
      return dataY1;
    },
    // 近七日工作时间
    dataWorkTime() {
      let dataY = [];
      // 对数据进行遍历，提取工作时间数据
      this.weekData.forEach((item) => {
        dataY.push(item.workTime);
      });
      return dataY;
    },
  },
  methods: {
    // 模块二工作时长图表
    initLoadCurve() {
      const chart = this.$echarts.init(document.querySelector(".loadCurve"));
      // 近七日日期
      let dataX = this.dataDate;
      // 近七日油耗
      let dataY1 = this.dataOilCost;
      let dataY = this.dataWorkTime;
      console.log(dataX, "--", dataY1, "--", dataY);
      let option = {
        // backgroundColor: "#0D2753",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return (
              dataX[params[0].dataIndex] +
              "<br/>工作时长：" +
              dataY[params[0].dataIndex] +
              " h" +
              "<br> 油耗：" +
              dataY1[params[0].dataIndex] +
              " L"
            );
          },
        },
        grid: {
          top: "10%",
          bottom: "0%",
          left: "5%",
          right: "5%",
          containLabel: true,
        },
        legend: {
          show: true,
          data: ["油耗", "工作时长"],
          left: "center",
          top: "0",
          textStyle: {
            padding: [4, 0, 0, 0],
            color: "33FFFF",
          },
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 25,
        },
        xAxis: {
          type: "category",
          data: dataX,
          axisLine: {
            lineStyle: {
              color: "rgba(66, 192, 255, .3)",
            },
          },

          axisLabel: {
            rotate: -45,
            textStyle: {
              color: "#000",
            },
          },
        },

        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#000",
              },
            },
            axisLine: {
              lineStyle: {
                fontSize: 12,
                color: "rgba(66, 192, 255, .3)",
              },
            },
          },
          {
            type: "value",
            name: "",
            nameTextStyle: {
              color: "#d2d2d2",
            },
            // max: "100",
            min: "0",
            scale: true,
            position: "right",
            axisLine: {
              lineStyle: {
                color: "rgba(66, 192, 255, .3)",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: "{value} ", //右侧Y轴文字显示
              textStyle: {
                fontSize: 12,
                color: "#000",
              },
            },
          },
        ],
        series: [
          {
            name: "油耗",
            type: "bar",
            barWidth: "12px",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#205aff",
                  },
                  {
                    offset: 1,
                    color: "#4bdfff",
                  },
                ]),
                barBorderRadius: 6,
              },
            },
            data: dataY1,
          },
          {
            name: "工作时长",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: false, //平滑曲线显示

            symbol: "circle", //标记的图形为实心圆
            symbolSize: 8, //标记的大小
            itemStyle: {
              normal: {
                color: "#ffa43a",
                borderColor: "rgba(255, 234, 0, 0.5)", //圆点透明 边框
                borderWidth: 5,
              },
            },
            lineStyle: {
              color: "#ffa43a",
            },

            data: dataY,
          },
        ],
      };

      // 3,把配置给实例对象
      chart.setOption(option);
      // 4,图表跟随屏幕自适应
      window.addEventListener("resize", function () {
        chart.resize();
      });
    },
    // 模块三油量图表
    initOilPercentage() {
      const chart = this.$echarts.init(
        document.querySelector(".oilPercentage")
      );
      let angle = 0; //角度，用来做简单的动画效果的
      let value = this.deviceDetails.workConditionData.remainingOilPercent; //图上角度数据
      let option = {
        // backgroundColor: "#061740",
        title: [
          {
            text: "{a|" + value + "}{c|%}",
            x: "center",
            y: "50%",
            textStyle: {
              rich: {
                a: {
                  // fontSize: 45,
                  color: "#000",
                  fontWeight: "bold",
                },
                c: {
                  // fontSize: 45,
                  color: "#000",
                  fontWeight: "normal",
                },
              },
            },
          },
        ],
        series: [
          //内环
          {
            name: "",
            type: "custom",
            coordinateSystem: "none",
            renderItem: function (params, api) {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2.3) * 0.65,
                  startAngle: ((0 + -angle) * Math.PI) / 180,
                  endAngle: ((360 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#0CD3DB",
                  fill: "transparent",
                  lineWidth: 0.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          //外环
          {
            name: "",
            type: "pie",
            radius: ["85%", "70%"],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              position: "center",
            },
            data: [
              {
                value: value,
                name: "",
                itemStyle: {
                  //外环发光
                  borderWidth: 0.5,
                  shadowBlur: 20,
                  borderColor: "#4bf3f9",
                  shadowColor: "#9bfeff",
                  color: {
                    // 圆环的颜色
                    colorStops: [
                      {
                        offset: 0,
                        color: "#205aff", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#4bf3f9", // 100% 处的颜色
                      },
                    ],
                  },
                },
              },
              {
                value: 100 - value,
                name: "",
                label: {
                  show: false,
                },
                itemStyle: {
                  color: "#173164",
                },
              },
            ],
          },
        ],
      };

      chart.setOption(option);
    },
    handleClick(tab, event) {},
    async getDeviceDetails() {
      let data = await this.$api.getDetailWithWorkConditionData(this.id);
      console.log("1234", this.id);
      this.$api.judgeResponse(data, "DeviceDetails_deviceDetails");
      this.deviceDetails = JSON.parse(
        localStorage.getItem("DeviceDetails_deviceDetails")
      );
      console.log("设备详情", this.deviceDetails);
    },
    routerChange(path) {
      this.$router.push({
        name: path,
        params: {
          id: this.deviceDetails,
        },
      });
    },
  },
  created() {
    // 获取设备信息
    this.getDeviceDetails();
  },
  mounted() {
    this.initLoadCurve();
    this.initOilPercentage();
  },
};
</script>

<style lang="less">
// @import "@/assets/test/font/iconfont.css";/
.mainBox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 20px auto;
  padding: 10px 35px 0;
  .column {
    .FloatCard-item-header {
      // background-color: rgba(64, 158, 255, 0.54);
    }
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
          justify-content: space-between;
          height: 40px;
          overflow: hidden;
          background-color: #fff;

          .channel-item {
            position: relative;
            width: 60px;
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

            &:before {
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

            div {
              padding-left: 7.8px;
              margin-right: 4.8px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: center;
              line-height: normal;
            }
          }
        }
        .channel-content:hover {
          overflow: auto !important;
          height: 74px !important;
        }
      }
      .videoBox {
        position: relative;

        .videoBottomBox {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 20px;
          color: rgba(200, 229, 233, 0.7);
          background: #000;
          text-align: right;
        }

        i {
          margin-right: 5px;
          cursor: pointer;
        }

        .videoSize {
          display: flex;
          justify-content: center;

          video {
            position: relative;
            top: -55px;
            height: calc(120% - 0px);
            display: inline-block;
            text-align: center;
          }
        }
      }
    }
    .module2 {
      height: 270px;
      .chart {
        height: 204px;
        width: 376px;
      }
      .dataArea {
        margin-top: 20px;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .panel {
          position: relative;
          width: 90px;
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
            top: 78px;
            left: 22px;
            color: #818181;
            width: 33px;
          }
          .mainHookActualWeight {
            position: absolute;
            top: 78px;
            left: 60px;
            color: #818181;
            width: 33px;
          }
          .mainHookRadius {
            position: absolute;
            top: 130px;
            left: 49px;
            color: #fff;
          }
          .enginSpeed {
            position: absolute;
            top: 179px;
            left: 49px;
            color: #000;
          }
          .totalEnginWorkTim {
            position: absolute;
            top: 204px;
            left: 40px;
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
            top: 78px;
            right: 57px;
            color: #818181;
            width: 33px;
          }
          .slaveHookActualWeight {
            position: absolute;
            top: 78px;
            right: 19px;
            color: #818181;
            width: 33px;
          }
          .slaveHookRadius {
            position: absolute;
            top: 129px;
            right: 25px;
            color: #fff;
          }
          .slaveHookAngle {
            position: absolute;
            top: 167px;
            right: 25px;
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
          background-color: #e7cece;
          border-radius: 10px;
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
          }
        }
      }
    }
  }
  .column:nth-child(2) {
    flex: 8;
    margin: 0 20px 0;
    height: 100%;
  }
}
</style>