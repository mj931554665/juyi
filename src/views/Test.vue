<template>
  <div id="app">
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
      <el-amap
        class="amap-box"
        :vid="'amap-vue'"
        ref="GdMap"
        :events="amapGD"
        :center="center"
      ></el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "vue-amap向你问好！",
      center: [116.450378, 39.947585],
      amapGD: {
        // 地图加载后触发的事件
        complete: () => {
          // 获取地图实例
          let map = this.$refs.GdMap.$$getInstance();

          // 创建一个 Marker 实例：
          var marker = new AMap.Marker({
            position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "北京",
          });
          // 将创建的点标记添加到已有的地图实例：
          map.add(marker);
          // // 移除已创建的 marker
          // map.remove(marker);

          //通过插件方式引入 AMap.MouseTool 工具
          map.plugin(["AMap.MouseTool"], function () {
            //在地图中添加MouseTool插件
            var mouseTool = new AMap.MouseTool(map);
            //用鼠标工具画多边形
            var drawPolygon = mouseTool.polygon();
            //添加事件
            AMap.event.addListener(mouseTool, "draw", function (e) {
              // map.clear(); //清空覆盖物
              console.log(e.obj.getPath()); //获取路径/范围
              // 定义一个多边形
              this.polygon = new AMap.Polygon({
                path: e.obj.getPath(),
              });

              // var inRing = AMap.GeometryUtil.isPointInRing([116.39, 39.9], e.obj.getPath());
              let inRing = this.polygon.contains(
                [116.39, 39.9]
              );
              console.log("inRing", inRing);
            });
          });
          // 获取已经添加的覆盖物
          console.log("map.getAllOverlays()", map.getAllOverlays());

          var p0 = [116.450378, 39.947585];
          var p1 = [116.434027, 39.941037];
          var p2 = [116.461665, 39.941564];
          var p3 = [116.466171, 39.937977];
          // 判断 p0 是否在 p1-p2-p3 围成的封闭区域内
        },
      },
    };
  },
  created(){
    
  }
};
</script>

<style>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
