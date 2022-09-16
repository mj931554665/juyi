<template>
  <div class="HomeMap">
    <el-amap
      zoom="4"
      :zooms="[4, 20]"
      :center="center"
      :mapStyle="mapStyle"
      :events="events"
      :plugin="plugins"
    >
    <el-amap-info-window>

    </el-amap-info-window>
  </el-amap>
  </div>
</template>

<script>
  import {queryEquipmentsByPage} from "@/api/zqData";

  let map = null; // 地图实例
export default {
  name: "HomeMap",
  created() {
    this.inttData();
  },
  mounted() {},
  data() {
    return {
      center: [120, 36],
      mapStyle: "amap://styles/normal", //修改地图的背景颜色
      // 地图事件
      events: {
        init(e) {
          map = e;
          console.log("map", map);
        },
      },
      // 地图插件引入
      plugins: [{ pName: "ToolBar", position: "LB" }],
      // 信息窗口数据
      // 位置和显示数据
      infoWindow: {
        show: false,
        info: {
          lng: "",
          lat: "",
        },
      },
    };
  },
  methods: {
    // 初始化页面数据
    inttData() {
      // 获取设备列表数据
      let params={
        pageNum:0,
        pageSize:9999
      }
      queryEquipmentsByPage(params).then((val) => {
        this.deviceList = val.data.rows;
        // 渲染地图上面的数据
        this.renderMap();
      });
    },
    qwe() {
      alert(123);
    },
    renderMap() {
      let _this = this;
      // 获取到设备列表数据
      let deviceList = this.deviceList;
      // 提前创建标记点数组
      let markerArr = [];
      // 数据进行foreach循环
      deviceList.forEach((item, key) => {
        let device = {};
        // 解构赋值，获取到id，lng,lat
        let { id, lng, lat } = item;
        // 判断有没有空的位置数据，把非空数据渲染到地图上
        if (id && lng && lat) {
          // 提取设备经纬度，为对象增加位置数组属性
          device.position = [item.lng, item.lat];
          // 点击置顶
          device.topWhenClick = true;
          // 设置在线层级高于离线层级
          device.zIndex = item.onlineStatus == 1 ? 13 : 12;
          // 设置标记内容
          device.content = `<div style="transform: translateX(-40%);">
            <div
              style="display:flex;
              flex-direction:column;
              align-items:center;">
                <div style="color: #fff;
                      font-size: 1.2em;
                      border: none;
                      min-width: 2em;
                      text-align: center;
                      padding: 0.3em 0.4em;
                      opacity: 0.9;
                      background: ${item.onlineStatus == 1 ? "#409EFF" : "#868686"};
                      border-radius: 0.8em;">${item.name}</div>
                <div
                  style="width:0;height:0;
                  border-top:0.6em solid ${
                    item.onlineStatus == 1 ? "#409EFF" : "#868686"
                  };
                  border-right:solid 0.6em transparent;
                  border-left:solid 0.6em transparent;"></div>
            </div>
              <img src="http://cp.juyiaqyy.com/images/juyi/home/che.png"
                  style="
                      width:4em;
                      margin-left:0.3em;
                      margin-top:0.4em;
                      border:0.3em solid ${
                        item.onlineStatus == 1 ? "#409EFF" : "#868686"
                      };
                      border-radius:50%;
                      background:#fff;"
              >
          </div>`;
          // 构造点标记
          var marker = new AMap.Marker(device);
          // 为标记添加点击事件 // 切换设备信息
          marker.on("click", function (e) {
            // 把点击的设备点设为地图中心
            _this.center = [Number(item.lng), Number(item.lat)];
            // 点击的打开信息窗体
            let infoWindow = new AMap.InfoWindow({
              content: `<Popups>点我</Popups>`, //使用默认信息窗体框样式，显示信息内容
            });

            infoWindow.open(map, [Number(item.lng), Number(item.lat)]);
          });
          // 地图添加点标记
          markerArr.push(marker);
        }

        /*  if (id && lng && lat) {
          // 筛选判断
          // 设备在线状态判断渲染
          let count = 0;
          if (item.hasVideo == 1) {
            count++;
          }
          // console.log("count", count);
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
        } */
      });
      // 地图添加设备标记点
      map.add(markerArr);
      // 为所有标记添加点聚合功能
      map.plugin(["AMap.MarkerClusterer"], () => {
        // 把点聚合实例保存到data中以便于清除点聚合
        let cluster = new AMap.MarkerClusterer(map, markerArr, {
          gridSize: 20,
        });
      });
    },
  },
};
</script>
<style lang="less">
.HomeMap {
  width: 100%;
  height: 100%;
}
</style>
