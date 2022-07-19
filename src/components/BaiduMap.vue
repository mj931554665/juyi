<template>
  <div class="baiduMap">
    <el-card class="cardStyle">
      <!-- ready,地图组件渲染完毕时触发，返回一个百度地图的核心类和地图实例 -->
      <baidu-map
        id="map"
        class="mapStyle"
        :center="centerPoint"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        :min-zoom="5"
        @ready="handler"
      >
        <!-- 聚合点组件（需引入） -->
        <bml-marker-clusterer :averageCenter="false">
          <bm-marker
            v-for="marker in markerArr"
            :key="marker.id"
            :position="marker"
            :icon="icon"
            :top="marker.id == markerTop ? true : false"
            @click="lookDetail(marker)"
          >
            <bm-label
              :content="markerLabel(marker)"
              :labelStyle="{
                color: '#fff',
                fontSize: '12px',
                border: 'none',
                minWidth: '20px',
                textAlign: 'center',
                padding: '3px 4px',
                background: '#409EFF',
                borderRadius: '8px',
                zIndex: '1',
              }"
              :offset="{ width: 6, height: -25 }"
            />
          </bm-marker>
        </bml-marker-clusterer>
        <bm-info-window
          :position="infoWindow.info"
          :show="infoWindow.show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <div class="info-window">
            <Popups :hasVideo="deviceInfo.hasVideo" :id="deviceInfo.id">
              <span slot="name">{{ deviceInfo.name }}</span>
              <span slot="equipmentNo">{{ deviceInfo.equipmentNo }}</span>
              <span slot="locationTime">{{ deviceInfo.locationTime }}</span>
              <span slot="address">{{ deviceInfo.address }}</span>
              <!-- <span slot="locationState">{{
                deviceInfo.locationState ? "已定位" : "未定位"
              }}</span> -->
              <span slot="powerTypeLable">{{ deviceInfo.powerTypeLable }}</span>
              <span slot="carStatusLabel">{{ deviceInfo.carStatusLabel }}</span>
              <!-- 设置盒子类型，取消换行 -->
              <span slot="modelLabel" >{{
                deviceInfo.modelLabel
              }}</span>
            </Popups>
          </div>
        </bm-info-window>
        <!-- ``````````````````````自带的控件```````````````````````` -->
        <!-- 地图放大缩小控件，左下角 -->
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
        <!-- 地图类型切换控件，左上角 -->
        <bm-map-type
          :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
          anchor="BMAP_ANCHOR_TOP_LEFT"
        ></bm-map-type>
      </baidu-map>
      <div class="controls">
        <!-- filterable属性即可启用搜索功能
        clearable属性，则可将选择器清空 -->
        <el-select
          v-model="devicValue"
          placeholder="请输入设备名称或编号"
          filterable
          clearable
          @change="selectChange()"
        >
          <el-option
            v-for="item in markerArr"
            :key="item.id"
            :label="item.name + ` | ` + item.equipmentNo"
            :value="item.id"
          >
          </el-option>
        </el-select>

        <div>
          <div class="operation">
            <el-popover
              placement="right"
              width="300"
              trigger="click"
              title="显示"
            >
              <div id="baiduMapFilter">
                <div>
                  <h4>在线状态</h4>
                  <el-checkbox-group
                    v-model="C_onlineStatus"
                    @change="onlineStatusChange"
                  >
                    <el-checkbox-button
                      v-for="status in C_onlineStatusArr"
                      :label="status"
                      :key="status"
                      >{{ status }}</el-checkbox-button
                    >
                  </el-checkbox-group>
                </div>
                <div v-show="false">
                  <h4>风险状态</h4>
                  <el-checkbox-group v-model="riskStatus">
                    <el-checkbox-button
                      v-for="status in riskStatusArr"
                      :label="status"
                      :key="status"
                      >{{ status }}</el-checkbox-button
                    >
                  </el-checkbox-group>
                </div>
                <div>
                  <h4>自定义显示吨位</h4>
                  <el-select
                    v-model="modelLabelValue"
                    multiple
                    collapse-tags
                    filterable
                    placeholder="请选择"
                    @change="modelLabeChange()"
                  >
                    <el-option
                      v-for="item in modelLabels"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <el-button @click="emptyModelLabe()">清空</el-button>
                </div>
                <div>
                  <h4>定位显示名称</h4>
                  <el-radio-group v-model="targetDisplayName">
                    <el-radio-button label="图标+设备名称"></el-radio-button>
                    <!-- <el-radio-button label="仅图标"></el-radio-button> -->
                    <el-radio-button label="图标+设备编号"></el-radio-button>
                    <el-radio-button label="图标+车牌号"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <el-button slot="reference">
                <i class="el-icon-s-operation"></i>
              </el-button>
            </el-popover>
          </div>
        </div>

        <div class="refresh" @click="refresh()">
          <i class="el-icon-refresh"></i>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入设备信息弹窗组件
import Popups from "@/components/Popups.vue";
// 引入聚合点组件（vue-baidu-map自带）
import { BmlMarkerClusterer } from "vue-baidu-map";
export default {
  name: "HomeView",
  components: {
    BmlMarkerClusterer,
    Popups,
  },
  data() {
    return {
      //----地图部分数据-----------------------
      //中心轴坐标
      centerPoint: {
        lng: 120,
        lat: 36,
      },
      // 地图缩放倍数
      zoom: 5,
      // 设备坐标点
      markerArr: [],
      icon: {
        url: require("@/assets/images/Home_Equipment.png"),
        size: {
          width: 40,
          height: 40,
        },
        opts: {
          imageSize: {
            width: 40,
            height: 40,
          },
        },
      },
      markerPoint: {},
      //-------控件部分数据-----------------------
      //下拉框数据
      deviceNameAndNumber: [],
      devicValue: "",
      //··筛选数据``````````````````
      //在线状态
      C_onlineStatus: ["在线", "离线"],
      C_onlineStatusArr: ["在线", "离线"],
      //风险状态
      riskStatus: [],
      riskStatusArr: ["低风险", "中风险", "高风险"],
      //自定义显示吨位
      modelLabels: [
        {
          value: "20T",
          label: "20T",
        },
        {
          value: "25T",
          label: "25T",
        },
        {
          value: "35T",
          label: "35T",
        },
        {
          value: "SCC型320T",
          label: "SCC型320T",
        },
        {
          value: "SAC220T",
          label: "SAC220T",
        },
        {
          value: "SCC型650T",
          label: "SCC型650T",
        },
        {
          value: "SCC型500T",
          label: "SCC型500T",
        },
        {
          value: "40T",
          label: "40T",
        },
        {
          value: "50T",
          label: "50T",
        },
        {
          value: "55T",
          label: "55T",
        },
        {
          value: "60T",
          label: "60T",
        },
        {
          value: "70T",
          label: "70T",
        },
        {
          value: "75T",
          label: "75T",
        },
        {
          value: "80T",
          label: "80T",
        },
        {
          value: "85T",
          label: "85T",
        },
        {
          value: "90T",
          label: "90T",
        },
        {
          value: "100T",
          label: "100T",
        },
        {
          value: "110T",
          label: "110T",
        },
        {
          value: "130T",
          label: "130T",
        },
        {
          value: "135T",
          label: "135T",
        },
        {
          value: "150T",
          label: "150T",
        },
        {
          value: "160T",
          label: "160T",
        },
        {
          value: "200T",
          label: "200T",
        },
        {
          value: "220T",
          label: "220T",
        },
        {
          value: "250T",
          label: "250T",
        },
        {
          value: "260T",
          label: "260T",
        },
        {
          value: "280T",
          label: "280T",
        },
        {
          value: "300T",
          label: "300T",
        },
        {
          value: "320T",
          label: "320T",
        },
        {
          value: "350T",
          label: "350T",
        },
        {
          value: "400T",
          label: "400T",
        },
        {
          value: "450T",
          label: "450T",
        },
        {
          value: "500T",
          label: "500T",
        },
        {
          value: "600T",
          label: "600T",
        },
        {
          value: "630T",
          label: "630T",
        },
        {
          value: "650T",
          label: "650T",
        },
        {
          value: "700T",
          label: "700T",
        },
        {
          value: "800T",
          label: "800T",
        },
        {
          value: "1010T",
          label: "1010T",
        },
        {
          value: "1020T",
          label: "1020T",
        },
      ],
      modelLabelValue: [],
      //定位显示名称
      targetDisplayName: "图标+设备名称",

      //`````api接口获取的数据````````````````````````
      onlineStatus: JSON.parse(localStorage.getItem("Home_onlineStatus")),
      deviceList: JSON.parse(localStorage.getItem("Home_deviceList")),
      // 地图类
      BMap: "",
      // 地图对象
      Map: "",
      // 信息窗口数据
      // 位置和显示数据
      infoWindow: {
        show: false,
        info: {
          lng: "",
          lat: "",
        },
      },
      // 信息窗口设备的相关数据
      deviceInfo: {},
      // 设备标签的置顶效果
      markerTop: "",
      // 设备标签样式，等数据
      markerLabelStyle5: {},
      markerLabelStyle: {
        color: "#fff",
        fontSize: "12px",
        border: "none",
        minWidth: "20px",
        textAlign: "center",
        padding: "3px 4px",
        background: "#409EFF",
        borderRadius: "8px",
        zIndex: "1",
      },
    };
  },
  methods: {
    // 完成一次组件卸载 / 重新加载的方法，重新渲染
    async handler({ BMap, map }) {
      // 保存百度地图类
      this.BMap = BMap;
      // 保存地图对象
      this.Map = map;
      // this.centerPoint.lng = 106.317788;
      // this.centerPoint.lat = 35.923493;
    },
    // 判断数据是否获取成功，成功则存入，不成功则弹出错误，登录失效则返回登录页面
    judgeResponse(response, storageName) {
      if (response.data.code === 200) {
        localStorage.setItem(storageName, JSON.stringify(response.data.data));
      } else if (response.data.code === 401) {
        this.$notify.error({
          title: response.data.code + " 错误",
          message: response.data.message,
        });
        this.$router.replace({ path: "/login" });
      } else {
        this.$notify({
          title: response.data.code + " 警告",
          message: response.data.message,
          type: "warning",
          duration: 0,
        });
      }
    },
    // 获取设备定位数
    async getEquipmentAmountByLocated() {
      let locationStateNum = await this.$api.getEquipmentAmountByLocated();
      this.judgeResponse(locationStateNum, "Home_locationStateNum");
    },
    // 获取设备总数
    async getTotalDevicesNum() {
      let locationStateNum = await this.$api.getEquipmentAmountByType();
      this.judgeResponse(locationStateNum, "Home_totalDevicesNum");
    },
    // 获取设备上线，风险，定位数据 函数
    async getonlineStatus() {
      let onlineStatus = await this.$api.getonlineStatus();
      // 传入判断响应是否成功的函数进行判断
      this.judgeResponse(onlineStatus, "Home_onlineStatus");
    },
    // 获取设备列表数据
    async getqueryEquipmentsByPage() {
      // 获取已定位的设备总数显示在地图上
      let amount =
        this.onlineStatus[0].amount + this.onlineStatus[1].amount + 1 + "";
      // 传入在线设备数据获取定位设备列表
      let deviceList = await this.$api.getqueryEquipmentsByPage("0", amount);
      // 传入判断响应是否成功的函数进行判断
      this.judgeResponse(deviceList, "Home_deviceList");
    },
    // 渲染地图上面的数据
    renderMap() {
      // 获取到设备列表数据
      console.log(this.deviceList);
      let deviceList = this.deviceList.rows;
      // 数据进行foreach循环
      deviceList.forEach((item, key) => {
        // 定义一个容器来装筛选后的数据
        let device = item;
        // 解构赋值，获取到id，lng,lat
        const { id, lng, lat } = device;
        // 判断有没有空的位置数据，把非空数据渲染到地图上
        if (id && lng && lat) {
          // 筛选判断
          // 设备在线状态判断渲染
          this.C_onlineStatus.forEach((onlineStatus) => {
            // 和筛选的值进行比对，满足条件的才渲染出来
            if (item.onlineStatusLabel == onlineStatus) {
              // 吨位筛选
              if (this.modelLabelValue.length == 0) {
                this.markerArr.push(item);
              } else {
                this.modelLabelValue.forEach((modelLabel) => {
                  // 和吨位下拉选项比较，筛选渲染
                  if (item.modelLabel == modelLabel) {
                    this.markerArr.push(item);
                  }
                });
              }
            }
          });
        }
      });
    },
    // 筛选数据功能——在线状态,在线状态
    onlineStatusChange() {
      // 二次渲染判断，如果清空原本的地图标记
      this.markerArr = [];
      this.renderMap();
    },
    // 筛选数据功能——在线状态,显示吨位
    modelLabeChange() {
      // 二次渲染判断，如果清空原本的地图标记
      this.markerArr = [];
      this.renderMap();
    },
    // 刷新按钮功能，页面中心点和放大缩小倍数重置
    refresh() {
      this.Map.reset();
    },
    //点击设备图标出现信息窗
    //打开设备信息窗口
    lookDetail(item) {
      console.log(item);
      // 设置点击标签置顶的id判断值
      this.markerTop = item.id;
      // 窗口位置稍微下移一点,增加经度
      let lng = Number(item.lng);
      let lat = Number(item.lat);
      // 调用百度地图的中心点方法,把点击的设备点设为地图中心
      this.Map.panTo(new BMap.Point(lng, lat));
      // 设置信息窗口打开的位置和设备图标位置一致
      this.infoWindow.info.lng = lng;
      this.infoWindow.info.lat = lat;
      //-----给信息窗口组件传入设备信息
      this.deviceInfo = item;
      // 打开信息窗口
      this.infoWindow.show = true;
    },
    infoWindowClose() {
      this.infoWindow.show = false;
    },
    infoWindowOpen() {
      this.infoWindow.show = true;
    },
    // 搜索设备下拉框功能实现
    selectChange(val) {
      // let [id, lng, lat] = this.devicValue.split("|"); // es6 数组解构赋值
      // 判断当前选中值和渲染数据值，以获取当前选中item
      let item = this.markerArr.find((item) => item.id == this.devicValue);
      // 转换数字类型的经纬度，防止api调用出错
      let lng = Number(item.lng);
      let lat = Number(item.lat);
      // 调用百度地图的中心点方法,把点击的设备点设为地图中心
      this.Map.panTo(new BMap.Point(lng, lat));
      // 设置信息窗口打开的位置和设备图标位置一致
      this.infoWindow.info.lng = lng;
      this.infoWindow.info.lat = lat;
      //-----给信息窗口组件传入设备信息
      this.deviceInfo = item;
      // 打开信息窗口
      this.infoWindow.show = true;
    },
    // 筛选的函数，没有用
    filterList() {
      // 获取设备列表数据
      // let deviceList = this.deviceList.rows;
      // 暂时留数据，后续如需更改可以使用，下拉式搜索数据
      // this.deviceNameAndNumber = this.deviceList.rows;
    },
    // 清空自定义吨位数据
    emptyModelLabe() {
      // 清空原本数据
      this.modelLabelValue = [];
      this.markerArr = [];
      // 渲染地图上面的数据
      this.renderMap();
    },
    // 设备标签显示选择
    markerLabel(item) {
      switch (this.targetDisplayName) {
        case "图标+设备名称":
          this.markerLabelStyle = this.markerLabelStyle2;
          return item.name;
        case "仅图标":
          for (var key in this.markerLabelStyle) {
            this.markerLabelStyle[key] = "";
          }
          return "&nbsp;";
        case "图标+设备编号":
          this.markerLabelStyle = this.markerLabelStyle2;
          return item.equipmentNo;
        case "图标+车牌号":
          this.markerLabelStyle = this.markerLabelStyle2;
          return item.plateNo ? item.plateNo : "暂无车牌号";
        default:
          break;
      }
      return "1";
    },
  },
  created() {
    // 获取设备上线，风险，故障，定位数据
    this.getonlineStatus();
    // 获取设备列表
    this.getqueryEquipmentsByPage();
    // 获取设备总数
    this.getTotalDevicesNum();
    // 获取定位设备数
    this.getEquipmentAmountByLocated();
    // 根据设备列表添加筛选选项
    this.filterList();
    // 渲染地图上面的数据
    this.renderMap();
  },
};
</script>

<style lang="less">
.baiduMap {
  .cardStyle {
    position: relative;
    border: none;

    .mapStyle {
      width: 100%;
      /* height: calc(100vh - 130px); */
      height: 100vh;
      // 修改地图控件位置
      .anchorTL {
        inset: 44px auto auto 10px !important;
        display: flex;
        flex-direction: column;
      }
      // 去除百度logo
      .anchorBL > a > img {
        display: none;
      }
      .BMap_cpyCtrl.BMap_noprint.anchorBL {
        display: none;
      }
      //增加设备图片权重，防止被label压住无法显示
      .BMap_Marker {
        div {
          z-index: 2;
        }
        .BMapLabel:before {
          content: "";
          display: block;
          position: absolute;
          top: 25px;
          left: -6px;
          border: 2px solid #409eff;
          width: 40px;
          height: 40px;
          background-color: #fff;
          border-radius: 50%;
        }
        .BMapLabel::after {
          content: "";
          display: block;
          position: absolute;
          top: 19px;
          left: 9px;
          border-top: 6px solid #409eff;
          border-right: 6px solid rgba(0, 0, 0, 0);
          border-bottom: 6px solid rgba(0, 0, 0, 0);
          border-left: 6px solid rgba(0, 0, 0, 0);
        }
      }
    }

    // 控件样式
    .controls {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      // 搜索框
      .el-select {
        width: 200px;
        height: 50px;
        position: absolute;
        left: 60px;
        top: 40px;
        .el-input__inner {
          height: 50px;
          border-radius: 10px;
        }
      }

      .el-select:hover .el-input__inner {
        border-color: #66b1ff;
      }

      // 筛选和重置按钮
      .refresh,
      .operation {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 350px;
        top: 40px;
        font-size: 30px;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        color: #727272;
        border-radius: 10px;
        cursor: pointer;
      }
      .refresh:hover,
      .el-button i:hover {
        color: #66b1ff;
      }

      .refresh {
        left: 280px;
      }

      // 筛选按钮样式
      .el-button {
        height: 50px;
        font-size: 30px;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        color: #727272;
        padding: 0;
        border: none;
      }
    }
  }
}
// 筛选具体区域样式
#baiduMapFilter {
  h4 {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-radius: 50px;
    background: #efefef;
    box-shadow: 5px 5px 10px #d3d3d3, -5px -5px 10px #ededed;
  }
  .el-checkbox-group,
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-checkbox-button__inner,
    .el-radio-button__inner {
      border-left: 1px solid #dcdfe6;
      border-radius: 10px;
    }
  }
  div:nth-child(4) {
    .el-checkbox-button__inner,
    .el-radio-button__inner {
      width: 136px;
    }
  }
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    border-color: #409eff;
  }
}
</style>
