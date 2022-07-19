<template>
  <div class="component">
    <!-- ready,地图组件渲染完毕时触发，返回一个百度地图的核心类和地图实例 -->
    <baidu-map
      id="bmap"
      class="mapStyle"
      :center="centerPoint"
      :zoom="1"
      :mapStyle="mapStyle"
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
            :content="marker.name"
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
    </baidu-map>
  </div>
</template>

<script>
// 引入聚合点组件（vue-baidu-map自带）
import { BmlMarkerClusterer } from "vue-baidu-map";
import bmapStyle from "@/utils/bmapStyle.json";
export default {
  components: {
    BmlMarkerClusterer,
  },
  data() {
    return {
      //----地图数据--------------------
      // 百度地图类
      BMap: "",
      // 地图对象
      Map: "",
      //中心轴坐标
      centerPoint: {
        lng: 96,
        lat: 36,
      },
      // 坐标点位置
      markerArr: [],
      // 放大倍数
      zoom: 5,
      // 地图样式
      mapStyle: {
        styleJson: bmapStyle,
      },
      // 图标样式
      icon: {
        url: require("@/assets/images/digitalScreen/device.png"),
        size: {
          width: 25,
          height: 25,
        },
        opts: {
          imageSize: {
            width: 25,
            height: 25,
          },
        },
      },
      // 在线设备列表数据
      deviceList: JSON.parse(localStorage.getItem("Screen_deviceOnlineList")),
      // 设备标签的置顶效果
      markerTop: "",
      // 设备标签样式，等数据
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
    // 判断数据是否获取成功，成功则存入，不成功则弹出错误，登录失效则返回登录页面
    judgeResponse(response, storageName) {
      if (response.data.code === 200) {
        localStorage.setItem(storageName, JSON.stringify(response.data.data));
      } else if (response.data.code === 401) {
        this.$notify.error({
          title: response.data.code + " 错误",
          message: response.data.message,
        });
        // this.$router.replace({ path: "/login" });
      } else {
        this.$notify({
          title: response.data.code + " 警告",
          message: response.data.message,
          type: "warning",
          duration: 0,
        });
      }
    },
    // 获取设备列表数据（有地图定位的
    async getqueryEquipmentsByPage() {
      // 获取已定位的设备总数显示在地图上
      let amount = 999;
      // 传入在线设备数据获取定位设备列表
      let deviceList = await this.$api.getqueryEquipmentsByPage("0", amount);
      // 传入判断响应是否成功的函数进行判断
      this.judgeResponse(deviceList, "Screen_deviceOnlineList");
      this.renderMap();
    },
    // 完成一次组件卸载 / 重新加载的方法，重新渲染
    handler({ BMap, Map }) {
      // 保存百度地图类
      this.BMap = BMap;
      // 保存地图对象
      this.Map = Map;
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
          this.markerArr.push(item);
        }
      });
    },
  },
  created() {
    this.getqueryEquipmentsByPage();
  },
};
</script>

<style scoped>
#bmap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
