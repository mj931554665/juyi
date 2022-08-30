<template>
  <div class="HistoricalTrack">
    <el-container>
      <el-main>
        <el-amap
          class="amap-box"
          :vid="'amap-vue'"
          ref="GdMap"
          style="height: 100%"
          :center="mapCenter"
          :amap-manager="amapManager"
          :plugins="plugins"
          :events="events"
          :resize-enable="true"
        ></el-amap>
        <div class="trackCtrollWarp">
          <el-row type="flex" align="middle">
            <el-col class="left" :span="4">轨迹里程：{{ mileageStr }}km</el-col>
            <el-col class="right" :span="20">
              <i class="el-icon-refresh"></i>
              <i class="el-icon-video-play" @click="startTrack()"></i>
              <i class="el-icon-video-pause"></i>
              <i class="el-icon-d-arrow-left"></i>
              <el-slider v-model="trackSlider" height="8"></el-slider>
              <i class="el-icon-d-arrow-right"></i>
              <span>暂停中... 速度X1</span>
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
                    size="small"
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
                  ><el-input v-model="speedInput"></el-input
                ></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="11">km/h</el-col>
              </el-row>
              <el-row type="flex" justify="space-between">
                <el-col :span="20">速度大于50时突出显示</el-col>
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
import { AMapManager } from "vue-amap";

const amapManager = new AMapManager();
import TrackTable from "@/components/TrackTable.vue";
import { dateFormat } from "@/utils/validate";
export default {
  components: {
    TrackTable,
  },
  props: {
    equipmentNo: {
      type: String,
      default: "CC0400CC0003",
    },
  },
  data() {
    return {
      // 地图相关------------------------------
      mapCenter: [114.085947, 22.547], // 地图中心
      amapGD: {
        // 地图加载后触发的事件
        complete: () => {
          map = this.$refs.GdMap.$$getInstance(); // 获取地图实例
        },
      },
      plugins: [],
      amapManager,
      events: {
        init(map) {
          console.log("map init ok", map);
        },
      },
      // 表格查询相关-----------------------------
      TrackList: [], //轨迹信息列表表格
      activeName: "first", // 标签页切换
      // 设备列表及选中设备
      deviceList: [],
      deviceActive: this.equipmentNo,
      // 开始时间及结束时间
      start: new Date().setHours(0, 0, 0),
      end: new Date().setHours(23, 59, 59),
      speedInput: 50,
      speedValue: false, //速度显示开关
      highRiskValue: true, //高风险显示开关
      mediumRiskValue: true, //中风险显示开关
      lowRiskValue: true, //低风险显示开关
      fenceValue: true, //电子围栏显示开关
      // 控制轨迹相关数据-------------------------------
      mileageStr: "", // 轨迹里程
      trackSlider: 0,
      trackLine: [],
    };
  },
  created() {
    this.initDeviceInfo();
  },
  methods: {
    
    startTrack() {
      // let map = amapManager.getMap();
      map.clearMap();

      // 轨迹点
      const lineArr = this.trackLine;
      // 创建主体
      let marker = new AMap.Marker({
        map: map,
        position: lineArr[0],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90,
      });

      // 绘制轨迹
      let polyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        showDir: true,
        strokeColor: "#28F", //线颜色
        strokeWeight: 6, //线宽
        strokeOpacity: 1, //线透明度
        strokeStyle: "solid", //线样式
      });

      // 回执经过的轨迹
      let passedPolyline = new AMap.Polyline({
        map: map,
        strokeColor: "#Ad5", //线颜色
        strokeWeight: 6, //线宽
      });

      //经过轨迹的更新
      marker.on("moving", function (e) {
        passedPolyline.setPath(e.passedPath);
      });

      // 自动适配视图
      map.setFitView();

      // 开始沿坐标移动
      marker.moveAlong(lineArr, 200);
    },
    initDeviceInfo() {
      // 获取设备列表
      this.$api.getSelectList("", "", "", "", 1, 9999).then((res) => {
        // console.log("设备列表", res.data);
        this.deviceList = res.data.data.rows;
      });
      let startDate = dateFormat(this.start, "yyyy-MM-dd HH:mm:ss");
      let endDate = dateFormat(this.end, "yyyy-MM-dd HH:mm:ss");
      //获取设备轨迹信息
      this.$api
        .getHistoryTrackDetail(startDate, endDate, this.deviceActive)
        .then((res) => {
          let data = res.data.data;
          console.log("res", data);
          // 设置地图中心点
          this.mapCenter = [
            data.centerPointLongtitude,
            data.centerPointLatitude,
          ];
          // 获取轨迹列表并渲染表格
          this.TrackList = data.listPoint;
          this.mileageStr = data.mileageStr; // 轨迹里程
          // 获取轨迹经纬度在地图上进行渲染
          let lineArr = [];
          data.listPoint.forEach((item) => {
            lineArr.push([item.longitude, item.latitude]);
          });
          this.trackLine = lineArr;
        });
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
            font-size: 12px;
            font-weight: 400;
            color: #fff;
          }
          .right {
            display: flex;
            align-items: center;
            width: 100%;
            font-size: 20px;
            color: rgba(220, 220, 220, 1);
            i {
              margin: 0 5px;
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
