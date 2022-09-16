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
        <div id="fullScreen" title="全屏/退出全屏" @click="fullScreen">
          <i class="el-icon-full-screen"></i>
        </div>
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
              :class="searchInput === '' ? '' : 'hasContent'"
            >
            </el-input>
          </div>
          <div class="leftTreeBottom">
            <div
              class="equipmentItem textFont14"
              v-for="(item, index) in deviceList"
              :key="index"
              v-show="item.name.indexOf(searchInput) > -1"
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
                    v-if="item.hasVideo"
                    :style="item.videoStatus == 0 ? 'color:#5e5e5f;' : ''"
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
              <div class="video" v-if="checkDevice.videoStatus">
                <el-radio-group
                  v-model="channel"
                  class="channel-content"
                  @change="initVideo()"
                >
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
              <div class="noVideo" v-else>
                <div v-if="checkDevice.hasVideo">
                  <div class="videoStatus"></div>
                  <p>视频终端不在线</p>
                </div>
                <div v-else>
                  <div class="hasVideo"></div>
                  <p>未检测到天眼硬件，请联系项目组安装</p>
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
                    :height="swiperHeight1"
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
                <div class="title textFont16 weekoil">
                  <div>
                    <i class="el-icon-s-tools"></i>
                    <span class="textColor">近七日油耗详情</span>
                  </div>
                  <span style="float: right"
                    >总计：{{ weekAnalysisData.oilCost }}L/{{
                      weekAnalysisData.workTime
                    }}h</span
                  >
                </div>
                <div class="splitLine"></div>
                <div class="weekAnalysisData">
                  <EchartsComp
                    :options="chart1_option"
                    :width="'298px'"
                    :minHeight="'146px'"
                  ></EchartsComp>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="centerTopScreen">
          <div class="centerTop borderImg">
            <div class="bigNumber">
              <div>
                <h2>{{ totalTonnage }}</h2>
                <p>总起重总量（吨）</p>
              </div>
              <div>
                <h2>{{ workTime }}</h2>
                <p>总工作时长（小时）</p>
              </div>
              <div>
                <h2>{{ totalHoisting }}</h2>
                <p>总吊载（起重）次数</p>
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
                  <EchartsComp
                    :options="chart2_option"
                    :width="'112px'"
                    :minHeight="'121px'"
                  ></EchartsComp>
                </div>
                <div class="data">
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">
                      <label>华东区：</label>{{ deviceArea.east }}%
                    </div>
                    <span>{{ deviceArea.eastChina }}</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">
                      <label>华南区：</label>{{ deviceArea.south }}%
                    </div>
                    <span>{{ deviceArea.southChina }}</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">
                      <label>华中区：</label>{{ deviceArea.center }}%
                    </div>
                    <span>{{ deviceArea.centerChina }}</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">
                      <label>华北区：</label>{{ deviceArea.north }}%
                    </div>
                    <span>{{ deviceArea.northChina }}</span>
                  </div>
                  <div class="item">
                    <div class="dot"></div>
                    <div class="text">
                      <label>其他区：</label>{{ deviceArea.other }}%
                    </div>
                    <span>{{ deviceArea.otherChina }}</span>
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
                  <EchartsComp
                    :options="chart3_option"
                    :width="'112px'"
                    :minHeight="'121px'"
                  ></EchartsComp>
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
              <div class="area chart3" style="padding-top: 6px">
                <div class="chart">
                  <EchartsComp
                    :options="chart4_option"
                    :width="'112px'"
                    :minHeight="'121px'"
                  ></EchartsComp>
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
              <el-carousel
                :autoplay="true"
                :interval="3000"
                arrow="always"
                :height="swiperHeight2"
              >
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
      <div class="map" style="overflow: hidden">
        <AMap
          @deviceData="getdeviceData(arguments)"
          :deviceList="deviceList"
          :device="checkDevice"
        ></AMap>
      </div>
    </div>
  </div>
</template>

<script>
// 引入大屏地图
import AMap from "@/components/AMap.vue";
// 引入全屏按钮
import { fullScreen } from "@/utils/validate.js";
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
    EchartsComp,
    VideoArea,
    CstorLivePlayer,
    AMap,
  },
  computed: {
    chart3_option() {
      return this.$EchartsData.Schart3();
    },
    chart4_option() {
      return this.$EchartsData.Schart4();
    },
  },
  data() {
    return {
      /* 图表数据 */
      // 第一个图表的数据
      chart1_option: {},
      // 第二个图表的数据
      chart2_option: {},

      /* 搜索设备列表数据 */
      // 是否隐藏左侧列表
      hideLeftTree: false,
      // 搜索框数据
      searchInput: "",
      // 搜索列表选中项
      checkedIndex: 0,

      // 设备数据
      checkDevice: {},
      // 实时工况数据
      workConditionData: {},
      // 设备列表
      deviceList: [],
      // 设备列表左侧可搜索
      deviceListFilter: [],
      // 获取到的实时监控通道信息
      VideoChannelState: [],
      //用户选中的通道
      channel: 1,
      oldChannel: 0,
      // 实时监控视频链接
      videosrc: "",
      // 左边中间走马灯高度
      swiperHeight1: `${window.innerHeight / 7}px`,
      // 右下角走马灯高度
      swiperHeight2: `${window.innerHeight / 5}px`,
      // 全屏状态
      ScreenStatus: false,
      // 周工况数据（近七日油耗详情）
      weekAnalysisData: {},
      // 设备地区分布统计
      deviceArea: {},
      // 所有设备工作时长总数
      workTime: "加载中...",
      // 所有设备吨位总数
      totalTonnage: "加载中...",
      // 总吊载（起重）次数
      totalHoisting: "加载中...",
    };
  },
  created() {
    document.title = "钜亿安全监控大屏";
    (function () {
      let t = null;
      t = setTimeout(time, 1000); //開始运行
      // clearTimeout(t); //清除定时器
      function time() {
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
  mounted() {
    window.addEventListener("resize", () => {
      this.swiperHeight1 = `${window.innerHeight / 6}px`;
      this.swiperHeight2 = `${window.innerHeight / 5}px`;
    });
  },
  destroyed() {
    this.stopHeartBeat(this.oldChannel);
  },
  methods: {
    // 全屏方法
    fullScreen() {
      this.ScreenStatus = fullScreen(this.ScreenStatus);
      // alert(window.innerHeight);
      // alert(window.innerHeight / 5);
      this.swiperHeight2 = `${window.innerHeight / 5}px`;
    },
    // 点击地图切换设备传入的值为 id,index（子传父
    getdeviceData(data) {
      this.checked(data[1]);
      this.getDeviceData(data[0]);
    },
    // 切换设备
    checked(i) {
      // 选中项样式
      this.checkedIndex = i;
      // 已有列表数据赋值
      this.checkDevice = this.deviceList[i];
      let id = this.deviceList[i].id;
      this.getDeviceData(id);
      this.initVideo();
    },
    // 获取设备详细工况数据
    getDeviceData(id) {
      // 获取实时工况数据
      this.$api.getDetailWithWorkConditionData(id).then((val) => {
        // 赋值工况数据
        let detail = val.data.data;
        if (detail.workConditionData === null) {
          this.workConditionData = {};
          this.chart1_option = this.$EchartsData.Schart1(null);
        } else {
          this.workConditionData = detail.workConditionData;
          // 周工作数据
          // 赋值七日油耗详情数据
          this.weekAnalysisData = detail.weekAnalysisData;
          // 赋值工况数据给图表
          this.chart1_option = this.$EchartsData.Schart1(
            detail.weekAnalysisData.details
          );
        }
      });
    },
    // 获取视频并赋值函数
    initVideo() {
      // 判断是否实时视频是否在线
      if (this.checkDevice.videoStatus) {
        // 获取实时监控视频通道数据
        this.$api.getVehicleCode(this.checkDevice.equipmentNo).then((val) => {
          // console.log(val.data.data.length == 0, val.data.data);

          let data = val.data.data[0];
          this.$api.getVideoChannelState(data.terminalId).then((val) => {
            let data = val.data.data[0].split(",").map(Number);
            // 通道信息赋值给data数据在页面显示状态
            this.VideoChannelState = data;
          });

          this.$api
            .getvideoPlay(this.checkDevice.equipmentNo, this.channel)
            .then((val) => {
              this.stopHeartBeat(this.oldChannel); //停止上一个视频的心跳
              if (val.data.data) {
                let data = val.data.data.split("|");
                this.videosrc = data[1];
                this.setHeartBeat(data[2], this.channel);
                this.oldChannel = this.channel; //记录这一次的视频通道
              }
            });
        });
      }
    },
    initData() {
      // 获取图表二数据
      this.getDeviceType();
      this.$api.getcustomerScreen("1", "9999").then((val) => {
        // 给设备列表赋值
        this.deviceList = val.data.data;
        // console.log("this.deviceList", this.deviceList);
        // 设备统计数据
        this.statisticalData(val.data.data);
        // 设备地区分布处理
        this.distributedArea(val.data.data);
        // 给设备数据赋值
        let checkDevice = this.deviceList[0];
        this.checkDevice = checkDevice;
        // 获取第一个设备的id
        let id = checkDevice.id;
        // 获取默认设备工况数据
        this.$api.getDetailWithWorkConditionData(id).then((val) => {
          // 赋值工况数据
          let detail = val.data.data;
          this.workConditionData = detail.workConditionData;
          // 赋值七日油耗详情数据
          this.weekAnalysisData = detail.weekAnalysisData;
          // 赋值工况数据给图表
          this.chart1_option = this.$EchartsData.Schart1(
            detail.weekAnalysisData.details
          );
        });

        this.initVideo();
      });
    },
    // 获取设备类型数据
    getDeviceType() {
      this.$api.getEquipmentAmountByType().then((val) => {
        this.chart2_option = this.$EchartsData.Schart2(val.data.data);
      });
    },
    // 设备地区分布
    distributedArea(e) {
      this.deviceArea.eastChina = //华东
        this.deviceArea.east = //华东百分比
        this.deviceArea.southChina = // 华南
        this.deviceArea.south = //华南百分比
        this.deviceArea.centerChina = //华中
        this.deviceArea.center = //华中百分比
        this.deviceArea.northChina = // 华北
        this.deviceArea.north = // 华北百分比
        this.deviceArea.otherChina = // 其他
        this.deviceArea.other = // 其他百分比
          0;
      e.forEach((item) => {
        let area = item.address;
        if (
          area.indexOf("山东省") > -1 ||
          area.indexOf("江苏省") > -1 ||
          area.indexOf("安徽省") > -1 ||
          area.indexOf("浙江省") > -1 ||
          area.indexOf("福建省") > -1 ||
          area.indexOf("上海市") > -1
        ) {
          this.deviceArea.eastChina++;
        } else if (
          area.indexOf("广东省") > -1 ||
          area.indexOf("广西") > -1 ||
          area.indexOf("海南省") > -1
        ) {
          this.deviceArea.southChina++;
        } else if (
          area.indexOf("湖北省") > -1 ||
          area.indexOf("湖南省") > -1 ||
          area.indexOf("河南省") > -1 ||
          area.indexOf("江西省") > -1
        ) {
          this.deviceArea.centerChina++;
        } else if (
          area.indexOf("北京") > -1 ||
          area.indexOf("天津") > -1 ||
          area.indexOf("河北") > -1 ||
          area.indexOf("山西") > -1 ||
          area.indexOf("内蒙古自治区") > -1
        ) {
          this.deviceArea.northChina++;
        } else if (
          // 华南 海域
          Number(item.lng) < 117.108191 &&
          Number(item.lng) > 107.938845 &&
          Number(item.lat) < 23.615236 &&
          Number(item.lat) > 17.673638
        ) {
          this.deviceArea.southChina++;
        } else if (
          // 华东 海域
          Number(item.lng) < 125.9 &&
          Number(item.lng) > 117.677939 &&
          Number(item.lat) < 38.3 &&
          Number(item.lat) > 21.7
        ) {
          this.deviceArea.eastChina++;
        } else {
          console.log("item", item);
          console.log("item.lng", item.lng);
          // console.log("item.lat", item.lat);

          this.deviceArea.otherChina++;
        }
      });
      this.deviceArea.east = (
        (this.deviceArea.eastChina / e.length) *
        100
      ).toFixed(1);
      this.deviceArea.south = (
        (this.deviceArea.southChina / e.length) *
        100
      ).toFixed(1);
      this.deviceArea.center = (
        (this.deviceArea.centerChina / e.length) *
        100
      ).toFixed(1);
      this.deviceArea.north = (
        (this.deviceArea.northChina / e.length) *
        100
      ).toFixed(1);
      this.deviceArea.other = (
        (this.deviceArea.otherChina / e.length) *
        100
      ).toFixed(1);
    },
    // 获取屏幕中间的统计数据
    statisticalData(e) {
      // 设置需要获取统计数据的这部编号
      let vehicleCodes = "";
      let totalTonnage = 0;
      e.forEach((item) => {
        // 去除吨位的多余文字或者单位（获取设备吨位总数
        let tonnage = item.modelLabel ? item.modelLabel : 0;
        totalTonnage += parseInt(tonnage.replace(/[^\d]/g, ""));
        vehicleCodes += item.equipmentNo + ",";
      });
      this.totalTonnage = totalTonnage ? totalTonnage : 0;
      // 获取当前日期
      let date = new Date();
      let endDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      // 根据设备编号，公司创建日期，和当前日期获取整个统计数据
      this.$api
        .getWorkStatInfo(vehicleCodes, "2016-01-01", endDate)
        .then((res) => {
          // 赋值给data并且判断数据不为空
          let workTime = res.data.data.intervalCraneWorktimeStr;
          this.workTime = workTime ? parseInt(workTime) : 0;
          let totalHoisting = res.data.data.intervalHoistingCountStr;
          this.totalHoisting = totalHoisting ? totalHoisting : 0;
        });
    },
  },
};
</script>

<style lang="less">
.DigitalScreen {
  box-sizing: border-box;
  // font-size: 13.25px;
  color: rgb(0, 198, 255);
  min-width: 1280px;
  min-height: 620px;
  width: 100%;
  height: 100vh;
  min-width: 1440px;
  letter-spacing: 1px;

  // 去除轮播图背景颜色
  .el-carousel__arrow,
  .el-carousel__arrow:hover {
    background-color: rgba(255, 255, 255, 0);
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
    padding: 0px 10px;
    border-radius: 8px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    border: none;
    color: #50666e;
    background: none;
    height: auto;
    margin-left: 10px;
    font-size: 24px;

    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06);
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

  header {
    display: flex;
    justify-content: space-between;
    height: 53px;
    background: #000002;
    border-bottom: 1px solid rgba(0, 198, 255, 0.2);

    .headerLeftShow {
      z-index: 1;
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
      font-size: 16px;
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
      font-size: 14px;
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

    .weekoil {
      display: flex;
      justify-content: space-between;
    }

    .title > i {
      font-size: 16px;
    }

    .leftTree {
      position: relative;
      padding: 8px 0 12px 14px;
      width: 13vw;
      height: calc(100% - 20px);
      z-index: 230;
      background: rgba(0, 0, 2, 0.8);

      .leftTreeTop {
        position: relative;
        margin: 10px;

        .el-input {
          display: block;

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

        .hasContent {
          .el-icon-search {
            display: none;
          }
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
        width: 20vw;
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
              font-size: 16px;
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
                border: 1px solid rgba(0, 198, 255, 0.5);
                border-radius: 6.12px;
                background-color: #000002;

                .mark {
                  margin: 0;
                  padding: 1.8px 1px;
                  color: rgba(0, 198, 255, 0.8);
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
              display: flex;
              justify-content: center;
              height: 100%;
            }

            .workingCondition {
              position: relative;
              font-size: 12px;
              height: calc(100% - 38px);

              .el-carousel__indicators.el-carousel__indicators--horizontal.el-carousel__indicators--outside {
                display: none;
              }

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
        height: 12vh;
        z-index: 230;
        width: 60%;
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
                font-size: 16px;
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
          width: 20vw;
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
                justify-content: space-between;

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
                    display: flex;
                    justify-content: space-evenly;
                    width: 108px;
                  }

                  span {
                    display: inline-block;
                    width: 24px;
                    color: #00c6ff;
                    text-align: right;
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
                justify-content: space-around;
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
          width: 20vw;
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
                  background-image: url("@/assets/images/kzuqi/icon1.png");
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

              .expireTimeContent:nth-child(2) {
                .expireTimeItem::before {
                  background-image: url("@/assets/images/kzuqi/icon2.png");
                }
              }

              .expireTimeContent:nth-child(3) {
                .expireTimeItem::before {
                  background-image: url("@/assets/images/kzuqi/icon3.png");
                }
              }

              .expireTimeContent:nth-child(4) {
                .expireTimeItem::before {
                  background-image: url("@/assets/images/kzuqi/icon4.png");
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
