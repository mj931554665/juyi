<template>
  <div id="amap">
    <el-amap
      vid="amap"
      class="amap"
      :center="center"
      :plugin="plugin"
      zoom="4"
      :zooms="zooms"
      isHotspot="true"
      :mapStyle="mapStyle"
      :expandZoomRange="expandZoomRange"
    >
      <!-- <el-amap-marker
        v-for="(marker, index) in markerArr"
        :key="marker.id"
        :position="marker.position"
        :icon="marker.icon"
				:label="marker.name"
      /> -->
      <el-amap-marker
        v-for="(marker, index) in markerArr"
        :offset="[-12, -60]"
        :key="marker.lat"
        :position="marker.position"
        :label="marker.name"
        :content="marker.content"
        :events="marker.events"
        topWhenClick="true"
        @click="lookDetail"
      />
    </el-amap>
  </div>
</template>

<script>
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
      console.log('lng',lng)
      console.log('lat',lat)
      // 判断是否是初始化，并且经纬度不能为再移动地图
      if (this.Map !== null && lng !== 0 && lng !== 0) {
        // 调用百度地图的中心点方法,把点击的设备点设为地图中心
        this.center = [lng,lat];
      }
    },
  },
  data() {
    return {
      // 坐标点位置 + 设备定位
      markerArr: [],
      center: [105, 39.990464], // 地图初始化视图中心点
      zooms: [4, 18], // 地图缩放倍率
      mapStyle: "amap://styles/darkblue", //修改地图的背景颜色
      expandZoomRange: 15, // 最大缩放级别
      plugin: [
        // 这里放扩展的插件
        {
          pName: "Scale", // 比例尺
          events: {
            init(instance) {
              // console.log(instance);
            },
          },
        },
      ],
    };
  },
  mounted() {},
  created() {
    // this.$api.getcustomerScreen("1", "9999").then((val) => {
    //   // 给设备列表赋值
    //   this.deviceList = val.data.data;
    this.renderMap();
    // });
  },
  methods: {
    // 渲染地图上面的数据
    renderMap() {
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
        // 定义一个容器来装筛选后的数据
        let device = item;
        // 解构赋值，获取到id，lng,lat
        const { id, lng, lat } = device;
        // 判断有没有空的位置数据，把非空数据渲染到地图上
        if (id && lng && lat) {
          // 提取设备经纬度，为对象增加位置数组属性
          item.position = [item.lng, item.lat];
          item.icon = icon;
          item.content = `<div data-id="123" style="color: #fff;
								font-size: 12px;
								border: none;
								min-width: 20px;
								text-align: center;
								padding: 3px 4px;
								background: ${item.onlineStatus == 1 ? "#409EFF" : "#868686"};
								border-radius: 8px;">${item.name}</div>
								<img src="http://cp.juyiaqyy.com/images/juyiScreen/screen/device.png" style="width:25px;margin-left:3px;margin-top:10px;" alt="">
								`;
          // 切换设备信息
          item.events = {
            click() {
              // 调用百度地图的中心点方法,把点击的设备点设为地图中心
              _this.center = [Number(item.lng), Number(item.lat)];
              // 点击的设备信息传到父组件
              _this.$emit("deviceData", item.id, key);
            },
          };
          this.markerArr.push(item);
        }
      });
      console.log("this.markerArr", this.markerArr[0]);
    },
    lookDetail() {
      console.log("12314");
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
