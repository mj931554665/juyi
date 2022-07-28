<template>
  <div class="component">
    <!-- ready,地图组件渲染完毕时触发，返回一个百度地图的核心类和地图实例 -->
    <baidu-map
      id="bmap"
      class="mapStyle"
      :center="centerPoint"
      :zoom="5"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <!-- 聚合点组件（需引入）:mapStyle="mapStyle" -->
      <bml-marker-clusterer :averageCenter="false">
        <bm-marker
          v-for="(marker, index) in markerArr"
          :key="marker.id"
          :position="marker"
          :icon="icon"
          :top="marker.id == markerTop ? true : false"
          @click="lookDetail(marker, index)"
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
            :offset="{ width: -3, height: -25 }"
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
  props: {
    // 在线设备列表数据
    deviceList: {
      type: Array,
    },
    device:{
      type:Object,
    }
  },
  watch: {
    // 初始化延迟渲染地图设备列表
    deviceList(a, b) {
      this.renderMap();
    },
    // 点击某一台设备进行地图中心点的移动
    device(a){
      let lng = Number(a.lng);
      let lat = Number(a.lat);
      // 调用百度地图的中心点方法,把点击的设备点设为地图中心
      // this.Map.panTo(new BMap.Point(lng, lat));
    }
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
        lng: 106,
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
    // 完成一次组件卸载 / 重新加载的方法，重新渲染
    async handler({ BMap, map }) {
      // 保存百度地图类
      this.BMap = BMap;
      // 保存地图对象
      this.Map = map;
    },
    // 渲染地图上面的数据
    renderMap() {
      // 获取到设备列表数据
      let deviceList = this.deviceList;
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
    lookDetail(deviceInfo, index) {
      let lng = Number(deviceInfo.lng);
      let lat = Number(deviceInfo.lat);
      // 调用百度地图的中心点方法,把点击的设备点设为地图中心
      this.Map.panTo(new BMap.Point(lng, lat));
      this.$emit("deviceData", deviceInfo.id, index);
    },
  },
  created() {
    this.renderMap();
  },
};
</script>

<style scoped>
#bmap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
