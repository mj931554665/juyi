<template>
  <div class="ElectricFence">
    <div class="content">
      <div class="aside">
        <div class="fence" v-show="isShowFence">
          <el-input
            placeholder="请输入电子围栏名称"
            prefix-icon="el-icon-search"
            v-model="fenceSearch"
            @keyup.enter.native="inputChange"
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
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="fenceList"
            style="width: 100%"
            stripe
            height="620"
          >
            <el-table-column type="selection" width="55" align="center" />
            <!--region 数据列-->
            <slot name="columnDataHeader">
              <template v-for="(column, index) in columns">
                <el-table-column v-bind="column" :fixed="column.fixed">
                  <template slot-scope="scope">
                    <template v-if="!column.render">
                      <template v-if="column.formatter">
                          <span
                                  v-html="column.formatter(scope.row, column)"
                          ></span>
                      </template>
                      <template v-else>
                        <span>{{ scope.row[column.prop] }}</span>
                      </template>
                    </template>
                    <template v-else>
                      <expand-dom
                              :column="column"
                              :row="scope.row"
                              :render="column.render"
                              :index="index"
                      ></expand-dom>
                    </template>
                  </template>
                </el-table-column>
              </template>
            </slot>
          </el-table>
          <el-pagination
                  style="text-align: center; margin-top: 20px"
                  @size-change="handleSizeChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  :page-sizes="[15, 20, 25, 30]"
                  :total="total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @current-change="handleCurrentChange"
          >
          </el-pagination>
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
          <el-form :model="model" :rules="rules" ref="fenceForm" label-width="auto" class="demo-ruleForm">
            <el-form-item label="类型" prop="definitionType">
              <el-select v-model="model.definitionType" placeholder="请选择" size="small">
                <el-option label="自定义类型" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="围栏名称" prop="fenceName">
              <el-input
                      v-model="model.fenceName"
                      placeholder="请输入围栏名称"
                      size="small"
                      maxlength="20"
              ></el-input>
            </el-form-item>
            <el-form-item label="围栏类型" prop="fenceType">
              <el-select v-model="model.fenceType" size="small">
                <el-option
                  v-for="item of fenceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="设备绑定" prop="equipmentNo">
              <el-select v-model="model.equipmentNo" size="small" @change="selectChange">
                <el-option
                        v-for="item of deviceList"
                        :key="item.id"
                        :label="item.equipmentNo"
                        :value="item.equipmentNo"/>
              </el-select>
            </el-form-item>
            <div>
              <b>报警设置</b>
            </div>
            <el-checkbox-group v-model="model.warnStatusList" style="margin:10px 0;">
              <el-checkbox label="0" style="margin-bottom: 10px">出围栏报警</el-checkbox><br/>
              <el-checkbox label="1" style="margin-bottom: 10px">进围栏报警</el-checkbox>
            </el-checkbox-group>
            <div>
              <b>状态</b>
            </div>
            <div style="margin:10px 0;">
              <el-radio v-model="model.startUse" label="0">启用</el-radio>
              <el-radio v-model="model.startUse" label="1">停用</el-radio>
            </div>
            <div style="margin: 30px 0">
              <el-button type="primary" size="small" @click="addFence" style="width: 100%">绘制区域</el-button>
            </div>
            <div style="text-align: center">
              <el-button size="small" @click="clearForm">取消</el-button>
              <el-button type="primary" size="small" @click="save">保存</el-button>
            </div>
          </el-form>
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
import Vue from 'vue'
import {selectList} from "@/api/zqData";
import {fenceInfoSave,fencePageInfo,fenceInfoUpdate,fenceInfoDelete} from "@/api/user";

export default {
  data() {
    return {
      model:{
        definitionType:'0', //类型：0.自定义类型
        fenceName: '', //围栏名称
        fenceType: '', //围栏类型
        equipmentNo: '', //设备编码
        warnStatusList: [], //报警设置
        fenceParameterList: [], //围栏的参数列表
        startUse: '0', //是否启用: 0.否 1.是
      },
      rules: {
        definitionType: [
          { required: true, message: '请选择类型', trigger: 'change' }
          ],
        fenceName: [
          { required: true, message: '请输入围栏名称', trigger: 'blur' }
        ],
        fenceType: [
          { required: true, message: '请选择围栏类型', trigger: 'change'  }
        ],
        equipmentNo: [
          { required: true, message: '请选择设备编码', trigger: 'change' }
        ]
      },
      fenceTypeOptions: [
        {
          value: "1",
          label: "工地",
        },
        {
          value: "2",
          label: "搅拌厂",
        },
        {
          value: "3",
          label: "作业区域",
        },
      ],
      deviceList: [], // 设备列表
      fenceList: [], // 围栏列表
      total: 0, //数据总量
      pageSize: 15, //每页数据数量
      currentPage: 1, //当前页码
      columns:[
        {
          prop: "fenceName",
          columnKey: "fenceName",
          label: "围栏名称",
          align: "center",
          render: (h, params) => {
            let control={
              class: 'el-icon-edit',
              style: {
                cursor: "pointer",
                color: "#409eff",
              },
              on: {
                click: () => {
                  this.fenceDetails(params.row)
                },
              },
              domProps: {
                title: params.row.fenceName,
              },
            }
            return h('div',[h('span',control,params.row.fenceName)])
          }
        },
        {
          prop: "equipmentNo",
          columnKey: "equipmentNo",
          label: "绑定设备",
          align: "center",
          minWidth: 140
        },
        {
          prop: "startUse",
          columnKey: "startUse",
          label: "状态",
          align: "center",
          render: (h, params) => {
            let status=params.row.startUse
            if(status===0){
              return h('div',{style:{color:'green'}},'已启用')
            }else{
              return h('div',{style:{color:'red'}},'未启用')
            }
          }
        }
      ],
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
      deviceValue: "", // 选中设备的信息
      deviceActive: "", // 选中的设备
      Polygon: null, // 上一个多边形区域
      oldPolyEditor: null, // 上一个多边形编辑区域
      Marker: null, // 设备标记

    };
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      },
    },
  },
  created() {
    this.getDeviceList();
    this.initData()
  },
  methods: {
    initData(){
      let params={
        fenceName: this.fenceSearch,
        page:this.currentPage,
        limit: this.pageSize
      }
      fencePageInfo(params).then(res=>{
        this.total=res.data.total
        this.fenceList=res.data.list
      })
    },
    // 选择设备
    selectChange(val) {
      // 获取选中的设备信息
      this.deviceList.some((item) => {
        this.deviceValue = item;
        return item.equipmentNo === val;
      });
      // 判断地图是否有设备图标，有则移除所有的
      if (map.getAllOverlays("marker").length !== 0) {
        map.getAllOverlays("marker").forEach((item) => {
          map.remove(item);
        });
      }
      let device = this.deviceValue; // 获取当前选中的设备信息
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

      // console.info('---------------->>> ',this.oldPolyEditor)
      polyEditor.open(); // 开始编辑多边形对象

    },
   /**
    * 保存围栏
    * */
    save() {
      if(!this.oldPolyEditor){
        this.$message.warning("请绘制电子围栏区域！")
        return
      }
     this.$refs.fenceForm.validate(valid => {
        if(valid){
          Vue.set(this.model,'fenceParameterList',this.oldPolyEditor.bu[0])
          fenceInfoSave(this.model).then(res=>{
            this.$message.success(res.msg)
          })
        }else {
          console.log('error submit!!');
          return false;
        }
     })
    },
    // 查看围栏详情
    fenceDetails(val) {
      // this.fenceChange = val.$index;
      // let e = val.row;
      this.new_change = false; // 设置状态为修改围栏状态
       this.clearForm(); // 清空表单及地图
      // console.log("e", e);
      // console.info('------------------>>> ',val)
      // 显示新增围栏的卡牌
      this.idShowAddFence = true;
      this.model={
        definitionType:'0', //类型：0.自定义类型
        fenceName: val.fenceName, //围栏名称
        fenceType: val.fenceType, //围栏类型
        equipmentNo: val.equipmentNo, //设备编码
        warnStatusList: val.warnStatusList, //报警设置
        fenceParameterList: val.fenceParameterList, //围栏的参数列表
        startUse: val.startUse.toString(),
      }

      this.deviceList.some((item) => {
        this.deviceValue = item;
        return item.equipmentNo === val.equipmentNo;
      });
      // 获取地图实例
      let marker = new AMap.Marker({
        content: this.icon,
        position: [this.deviceValue.lng, this.deviceValue.lat],
      });
      map.add(marker);
      map.setFitView([marker], false, [60, 60, 60, 60]);

      let polygon = (this.Polygon = new AMap.Polygon({
        path: val.fenceParameterList,
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
      // 获取已经添加的覆盖物(多边形实例)
      let poly = map.getAllOverlays("polygon")[0];
      // 使用多边形编辑器（PolyEditor）（Map 的实例，编辑对象，设置参数）
      let polyEditor = (this.oldPolyEditor = new AMap.PolyEditor(
        map,
        poly,
        polygon
      ));
      // console.info('--------------->>> ',this.oldPolyEditor)
      // 开始编辑对象
      polyEditor.open();
    },
    // 搜索围栏
    inputChange() {
      this.currentPage = 1;
      this.initData();
    },
    //清空表单及地图覆盖物
    clearForm() {
      this.idShowAddFence = false;
      // this.model={}
      // 使用clearMap方法删除所有覆盖物
      map.clearMap();
    },
    // 获取设备列表
    getDeviceList() {
      let params={
        equipmentNo: '',
        name: '',
        plateNo: '',
        types: [],
        pageNum: 1,
        pageSize: 9999
      }
      selectList(params).then((res) => {
        this.deviceList = res.data.rows;
      });
    },
    /**
     * 更换每页的数据量
     * */
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.initData();
    },
    /**
     * 页码切换
     * */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initData();
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
        /*.el-table {
          .fenceName {
            color: #409eff;
            cursor: pointer;
          }
        }*/
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
        padding: 10px;
        background-color: #fff;
        font-size: 14px;
         min-width: 240px;
        .el-form-item{
          margin-bottom: 15px !important;
        }
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
       /* .redraw {
          .el-button {
            width: 100%;
          }
        }*/
        /*.save {
          .el-button {
            float: right;
            margin-left: 20px;
          }
        }*/
      }
    }
    .map {
      width: 100%;
    }
  }
}
</style>