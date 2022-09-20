<template>
  <div class="HistoricalTrack">
    <el-container>
      <el-main>
        <el-amap
          class="amap-box"
          style="height: 100%"
          :center="mapCenter"
          :events="events"
          :resize-enable="true"
        ></el-amap>

        <div class="trackCtrollWarp">
          <el-row type="flex" align="middle">
            <el-col class="left" :span="4"
              >轨迹里程：{{ mileageStr == "" ? 0 : mileageStr }}km</el-col
            >
            <el-col class="right" :span="20">
              <i
                class="el-icon-video-play"
                v-show="!isPlay"
                @click="trackPlay()"
              ></i>
              <i
                class="el-icon-video-pause"
                v-show="isPlay"
                @click="trackPause()"
              ></i>
              <div class="stop" @click="startTrack()">
                <i class="el-icon-video-pause"> <i class="rotate"></i></i>
              </div>
              <i class="el-icon-d-arrow-left" @click="reduceSpeed"></i>
              <!-- <el-slider
                @change="sliderChange()"
                v-model="trackSlider"
                :max="totalSteps"
                :step="1"
                :format-tooltip="formatTooltip"
                height="8"
              ></el-slider> -->
              <el-progress
                :percentage="progress"
                :show-text="false"
                style="width: 100%"
              ></el-progress>
              <i class="el-icon-d-arrow-right" @click="addSpeed"></i>
              <span>{{ isPlay ? "播放" : "暂停" }}中... 速度X{{ speed }}</span>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-aside width="auto">
        <el-tabs
          v-model="activeName"
          :stretch="true"
          type="card"
          @tab-click="handleClick"
        >
          <el-tab-pane name="first">
            <span class="title" slot="label">设备信息</span>

            <div class="deviceInfo">
              <el-row type="flex" align="middle">
                <el-col :span="6">设备名称:</el-col>
                <el-col :span="18">
                  <el-select
                    v-model="deviceActive"
                    placeholder="请选择"
                    filterable
                    size="large"
                    clearable
                    @change="selectChange(deviceActive)"
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
                    v-model="startTime"
                    type="datetime"
                    :editable="false"
                    :clearable="false"
                    align="right"
                    size="large"
                    placeholder="选择日期时间"
                    default-time="12:00:00"
                    style="width: 200px"
                  >
                  </el-date-picker>
                </el-col>
              </el-row>
              <el-row type="flex" align="middle">
                <el-col :span="6">结束时间:</el-col>
                <el-col :span="18">
                  <el-date-picker
                    v-model="endTime"
                    type="datetime"
                    :editable="false"
                    :clearable="false"
                    align="right"
                    size="large"
                    placeholder="选择日期时间"
                    default-time="12:00:00"
                    style="width: 200px"
                  >
                  </el-date-picker>
                </el-col>
              </el-row>
              <!-- #region -->
              <!--<el-row type="flex" align="middle">
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
              </el-row> -->
              <!-- #endregion -->
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
          </el-tab-pane>

          <el-tab-pane name="second">
            <span class="title" slot="label"> 轨迹信息</span>
            <div style="height: calc(100vh - 170px)">
              <TrackTable :tableData="TrackList"></TrackTable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
let map = null; // 地图实例

import TrackTable from "@/components/TrackTable.vue";
import { dateFormat } from "@/utils/validate";
export default {
  components: {
    TrackTable,
  },
  props: {
    equipmentNo: {
      type: String,
      default: "CC0260CC0885",
    },
  },
  computed: {},
  data() {
    return {
      /* ----------------------组件数据---------------------- */
      //轨迹信息列表表格
      TrackList: [],
      // 标签页切换
      activeName: "first",
      //

      /* ----------------------查询数据---------------------- */
      // 设备列表
      deviceList: [],
      // 选中设备
      deviceActive: "",
      // 开始时间
      startTime: new Date().setHours(0, 0, 0),
      // 结束时间
      endTime: new Date().setHours(23, 59, 59),
      //

      /* ----------------------地图数据---------------------- */
      events: {
        init(e) {
          map = e; // 地图实例
          console.log("map", map);
        },
      },
      mapCenter: [114.085947, 22.547], // 地图中心
      markerMap: null, // 轨迹车辆实例
      lineArrMap: null, // 轨迹线路实例，整个的，没有路线点
      lineArr: null, // 轨迹线路实例，播放动画需要的
      //

      /* ----------------------控件数据---------------------- */
      isPlay: false, // 是否播放
      isPause: false, // 是否暂停，用于判断是使用开始函数还是继续函数
      mileageStr: "0", // 轨迹里程
      speed: 1, // 播放速度（小车移动速度
      progress: 0,
      //

      /* ----------------------原始数据---------------------- */
      listPoint: [],
      //

      //#region
      speedInput: 50,
      speedValue: false, //速度显示开关
      highRiskValue: false, //高风险显示开关
      mediumRiskValue: false, //中风险显示开关
      lowRiskValue: false, //低风险显示开关
      fenceValue: false, //电子围栏显示开关
      //  控制轨迹相关数据-------------------------------
      trackSlider: 0,
      trackLine: [],
      totalSteps: 0, // 进度条总步数
      totalDistance: 0, // 经纬度路径的实际长度。单位：米
      Times: "",
      totalTime: "",
      trackSliderChange: 0, //进度条改变时的进度条数
      // #endregion
    };
  },
  created() {
    // 获取设备列表
    this.$api.getSelectList("", "", "", "", 1, 9999).then((res) => {
      this.deviceList = res.data.data.rows;
      if (this.$route.query.deviceInfo) {
        this.deviceActive = this.$route.query.deviceInfo.equipmentNo;
      } else if (this.$route.params.equipmentNo) {
        this.deviceActive = this.$route.params.equipmentNo;
      }else{
        this.deviceActive = this.deviceList[0].equipmentNo;
      }
      this.initDeviceInfo();
    });
  },
  methods: {
    initDeviceInfo() {
      let startDate = dateFormat(this.startTime, "yyyy-MM-dd HH:mm:ss");
      let endDate = dateFormat(this.endTime, "yyyy-MM-dd HH:mm:ss");
      //获取设备轨迹信息
      this.$api
        .getHistoryTrackDetail(startDate, endDate, this.deviceActive)
        .then((res) => {
          let data = res.data.data;
          if (data.listPoint.length==0) return;
          this.mileageStr = data.mileageStr; // 轨迹里程
          // 获取轨迹列表并渲染表格
          this.TrackList = data.listPoint; // 轨迹点列表

          // 设置地图中心点
          this.mapCenter = [
            data.centerPointLongtitude,
            data.centerPointLatitude,
          ];
          // 获取轨迹经纬度在地图上进行渲染
          let listPoint = [];
          data.listPoint.forEach((item) => {
            listPoint.push([item.longitude, item.latitude]);
          });
          this.listPoint = listPoint;

          this.startTrack();
        });
    },
    startTrack() {
      /* ----------------------实例初始化部分---------------------- */
      map.clearMap();
      // 轨迹点
      let [...lineArr] = this.listPoint;
      this.lineArr = lineArr;
      // 创建主体
      let marker = (this.markerMap = new AMap.Marker({
        map: map,
        position: lineArr[0],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90,
      }));
      // 绘制轨迹
      let polyline = (this.lineArrMap = new AMap.Polyline({
        map: map,
        path: lineArr,
        showDir: true,
        strokeColor: "#28F", //线颜色
        strokeWeight: 6, //线宽
        strokeOpacity: 1, //线透明度
        strokeStyle: "solid", //线样式
      }));
      // 回执经过的轨迹
      let passedPolyline = new AMap.Polyline({
        map: map,
        strokeColor: "#Ad5", //线颜色
        strokeWeight: 6, //线宽
      });
      // 自动适配视图
      map.setFitView([polyline], false, [60, 60, 60, 60]);

      /* ----------------------数据计算还原部分---------------------- */
      // 初始化播放暂停状态
      this.isPlay = false;
      this.isPause = false;
      this.progress = 0;
      // 经过轨迹的更新&进度条更新
      // 利用高德地图自带的经纬度路径获取总距离
      let dis = AMap.GeometryUtil.distanceOfLine(this.lineArr);

      /* ----------------------事件监听部分---------------------- */
      // 点标记移动事件结束监听
      marker.on("movealong", () => {
        // 轨迹走完更新按钮状态
        this.isPlay = false;
        this.isPause = true;
      });
      // 点标记移动事件监听
      marker.on("moving", (e) => {
        // 计算进度条对应的位置值
        this.progress = parseInt(
          (AMap.GeometryUtil.distanceOfLine(e.passedPath) / dis) * 100
        );
        // 改变已经走过的路线颜色
        passedPolyline.setPath(e.passedPath);
      });
    },
    markerMoveAlong() {
      // 开始沿坐标移动
      /* //计算需要回放的GPS路径
      let replayPath = [];
      for (var i = 0; i < this.lineArr.length; i++) {
        replayPath.push;
        new AMap.LngLat(this.lineArr[i].lng, this.lineArr[i].lat);
      } */
      this.markerMap.moveAlong(this.lineArr, 200, (e) => {
        // e 是 当前小汽车 在路径中的比值
        // 路径是由多个坐标组成, e 不是整个路径的比值
        // e 是每两个坐标点之间的比值 从0 到 1
        // return 返回的值 就是改变小汽车在路径上的比值 ,比如现在走了一半(e为0.5),这时候return 0.8 那小车就会移动到 0.8的位置上,视觉上小车移动速度就变快了,但是不能超过1 超过1 就 跑出路径了
        return e * this.speed > 1 ? 1 : e * this.speed;
      });
    },
    // 播放函数
    trackPlay() {
      if (this.isPause) {
        this.markerMap.resumeMove();
        this.isPause = false;
        this.isPlay = true;
        return;
      }
      if (!this.isPlay) {
        this.markerMoveAlong();
        this.isPlay = true;
      }
    },
    // 暂停函数
    trackPause() {
      this.isPlay = false;
      this.isPause = true;
      // 暂停沿坐标移动
      this.markerMap.pauseMove();
    },

    addSpeed() {
      if (this.speed === 16) return;
      //改变小车移动速度,这里要注意 需要暂停 再继续 不然会有小车倒退的问题出现
      this.markerMap.pauseMove();
      this.speed += this.speed;
      if (this.isPause) return;
      this.markerMap.resumeMove();
    },
    /* formatTooltip(val) {
      // 进度条对应的设备移动距离，保留两位（数据根据经纬度点位判定）
      return (
        (((val / this.totalSteps) * this.totalDistance) / 1000).toFixed(2) +
        " km"
      );
    },
    sliderChange() {
      // this.marker.pauseMove();
      if (this.marker) {
        this.marker.stopMove();
      }
      this.marker.setPosition(
        new AMap.LngLat(
          this.lineArr[this.trackSlider].lng,
          this.lineArr[this.trackSlider].lat
        )
      );
      this.isPlay = false;
      this.isStartPlay = false;
      this.trackSliderChange = this.trackSlider;
    }, */
    reduceSpeed() {
      if (this.speed === 1) return;
      //改变小车移动速度,这里要注意 需要暂停 再继续 不然会有小车倒退的问题出现
      this.markerMap.pauseMove();
      this.speed -= this.speed / 2;
      if (this.isPause) return;
      this.markerMap.resumeMove();
    },
    selectChange() {
      console.log("this.deviceActive", this.deviceActive);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>
<style lang="less">
.HistoricalTrack {
  box-sizing: border-box;
  margin: 15px;
  height: calc(100vh - 100px);
  min-width: 1200px;
  overflow: hidden;
  .el-progress-bar__inner {
    transition: none;
  }
  .el-container {
    box-sizing: border-box;
    height: 100%;
    .el-main {
      position: relative;
      background: #fff;
      box-sizing: border-box;
      width: calc(100% - 270px);
      padding: 14px !important;
      .amp-box {
        margin: 14px;
      }
      .trackCtrollWarp {
        margin: -36px 0;
        left: 0;
        width: 100%;
        height: 36px;
        background: rgba(0, 0, 0, 0.3);
        z-index: 100;
        border-bottom: 1px solid #eee;
        box-shadow: 0 0 5px #ddd;
        transform: translateX(0);
        z-index: 200;
        .el-row {
          height: 100%;
          .left {
            width: 160px;
            font-size: 12px;
            font-weight: 400;
            padding-left: 10px;
            color: #fff;
          }
          .right {
            display: flex;
            align-items: center;
            width: 100%;
            font-size: 20px;
            color: rgba(220, 220, 220, 1);
            .stop {
              .el-icon-video-pause {
                position: relative;
                .rotate {
                  margin: 0;
                  width: 8px;
                  height: 8px;
                  background: rgba(220, 220, 220, 1);
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .el-icon-video-pause:hover .rotate {
                background: rgb(255, 255, 255);
              }
            }
            i {
              margin: 0 5px;
              cursor: pointer;
            }
            i:hover {
              color: rgb(255, 255, 255);
            }
            .el-slider {
              width: 100%;
              margin: 0 10px;
            }
            span {
              display: inline-block;
              width: 160px;
              margin-right: 15px;
              font-size: 12px;
            }
          }
        }
      }
    }
    .el-aside {
      background: #fff;
      margin-left: 15px;
      min-width: 270px;
      .el-tabs__nav.is-top.is-stretch {
        border-left: none !important;
        border-top: none !important;
        .el-tabs__item {
          background: hsla(0, 0%, 85%, 0.14);
          color: #999;
          .title {
            font-size: 18px;
            font-weight: 700;
            padding-right: 10px;
          }
          .title::before {
            content: "";
            display: inline-block;
            width: 6px;
            height: 12px;
            margin-right: 10px;
            background: #bfbfbf;
            border-radius: 1px;
          }
        }
        .is-active {
          background: #fff;
          color: #333232;
          .title::before {
            background: #f2ce91;
          }
        }
      }
      .el-tabs__content {
        padding: 0 15px;
        .deviceInfo {
          .el-row {
            margin-top: 18px;
            line-height: 34px;
            .el-switch {
              height: 34px;
            }
          }
        }
      }
    }
  }
}
</style>
