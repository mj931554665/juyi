<template>
  <div class="ElectricFence">
    <div class="content">
      <div class="aside">
        <div class="fence" v-show="isShowFence">
          <el-input
            placeholder="请输入电子围栏名称"
            prefix-icon="el-icon-search"
            v-model="fenceSearch"
            @input="inputChange"
          >
          </el-input>
          <div class="operate">
            <el-button>删除</el-button>
            <el-button
              type="primary"
              @click="idShowAddFence = new_change = true"
              >新增</el-button
            >
          </div>
          <el-table
            :data="
              fenceList.filter((data) => data.fenceName.includes(fenceSearch))
            "
            style="width: 100%"
            height="450"
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column prop="fenceName" label="电子围栏名称">
              <template slot-scope="scope">
                <span class="fenceName" @click="fenceDetails(scope)"
                  ><i class="el-icon-edit"></i>&nbsp;{{
                    scope.row.fenceName
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="fenceStateLabel" label="绑定设备">
              <template slot-scope="scope">
                <span
                  :style="scope.row.fenceState ? 'color:green;' : 'color:red;'"
                  >{{ scope.row.device.equipmentNo }}</span
                >
              </template>
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
            <b>{{ new_change ? "新增电子围栏" : "修改电子围栏" }}</b>
            <i class="el-icon-close" @click="clearForm"></i>
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
              v-model="deviceActive"
              placeholder="请选择"
              filterable
              size="small"
              @change="selectChange(deviceActive)"
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
            <b>报警设置</b>
          </div>
          <div class="enable">
            <el-checkbox-group v-model="hintList">
              <el-checkbox label="出围栏报警">出围栏报警</el-checkbox>
              <el-checkbox label="进围栏报警">进围栏报警</el-checkbox>
            </el-checkbox-group>
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
            <el-button size="small" @click="clearForm">取消</el-button>
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
let map = null; // 地图实例
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
      icon: `<img src="http://cp.juyiaqyy.com/images/juyiScreen/fence/device.png" style="width:30px;transform: translate(-20%,50%);">`,
      // 围栏列表相关-------------------------------------------
      // 是否显示围栏列表
      isShowFence: true,
      // 围栏列表搜索的值
      fenceSearch: "",
      // 修改的围栏信息
      fenceChange: null,
      // 新增围栏相关---------------------------------------------
      // 点击保存错误提示的文字
      errMsg1: "",
      errMsg2: "",
      errMsg3: "",
      errMsg4: "",
      // 是否是新增围栏还是修改围栏
      new_change: true,
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
      hintList: [], //进出围栏报警
      state: "1", // 是否启用
      deviceList: [], // 设备列表
      deviceValue: "", // 选中设备的信息
      deviceActive: "", // 选中的设备
      Polygon: null, // 上一个多边形区域
      oldPolyEditor: null, // 上一个多边形编辑区域
      Marker: null, // 设备标记
      fenceList: [], // 围栏列表
    };
  },
  methods: {
    // 选择设备
    selectChange(val) {
      // 获取选中的设备信息
      this.deviceList.some((item) => {
        this.deviceValue = item;
        return item.id === val;
      });
      // 判断地图是否有设备图标，有则移除所有的
      if (map.getAllOverlays("marker").length !== 0) {
        map.getAllOverlays("marker").forEach((item) => {
          map.remove(item);
        });
      }
      let device = this.deviceValue; // 获取当前选中的设备信息
      console.log("device", device);
      map.setCenter([device.lng, device.lat]); //设置地图中心点
      // 构造点标记
      let marker = (this.marker = new AMap.Marker({
        content: this.icon,
        position: [device.lng, device.lat],
      }));
      map.add(marker); //添加点标记
      map.setFitView([marker], false, [60, 60, 60, 60]); // 缩放地图到合适的视野级别
    },
    // 绘制区域
    addFence() {
      this.idShowAddFence = true; // 显示新增围栏的卡牌
      // 判断地图是否有多余的多边形，有则移除
      if (map.getAllOverlays("polygon").length !== 0) {
        map.getAllOverlays("polygon").forEach((item) => {
          map.remove(item);
        });
      }
      // 关闭上一个多边形编辑
      if (this.oldPolyEditor !== null) {
        this.oldPolyEditor.close();
      }
      let mapCenter = map.getCenter(); // 获取当前地图中心
      let mapZoom = map.getZoom(); // 获取当前地图级别
      let scale = map.getScale() / 20; // 地图级别与矩形的缩放比例
      // 获取当前地图中心的多边矩形
      let path = this.centerPointGetFourPoint(
        {
          lat: mapCenter.lat,
          lng: mapCenter.lng,
        },
        scale
      );
      //创建多边形实例
      let polygon = (this.Polygon = new AMap.Polygon({
        path: path,
        strokeColor: "#43A5FA",
        strokeWeight: 4,
        strokeOpacity: 0.8,
        fillOpacity: 0.4,
        fillColor: "#1791fc",
        zIndex: 50,
        bubble: true,
        draggable: true,
      }));
      map.add(polygon); //添加多边形覆盖物
      let poly = map.getAllOverlays("polygon")[0]; // 获取已经添加的覆盖物(多边形实例)
      // 使用多边形编辑器（PolyEditor）（Map 的实例，编辑对象，设置参数）
      let polyEditor = (this.oldPolyEditor = new AMap.PolyEditor(
        map,
        poly,
        polygon
      ));
      polyEditor.open(); // 开始编辑多边形对象
    },
    // 保存围栏
    save() {
      // 判断表单是否有填写
      if (
        this.type !== "" &&
        this.fenceName !== "" &&
        this.fenceType !== "" &&
        this.deviceActive !== "" &&
        this.Polygon !== null
      ) {
        // 有则清空表单填写提示
        this.errMsg1 = this.errMsg2 = this.errMsg3 = this.errMsg4 = "";

        // 创建围栏
        console.log("this.Polygon", this.Polygon.getPath());
        let fence = {
          type: this.type, // 区域类型
          fenceName: this.fenceName, // 围栏名称
          fenceType: this.fenceType, // 围栏类型
          hintList: this.hintList, //进出围栏报警
          state: this.state, // 围栏启用状态
          stateLabel: this.state == 1 ? "启用" : "停用", // 围栏启用状态标签
          device: this.deviceValue, // 围栏绑定的设备信息
          deviceActive: this.deviceActive, // 围栏绑定的设备信息
          fenceState: this.Polygon.contains([
            this.deviceValue.lng,
            this.deviceValue.lat,
          ]), // 围栏与设备的关系（设备是否在围栏内）
          fenceStateLabel: this.Polygon.contains([
            this.deviceValue.lng,
            this.deviceValue.lat,
          ])
            ? "围栏内"
            : "围栏外", // 围栏与设备的关系标签（设备是否在围栏内）
          polygon: this.Polygon.getPath(), // 围栏实例
        };
        if (this.new_change) {
          // 获取围栏列表并添加新增的围栏
          let fenceList = this.fenceList;
          fenceList.push(fence);
          this.fenceList = fenceList;
        } else {
          this.$set(this.fenceList, this.fenceChange, fence);
        }
        //添加完之后清空表单信息以及地图内容
        this.clearForm();

        //添加成功之后的提升信息
        this.$message({
          message: this.new_change ? "新增成功" : "修改成功",
          type: "success",
        });
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
        if (this.deviceValue == "") {
          this.errMsg3 = "请选择设备";
        } else {
          this.errMsg3 = "";
        }
        if (this.Polygon == null) {
          this.errMsg4 = "请绘制区域";
        } else {
          this.errMsg4 = "";
        }
      }
    },
    // 查看围栏详情
    fenceDetails(val) {
      this.fenceChange = val.$index;
      let e = val.row;
      this.new_change = false; // 设置状态为修改围栏状态
      this.clearForm(); // 清空表单及地图
      console.log("e", e);
      // 显示新增围栏的卡牌
      this.idShowAddFence = true;
      this.fenceName = e.fenceName;
      this.fenceType = e.fenceType;
      this.hintList = e.hintList;
      this.state = e.state;
      this.deviceActive = e.deviceActive;
      // 获取地图实例
      let marker = (this.oldMarker = new AMap.Marker({
        content: this.icon,
        position: [e.device.lng, e.device.lat],
      }));

      //创建多边形实例
      let polygon = (this.Polygon = new AMap.Polygon({
        path: e.polygon,
        strokeColor: "#43A5FA",
        strokeWeight: 4,
        strokeOpacity: 0.8,
        fillOpacity: 0.4,
        fillColor: "#1791fc",
        zIndex: 50,
        bubble: true,
        draggable: true,
      }));
      map.add(marker);
      map.add(polygon);
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
    // 搜索围栏
    inputChange() {
      this.fenceList.forEach((item) => {
        item.fenceName == this.fenceSearch;
      });
    },
    /* verify() {
      this.fenceList.forEach((val) => {
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
    }, */
    //清空表单及地图覆盖物
    clearForm() {
      this.idShowAddFence = false;
      this.fenceName = "";
      this.fenceType = "";
      this.state = "1";
      this.deviceActive = "";
      // 使用clearMap方法删除所有覆盖物
      map.clearMap();
    },
    // 获取设备列表
    getDeviceList() {
      this.$api.getSelectList("", "", "", "", 1, 9999).then((res) => {
        this.deviceList = res.data.data.rows;
      });
    },
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
  },
  created() {
    this.getDeviceList();
    // this.verify();
  },
};
</script>

<style lang="less">
.ElectricFence {
  box-sizing: border-box;
  height: calc(100vh - 112px);
  .has-gutter > tr > th:nth-child(1) > .cell {
    padding-left: 14px !important;
  }
  .content {
    background-color: #f6f6f6;
    display: flex;
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