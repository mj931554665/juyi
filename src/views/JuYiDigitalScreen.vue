<template>
  <div class="DigitalScreen">
    <header>
      <div
        class="headerLeftShow"
        @click="hideLeftTree = !hideLeftTree"
        :class="hideLeftTree ? '' : 'leftTreehide'"
      ></div>
      <div class="headerTitle">
        <div>
          <div class="title">钜亿安全监控大屏</div>
        </div>
      </div>
      <div class="showTime" style="display: flex">
        <span class="time" title="当前时间"></span>
        <FuncBtn :isScreen="true" id="fullScreen" title="全屏/退出全屏"></FuncBtn>
      </div>
    </header>
    <!-- 页面主体部分 -->
    <div class="main">
      <div class="leftTree" v-show="hideLeftTree">
        <div class="leftTreeContent borderImg">
          <div class="leftTreeTop">
            <el-input
              placeholder="搜索设备"
              clearable
              suffix-icon="el-icon-search"
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
                <span>{{ checkDevice.name }}</span>
                <!-- <i class="el-icon-microphone"></i> -->

                <!-- <div class="detailBtn">
                  <div>详情</div>
                  <i class="el-icon-arrow-right"></i>
                </div> -->
              </div>
              <div class="data">
                <div class="equipmentInfoTitle textColor">
                  设备编号：{{ checkDevice.equipmentNo }}
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
                </div>
              </div>
              <div class="splitLine"></div>
              <div class="video">
                <el-radio-group 
                v-model="channel" 
                class="channel-content"
                @change="initVideo()">
                  <el-radio-button
                    v-for="(aisle, index) in VideoChannelState.slice(0, 8)"
                    :label="index + 1"
                    :key="index"
                    :class="aisle == '1' ? 'channel-disabled' : ''"
                  >
                    <p
                      class="dot"
                      :style="
                        'background:' + (aisle == '0' ? '#13ca40' : '#d8d8d8')
                      "
                    ></p>
                    通道{{ index + 1 }}
                  </el-radio-button>
                </el-radio-group>
                <div class="videoBox">
                  <!-- <VideoArea>  -->
                  <CstorLivePlayer slot="video" :src="videosrc" />
                  <!-- </VideoArea> -->
                </div>
              </div>
              <div class="location textFont14">
                <div>
                  <div class="locationTimeIcon"></div>
                  <span class="textColor">
                    {{ checkDevice.workCondDataTime }}
                  </span>
                </div>
                <div>
                  <div class="addressIcon"></div>
                  <div
                    :title="checkDevice.address"
                    class="address nowrapText textColor textNowarp"
                  >
                    {{ checkDevice.address }}
                  </div>
                </div>
              </div>
              <div class="equipmentInfo textFont14">
                <div class="model">
                  <!-- <span class="textColor">车牌号：--</span> -->
                  <span class="mark">{{ checkDevice.carStatusLabel }}</span>
                  <span class="mark">{{ checkDevice.onlineStatusLabel }}</span>
                  <span class="mark">{{ checkDevice.modelLabel }}</span>
                  <span class="mark">{{ checkDevice.typeLabel }}</span>
                  <span class="mark">{{
                    checkDevice.equipmentBrandLabel
                  }}</span>
                </div>
                <div class="operator">
                  <span>项目名称：test </span>
                  <span>操作人员：test</span>
                  <span>项目时长：test</span>
                </div>
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
                <div class="workingCondition">
                  <el-carousel
                    :interval="5000"
                    arrow="always"
                    indicator-position="outside"
                    height="100px"
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
                              {{
                                workConditionData.mainHookActualWeight
                              }}&nbsp;t
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
                              {{
                                workConditionData.slaveHookRatedWeight
                              }}&nbsp;t
                            </h6>
                          </div>
                          <div class="columnLine"></div>
                        </div>
                        <div class="panel">
                          <div class="panel-item">
                            <p><span>副钩实重</span></p>
                            <h6>
                              {{
                                workConditionData.slaveHookActualWeight
                              }}&nbsp;t
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
                            <p><span>力矩百分比</span></p>
                            <h6>
                              {{
                                workConditionData.torquePercent
                              }}%&nbsp;(负载率)
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
                            <p><span>风速</span></p>
                            <h6>{{ workConditionData.windSpeed }}&nbsp;m/s</h6>
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
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
              <div>
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
          <div class="centerTop borderImg">
            <div class="bigNumber">
              <div>
                <h2>30565</h2>
                <p>总起重总量（吨）</p>
              </div>
              <div>
                <h2>817650</h2>
                <p>总工作时长（小时）</p>
              </div>
              <div>
                <h2>192233</h2>
                <p>总起重力矩（吨*米）</p>
              </div>
            </div>
          </div>
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
                    <div class="text">华东区：&nbsp;43%&nbsp;&nbsp;</div>
                    <span>69</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">华南区：&nbsp;27%&nbsp;&nbsp;</div>
                    <span>43</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">华中区：&nbsp;17%&nbsp;&nbsp;</div>
                    <span>28</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">其他区：&nbsp;10%&nbsp;&nbsp;</div>
                    <span>17</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="title textFont16">
                <i class="el-icon-s-tools"></i>
                <!-- <span class="textColor">24小时内风险事件</span> -->
                <span class="textColor">风险事件</span>
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
                      <div class="text">高风险：&nbsp;0</div>
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
                <span class="textColor">运输里程</span>
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
                      <div class="text">周里程：&nbsp;153&nbsp;万公里</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">
                      <div class="dot"></div>
                      <div class="text">月里程：&nbsp;655&nbsp;万公里</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="left">
                      <div class="dot"></div>
                      <div class="text">年里程：&nbsp;7977&nbsp;万公里</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rightBottom borderImg">
            <div class="content">
              <el-carousel :interval="3000" arrow="always" height="150px">
                <el-carousel-item>
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
                </el-carousel-item>
                <el-carousel-item>
                  <div class="title textFont16">
                    <i class="el-icon-s-tools"></i>
                    <span class="textColor">维保统计</span>
                  </div>
                  <div class="splitLine"></div>
                  <div class="data">
                    <div class="expireTimeContent">
                      <div class="expireTimeItem">维修统计</div>
                      <div class="expireTimeCount">
                        <span class="linkLine">0</span>
                        ▶
                      </div>
                    </div>
                    <div class="expireTimeContent">
                      <div class="expireTimeItem">保养统计</div>
                      <div class="expireTimeCount">
                        <span class="linkLine">0</span>
                        ▶
                      </div>
                    </div>
                    <div class="expireTimeContent">
                      <div class="expireTimeItem">清洁统计</div>
                      <div class="expireTimeCount">
                        <span class="linkLine">0</span>
                        ▶
                      </div>
                    </div>
                  </div>
                </el-carousel-item>
                <el-carousel-item>
                  <div class="title textFont16">
                    <i class="el-icon-s-tools"></i>
                    <span class="textColor">人员统计</span>
                  </div>
                  <div class="splitLine"></div>
                  <div class="data">
                    <div class="expireTimeContent">
                      <div class="expireTimeItem">安拆人员</div>
                      <div class="expireTimeCount">
                        <span class="linkLine">0</span>
                        ▶
                      </div>
                    </div>
                    <div class="expireTimeContent">
                      <div class="expireTimeItem">操作人员</div>
                      <div class="expireTimeCount">
                        <span class="linkLine">0</span>
                        ▶
                      </div>
                    </div>

                    <div class="expireTimeContent">
                      <div class="expireTimeItem">安管人员</div>
                      <div class="expireTimeCount">
                        <span class="linkLine">0</span>
                        ▶
                      </div>
                    </div>

                    <div class="expireTimeContent">
                      <div class="expireTimeItem">技术人员</div>
                      <div class="expireTimeCount">
                        <span class="linkLine">0</span>
                        ▶
                      </div>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
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
// 引入大屏地图
import ScreenMap from "@/components/ScreenMap.vue";
// 引入全屏按钮
import FuncBtn from "@/components/FuncBtn.vue";
// 引入图表组件
import EchartsComp from "@/components/EchartsComponent.vue";
// 引入实时监控组件
import VideoArea from "@/components/VideoArea.vue";
// 引入在线视频播放组件
import CstorLivePlayer from "cstor-live-player";
import "cstor-live-player/dist/cstor-live-player.css";
import mixin from "./mixin";
export default {
  mixins: [mixin],
  components: {
    FuncBtn,
    ScreenMap,
    EchartsComp,
    VideoArea,
    CstorLivePlayer,
  },
  computed: {
    chart2(){
      return this.$EchartsData.Schart2();
    },
    chart3(){
      return this.$EchartsData.Schart3();
    },
    chart4(){
      return this.$EchartsData.Schart4();
    },
  },
  data() {
    return {
      // 是否隐藏左侧图表
      hideLeftTree: false,
      // 搜索框数据
      searchInput: "",
      // 搜索列表选中项
      checkedIndex: 0,
      // 设备数据
      checkDevice: {},
      // 实时工况数据
      workConditionData: {},
      // 周数据统计（油耗，工作时长
      weekAnalysisData: {},
      // 第一个图表的数据
      chart1Data: {},
      dataX: [],
      dataY1: [],
      dataY: [],
      // 设备列表
      deviceList: [],
      // 获取到的实时监控通道信息
      VideoChannelState: [],
      //用户选中的通道
      channel: 1,
      // 实时监控视频链接
      videosrc: "",
    };
  },
  methods: {
    // 切换设备
    checked(i) {
      // 选中项样式
      this.checkedIndex = i;
      // 已有列表数据赋值
      this.checkDevice = this.deviceList[i];
      let id = this.deviceList[i].id;
      // 获取实时工况数据
      this.$api.getDetailWithWorkConditionData(id).then((val) => {
        // 赋值工况数据
        let detail = val.data.data;
        this.workConditionData = detail.workConditionData;
        // 周工作数据
        // 赋值工况数据给图表
        this.chart1Data = this.$EchartsData.Schart1(detail.weekAnalysisData.details);
        
      });
      this.initVideo();
    },
    // 获取视频并赋值函数
    initVideo() {
      // 获取实时监控视频通道数据
      this.$api.getVehicleCode(this.checkDevice.equipmentNo).then((val) => {
        let data = val.data.data[0];
        this.$api.getVideoChannelState(data.terminalId).then((val) => {
          let data = val.data.data[0].split(",").map(Number);
          // 通道信息赋值给data数据在页面显示状态
          this.VideoChannelState = data;
        });
      });
      this.$api
        .getvideoPlay(this.checkDevice.equipmentNo, this.channel)
        .then((val) => {
          let data = val.data.data.split("|");
          this.videosrc = data[1];
          this.setHeartBeat(data[2]);
        });
    },
    initData() {
      this.$api.getselectList("0", "999").then((val) => {
        // 给设备列表赋值
        this.deviceList = val.data.data.rows;
        // 给设备数据赋值
        let checkDevice = val.data.data.rows[0];
        this.checkDevice = checkDevice;
        // 获取第一个设备的id
        let id = checkDevice.id;
        // 获取默认设备工况数据
        this.$api.getDetailWithWorkConditionData(id).then((val) => {
          // 赋值工况数据
          let detail = val.data.data;
          this.workConditionData = detail.workConditionData;
          // 赋值工况数据给图表
          this.chart1Data = this.$EchartsData.Schart1(detail.weekAnalysisData.details);
        });

        this.initVideo();
      });
    },
  },
  created() {
    (function () {
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
    this.initData();
  },
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
  // 去除百度logo
  .anchorBL > a > img {
    display: none;
  }
  .BMap_cpyCtrl.BMap_noprint.anchorBL {
    display: none;
  }
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
      background: url("@/assets/images/kzuqi/show.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 20px 0 0 25px;
      cursor: pointer;
    }
    .leftTreehide {
      background-image: url("@/assets/images/kzuqi/hide.png");
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
    display: flex;
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
      padding: 8px 0 12px 14px;
      width: 203px;
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
      display: flex;
      justify-content: space-between;
      .leftScreen {
        position: relative;
        float: left;
        padding: 8px 0 12px 10px;
        width: 357px;
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
            height: calc(100% - 10px);
            margin: 10px;
            margin-bottom: 0;
            .operator {
              margin: 3px 0 0;
              font-size: 12px;
            }
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
              height: 55%;
              .el-radio-group {
                height: 35px;
                display: flex;
                overflow: auto;
                flex-wrap: nowrap;
                // justify-content: space-around;
                .el-radio-button {
                  .el-radio-button__inner {
                    position: relative;
                    width: 60px;
                    height: 25px;
                    margin: 0px 4px;
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
                    padding: 0;
                    box-shadow: none;

                    .dot {
                      position: absolute;
                      top: 50%;
                      left: 4px;
                      transform: translateY(-55%);
                      width: 4px;
                      height: 4px;
                      border-radius: 50%;
                      background: #13ca40;
                    }
                  }
                  .el-radio-button__inner:hover {
                    background: rgba(0, 198, 255, 0.2);
                  }
                }
                .channel-disabled span {
                  color: rgba(0, 198, 255, 0.4);
                  border: 1px solid rgba(0, 198, 255, 0.4);
                }
                .is-active {
                  .el-radio-button__inner {
                    color: #000002;
                    background: rgba(0, 198, 255, 0.8) !important;
                  }
                }
              }

              .videoBox {
                position: relative;
                height: calc(100% - 35px);

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
              height: 18%;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              > div {
                display: flex;
                line-height: 16px;
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
                justify-content: space-around;
                .mark {
                  margin: 0;
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
            height: 100%;
            margin: 10px;
            > div {
              height: calc(50% - 20px);
            }
            span {
              margin: 0 3px;
              color: #adc8cd;
            }
            .weekAnalysisData {
              height: 100%;
            }
            .workingCondition {
              position: relative;
              font-size: 12px;
              height: calc(100% - 34px);
              .el-carousel.el-carousel--horizontal {
                top: calc(50% - 60px);
              }
              .el-carousel__indicator.el-carousel__indicator--horizontal {
                padding: 0 4px;
              }
              .dataArea {
                height: 100%;
                padding: 2.5px 0;
                display: flex;
                flex-wrap: wrap;
                .panel {
                  width: calc(25% - 0px);
                  display: flex;
                  text-align: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  .panel-item {
                    width: calc(100% - 2px);
                    height: 36px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
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
        width: 100%;
        min-width: 340px;
        background: rgba(0, 0, 2, 0.8);
        .centerTop {
          height: 100%;
          background-size: 16px;
          .bigNumber {
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            div {
              h2 {
                font-size: 21px;
                color: #ffffff;
                margin: 0 0 12px 0;
                text-align: center;
              }
              p {
                text-align: center;
              }
            }
          }
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
                > div {
                  display: flex;
                  align-items: center;
                }
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
                    align-items: center;
                    .dot {
                      margin: 0px 12px;
                      width: 5px;
                      height: 5px;
                      border-radius: 50%;
                      background: #ff0000;
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
                .item:nth-child(2) {
                  .dot {
                    background-color: #ff8a00;
                  }
                }
                .item:nth-child(3) {
                  .dot {
                    background-color: #ebce41;
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
                .item {
                  .left {
                    display: flex;
                    .dot {
                      margin: 2px 12px 0px;
                      width: 5px;
                      height: 5px;
                      border-radius: 50%;
                      background: rgb(5, 87, 173);
                    }
                  }
                }
              }
            }
          }
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
                margin: 0 10px;
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
                  margin-right: 20px;
                  color: #fc6501;
                  cursor: pointer;
                  .linkLine {
                    text-decoration: underline;
                  }
                }
              }
            }
            .el-carousel__arrow--left {
              left: -14px;
            }
            .el-carousel__arrow--right {
              right: -6px;
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