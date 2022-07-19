<template>
  <div class="DigitalScreen">
    <header>
      <div class="headerLeftShow"></div>
      <div class="headerTitle">
        <div>
          <div class="title">数字化大屏</div>
        </div>
      </div>
      <div class="showTime" style="display: flex">
        <span class="time">2022-2-2 22:22:22</span>
        <FuncBtn :isScreen="true" id="fullScreen"></FuncBtn>
      </div>
    </header>
    <!-- 页面主体部分 -->
    <div class="main">
      <div class="leftTree">
        <div class="leftTreeContent borderImg">
          <div class="leftTreeTop">
            <el-input
              placeholder="搜索设备"
              suffix-icon="el-icon-search"
              clearable
              v-model="searchInput"
            >
            </el-input>
          </div>
          <div class="leftTreeBottom">
            <div
              class="equipmentItem textFont14"
              v-for="(item, index) in deviceList"
              :key="index"
            >
              <div
                class="itemContent"
                @click="checked(index)"
                :class="checkedIndex == index ? 'checked' : ''"
              >
                <div
                  :style="
                    item.onlineStatus == '1' ? '' : 'background: #5e5e5f;'
                  "
                  class="prevIconOnline"
                ></div>
                <div>
                  <span>{{ item.name }}</span>
                  <i
                    v-show="item.videoStatus"
                    class="el-icon-video-camera-solid videoOnlineClass"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mainContent">
        <div class="leftScreen">
          <div class="leftTop borderImg">
            <div class="leftTopContent">
              <div
                class="equipmentName textFont16"
                style="display: flex; align-items: center"
              >
                <i class="el-icon-s-tools"></i>
                <span>{{
                  checkDevice.name ? checkDevice.name : deviceList[0].name
                }}</span>
                <!-- <i class="el-icon-microphone"></i> -->

                <!-- <div class="detailBtn">
                  <div>详情</div>
                  <i class="el-icon-arrow-right"></i>
                </div> -->
              </div>
              <div class="splitLine"></div>
              <div class="video">
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
                <div class="videoBox">
                  <div class="videoSize">
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
              <div class="location textFont14">
                <div>
                  <div class="locationTimeIcon"></div>
                  <span class="textColor">
                    {{
                      checkDevice.workCondDataTime
                        ? checkDevice.workCondDataTime
                        : deviceList[0].workCondDataTime
                    }}
                  </span>
                </div>
                <div>
                  <div class="addressIcon"></div>
                  <div
                    :title="
                      checkDevice.address
                        ? checkDevice.address
                        : deviceList[0].address
                    "
                    class="address nowrapText textColor textNowarp"
                  >
                    {{
                      checkDevice.address
                        ? checkDevice.address
                        : deviceList[0].address
                    }}
                  </div>
                </div>
              </div>
              <div class="equipmentInfo textFont14">
                <div class="equipmentInfoTitle textColor">
                  设备编号：{{
                    checkDevice.equipmentNo
                      ? checkDevice.equipmentNo
                      : deviceList[0].equipmentNo
                  }}
                  <span class="prevOnline">
                    <!-- <div
                      :style="
                        checkDevice.onlineStatus == '1'
                          ? ''
                          : 'background: #5e5e5f;'
                      "
                    > 
                    </div>-->
                  </span>
                  <div class="model">
                    <!-- <span class="textColor">车牌号：--</span> -->
                    <span class="mark">{{
                      checkDevice.onlineStatusLabel
                        ? checkDevice.onlineStatusLabel
                        : deviceList[0].onlineStatusLabel
                    }}</span>
                    <span class="mark">{{
                      checkDevice.modelLabel
                        ? checkDevice.modelLabel
                        : deviceList[0].modelLabel
                    }}</span>
                    <span class="mark">{{
                      checkDevice.typeLabel
                        ? checkDevice.typeLabel
                        : deviceList[0].typeLabel
                    }}</span>
                  </div>
                </div>
              </div>
              <div>
                <span>项目名称：test </span>
                <span>操作人员：test</span>
                <span>项目时长：test</span>
              </div>
            </div>
          </div>
          <div class="leftBottom borderImg">
            <div class="leftBottomContent">
              <div>
                <div class="title textFont16">
                  <i class="el-icon-s-tools"></i>
                  <span class="textColor">实时工况</span>
                </div>
                <div class="splitLine"></div>
                <el-carousel
                  :interval="5000"
                  arrow="always"
                  indicator-position="outside"
                  height="110px"
                  class="workingCondition"
                >
                  <el-carousel-item>
                    <div class="dataArea">
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>主钩额重</span></p>
                          <h6>
                            {{ workConditionData.mainHookRatedWeight }}&nbsp;t
                          </h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>主钩实重</span></p>
                          <h6>
                            {{ workConditionData.mainHookActualWeight }}&nbsp;t
                          </h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>主钩倍率</span></p>
                          <h6>{{ workConditionData.mainHookRatios }}</h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>主臂角度</span></p>
                          <h6>{{ workConditionData.mainHookAngle }}°</h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>副钩额重</span></p>
                          <h6>
                            {{ workConditionData.slaveHookRatedWeight }}&nbsp;t
                          </h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>副钩实重</span></p>
                          <h6>
                            {{ workConditionData.slaveHookActualWeight }}&nbsp;t
                          </h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>副钩倍率</span></p>
                          <h6>{{ workConditionData.slaveHookRatios }}</h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>高度</span></p>
                          <h6>--</h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>幅度</span></p>
                          <h6>--</h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>臂长</span></p>
                          <h6>--</h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>力矩百分比</span></p>
                          <h6>
                            {{ workConditionData.torquePercent }}%&nbsp;(负载率)
                          </h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>风速</span></p>
                          <h6>{{ workConditionData.windSpeed }}&nbsp;m/s</h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                    </div>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div class="dataArea">
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>发动机工作时长</span></p>
                          <h6>
                            {{ workConditionData.totalEnginWorkTime }}&nbsp;h
                          </h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>燃油油量</span></p>
                          <h6>
                            {{ workConditionData.remainingOilPercent }}&nbsp;%
                          </h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                      <div class="panel">
                        <div class="panel-item">
                          <p><span>发动机转速</span></p>
                          <h6>{{ workConditionData.enginSpeed }}</h6>
                        </div>
                        <div class="columnLine"></div>
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>

                <div class="title textFont16">
                  <i class="el-icon-s-tools"></i>
                  <span class="textColor">近七日油耗详情</span>
                  <span style="float: right">总计：192L/49.4h</span>
                </div>
                <div class="splitLine"></div>
                <div class="weekAnalysisData">
                  <EchartsComp :options="chart1Data"></EchartsComp>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="centerTopScreen">
          <div class="centerTop borderImg"></div>
        </div>
        <div class="rightScreen">
          <div class="rightTop borderImg">
            <div class="content">
              <div class="title textFont16">
                <i class="el-icon-s-tools"></i>
                <span class="textColor">设备统计</span>
              </div>
              <div class="splitLine"></div>
              <div class="area chart1">
                <div class="chart">
                  <EchartsComp :options="chart2"></EchartsComp>
                </div>
                <div class="data">
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">华东区：&nbsp;46%&nbsp;&nbsp;</div>
                    <span>69</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">华南区：&nbsp;29%&nbsp;&nbsp;</div>
                    <span>43</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">华中区：&nbsp;6%&nbsp;&nbsp;</div>
                    <span>9</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">其他区：&nbsp;26%&nbsp;&nbsp;</div>
                    <span>17</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="title textFont16">
                <i class="el-icon-s-tools"></i>
                <!-- <span class="textColor">24小时内风险事件</span> -->
                <span class="textColor">风控数据</span>
              </div>
              <div class="splitLine"></div>
              <div class="area chart2">
                <div class="chart">
                  <EchartsComp :options="chart3"></EchartsComp>
                </div>
                <div class="data">
                  <div class="item">
                    <div class="left">
                      <div class="dot"></div>
                      <div class="text">高风险：&nbsp;269</div>
                    </div>
                    <!-- <div class="right">
                      <span>348</span>
                      ▶
                    </div> -->
                  </div>
                  <div class="item">
                    <div class="left">
                      <div class="dot"></div>
                      <div class="text">中风险：&nbsp;0</div>
                    </div>
                    <!-- <div class="right">
                      <span>348</span>
                      ▶
                    </div> -->
                  </div>
                  <div class="item">
                    <div class="left">
                      <div class="dot"></div>
                      <div class="text">低风险：&nbsp;0</div>
                    </div>
                    <!-- <div class="right">
                      <span>348</span>
                      ▶
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="title textFont16">
                <i class="el-icon-s-tools"></i>
                <span class="textColor">运输公里数</span>
              </div>
              <div class="splitLine"></div>
              <div class="area chart3">
                <div class="chart">
                  <EchartsComp :options="chart4"></EchartsComp>
                </div>
                <div class="data">
                  <div class="item">
                    <div class="left">
                      <div class="dot"></div>
                      <div class="text">周运输公里数：&nbsp;153&nbsp;km</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">
                      <div class="dot"></div>
                      <div class="text">月运输公里数：&nbsp;655&nbsp;km</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">
                      <div class="dot"></div>
                      <div class="text">年运输公里数：&nbsp;7977&nbsp;km</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rightBottom borderImg">
            <div class="content">
              <div class="title textFont16">
                <i class="el-icon-s-tools"></i>
                <span class="textColor">到期统计</span>
              </div>
              <div class="splitLine"></div>
              <div class="data">
                <div class="expireTimeContent">
                  <div class="expireTimeItem">保险到期</div>
                  <div class="expireTimeCount">
                    <span class="linkLine">0</span>
                    ▶
                  </div>
                </div>
                <div class="expireTimeContent">
                  <div class="expireTimeItem">证照到期</div>
                  <div class="expireTimeCount">
                    <span class="linkLine">0</span>
                    ▶
                  </div>
                </div>
                <div class="expireTimeContent">
                  <div class="expireTimeItem">特种设备检验到期</div>
                  <div class="expireTimeCount">
                    <span class="linkLine">0</span>
                    ▶
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="map">
        <ScreenMap></ScreenMap>
      </div>
    </div>
  </div>
</template>

<script>
import ScreenMap from "@/components/ScreenMap.vue";
import FuncBtn from "@/components/FuncBtn.vue";
import EchartsComp from "@/components/EchartsComponent.vue";
export default {
  components: {
    FuncBtn,
    ScreenMap,
    EchartsComp,
  },
  computed: {
    // 页面四个图表的配置数据
    chart2() {
      let option = {
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "设备总数",
          textStyle: {
            fontSize: "10px",
            color: "#78898f",
          },
          left: "center",
          top: "58%",
        },
        series: [
          {
            name: "履带吊",
            type: "pie",
            radius: ["70%", "80%"],
            avoidLabelOverlap: false,
            color: "#75d059",
            label: {
              textStyle: {
                color: "#05afe0",
              },
              formatter: "{c}",
              show: true,
              fontSize: "16",
              fontWeight: "bold",
              position: "center",
            },
            data: [{ value: 153, name: "履带吊" }],
          },
        ],
      };
      return option;
    },
    chart3() {
      let option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            color: ["#ff0000", "#ff8a00", "#ebce41"],
            name: "风险事件",
            type: "pie",
            radius: ["70%", "80%"],
            label: {
              textStyle: {
                color: "#05afe0",
              },
              formatter: "{b} {c}",
              show: true,
              fontSize: "13",
              fontWeight: "bold",
              position: "center",
            },
            data: [
              { value: 391, name: "高风险" },
              { value: 0, name: "中风险" },
              { value: 0, name: "低风险" },
            ],
          },
        ],
      };
      return option;
    },
    chart4() {
      let option = {
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "运输总数",
          textStyle: {
            fontSize: "10px",
            color: "#78898f",
          },
          left: "center",
          top: "58%",
        },
        series: [
          {
            name: "履带吊",
            type: "pie",
            radius: ["70%", "80%"],
            avoidLabelOverlap: false,
            color: "#f5a118",
            label: {
              textStyle: {
                color: "#05afe0",
              },
              formatter: "{c} km",
              show: true,
              fontSize: "15",
              fontWeight: "bold",
              position: "center",
            },
            data: [{ value: 7977, name: "年运输公里数" }],
          },
        ],
      };
      return option;
    },
    deviceList() {
      let deviceList = JSON.parse(
        localStorage.getItem("Screen_deviceOnlineList")
      );
      return deviceList.rows ? deviceList.rows : [{ name: "暂无数据" }];
    },
  },
  data() {
    return {
      // 搜索框数据
      searchInput: "",
      // 搜索列表选中项
      checkedIndex: 0,
      // 设备数据
      checkDevice: {},
      // 工况数据
      workConditionData: {},
      // 周数据统计（油耗，工作时长
      weekAnalysisData: {},
      // 第一个图表的数据
      chart1Data: {},
      dataX: [],
      dataY1: [],
      dataY: [],
    };
  },
  methods: {
    checked(i) {
      // 选中项样式
      this.checkedIndex = i;
      // 已有列表数据赋值
      this.checkDevice = this.deviceList[i];
      console.log(this.deviceList[i]);
      // 获取实时工况数据
      this.getDeviceDetails(this.deviceList[i].id).then((val) => {
        this.workConditionData = val.data.data.workConditionData;
        // 周工作数据
        this.weekAnalysisData = val.data.data.weekAnalysisData;
        // this.initChart1Date(val.data.data.weekAnalysisData.details);
        // this.chart1();
      });
    },
    async getDeviceDetails(id) {
      return await this.$api.getDetailWithWorkConditionData(id);
    },
    chart1(value) {
      // 声明图表x轴初始变量
      let dataX = [];
      let dataY1 = [];
      let dataY = [];
      // 对数据进行遍历，提取日期数据并转换格式
      console.log("this.weekData.details", this.weekData.details);
      value.forEach((item) => {
        // 近七日耗油量
        dataY1.push(item.oilCost);
        // 近七日工作时间
        dataY.push(item.workTime);
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
              color: "#33FFFF",
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
                color: "#5FBBEB",
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
                color: "#42C0FF",
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
                color: "#11384e",
                borderColor: "#267ea9",
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
                color: "rgb(117, 249, 185)",
                borderColor: "rgba(117, 249, 185,0.8)", //圆点透明 边框
                borderWidth: "1px",
              },
            },
            lineStyle: {
              color: "rgba(117, 249, 185,0.5)",
            },

            data: dataY,
          },
        ],
      };
      this.chart1 = option;
    },
  },
  created() {
    this.getDeviceDetails(this.deviceList[0].id).then((val) => {
      console.log(val.data.data);
      // 工况数据
      this.workConditionData = val.data.data.workConditionData;
      // 周工作数据
      this.weekAnalysisData = val.data.data.weekAnalysisData;
      console.log(val.data.data.weekAnalysisData.details);
      // this.chart1(value);
    })(function () {
      let t = null;
      t = setTimeout(time, 1000); //開始运行
      function time() {
        clearTimeout(t); //清除定时器
        let dt = new Date();
        let y = dt.getFullYear();
        let mt = dt.getMonth() + 1;
        let day = dt.getDate();
        let h = dt.getHours(); //获取时
        let m = dt.getMinutes(); //获取分
        let s = dt.getSeconds(); //获取秒
        document.querySelector(".time").innerHTML =
          y + "-" + mt + "-" + day + " -" + h + ":" + m + ":" + s;
        t = setTimeout(time, 1000); //设定定时器，循环运行
      }
    })();
  },
  mounted() {},
};
</script>

<style lang="less">
.DigitalScreen {
  box-sizing: border-box;
  font-size: 13.25px;
  color: rgb(0, 198, 255);
  min-width: 1280px;
  min-height: 620px;
  width: 100%;
  height: 100vh;
  min-width: 1440px;
  letter-spacing: 1px;
  .checked {
    background: rgba(0, 198, 255, 0.15);
    span {
      color: #00c6ff !important;
    }
  }
  .textNowarp {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #fullScreen {
    border: none;
    color: #50666e;
    background: none;
    height: auto;
    margin-left: 10px;
    font-size: 24px;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    /**/
  }
  ::-webkit-scrollbar-track {
    background-color: transparent !important;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 168, 255, 0.25);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 168, 255, 0.3);
  }
  ::-webkit-scrollbar-corner {
    background: #179a16;
  }

  header {
    display: flex;
    justify-content: space-between;
    height: 53px;
    background: #000002;
    border-bottom: 1px solid rgba(0, 198, 255, 0.2);
    .headerLeftShow {
      height: 12px;
      width: 18.5px;
      background: url("@/assets/images/kzuqi/10009.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 20px 0 0 25px;
      cursor: pointer;
    }
    .headerTitle {
      position: absolute;
      left: 50%;
      -webkit-transform: translate(-50%);
      transform: translate(-50%);
      height: 53px;
      width: 905px;
      background-image: url("@/assets/images/kzuqi/biaoti.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      > div {
        position: absolute;
        left: 50%;
        -webkit-transform: translate(-50%);
        transform: translate(-50%);
        line-height: 53px;
        width: 450px;
        text-align: center;
        color: #01c5fe;
        .title {
          font-size: 30px;
        }
      }
    }
    .showTime {
      height: 53px;
      display: flex;
      align-items: center;
    }
  }
  .main {
    position: relative;
    width: 100%;
    height: calc(100% - 54px);
    // height: 100%;
    .borderImg {
      border: 1px solid #006381;
      background-image: url("@/assets/images/kzuqi/leftUp.png"),
        url("@/assets/images/kzuqi/rightUp.png"),
        url("@/assets/images/kzuqi/leftDown.png"),
        url("@/assets/images/kzuqi/rightDown.png");
      background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
      background-position: top left 0, 100% 0, bottom left 0, 100% 100%;
    }
    .prevOnline {
      color: #00c6ff;
    }
    .textFont14,
    .textFont16 {
      font-size: 12px;
    }
    .splitLine {
      margin: 8px 0;
      height: 2px;
      background-image: url("@/assets/images/kzuqi/fenggexian.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .title {
      display: flex;
      align-items: center;
    }
    .title > i {
      font-size: 16px;
    }
    .leftTree {
      position: relative;
      float: left;
      padding: 8px 0 12px 16px;
      width: 12.5%;
      height: calc(100% - 20px);
      z-index: 230;
      background: rgba(0, 0, 2, 0.8);
      .leftTreeTop {
        position: relative;
        margin: 10px;
        .el-input {
          display: block;
        }
        .el-input__inner {
          height: 28px;
          color: rgba(173, 200, 205, 0.4);
          background: rgba(0, 0, 2, 0.8);
          border: 1px solid rgba(0, 198, 255, 0.3);
          border-radius: 14px;
          padding: 0 30px 0 12px;
        }
        .el-input__icon {
          line-height: normal;
        }
      }
      .leftTreeBottom {
        letter-spacing: 0;
        overflow-y: auto;
        // height: 620.8px;
        height: calc(100% - 80px);
        .equipmentItem {
          min-height: 26.5px;
          .itemContent {
            display: flex;
            line-height: 16.6px;
            padding: 4px 0;
            .prevIconOffline,
            .prevIconOnline {
              margin: 5px 5.2px 0 10.5px;
              width: 5.275px;
              height: 5.275px;
              border-radius: 50%;
            }
            .prevIconOnline {
              background: #00c6ff;
            }
            span {
              color: #adc8cd;
              margin-right: 3px;
            }
          }
        }
        .equipmentItem:hover {
          background: rgba(0, 198, 255, 0.15);
          cursor: pointer;
        }
      }
      .leftTreeContent {
        // width: 100%;
        height: 100%;
        background-size: 9% !important;
      }
    }
    .mainContent {
      width: 100%;
      height: 100%;
      .leftScreen {
        position: relative;
        float: left;
        padding: 8px 0 12px 10px;
        width: 23.9%;
        min-width: 320px;
        height: calc(100% - 20px);
        background: rgba(0, 0, 2, 0.8);
        z-index: 231;
        .leftBottom,
        .leftTop {
          width: 100%;
          height: calc(50% - 5px);
          background-size: 4.8%;
          box-sizing: border-box;
          .leftTopContent {
            margin: 10.6px;
            margin-bottom: 0;
            .textColor {
              color: #adc8cd;
            }
            span {
              color: #adc8cd;
              margin: 0 3px;
            }
            .detailBtn {
              float: right;
              display: flex;
              padding-left: 9px;
              width: 45px;
              min-width: 45px;
              height: 19.8px;
              text-align: center;
              line-height: 19.8px;
              background-color: #00c6ff;
              color: #000002;
              border-radius: 2.65px;
              cursor: pointer;
              i {
                position: relative;
                margin: 0;
                line-height: 19.8px;
                color: #000002;
                font-weight: 700;
              }
            }
            .equipmentName {
              height: 18px;
            }
            .video {
              height: 61%;
              .channel-content {
                z-index: 50;
                width: 100%;
                display: flex;
                justify-content: space-between;
                overflow-y: hidden;
                overflow-x: auto;

                .channel-item {
                  position: relative;
                  width: 60px;
                  height: 25px;
                  margin: 5px 10px;
                  line-height: 25.6px;
                  // color: #999;
                  background: rgba(0, 0, 2, 0.8);
                  border: 1px solid rgba(0, 198, 255, 0.8);
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
                .channel-item:hover {
                  color: rgba(0, 198, 255, 0.8);
                  background: rgba(0, 198, 255, 0.2);
                  // border: 1px solid rgba(0, 198, 255, 0.8);
                  cursor: pointer;
                }
              }

              .videoBox {
                position: relative;

                .videoBottomBox {
                  width: 100%;
                  height: 20px;
                  color: rgba(200, 229, 233, 0.7);
                  background: #041e30;
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
                    height: 124px;
                  }
                }
              }
            }
            .location {
              margin-top: 2.2px;
              padding-bottom: 2.3px;
              border-bottom: 0.8px solid rgba(0, 198, 255, 0.3);
              > div {
                display: flex;
                line-height: 18.5px;
              }
              .addressIcon,
              .locationTimeIcon {
                margin-right: 4.6px;
                min-width: 15.8px;
                height: 15.8px;
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: 100%;
              }
              .locationTimeIcon {
                background-image: url("@/assets/images/kzuqi/shijian.png");
              }
              .addressIcon {
                background-image: url("@/assets/images/kzuqi/dingwei.png");
              }
            }
            .equipmentInfo {
              margin-top: 2.3px;
              > div {
                display: flex;
                line-height: 18.5px;
              }
              .equipmentInfoTitle,
              .equipmentInfoTitle span {
                display: flex;
                .prevOnline div {
                  margin: 5.4px 5.2px 0 5px;
                  width: 0.57em;
                  height: 0.57em;
                  background: #00c6ff;
                  border-radius: 50%;
                }
              }
              .equipmentInfoTitle {
                display: flex;
                align-items: center;
              }
              .model {
                display: flex;
                .mark {
                  padding: 1.8px 1px;
                  color: rgba(0, 198, 255, 0.8);
                  background-color: #000002;
                  border: 1px solid rgba(0, 198, 255, 0.5);
                  border-radius: 6.12px;
                  font-size: 12px;
                  white-space: nowrap;
                }
              }
            }
          }
        }
        .leftBottom {
          margin-top: 10px;
          .leftBottomContent,
          .leftTopContent,
          .rightBottomContent,
          .rightTopContent {
            margin: 10.6px;
            span {
              margin: 0 3px;
              color: #adc8cd;
            }
            .weekAnalysisData {
              height: 120px;
            }
            .workingCondition {
              font-size: 12px;
              .dataArea {
                padding: 2.5px 0;
                display: flex;
                flex-wrap: wrap;
                .panel {
                  width: calc(25% - 2px);
                  display: flex;
                  text-align: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  .panel-item {
                    width: calc(100% - 2px);
                    height: 36px;
                    margin-top: 2px;
                    > p {
                      margin-bottom: 5px;
                    }
                  }
                  .columnLine[data-v-8ffcbcbe] {
                    float: right;
                    width: 1px;
                    height: 16px;
                    background: #8ea1a5;
                    opacity: 0.3;
                  }
                }
              }
              .el-carousel__arrow--left {
                left: -12px;
              }
              .el-carousel__arrow--right {
                right: -6px;
              }
            }
          }
        }
      }
      .centerTopScreen {
        position: relative;
        float: left;
        padding: 8px 12px;
        height: 88px;
        z-index: 230;
        width: calc(100% - 930px);
        min-width: 340px;
        background: rgba(0, 0, 2, 0.8);
        .centerTop {
          height: 100%;
          background-size: 3%;
        }
      }
      .rightScreen {
        position: relative;
        float: right;
        padding: 8px 13px 12px 0;
        height: calc(100% - 20px);
        background: rgba(0, 0, 2, 0.8);
        z-index: 230;
        .rightTop {
          width: 304px;
          height: calc(75% - 10px);
          background-size: 4.8%;
          .content {
            height: 30%;
            margin: 10px 12px 0;
            .area {
              display: flex;
              height: calc(100% - 28px);
              .chart {
                width: 40%;
              }
              .data {
                width: 60%;
                margin: 16px 0;
                font-size: 12px;
              }
            }
            .chart1 {
              .data {
                color: #adc8cd;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .item {
                  display: flex;
                  align-items: center;
                  .dot {
                    margin: 2px 12px 0px;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: rgb(5, 87, 173);
                  }
                  .text {
                    width: 100px;
                  }
                  span {
                    color: #00c6ff;
                  }
                }
              }
            }
            .chart2 {
              .data {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                color: #adc8cd;
                .item {
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  .left {
                    display: flex;
                    .dot {
                      margin: 2px 12px 0px;
                      width: 5px;
                      height: 5px;
                      border-radius: 50%;
                      background: #ff0000;
                    }
                    .dot:nth-child(2) {
                      background-color: #ff8a00;
                    }
                    .dot:nth-child(3) {
                      background-color: #ebce41;
                    }
                  }
                  .right {
                    color: #fc6501;
                    cursor: pointer;
                    span {
                      text-decoration: underline;
                    }
                  }
                }
              }
            }
            .chart3 {
              .data {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                color: #adc8cd;
              }
            }
          }
          // .content:nth-child(3) {
          //   height: 34%;
          //   .chart3 {
          //     height: calc(100% - 34px);
          //     .countTitle {
          //       text-align: center;
          //     }
          //   }
          // }
        }
        .rightBottom {
          margin-top: 10px;
          width: 304px;
          height: calc(25% - 10px);
          background-size: 4.8%;
          .content {
            margin: 10px 12px 0;
            height: 100%;
            .data {
              height: calc(100% - 46px);
              display: flex;
              flex-direction: column;
              font-size: 12px;
              justify-content: space-evenly;
              .expireTimeContent {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .expireTimeItem {
                  display: flex;
                  align-items: center;
                  color: #adc8cd;
                }
                .expireTimeItem::before {
                  content: "";
                  display: block;
                  float: left;
                  margin: 0px 12px 0;
                  content: "";
                  width: 20px;
                  height: 20px;
                  background-position: 0 50%;
                  background-size: 100%;
                  background-image: url("@/assets/images/kzuqi/baoxian.png");
                }
                .expireTimeCount {
                  margin-right: 80px;
                  color: #fc6501;
                  cursor: pointer;
                  .linkLine {
                    text-decoration: underline;
                  }
                }
              }
            }
          }
        }
      }
    }
    .map {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      min-height: 691px;
      height: 100%;
      background-color: #030b11;
    }
  }
}
</style>