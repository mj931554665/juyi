<template>
  <div class="baiduMap">
    <el-card class="cardStyle">
      <!-- ready,地图组件渲染完毕时触发，返回一个百度地图的核心类和地图实例 -->
      <baidu-map
        id="map"
        ref="bMap"
        class="mapStyle"
        :center="centerPoint"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="handler"
      >
        <bm-marker
          v-for="marker in markerArr"
          :key="marker.id"
          :position="marker"
          :icon="icon"
          @click="lookDetail(marker)"
        >
          <bm-label
            :content="marker.name"
            :labelStyle="{
              color: '#fff',
              fontSize: '12px',
              border: 'none',
              padding: '3px 4px',
              background: '#409EFF',
              borderRadius: '8px',
              zIndex: '1',
            }"
            :offset="{ width: 0, height: -25 }"
          />
        </bm-marker>
        <bm-info-window
          :position="infoWindow.info"
          :show="infoWindow.show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <div class="info-window">
            <Popups :hasVideo="deviceInfo.hasVideo">
              <span slot="name">{{ deviceInfo.name }}</span>
              <span slot="equipmentNo">{{ deviceInfo.equipmentNo }}</span>
              <span slot="locationTime">{{ deviceInfo.locationTime }}</span>
              <span slot="address">{{ deviceInfo.address }}</span>
              <span slot="locationState">{{
                deviceInfo.locationState ? "已定位" : "未定位"
              }}</span>
              <span slot="powerTypeLable">{{ deviceInfo.powerTypeLable }}</span>
              <span slot="carStatusLabel">{{ deviceInfo.carStatusLabel }}</span>
            </Popups>
          </div>
        </bm-info-window>
        <!-- <bm-marker
          :position="{ lng: 116.404, lat: 39.915 }"
          :dragging="true"
          :icon="icon"
        >
          <bm-label
            content=""
            :labelStyle="{
              fontSize: '0',
              width: '40px',
              height: '40px',
              border: 'none',
              outline: '2px solid #13d713',
              borderRadius: '50%',
              zIndex: -0,
            }"
          />
        </bm-marker> -->
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
        <el-select
          v-model="devicValue"
          filterable
          placeholder="请输入设备名称或者设备编号"
        >
          <el-option
            v-for="item in deviceNameAndNumber"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
                  <el-checkbox-group v-model="C_onlineStatus">
                    <el-checkbox-button
                      v-for="status in C_onlineStatusArr"
                      :label="status"
                      :key="status"
                      >{{ status }}</el-checkbox-button
                    >
                  </el-checkbox-group>
                </div>
                <div>
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
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in modelLabels"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <el-button>清空</el-button>
                </div>
                <div>
                  <h4>定位显示名称</h4>
                  <el-radio-group v-model="targetDisplayName">
                    <el-radio-button label="图标+设备名称"></el-radio-button>
                    <el-radio-button label="仅图标"></el-radio-button>
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
import Popups from "@/components/Popups.vue";
export default {
  name: "HomeView",
  components: {
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
      deviceNameAndNumber: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      devicValue: "",
      //··筛选数据``````````````````
      //在线状态
      C_onlineStatus: ["在线状态", "离线状态"],
      C_onlineStatusArr: ["在线状态", "离线状态"],
      //风险状态
      riskStatus: [],
      riskStatusArr: ["低风险", "中风险", "高风险"],
      //自定义显示吨位
      modelLabels: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      modelLabelValue: "",
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
      let deviceList = this.deviceList.rows;
      // 数据进行foreach循环
      deviceList.forEach((item, key) => {
        // 解构赋值，获取到id，lng,lat
        const { id, lng, lat } = item;
        // 判断有没有空的数据，把非空数据渲染到地图上
        if (id && lng && lat) {
          this.markerArr.push(item);
        }
      });
    },
    // 刷新按钮功能，页面中心点和放大缩小倍数重置
    refresh() {
      this.Map.reset();
    },
    //点击设备图标出现信息窗
    //打开设备信息窗口
    lookDetail(item) {
      console.log(item);
      // 窗口位置稍微下移一点,增加经度
      let lat = Number(item.lat) + 5;
      // 调用百度地图的中心点方法,把点击的设备点设为地图中心
      this.Map.panTo(new BMap.Point(item.lng, lat));
      // 设置信息窗口打开的位置和设备图标位置一致
      this.infoWindow.info.lng = item.lng;
      this.infoWindow.info.lat = item.lat;
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
  },
  created() {
    // 获取设备上线，风险，故障，定位数据
    this.getonlineStatus();
    // 获取设备列表
    this.getqueryEquipmentsByPage();
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
      // .anchorBL:nth-child(6),
      // .anchorBL:nth-child(5) {
      //   display: none;
      // }
      //增加设备图片权重，防止被label压住无法显示
      .BMap_Marker {
        div {
          z-index: 2;
        }
        .BMapLabel {
          background-color: red;
        }
        .BMapLabel:before {
          content: "";
          display: block;
          position: absolute;
          top: 25px;
          left: -1px;
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
          left: 8px;
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
