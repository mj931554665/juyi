<template>
  <div class="DeviceDetails">
    <!-- <NavigationBar :breadCrumbList="breadCrumbList"></NavigationBar> -->

    <div class="mainBox">
      <div class="column">
        <FloatCard>
          <span slot="header">实时视频</span>
          <div slot="content" class="module1">
            <div class="item-detail">
              <div class="detail-line">
                <div class="channel-content">
                  <div data-v-7a856cc4="">
                    <div
                      data-v-7a856cc4=""
                      title="通道1"
                      class="channel-item active"
                    >
                      <div data-v-7a856cc4="">通道1</div>
                    </div>
                  </div>
                  <div data-v-7a856cc4="">
                    <div
                      data-v-7a856cc4=""
                      title="通道2"
                      class="channel-item active"
                    >
                      <div data-v-7a856cc4="">通道2</div>
                    </div>
                  </div>
                  <div data-v-7a856cc4="">
                    <div
                      data-v-7a856cc4=""
                      title="通道3"
                      class="channel-item active"
                    >
                      <div data-v-7a856cc4="">通道3</div>
                    </div>
                  </div>
                  <div data-v-7a856cc4="">
                    <div
                      data-v-7a856cc4=""
                      title="通道4"
                      class="channel-item active"
                    >
                      <div data-v-7a856cc4="">通道4</div>
                    </div>
                  </div>
                  <div data-v-7a856cc4="">
                    <div
                      data-v-7a856cc4=""
                      title="通道5"
                      class="channel-item active"
                    >
                      <div data-v-7a856cc4="">通道5</div>
                    </div>
                  </div>
                  <div data-v-7a856cc4="">
                    <div
                      data-v-7a856cc4=""
                      title="通道6"
                      class="channel-item active"
                    >
                      <div data-v-7a856cc4="">通道6</div>
                    </div>
                  </div>
                  <div data-v-7a856cc4="">
                    <div
                      data-v-7a856cc4=""
                      title="通道7"
                      class="channel-item active"
                    >
                      <div data-v-7a856cc4="">通道7</div>
                    </div>
                  </div>
                  <div data-v-7a856cc4="">
                    <div
                      data-v-7a856cc4=""
                      title="通道8"
                      class="channel-item active"
                    >
                      <div data-v-7a856cc4="">通道8</div>
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
              <el-tab-pane label="荷载曲线" name="first">
                <p>荷载曲线</p>
                <div class="content">
                  <div class="chart loadCurve"></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="累计数据" name="second">
                <p>累计数据</p>
                <div class="dataArea">
                  <div class="panel">
                    <h6>45<span>&nbsp;cm</span></h6>
                    <p>主钩类型</p>
                  </div>
                  <div class="panel">
                    <h6>45<span>&nbsp;cm</span></h6>
                    <p>主钩类型</p>
                  </div>
                  <div class="panel">
                    <h6>45<span>&nbsp;cm</span></h6>
                    <p>主钩类型</p>
                  </div>
                  <div class="panel">
                    <h6>45<span>&nbsp;cm</span></h6>
                    <p>主钩类型</p>
                  </div>
                  <div class="panel">
                    <h6>45<span>&nbsp;cm</span></h6>
                    <p>主钩类型</p>
                  </div>
                  <div class="panel">
                    <h6>45<span>&nbsp;cm</span></h6>
                    <p>主钩类型</p>
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
                <!-- <div class="mainHookMagnification">3</div>
                <div class="mainHookWeight">0.1</div>
                <div class="mainHookRealWeight">0</div>
                <div class="mainHookRadius">18 m</div>
                <div class="engineRevolutions">899</div>
                <div class="workTime">1260 h</div>
                <div class="loadRate">25%</div>
                <div class="windSpeed">1.5m/s</div>
                <div class="unknownData1">-- m</div>
                <div class="unknownData2">50.3 m</div>
                <div class="mainHookAngle">75.4 °</div>
                <div class="auxiliaryHookMagnification">1</div>
                <div class="auxiliaryHookWeight">15</div>
                <div class="auxiliaryHookRealWeight">0</div>
                <div class="auxiliaryHookRadius">0 m</div> -->
                <div class="oilPercentage"></div>
              </div>
            </div>
            <div class="device_location">
              <p>
                <i class="el-icon-location-outline"></i>
                广东省东莞市黄江镇公常路14号金稳驾校黄牛埔训练场
              </p>
              <p>
                <i class="el-icon-time"></i>
                定位时间：2022-06-28 14:24:17
              </p>
              <p>
                <i class="el-icon-time"></i>
                工况时间：2022-06-28 14:24:17
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
                <p class="title">
                  <span>更新时间：2022-06-28 06:31:59</span>
                </p>
                <div class="switch">
                  <div><span>强制状态</span></div>
                  <div><span>超载解除状态</span></div>
                  <div><span>上电信号</span></div>
                  <div><span>钥匙ON</span></div>
                  <div><span>钥匙START</span></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="警报" name="second">
                <!-- <p class="title">警报</p> -->
                <div class="alarms">
                  <div><span>高度限位</span></div>
                  <div><span>超载报警</span></div>
                  <div><span>主卷三圈保护</span></div>
                  <div><span>副卷三圈保护</span></div>
                  <div><span>机油压力报警</span></div>
                  <div><span>高度限位</span></div>
                  <div><span>超载报警</span></div>
                  <div><span>主卷三圈保护</span></div>
                  <div><span>副卷三圈保护</span></div>
                  <div><span>机油压力报警</span></div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </FloatCard>
      </div>
      <div class="column">
        <FloatCard>
          <span slot="header">设备信息</span>
          <div slot="content" class="module5">
            <div class="detail">
              <p>设备名称： 229</p>
              <p>设备编号： 20CC03208229</p>
              <p>设备型号： 320T</p>
              <p>责 任 人： --</p>
              <p>权限类型： 所有权</p>
            </div>
          </div>
        </FloatCard>
        <FloatCard>
          <span slot="header">风险事件统计</span>
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
// import NavigationBar from "@/components/NavigationBar";
import FloatCard from "@/components/FloatCard.vue";
export default {
  components: {
    // NavigationBar,
    FloatCard,
  },
  computed: {
    breadCrumbList() {
      this.$route.matched.shift();
      return this.$route.matched;
    },
  },
  data() {
    return {
      id: this.$route.params.id
        ? this.$route.params.id
        : "c1e221866ab84ae28aeb89f975a667c4",
      module2: "first",
      module4: "first",
    };
  },
  methods: {
    initLoadCurve() {
      // 定义两组数据
      let yearData = [
        {
          year: "2020", // 年份
          data: [
            // 两个数组是因为有两条线
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
          ],
        },
        {
          year: "2021", // 年份
          data: [
            // 两个数组是因为有两条线
            [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
            [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
          ],
        },
      ];
      const chart = this.$echarts.init(document.querySelector(".loadCurve"));
      let option = {
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          textStyle: {
            color: "#000",
          },
          right: "10%",
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          show: true, //显示边框
          borderColor: "#000", //边框颜色
          containLabel: true, //包含刻度在里面
        },
        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          // 去除刻度线
          axisTick: false,
          // 文本颜色
          axisLabel: {
            color: "#000",
          },
          // 去除轴线
          axisLine: {
            show: false,
          },
          // 去除轴内间距
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          // 去除刻度线
          axisTick: false,
          // 文本颜色
          axisLabel: {
            color: "#000",
          },
          // 分割线颜色
          splitLine: {
            lineStyle: {
              color: "#000",
            },
          },
        },
        series: [
          {
            name: "主钩实际载额",
            data: yearData[0].data[0],
            type: "line",
            stack: "Total",
            // 折线平滑度
            smooth: 0.5,
          },
          {
            name: "副钩实际载额",
            data: yearData[0].data[1],
            type: "line",
            stack: "Total",
            // 折线平滑度
            smooth: 0.5,
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
    initOilPercentage() {
      const chart = this.$echarts.init(
        document.querySelector(".oilPercentage")
      );
      let angle = 0; //角度，用来做简单的动画效果的
      let value = 78; //图上角度数据
      let option = {
        // backgroundColor: "#061740",
        title: [
          {
            text: "{a|" + value + "}{c|%}",
            x: "center",
            y: "center",
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
              normal: {
                position: "center",
              },
            },
            data: [
              {
                value: value,
                name: "",
                itemStyle: {
                  normal: {
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
                          color: "#4bf3f9", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#4bf3f9", // 100% 处的颜色
                        },
                      ],
                    },
                  },
                },
              },
              {
                value: 100 - value,
                name: "",
                label: {
                  normal: {
                    show: false,
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#173164",
                  },
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
      this.$api.judgeResponse(data, "DeviceDetails_deviceDetails");
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

<style lang="less" scoped>
.mainBox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 20px auto;
  padding: 10px 20px 0;
  .column {
    flex: 6;
    .module1 {
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
            font-size: 30px;

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
          .oilPercentage {
            position: absolute;
            top: 186px;
            left: 274px;
            width: 120px;
            height: 80px;
            z-index: 99;
          }
        }
      }
      .device_location {
        text-align: center;
        color: #142628;
        // height: 61px;

        p {
          margin-top: 6px;
        }
      }
    }
    .module4 {
      height: 265px;
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
        display: flex;
        flex-wrap: wrap;

        div {
          width: 170px;
          margin-top: 20px;
        }
      }

      .alarms {
        display: flex;
        flex-wrap: wrap;

        div {
          width: 170px;
          margin-top: 20px;
        }
      }
    }
    .module5 {
      .detail {
        height: 100%;
        padding-bottom: 24px;
        p {
          margin: 30px 10px;
        }
      }
    }
    .module6 {
      .detail-line {
        height: 100%;
        padding-bottom: 26px;
        .riskEvent {
          display: flex;
          background-color: #e7cece;
          border-radius: 10px;
          margin-top: 30px;
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