<template>
  <div class="ElectricFence">
    <div class="content">
      <div class="aside">
        <div class="fence" v-show="isShowFence">
          <el-input
            placeholder="请输入电子围栏名称"
            prefix-icon="el-icon-search"
            v-model="fenceSearch"
          >
          </el-input>
          <div class="operate">
            <el-button>删除</el-button>
            <el-button type="primary" @click="idShowAddFence = true"
              >新增</el-button
            >
          </div>
          <el-table :data="fenceLists" style="width: 100%">
            <el-table-column type="selection"> </el-table-column>
            <el-table-column prop="fenceName" label="电子围栏名称">
              <template slot-scope="scope">
                <span class="fenceName" @click="fenceDetails(scope.row)"
                  ><i class="el-icon-edit"></i>&nbsp;{{
                    scope.row.fenceName
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="fenceStateLabel" label="围栏状态">
            </el-table-column>
            <el-table-column prop="stateLabel" label="状态"> </el-table-column>
          </el-table>
        </div>
        <div class="hideFence">
          <i
            :class="isShowFence ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"
            @click="isShowFence = !isShowFence"
          >
          </i>
        </div>

        <div class="addFence" v-if="idShowAddFence">
          <h3>
            <b>新增电子围栏</b>
            <i class="el-icon-close" @click="idShowAddFence = false"></i>
          </h3>
          <b>类型选择</b>
          <div class="region">
            <span>*</span>
            <div>类型</div>
            <el-select v-model="type" placeholder="请选择" size="small">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="region">
            <span>*</span>
            <div>围栏名称</div>
            <el-input
              v-model="fenceName"
              placeholder="请输入围栏名称"
              size="small"
              maxlength="20"
            ></el-input>
            <p>{{ errMsg1 }}&nbsp;</p>
          </div>
          <div class="region">
            <span>*</span>
            <div>围栏类型</div>
            <el-select v-model="fenceType" placeholder="请选择" size="small">
              <el-option
                v-for="item in fenceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <p>{{ errMsg2 }}&nbsp;</p>
          </div>
          <div class="region">
            <span>*</span>
            <div>设备绑定</div>
            <el-select
              v-model="devicValue"
              placeholder="请选择"
              filterable
              size="small"
              @change="selectChange(devicValue)"
            >
              <el-option
                v-for="item in deviceList"
                :key="item.id"
                :label="item.name + ` | ` + item.equipmentNo"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <p>{{ errMsg3 }}&nbsp;</p>
          </div>
          <div>
            <b>状态</b>
          </div>
          <div class="enable">
            <el-radio v-model="state" label="1">启用</el-radio>
            <el-radio v-model="state" label="2">停用</el-radio>
          </div>
          <div class="redraw">
            <el-button type="primary" size="small" @click="addFence"
              >绘制区域</el-button
            >
            <p>{{ errMsg4 }}&nbsp;</p>
          </div>
          <div class="save">
            <el-button type="primary" size="small" @click="save"
              >保存</el-button
            >
            <el-button size="small">取消</el-button>
          </div>
        </div>
      </div>
      <div class="map">
        <el-amap
          class="amap-box"
          :vid="'amap-vue'"
          ref="GdMap"
          :center="mapCenter"
          :events="amapGD"
          style="width: 100%; height: 100%"
        ></el-amap>
      </div>
    </div>
  </div>
</template>

<script>
let map =null; // 地图实例
export default {
  data() {
    return {
      // 地图相关的数据--------------------------------------
      zoom: 10, // 地图放大级别
      mapCenter: [114.085947, 22.547], // 地图中心
      amapGD: {
        // 地图加载后触发的事件
        complete: () => {
          map = this.$refs.GdMap.$$getInstance(); // 获取地图实例
        },
      },
      // 围栏列表相关-------------------------------------------
      // 是否显示围栏列表
      isShowFence: true,
      // 围栏列表搜索的值
      fenceSearch: "",
      // 新增围栏相关---------------------------------------------
      // 点击保存错误提示的文字
      errMsg1: "",
      errMsg2: "",
      errMsg3: "",
      errMsg4: "",

      idShowAddFence: false, // 是否显示添加围栏卡片
      type: "自定义区域", // 区域类型
      typeOptions: [
        {
          value: "自定义区域",
          label: "自定义区域",
        },
      ],
      fenceName: "1", // 围栏名称
      fenceType: "工地", // 围栏类型
      fenceTypeOptions: [
        {
          value: "选项1",
          label: "工地",
        },
        {
          value: "选项2",
          label: "搅拌厂",
        },
        {
          value: "选项3",
          label: "作业区域",
        },
      ],
      state: "1", // 是否启用
      deviceList: [], // 设备列表
      devicValue: "", // 选中的设备
      oldPolygon: null, // 上一个多边形区域
      oldPolyEditor: null, // 上一个多边形编辑区域
      oldMarker: null, // 上一个设备标记
      fenceLists: [], // 围栏列表
    };
  },
  methods: {
    // 简单实现绘制正方形，side 正方形边长，单位米
    // 若需要绘制其他矩形，需自行修改代码
    centerPointGetFourPoint: ({ lat, lng }, side = 1000) => {
      const centerPoint = new AMap.LngLat(lng, lat);
      const upLeftPoint = centerPoint.offset(-side / 1, side / 2);
      const upRightPoint = centerPoint.offset(side / 1, side / 2);
      const leftBottomPoint = centerPoint.offset(-side / 1, -side / 2);
      const rightBottomPoint = centerPoint.offset(side / 1, -side / 2);
      return [
        [upLeftPoint.lng, upLeftPoint.lat],
        [upRightPoint.lng, upRightPoint.lat],
        [rightBottomPoint.lng, rightBottomPoint.lat],
        [leftBottomPoint.lng, leftBottomPoint.lat],
      ];
    },
    // 绘制区域
    addFence() {
      this.idShowAddFence = true;// 显示新增围栏的卡牌
      if (this.oldPolygon !== null) {
        // 使用remove方法删除指定覆盖物
        map.remove(this.oldPolygon);
      }
      if (this.oldPolyEditor !== null) {
        // 关闭多边形编辑
        this.oldPolyEditor.close();
      }
      // map.clearMap();
      // 获取当前地图中心
      let mapCenter = map.getCenter();
      // 获取当前地图级别
      let mapZoom = map.getZoom();
      // 地图级别与矩形的缩放比例
      let scale = map.getScale() / 20;
      // // 获取当前地图中心的多边矩形
      let path = this.centerPointGetFourPoint(
        {
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        },
        scale
      );
      let polygon = (this.oldPolygon = new AMap.Polygon({
        path: path,
        strokeColor: "#43A5FA",
        strokeWeight: 4,
        strokeOpacity: 0.8,
        fillOpacity: 0.4,
        fillColor: "#1791fc",
        zIndex: 50,
        bubble: true,
        draggable: true,
      }));  //创建多边形实例
      map.add(polygon);//添加多边形覆盖物
      let poly = map.getAllOverlays("polygon")[0];// 获取已经添加的覆盖物(多边形实例)
      // 使用多边形编辑器（PolyEditor）（Map 的实例，编辑对象，设置参数）
      let polyEditor = (this.oldPolyEditor = new AMap.PolyEditor(
        map,
        poly,
        polygon
      ));
      polyEditor.open();// 开始编辑多边形对象
    },
    save() {
      if (
        this.type !== "" &&
        this.fenceName !== "" &&
        this.fenceType !== "" &&
        this.devicValue !== "" &&
        this.oldPolygon !== null
      ) {
        this.errMsg1 = this.errMsg2 = this.errMsg3 = this.errMsg4 = "";
        let obj = {};
        obj.type = this.type;
        obj.fenceName = this.fenceName;
        obj.fenceType = this.fenceType;
        obj.state = this.state;
        obj.stateLabel = this.state == 1 ? "启用" : "停用";
        obj.device = this.devicValue;
        obj.fenceState = this.oldPolygon.contains([
          this.devicValue.lng,
          this.devicValue.lat,
        ]);
        obj.fenceStateLabel = this.oldPolygon.contains([
          this.devicValue.lng,
          this.devicValue.lat,
        ])
          ? "围栏内"
          : "围栏外";
        obj.polygon = this.oldPolygon;

        // 获取围栏列表并添加新增的围栏
        let fenceLists = this.fenceLists;
        fenceLists.push(obj);
        this.fenceLists = fenceLists;

        //添加完之后清空表单信息以及地图内容
        this.idShowAddFence = false;
        this.fenceName = "";
        this.fenceType = "";
        this.state = "1";
        this.devicValue = "";
        // this.mapCenter = [114.085947, 22.547];
        // this.map.setZoom(10);
        // 使用clearMap方法删除所有覆盖物
        this.map.clearMap();

        //添加成功之后的提升信息
        this.$message({
          message: "新增成功",
          type: "success",
        });
        this.verify();
      } else {
        if (this.fenceName == "") {
          this.errMsg1 = "请输入电子围栏名称";
        } else {
          this.errMsg1 = "";
        }
        if (this.fenceType == "") {
          this.errMsg2 = "请选择围栏类型";
        } else {
          this.errMsg2 = "";
        }
        if (this.devicValue == "") {
          this.errMsg3 = "请选择设备";
        } else {
          this.errMsg3 = "";
        }
        if (this.oldPolygon == null) {
          this.errMsg4 = "请绘制区域";
        } else {
          this.errMsg4 = "";
        }
      }
    },
    selectChange(val) {
      // 获取地图实例
      let map = this.map;
      if (this.oldMarker !== null) {
        map.remove(this.oldMarker);
      }
      // 判断当前选中值和渲染数据值，以获取当前选中item
      let item = this.deviceList.find((item) => item.id == this.devicValue.id);
      //设置地图中心点
      this.map.setCenter([item.lng, item.lat]);
      // 构造点标记
      let marker = (this.oldMarker = new AMap.Marker({
        content: `<img src="http://cp.juyiaqyy.com/images/juyiScreen/fence/device.png" style="width:30px;transform: translate(-20%,50%);">`,
        position: [item.lng, item.lat],
      }));
      this.map.add(marker);
      // // 缩放地图到合适的视野级别
      map.setFitView([marker], false, [60, 60, 60, 60]);
    },
    fenceDetails(e) {
      console.log("e", e);
      // 显示新增围栏的卡牌
      this.idShowAddFence = true;
      this.fenceName = e.fenceName;
      this.fenceType = e.fenceType;
      this.state = e.state;
      this.devicValue = e.devicValue;
      // 获取地图实例
      let map = this.map;
      let marker = (this.oldMarker = new AMap.Marker({
        content: `<img src="http://cp.juyiaqyy.com/images/juyiScreen/fence/device.png" style="width:30px;transform: translate(-20%,50%);">`,
        position: [e.device.lng, e.device.lat],
      }));
      map.add(marker);
      map.add(e.polygon);
      // 获取已经添加的覆盖物(多边形实例)
      let poly = map.getAllOverlays("polygon")[0];
      // 使用多边形编辑器（PolyEditor）（Map 的实例，编辑对象，设置参数）
      let polyEditor = (this.oldPolyEditor = new AMap.PolyEditor(
        map,
        poly,
        e.polygon
      ));
      // 开始编辑对象
      polyEditor.open();
      map.setFitView([poly], false, [60, 60, 60, 60]);
    },
    verify() {
      this.fenceLists.forEach((val) => {
        // console.log("val", val);
        this.$api.getDetailWithWorkConditionData(val.device.id).then((res) => {
          let lat = res.data.data.baseInfo.lat;
          let lng = res.data.data.baseInfo.lng;
          let inRing = val.polygon.contains([lng, lat]);
          if (inRing) {
            val.fenceState = "围栏内";
          } else {
            val.fenceState = "围栏外";
          }
        });
      });
    },
    getDeviceList() {
      this.$api.getSelectList("", "", "", "", 1, 9999).then((res) => {
        this.deviceList = res.data.data.rows;
      });
    },
  },
  created() {
    this.getDeviceList();
    this.verify();
  },
};
</script>

<style lang="less" scoped>
.ElectricFence {
  box-sizing: border-box;
  height: calc(100vh - 112px);
  .el-table--border .el-table__cell:first-child .cell {
    padding: 0;
  }
  .content {
    background-color: #f6f6f6;
    display: flex;
    height: 100%;
    padding: 20px;
    min-height: 450px;
    div {
      border-radius: 4px;
    }
    .aside {
      display: flex;
      margin-right: 16px;
      .fence {
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        height: 100%;
        min-width: 400px;
        .operate {
          display: flex;
          justify-content: space-between;
          margin: 16px 0;
        }
        .el-table {
          .fenceName {
            color: #409eff;
            cursor: pointer;
          }
        }
      }
      .hideFence {
        position: relative;
        .el-icon-arrow-left,
        .el-icon-arrow-right {
          z-index: 99;
          position: relative;
          top: 50%;
          font-size: 16px;
          font-weight: 600;
          line-height: 50px;
          color: #fff;
          background-color: #70767a;
          cursor: pointer;
        }
      }
      .addFence {
        padding: 20px;
        background-color: #fff;
        font-size: 14px;
        // min-width: 240px;
        b {
          display: inline-block;
          font-weight: 600;
          color: #333232;
          font-size: 14px;
          margin-bottom: 10px;
        }
        h3 {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          i {
            cursor: pointer;
            font-size: 18px;
          }
        }
        .region {
          display: flex;
          position: relative;
          align-items: center;
          padding-bottom: 20px;
          .el-select {
            min-width: 180px;
          }
          span {
            color: #f56c6c;
            margin-right: 5px;
          }
          div {
            min-width: 60px;
            white-space: nowrap;
            margin-right: 10px;
          }
          p {
            position: absolute;
            bottom: 0;
            left: 81px;
            color: #f56c6c;
          }
        }
        .enable,
        .redraw {
          margin-bottom: 20px;
          p {
            color: #f56c6c;
          }
        }
        .redraw {
          .el-button {
            width: 100%;
          }
        }
        .save {
          .el-button {
            float: right;
            margin-left: 20px;
          }
        }
      }
    }
    .map {
      width: 100%;
    }
  }
}
</style>
