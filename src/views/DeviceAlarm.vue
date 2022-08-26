<template>
  <div class="deviceAlarm">
    <div style="margin: 10px 0 20px 0">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备报警</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="downMessage">
        <el-button
          plain
          size="medium"
          icon="el-icon-download"
          class="btnChangeColor"
          @click="downloadData"
          >导出</el-button
        >
        <el-button
          plain
          size="medium"
          icon="el-icon-arrow-left"
          class="btnChangeColor"
          @click="backOut"
          v-show="alarmHistory"
          >返回</el-button
        >
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部风险事件" name="all"></el-tab-pane>
        <el-tab-pane label="高风险事件" name="height"></el-tab-pane>
        <el-tab-pane label="中风险事件" name="medium"></el-tab-pane>
        <el-tab-pane label="底风险事件" name="low"></el-tab-pane>
      </el-tabs>
      <div>
        <el-form label-width="100px" style="margin: 20px 0">
          <el-row :gutter="24">
            <el-col :span="5" :offset="1">
              <el-form-item label="设备名称">
                <el-select
                  v-model="deviceName"
                  placeholder="请选择"
                  size="medium"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="(item, index) of deviceNameOptions"
                    :key="index"
                    :label="item"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="设备编号">
                <el-select
                  v-model="equipmentNo"
                  placeholder="请选择"
                  size="medium"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="(item, index) of equipmentNoOptions"
                    :key="index"
                    :label="item"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="车牌号">
                <el-select
                  v-model="plateNo"
                  placeholder="请选择"
                  size="medium"
                  multiple
                  collapse-tags
                >
                  <el-option
                    v-for="(item, index) of plateNoOptions"
                    :key="index"
                    :label="item"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="风险类型">
                <el-select
                  v-model="alarmType"
                  placeholder="请选择"
                  size="medium"
                  collapse-tags
                >
                  <el-option
                    v-for="(item, index) of alarmTypeOptions"
                    :key="index"
                    :label="item"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5" :offset="1">
              <el-form-item label="事件名称">
                <el-select
                  v-model="eventName"
                  placeholder="请选择"
                  size="medium"
                  collapse-tags
                >
                  <el-option
                    v-for="(item, index) of eventNameOptions"
                    :key="index"
                    :label="item"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="处理状态">
                <el-select
                  v-model="dealStatus"
                  placeholder="请选择"
                  size="medium"
                  collapse-tags
                >
                  <el-option
                    v-for="item in dealStatusOptions"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="时间范围">
                <el-date-picker
                  v-model="chooseTime"
                  type="datetimerange"
                  :editable="false"
                  clearable
                  size="medium"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  align="center"
                  :format="'yyyy-MM-dd HH:mm:ss'"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5" style="float: right; text-align: right">
              <el-button
                type="primary"
                style="background-color: #2c2b30; border: none"
                size="medium"
                icon="el-icon-search"
                @click="foundInfByCondition"
                >查询</el-button
              >
              <el-button
                @click="doReset()"
                size="medium"
                icon="el-icon-refresh"
                class="btnChangeColor"
                plain
                >重置</el-button
              >
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-table
            ref="alarmTable"
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="tableData"
            style="width: 100%; border: 1px #c0c0c0 solid"
            :height="tableHeight"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle"
          >
            <!--region 选择框-->
            <el-table-column
              type="index"
              width="80"
              align="center"
              label="序号"
            >
              <template slot-scope="scope">
                {{ (currentPage - 1) * pageSize + (scope.$index + 1) }}
              </template>
            </el-table-column>
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
      </div>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="65%"
      @close="dialogClose"
      center
    >
      <alarm-detail :alarm-detail-info="warnDetailInfo" v-if="alarmDetail" />
    </el-dialog>
  </div>
</template>
<script>
import { dateFormat } from "@/utils/validate";
import AlarmDetail from "./alarm/AlarmDetail";
import Vue from "vue";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 410,
      dialogVisible: false, //弹出是否开启
      dialogTitle: "风险详情",
      warnDetailInfo: "",
      alarmDetail: false, //详情信息的
      alarmDeal: false, //处理的
      alarmFeedBack: false, //反馈的
      alarmHistory: false, //历史事件

      loading: false,
      activeName: "all",
      equipmentId: "", //设备编码
      alarmLevel: "", //风险等级
      deviceName: [],
      deviceNameOptions: {}, //设备名称的选择项信息
      equipmentNo: [],
      equipmentNoOptions: {}, //设备编号的选项信息
      plateNo: [],
      plateNoOptions: {}, //车牌号的选项信息
      alarmType: "0",
      alarmTypeOptions: {}, //风险类型的选项信息
      eventName: "",
      eventNameOptions: {}, //事件名称的选项信息
      dealStatus: "", //处理状态
      category: 1, //分类 0-列表 1-按类型聚合
      dealStatusOptions: [
        { id: 0, value: "未处理" },
        { id: 1, value: "已处理" },
        { id: 2, value: "已知晓" },
      ], //处理状态的选项信息
      chooseTime: [new Date().setHours(0, 0, 0), new Date().getTime()], //时间范围
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      total: 0, //数据总量
      pageSize: 15, //每页数据数量
      currentPage: 1, //当前页码
      columns: [
        {
          prop: "beginTime",
          columnKey: "beginTime",
          label: "发生时间",
          align: "center",
          minWidth: 140,
        },
        {
          prop: "alarmName",
          columnKey: "alarmName",
          label: "事件名称",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "rentAlarmLevelLabel",
          columnKey: "rentAlarmLevelLabel",
          label: "风险等级",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "alarmFromLabel",
          columnKey: "alarmFromLabel",
          label: "风险类型",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "name",
          columnKey: "name",
          label: "设备名称",
          align: "center",
          minWidth: 100,
          formatter: (row, column, cellValue) => {
            return row.baseInfo.name;
          },
        },
        {
          prop: "equipmentNo",
          columnKey: "equipmentNo",
          label: "设备编号",
          align: "center",
          minWidth: 120,
          formatter: (row, column, cellValue) => {
            return row.baseInfo.equipmentNo;
          },
        },
        {
          prop: "plateNo",
          columnKey: "plateNo",
          label: "车牌号",
          align: "center",
          minWidth: 120,
          formatter: (row, column, cellValue) => {
            return row.baseInfo.plateNo;
          },
        },
        {
          prop: "address",
          columnKey: "address",
          label: "设备位置",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  },
                  domProps: {
                    title: params.row.baseInfo.address,
                  },
                },
                params.row.baseInfo.address
              ),
            ]);
          },
        },
        {
          prop: "dealStatus",
          columnKey: "dealStatus",
          label: "处理状态",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let dealStatus = params.row.dealStatus;
            let dealName;
            let dealStyle;
            if (dealStatus === 0) {
              dealName = "未处理";
              dealStyle = {
                class: "el-icon-remove-outline",
                style: {
                  color: "red",
                },
              };
            } else if (dealStatus === 1) {
              dealName = "已解决";
              dealStyle = {
                class: "el-icon-success",
                style: {
                  color: "green",
                },
              };
            } else {
              dealName = "未知晓";
              dealStyle = {
                class: "el-icon-warning",
                style: {
                  color: "orange",
                },
              };
            }
            return h("div", [h("i", dealStyle), h("span", {}, dealName)]);
          },
        },
        {
          prop: "controller",
          columnKey: "controller",
          align: "center",
          label: "操作",
          fixed: "right",
          minWidth: 150,
          render: (h, params) => {
            let detail, deal, feedback, history;
            detail = {
              class: "iconfont icon-xiangqing",
              style: {
                color: "red",
                fontSize: "18px",
                cursor: "pointer",
              },
              on: {
                click: () => {
                  this.warnDetailInfo = params.row;
                  this.dialogTitle = "风险详情";
                  this.alarmDetail = true;
                  this.dialogVisible = true;
                },
              },
              domProps: {
                title: "查看详情",
              },
            };
            deal = {
              class: "iconfont icon-quchuli",
              style: {
                color: "red",
                fontSize: "18px",
                margin: "0 15px",
                cursor: "pointer",
              },
              on: {
                click: () => {
                  /*this.$router.push({
                    name:'deviceDetails',
                    params:{
                      id:params.row.id
                    }
                  })*/
                },
              },
              domProps: {
                title: "处理",
              },
            };
            feedback = {
              class: "iconfont icon-fankui",
              style: {
                color: "red",
                fontSize: "18px",
                marginRight: "15px",
                cursor: "pointer",
              },
              on: {
                click: () => {
                  /*this.$router.push({
                    name:'deviceDetails',
                    params:{
                      id:params.row.id
                    }
                  })*/
                },
              },
              domProps: {
                title: "反馈",
              },
            };
            history = {
              class: "iconfont icon-lishishijian",
              style: {
                color: "red",
                fontSize: "18px",
                cursor: "pointer",
              },
              on: {
                click: () => {
                  this.alarmHistory = true;
                  this.category = 0;
                  this.currentPage = 1;
                  this.equipmentId = params.row.baseInfo.id;
                  this.eventName = params.row.warnType;
                  this.columns.splice(this.columns.length - 1, 1);
                  this.$refs.alarmTable.doLayout();
                  this.initAlarmData();
                },
              },
              domProps: {
                title: "历史事件",
              },
            };

            if (this.alarmHistory) {
              return h("div", [
                h("span", detail),
                h("span", deal),
                h("span", feedback),
              ]);
            } else {
              return h("div", [
                h("span", detail),
                h("span", deal),
                h("span", feedback),
                h("span", history),
              ]);
            }
          },
        },
        {
          prop: "categoryCount",
          columnKey: "categoryCount",
          label: "发生次数",
          align: "center",
          minWidth: 120,
          show: true,
        },
      ],
      tableData: [],
    };
  },
  components: {
    AlarmDetail,
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
    this.initAlarmData();
    this.initSearchData();
  },
  methods: {
    /*表头样式*/
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      let style = {};
      style.borderColor = "#C0C0C0";
      return style;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let style = {};
      style.borderColor = "#C0C0C0";
      return style;
    },
    /**
     * tabs切换
     * */
    handleClick(tab, event) {
      this.activeName = tab.name;
      if (this.activeName === "all") {
        this.alarmLevel = "";
      } else if (this.activeName === "height") {
        this.alarmLevel = 3;
      } else if (this.activeName === "medium") {
        this.alarmLevel = 2;
      } else {
        this.alarmLevel = 1;
      }
      this.initAlarmData();
    },

    /**
     * 获取所有设备的名称，编号，车牌
     * */
    initSearchData() {
      this.deviceNameOptions = {};
      this.equipmentNoOptions = {};
      this.plateNoOptions = {};
      this.alarmTypeOptions = {};
      this.eventNameOptions = {};
      this.$api.getSelectList("", "", "", [], 1, 9999).then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data.rows;
          for (let info of data) {
            let name = info.name; //设备名称
            let terminalId = info.terminalId; //设备终端
            let equipmentNo = info.equipmentNo; //设备编码
            let plateNo = info.plateNo; //车牌

            let nameKeys = Object.keys(this.deviceNameOptions);
            if (!nameKeys.includes(terminalId)) {
              Vue.set(this.deviceNameOptions, terminalId, name);
            }
            let equipmentKeys = Object.keys(this.equipmentNoOptions);
            if (!equipmentKeys.includes(terminalId)) {
              Vue.set(this.equipmentNoOptions, terminalId, equipmentNo);
            }

            let plateKeys = Object.keys(this.plateNoOptions);
            if (!plateKeys.includes(terminalId) && plateNo) {
              Vue.set(this.plateNoOptions, terminalId, plateNo);
            }
          }
        }
      });
      //风险类型的
      this.$api.getAlarmType().then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data;
          Vue.set(this.alarmTypeOptions, 0, "全部");
          for (let info of data) {
            let keys = Object.keys(this.alarmTypeOptions);
            if (!keys.includes(info.alarmFrom)) {
              Vue.set(
                this.alarmTypeOptions,
                info.alarmFrom,
                info.alarmFromName
              );
            }
          }
        }
      });

      //事件名称
      this.$api.getAlarmEventListInfo().then((res) => {
        if (res.data.code === 200) {
          let data = res.data.data;
          for (let info of data) {
            let keys = Object.keys(this.eventNameOptions);
            if (!keys.includes(info.warnType)) {
              Vue.set(this.eventNameOptions, info.warnType, info.alarmName);
            }
          }
        }
      });
    },

    initAlarmData() {
      this.loading = true;
      let startDate = dateFormat(this.chooseTime[0], "yyyy-MM-dd");
      let endDate = dateFormat(this.chooseTime[1], "yyyy-MM-dd HH:mm:ss");
      let terminalIds = this.deviceName
        .concat(this.equipmentNo)
        .concat(this.plateNo);

      let params = {
        equipemtId: this.equipmentId, //设备Id
        terminalIds: terminalIds, //设备终端号
        rentAlarmLevel: this.alarmLevel, //风险等级
        startTime: startDate + " 00:00:00", //开始时间
        endTime: endDate, //结束时间
        alarmFrom: this.alarmType === "0" ? "" : this.alarmType, //风险类型
        warnType: this.eventName, //报警事件
        dealStatus: this.dealStatus, //处理状态
        category: this.category, //分类 0-列表 1-按类型聚合
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };

      this.$api.getEquipmentAlarmList(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.rows;
          this.total = res.data.data.total;
        } else {
          this.$message.error("接口出错，请联系维护人员");
        }
        this.loading = false;
      });
    },
    /**
     * 根据条件查找数据
     * */
    foundInfByCondition() {
      this.currentPage = 1;
      this.initAlarmData();
    },
    /**
     * 重置
     * */
    doReset() {
      this.deviceName = [];
      this.equipmentNo = [];
      this.plateNo = [];
      this.alarmType = "0";
      this.eventName = "";
      this.dealStatus = "";
      this.chooseTime = [new Date().setHours(0, 0, 0), new Date().getTime()];
    },
    /**
     * 导出
     * */
    downloadData() {
      let startDate = dateFormat(this.chooseTime[0], "yyyy-MM-dd");
      let endDate = dateFormat(this.chooseTime[1], "yyyy-MM-dd HH:mm:ss");
      let terminalIds = this.deviceName
        .concat(this.equipmentNo)
        .concat(this.plateNo);

      let params = {
        equipemtId: this.equipmentId, //设备Id
        terminalIds: terminalIds, //设备终端号
        rentAlarmLevel: this.alarmLevel, //风险等级
        startTime: startDate + " 00:00:00", //开始时间
        endTime: endDate, //结束时间
        alarmFrom: this.alarmType === "0" ? "" : this.alarmType, //风险类型
        warnType: this.eventName, //报警事件
        dealStatus: this.dealStatus, //处理状态
        category: 1, //分类 0-列表 1-按类型聚合
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.$api.downAlarmListInfo(params).then((res) => {
        let fileName =
          "风险事件_" +
          dateFormat(new Date().getTime(), "yyyy年MM月dd日HH时mm分ss秒");
        let blob = new Blob([res.data], {
          type: "application/vnd.ms-excel",
        });
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName);
        } else {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
        this.$message.success("下载完成", 3000);
      });
    },
    /**
     * 更换每页的数据量
     * */
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.initAlarmData();
    },
    /**
     * 页码切换
     * */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initAlarmData();
    },
    /**
     * 返回
     * */
    backOut() {
      this.alarmHistory = false;
      this.category = 1;
      this.currentPage = 1;
      this.equipmentId = "";
      this.eventName = "";
      let param = {
        prop: "categoryCount",
        columnKey: "categoryCount",
        label: "发生次数",
        align: "center",
        minWidth: 120,
        show: true,
      };
      this.columns.push(param);
      this.$nextTick(() => {
        this.$refs.alarmTable.doLayout();
        this.initAlarmData();
      });
    },
    /**
     * 弹出关闭处理
     * */
    dialogClose() {
      this.dialogVisible = false;
      this.alarmDetail = false;
      this.alarmDeal = false;
      this.alarmFeedBack = false;
    },
  },
};
</script>
<style lang="less">
// 导航栏
.deviceAlarm {
  margin: 0 10px;

  .el-breadcrumb {
    font-size: 16px;
  }
  .el-breadcrumb :nth-child(3) {
    color: #2c2b30;
  }
  .el-breadcrumb :nth-child(1) {
    color: #999;
  }

  .content {
    position: relative;
    .el-form-item {
      margin-bottom: 10px !important;
    }
    .el-input__inner:focus,
    .el-range-editor.is-active {
      border: 1px black solid !important;
    }
    .btnChangeColor:hover {
      border: 1px #818181 solid;
      color: black;
    }
    .downMessage {
      position: absolute;
      z-index: 22;
      right: 0;
      top: -5px;
    }
  }

  .el-dialog__header {
    background-color: rgba(231, 225, 205, 0.4);
    font-size: 15px;
    font-weight: bold;
  }
}
</style>
