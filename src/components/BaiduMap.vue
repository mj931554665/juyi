<template>
  <div class="baiduMap">
    <el-card class="cardStyle">
      <!-- ready,地图组件渲染完毕时触发，返回一个百度地图的核心类和地图实例 -->
      <baidu-map
        id="map"
        class="mapStyle"
        :center="centerPoint"
        :zoom="5"
        :scroll-wheel-zoom="true"
        @ready="handler"
        @click="getPoint"
      >
        <bm-marker
          v-for="marker in markerArr"
          :key="marker.id"
          :position="marker"
          animation="BMAP_ANIMATION_BOUNCE"
        />
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

        <div class="refresh">
          <i class="el-icon-refresh"></i>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      //----地图部分数据-----------------------
      //中心轴坐标
      centerPoint: {
        lng: 0,
        lat: 0,
      },
      // 设备坐标点
      markerArr: [
        {
          id: 0,
          lng: 114.412599,
          lat: 23.079404,
        },
      ],
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
    };
  },
  methods: {
    // 完成一次组件卸载 / 重新加载的方法，重新渲染
    handler() {
      this.centerPoint.lng = 106.317788;
      this.centerPoint.lat = 35.923493;
    },
    // 添加点击函数，点击后修改marker的经纬度
    getPoint(e) {
      // 点击获取point经纬度
      const { lng, lat } = e.point;
      console.log(lng, lat);

      // 获取一个随机不重复的字符串做为id
      let id = new Date().getTime() + parseInt(Math.random() * 10000);

      // 新增一个marker标记
      this.markerArr.push({
        id: id,
        lng: lng,
        lat: lat,
      });
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
        this.onlineStatus[0].amount + this.onlineStatus[1].amount + "";
      // 传入在线设备数据获取定位设备列表
      let deviceList = await this.$api.getqueryEquipmentsByPage("0", amount);
      // 传入判断响应是否成功的函数进行判断
      this.judgeResponse(deviceList, "Home_deviceList");
    },
    // 渲染地图上面的数据
    renderMap() {
      let deviceList = this.deviceList.rows;

      deviceList.forEach((item, key) => {
        const { id , lng, lat } = item;
        this.markerArr.push({
          id: id,
          lng: lng,
          lat: lat,
        });
      });

      // let ids = deviceList.map((item, key) => {
      //   console.log("item", item);
      //   console.log("key", key);
      //   let ids = [];
      //   if (key == id) {
      //     ids.push(item);
      //   }
      //   return item;
      // });
      // console.log("ids", ids);
    },
  },
  created() {
    // 获取设备上线，风险，故障，定位数据
    this.getonlineStatus();
    // 获取设备列表
    this.getqueryEquipmentsByPage();

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
      .anchorBL:nth-child(6),
      .anchorBL:nth-child(5) {
        display: none;
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
