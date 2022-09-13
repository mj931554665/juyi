<template>
  <div id="amap">
    <el-amap
      vid="amap"
      class="amap"
      :center="center"
      :zoom="zoom"
      :zooms="zooms"
      isHotspot="true"
      :mapStyle="mapStyle"
      :expandZoomRange="expandZoomRange"
      :amap-manager="amapManager"
      :events="events"
    >
    </el-amap>
  </div>
</template>

<script>
let map = null; // 地图实例
import { AMapManager } from "vue-amap";

const amapManager = new AMapManager();
import location from "@/assets/images/digitalScreen/device.png";
export default {
   props: {
    // 在线设备列表数据
    deviceList: {
      type: Array,
    },
    device: {
      type: Object,
    },
  },
  watch: {
    // 初始化延迟渲染地图设备列表
    deviceList(a, b) {
      this.renderMap();
    },
    // 点击某一台设备进行地图中心点的移动
    device(a) {
      // 把经纬度转换成数组2类型
      let lng = Number(a.lng);
      let lat = Number(a.lat);
      // 判断是否是初始化，并且经纬度不能为再移动地图
      if (this.Map !== null && lng !== 0 && lng !== 0) {
        // 把点击的设备点设为地图中心
        this.center = [lng, lat];
      }
    },
  },
  data() {
    let that = this;
    return {
      // 坐标点位置 + 设备定位
      markerArr: [],
      center: [105, 39.990464], // 地图初始化视图中心点
      zoom: 4, // 地图缩放倍率
      zooms: [4, 20], // 地图缩放倍率范围
      mapStyle: "amap://styles/darkblue", //修改地图的背景颜色
      expandZoomRange: 15, // 最大缩放级别
      // deviceList: [],
      amapManager, // 地图管理对象
      markers: [],
      cluster: null, //点聚合实例
      events: {
        init(map) {
          that.renderMap();
          map.on("zoomchange", () => {
            console.log(map.getZoom());
            if (map.getZoom() == 18) {
              //   清除地图上所有聚合 clearMarkers();
              that.cluster.clearMarkers();
              map.add(that.markerArr);
            } else {
              that.cluster.clearMarkers();
              map.add(that.markerArr);
              map.plugin(["AMap.MarkerClusterer"], () => {
                that.cluster = new AMap.MarkerClusterer(map, that.markerArr, {
                  gridSize: 20,
                });
              });
            }
          });
        },
      },
    };
  },
  mounted() {},
  created() {
    // this.$api.getcustomerScreen("1", "9999").then((val) => {
      // 给设备列表赋值
      // this.deviceList = val.data.data;
      
    // });
  },
  methods: {
    // 渲染地图上面的数据
    renderMap() {
      // 获取地图实例
      let map = amapManager.getMap();
      let _this = this;
      //自定义map点坐标图标
      let icon = new AMap.Icon({
        image: location,
        size: new AMap.Size(25, 25),
        imageSize: new AMap.Size(25, 25),
      });
      // 获取到设备列表数据
      let deviceList = this.deviceList;
      // 数据进行foreach循环
      deviceList.forEach((item, key) => {
        // 解构赋值，获取到id，lng,lat
        const { id, lng, lat } = item;
        // 判断有没有空的位置数据，把非空数据渲染到地图上
        if (id && lng && lat) {
          // 提取设备经纬度，为对象增加位置数组属性
          item.position = [item.lng, item.lat];
          item.icon = icon;
          // 设置在线层级高于离线层级
          item.zIndex = item.onlineStatus == 1 ? 12 : 11;
          // 设置标记内容
          item.content = `<div 
          style="display:flex;
          flex-direction:column;
          align-items:center;">
            <div style="color: #fff;
                  font-size: 1.2em;
                  border: none;
                  min-width: 2em;
                  text-align: center;
                  padding: 0.3em 0.4em;
                  opacity: 0.8;
                  background: ${item.onlineStatus == 1 ? "#409EFF" : "#868686"};
                  border-radius: 0.8em;">${item.name}</div>
            <div 
              style="width:0;height:0;
              opacity: 0.7;
              border-top:0.6em solid ${
                item.onlineStatus == 1 ? "#409EFF" : "#868686"
              };
              border-right:solid 0.6em transparent;
              border-left:solid 0.6em transparent;"></div>
          </div>
					<img src="http://cp.juyiaqyy.com/images/juyi/home/che.png" 
               style="
                  width:2.5em;
                  margin-left:0.3em;
                  margin-top:0.4em;
                  border:0.2em solid ${
                    item.onlineStatus == 1 ? "#409EFF" : "#868686"
                  };
                  border-radius:50%;
                  background:#fff;" 
          >`;
          // 构造点标记
          var marker = new AMap.Marker(item);
          // 为标记添加点击事件 // 切换设备信息
          marker.on("click", function (e) {
            // 获取地图上所有的标记
            map.getAllOverlays().forEach((item) => {
              // 把页面未被点击到的标记层级设置为11
              item.setzIndex(11);
            });
            // 把点击设备层级增加
            marker.setzIndex(12);
            // 把点击的设备点设为地图中心
            _this.center = [Number(item.lng), Number(item.lat)];
            // 点击的设备信息传到父组件
            _this.$emit("deviceData", item.id, key);
          });
          // 地图添加点标记
          this.markerArr.push(marker);
        }
      });
      // 地图添加设备标记点
      map.add(this.markerArr);
      // 为所有标记添加点聚合功能
      map.plugin(["AMap.MarkerClusterer"], () => {
        // 把点聚合实例保存到data中以便于清除点聚合
        this.cluster = new AMap.MarkerClusterer(map, this.markerArr, {
          gridSize: 20,
        });
      });
    },
  },
};
</script>

<style scoped>
#amap {
  height: 100vh;
  width: 100vw;
}
</style>
