<template>
  <div class="EquipmentCondition">
    <div class="navbar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        <el-breadcrumb-item>设备工况数据</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="content">
      <div class="module">
        <div class="searchCondition" v-show="!conditionDetails">
          <el-select
            v-model="deviceMessage"
            placeholder="请选择"
            style="width: 100px"
            size="small"
            @change="deviceMessageChange"
          >
            <el-option
              v-for="item in deviceMessageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="deviceInfo"
            multiple
            collapse-tags
            filterable
            placeholder="请选择"
            style="width: 200px; margin-right: 80px"
            size="small"
          >
            <el-option
              v-for="(item, index) in deviceInfoOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <div style="color: #909399">
            时间范围
            <el-date-picker
              v-model="chooseTime"
              type="datetimerange"
              :editable="false"
              clearable
              style="width: 280px; margin-right: 20px"
              size="small"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              align="center"
              :format="'yyyy-MM-dd'"
            >
            </el-date-picker>
          </div>
          <el-col :span="7">
            <el-button
              type="primary"
              style="background-color: #2c2b30cc; border: none"
              size="medium"
              icon="el-icon-search"
              @click="foundInfByCondition"
              >查询</el-button
            >
            <el-button
              type="primary"
              style="background-color: #2c2b30cc; border: none"
              class="btnChangeColor"
              size="medium"
              icon="el-icon-download"
              @click="downloadData"
              >导出</el-button
            >
          </el-col>
        </div>
        <div class="content">
          <div class="countData" v-show="!conditionDetails">
            <div>
              <p>行驶里程</p>
              <h4>
                <span>{{ roadHaul }}</span> 公里
              </h4>
            </div>
            <div>
              <p>行驶油耗</p>
              <h4>
                <span>{{ travelOil }}</span> 升
              </h4>
            </div>
            <div>
              <p>工作时长</p>
              <h4>
                <span>{{ workHours }}</span> 小时
              </h4>
            </div>
            <div>
              <p>工作油耗</p>
              <h4>
                <span>{{ workOils }}</span> 升
              </h4>
            </div>
            <div>
              <p>吊载次数</p>
              <h4>
                <span>{{ craneLoadCount }}</span> 次
              </h4>
            </div>
          </div>
          <div class="countData" v-show="conditionDetails">
            <div>
              <p>设备编号</p>
              <h4>
                <span>{{ detailsDeviceId }}</span>
              </h4>
            </div>
            <div>
              <p>统计时间</p>
              <h4>
                <span>{{ statisticsTime }}</span>
              </h4>
            </div>
            <div>
              <p>行驶公里</p>
              <h4>
                <span>{{ intervalMileageStr }}</span> 公里
              </h4>
            </div>
            <div>
              <p>行驶油耗</p>
              <h4>
                <span>{{ runningOilTotalStr }}</span> 升
              </h4>
            </div>
            <div>
              <p>工作时长</p>
              <h4>
                <span>{{ intervalCraneWorktimeStr }}</span> 小时
              </h4>
            </div>
            <div>
              <p>工作油耗</p>
              <h4>
                <span>{{ intervalOilStr }}</span> 升
              </h4>
            </div>
            <div>
              <p>吊载次数</p>
              <h4>
                <span>{{ intervalHoistingCountStr }}</span> 次
              </h4>
            </div>
            <div>
              <el-button
                plain
                size="medium"
                style="border: none; outline: 1px solid #dcdfe6"
                class="back"
                icon="el-icon-arrow-left"
                @click="backOut"
                v-show="conditionDetails"
                >返回</el-button
              >
            </div>
          </div>
          <div class="module">
            <el-table
              ref="conditionTable"
              v-loading="loading"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData"
              style="width: 100%; border: solid 1px #c0c0c0"
              stripe
              :height="tableHeight"
              :cell-style="cellStyle"
              :header-cell-style="headerCellStyle"
            >
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
          </div>
          <el-pagination
            v-show="!conditionDetails"
            style="
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
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
  </div>
</template>
<script>
import Vue from "vue";
import { dateFormat, getdiffdate } from "@/utils/validate";
import {queryEquipmentsByPage,historyTrackDetail,equipmentBusinessNameByNo,workStatInfo,workDetailInfoByEquipmentNo,drivingDataDownload} from "@/api/zqData";

export default {
  data() {
    return {
      loading: false, //是否加载
      tableHeight: window.innerHeight - 340,
      allDeviceInfo: [], //全部设备信息
      deviceNameList: [], //设备名称信息
      deviceEquipmentNoList: [], //设备编号信息
      plateNoList: [], //车牌信息
      // #region deviceMessageOptions
      deviceMessageOptions: [
        {
          //第一个搜索的条件类型
          value: "equipmentNo",
          label: "设备编码",
        },
        {
          value: "equipmentName",
          label: "设备名称",
        },
        {
          value: "plateNo",
          label: "车牌号",
        },
      ],
      // #endregion
      deviceMessage: "equipmentNo", //条件类型选择的值
      deviceInfo: [], // 选择的设备的信息
      deviceInfoOptions: [], // 对应条件搜索的数据
      chooseTime: [
        new Date().getTime() - 3600 * 1000 * 24,
        new Date().getTime() - 3600 * 1000 * 24,
      ], //时间范围
      // #region pickerOptions
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
      // #endregion
      tableData: [],
      total: 0, //数据总量
      pageSize: 15, //每页数据数量
      currentPage: 1, //当前页码
      roadHaul: 0.0, // 行驶里程
      travelOil: 0.0, //行驶油耗
      workHours: 0.0, //工作时长
      workOils: 0.0, //工作油耗
      craneLoadCount: 0.0, //吊载次数

      conditionDetails: false, //工况详情
      detailsDeviceId: "", //设备编号
      statisticsTime: "", //统计时间
      intervalMileageStr: "", //行驶公里
      runningOilTotalStr: "", //行驶油耗
      intervalCraneWorktimeStr: "", //工作时长
      intervalOilStr: "", //工作油耗
      intervalHoistingCountStr: "", //吊载次数
      columns: [],
      columns1: [
        // #region
        {
          prop: "deviceId",
          label: "设备编号",
          align: "center",
          minWidth: 140,
        },
        {
          prop: "equipmentType",
          label: "设备类型",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "drivenDistance",
          label: "行驶里程（km）",
          align: "center",
          minWidth: 130,
        },
        {
          prop: "fuelConsumption",
          label: "行驶油耗（L）",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "workTime",
          label: "工作时长（h）",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "workingFuelConsumption",
          label: "工作油耗（L）",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "liftingTimes",
          label: "吊载次数",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "deviceOwnership",
          label: "设备归属",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "lastLocation",
          columnKey: "address",
          label: "最后定位位置",
          align: "center",
          minWidth: 180,
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
                    title: params.row.lastLocation,
                  },
                },
                params.row.lastLocation
              ),
            ]);
          },
        },
        {
          prop: "lastPositioningTime",
          label: "最后定位时间",
          align: "center",
          minWidth: 160,
        },
        // #endregion
        {
          prop: "controller",
          columnKey: "controller",
          align: "center",
          label: "操作",
          fixed: "right",
          minWidth: 150,
          render: (h, params) => {
            let detail;
            detail = {
              style: {
                color: "red",
                fontSize: "initial",
                margin: "0 7px",
                cursor: "pointer",
              },
              on: {
                click: () => {
                  this.conditionDetails = true;
                  this.columns = this.columns2;
                  this.currentPage = 1;
                  this.detailsDeviceId = params.row.deviceId;
                  this.$refs.conditionTable.doLayout();
                  this.initDetails();
                },
              },
            };

            if (this.alarmHistory) {
              return h("div", [h("span", detail)]);
            } else {
              return h("div", [h("span", detail, "详情")]);
            }
          },
        },
      ],
      // #region columns2
      columns2: [
        {
          prop: "statisticsDate",
          label: "统计日期",
          align: "center",
          minWidth: 120,
        },
        {
          prop: "drivenDistance",
          label: "行驶里程（km）",
          align: "center",
          minWidth: 140,
        },
        {
          prop: "fuelConsumption",
          label: "行驶油耗（L）",
          align: "center",
          minWidth: 140,
        },
        {
          prop: "workTime",
          label: "工作时长（h）",
          align: "center",
          minWidth: 130,
        },
        {
          prop: "workingFuelConsumption",
          label: "工作油耗（L）",
          align: "center",
          minWidth: 130,
        },
        {
          prop: "liftingTimes",
          label: "吊载次数",
          align: "center",
          minWidth: 130,
        },
        {
          prop: "lastLocation",
          columnKey: "address",
          label: "最后定位位置",
          align: "center",
          minWidth: 180,
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
                    title: params.row.lastLocation,
                  },
                },
                params.row.lastLocation
              ),
            ]);
          },
        },
        {
          prop: "lastPositioningTime",
          label: "最后定位时间",
          align: "center",
          minWidth: 160,
        },
      ],
      // #endregion
    };
  },
  watch: {
    conditionDetails(e) {
      this.tableHeight = window.innerHeight - (e ? 240 : 340);
    },
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
    this.initDeviceInfo();
  },
  methods: {
    /**
     * 更换每页的数据量
     * */
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      let equipment = this.deviceEquipmentNoList.join(",");
      this.workOtherInfo(equipment, 1);
    },
    /*表头样式*/
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      let style = {};
      style.borderColor = "#C0C0C0";
      style.background = "#2c2b30cc";
      style.color = "#F2CE91";
      return style;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let style = {};
      style.borderColor = "#C0C0C0";
      style.padding = "6px 0";
      return style;
    },
    /**
     * 根据条件查找数据
     * */
    foundInfByCondition() {
      let equipment = this.conditionDealInfo();
      this.currentPage = 1;
      this.workOtherInfo(equipment, 1);
    },
    /**
     * 条件查找的数据处理
     * */
    conditionDealInfo() {
      let equipment = [];
      if (this.deviceInfo.length > 0) {
        if (this.deviceMessage === "equipmentName") {
          for (let name of this.deviceInfo) {
            this.allDeviceInfo.filter((p) => p.entity == null && p.name != null && name === p.name).map((p) => {equipment.push(p.equipmentNo);});
          }
        } else if (this.deviceMessage === "plateNo") {
          for (let name of this.deviceInfo) {
            this.allDeviceInfo.filter((p) => p.entity == null && p.plateNo != null && name === p.plateNo).map((p) => {equipment.push(p.equipmentNo);});
          }
        } else {
          equipment = this.deviceInfo;
        }
      } else {
        equipment = this.deviceEquipmentNoList.join(",");
      }
      return equipment;
    },
    /**
     * 获取搜索条件的设备类型信息
     * */
    initDeviceInfo() {
      this.loading = true;
      this.columns = this.columns1;
      let params={
        pageNum:0,
        pageSize:9999
      }
      queryEquipmentsByPage(params).then((res) => {
        if (res.code === 200) {
          this.allDeviceInfo = [];
          this.deviceNameList = [];
          this.deviceEquipmentNoList = [];
          this.plateNoList = [];
          let data = res.data.rows;
          for (let info of data) {
            let name = info.name; //设备名称
            let equipmentNo = info.equipmentNo; //设备编码
            let plateNo = info.plateNo; //车牌
            // let typeLabel= info.typeLabel //设备类型
            // let ownerName= info.ownerName //归属
            // let address= info.address //最后定位置
            // let locationTime = info.locationTime //最后定位时间
            this.allDeviceInfo.push(info);
            //设备各类信息
            if (name) {
              this.deviceNameList.push(name);
            }
            if (equipmentNo) {
              this.deviceEquipmentNoList.push(equipmentNo);
            }
            if (plateNo) {
              this.plateNoList.push(plateNo);
            }
          }
          this.deviceInfoOptions = this.deviceEquipmentNoList;
          let equipment = this.deviceEquipmentNoList.join(",");
          this.workOtherInfo(equipment, 1);
        }
      });
    },
    initDetails() {
      this.loading = true;
      let startDate = dateFormat(this.chooseTime[0], "yyyy-MM-dd");
      let endDate = dateFormat(this.chooseTime[1], "yyyy-MM-dd");
      this.statisticsTime = `${startDate}~${endDate}`;
      let diffdate = getdiffdate(startDate, endDate);
      //统计数据的
      this.workStatisticalInfoDetails(this.detailsDeviceId, startDate, endDate);
      this.tableData = [];
      let params={
        vehicleCodes: this.detailsDeviceId,
        pageNum: 1,
        pageSize: this.pageSize
      }
      diffdate.forEach((startDateItem, index) => {
        Vue.set(params,'startTime',startDateItem)
        Vue.set(params,'endTime',startDateItem)
        workDetailInfoByEquipmentNo(params).then((res) => {
            if (res.code === 200) {
              let data = res.data.rows;
              console.log("data", data[0]);
              if (data[0]) {
                let statisticsDate = startDateItem; //统计时间
                let drivenDistance = data[0].intervalMileageStr; //行驶里程
                let fuelConsumption = data[0].intervalRunOilStr; //行驶油耗
                let workStr = data[0].intervalCraneWorktimeStr; //工作时长
                let oliStr = data[0].intervalCraneOilcostStr; //工作油耗
                let countStr = data[0].intervalHoistingCountStr; //吊载次数

                let param = {
                  statisticsDate: statisticsDate,
                  drivenDistance: drivenDistance,
                  fuelConsumption: fuelConsumption,
                  workTime: workStr,
                  workingFuelConsumption: oliStr,
                  liftingTimes: countStr,
                  lastLocation: "",
                  lastPositioningTime: "",
                };
                Vue.set(this.tableData, index, param);
                let params={
                  startDate: startDateItem + " 00:00:00",
                  endDate: startDateItem + " 23:59:59",
                  vehicleCode: this.detailsDeviceId
                }
                historyTrackDetail(params).then((res) => {
                    if (res.code === 200) {
                      let locationInfo = res.data.listPoint;
                      console.log("locationInfo", locationInfo);
                      if (locationInfo.length > 0) {
                        let lastLocation = locationInfo.pop().position;
                        let lastPositioningTime = locationInfo.pop().time;
                        Vue.set(this.tableData[index], "lastLocation", lastLocation);
                        Vue.set(this.tableData[index], "lastPositioningTime", lastPositioningTime);
                      }
                    } else {
                      this.$message.error("接口出错，请联系维护人员");
                    }
                  })
                  .catch((err) => {
                    this.$message.error("接口出错，请联系维护人员");
                  });
              }
            } else {
              this.$message.error("接口出错，请联系维护人员");
            }
            this.loading = false;
          });
      });
    },
    async workOtherInfo(equipment, pageNo) {
      this.loading = true;
      let startDate = dateFormat(this.chooseTime[0], "yyyy-MM-dd");
      let endDate = dateFormat(this.chooseTime[1], "yyyy-MM-dd");
      //统计数据的
      this.workStatisticalInfo(equipment, startDate, endDate);
      //设备行程，油况等基础信息
      let detailInfo = await this.workDetailInfo(
        equipment,
        startDate,
        endDate,
        pageNo
      );

      if (detailInfo.code === 200) {
        let data = detailInfo.data.rows;
        this.total = detailInfo.data.total; //总数据量
        if (this.total < this.pageSize) {
          this.pageSize = this.total;
        }
        this.tableData = [];
        let businessNo = []; //记录当前展示数据的设备编码
        for (let info of data) {
          let workStr = info.intervalCraneWorktimeStr; //工作时长
          let oliStr = info.intervalCraneOilcostStr; //工作油耗
          let countStr = info.intervalHoistingCountStr; //吊载次数
          let vehicleCode = info.vehicleCode; //设备编码

          let param = {
            numberPlate: "",
            deviceId: vehicleCode,
            equipmentType: "",
            drivenDistance: "0.00",
            fuelConsumption: "0.00",
            workTime: workStr,
            workingFuelConsumption: oliStr,
            liftingTimes: countStr,
            deviceOwnership: "",
            lastLocation: "",
            lastPositioningTime: "",
          };
          this.tableData.push(param);
          businessNo.push(vehicleCode);
        }
        this.equipmentBusinessByNo(businessNo.join(","));

        for (let deviceNo of businessNo) {
          let params={
            startDate: startDate + " 00:00:00",
            endDate: endDate + " 23:59:59",
            vehicleCode: deviceNo
          }
          historyTrackDetail(params).then((res) => {
              if (res.code === 200) {
                let locationInfo = res.data.listPoint;
                if (locationInfo.length > 0) {
                  for (let info of this.tableData) {
                    if (info.deviceId === locationInfo[0].equip_code) {
                      Vue.set(info, "lastLocation", locationInfo[0].position);
                      Vue.set(
                        info,
                        "lastPositioningTime",
                        locationInfo[0].time
                      );
                      break;
                    }
                  }
                }
              } else {
                this.$message.error("1接口出错，请联系维护人员");
              }
            })
            .catch((err) => {
              this.$message.error("2接口出错，请联系维护人员");
            });
        }
      } else {
        this.$message.error("3接口出错，请联系维护人员");
      }
    },
    /**
     * 根据设备编号查询对应的基础信息
     * */
    equipmentBusinessByNo(equipment) {
      equipmentBusinessNameByNo({equipmentNos:equipment}).then((res) => {
        if (res.code === 200) {
          let data = res.data;
          for (let info of data) {
            let businessName = info.businessName; //客户名称
            let equipmentNo = info.equipmentNo; //设备编码
            let name = info.equipmentNo; //设备名称
            let plateNo = info.plateNo; //车牌
            let type = info.type; //类型
            let deviceType;
            if (type === 1) {
              deviceType = "汽车起重机";
            } else if (type === 2) {
              deviceType = "履带式起重机";
            } else if (type === 3) {
              deviceType = "塔式起重机";
            } else if (type === 4) {
              deviceType = "平板车";
            }
            this.tableData
              .filter((p) => p.entity == null && p.deviceId != null)
              .map((p) => {
                if (p.deviceId === equipmentNo) {
                  Vue.set(p, "equipmentType", deviceType);
                  Vue.set(p, "numberPlate", plateNo);
                  Vue.set(p, "deviceOwnership", businessName);
                }
              });
          }
        }
        this.loading = false;
      });
    },
    /**
     * 根据设备编码获取工况的统计数据
     * */
    workStatisticalInfo(equipment, startDate, endDate) {
      let params={
        vehicleCodes: equipment,
        startTime: startDate,
        endTime: endDate
      }
      workStatInfo(params).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.workOils = data.intervalCraneOilcost;
            this.workHours = data.intervalCraneWorktimeStr;
            this.craneLoadCount = data.intervalHoistingCount;
          } else {
            this.$message.error("4接口出错，请联系维护人员");
          }
        })
        .catch((err) => {
          this.$message.error("5接口出错，请联系维护人员");
        });
    },
    workStatisticalInfoDetails(equipment, startDate, endDate) {
      let params={
        vehicleCodes: equipment,
        startTime: startDate,
        endTime: endDate
      }
      workStatInfo(params).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            // 设备详细统计数据
            this.intervalMileageStr = data.intervalMileageStr;
            this.runningOilTotalStr = data.runningOilTotalStr;
            this.intervalCraneWorktimeStr = data.intervalCraneWorktimeStr;
            this.intervalOilStr = data.intervalOilStr;
            this.intervalHoistingCountStr = data.intervalHoistingCountStr;
          } else {
            this.$message.error("4接口出错，请联系维护人员");
          }
        })
        .catch((err) => {
          this.$message.error("5接口出错，请联系维护人员");
        });
    },
    /**
     * 根据设备编码获取工况的详情信息
     * */
    workDetailInfo(equipment, startDate, endDate, pageNo) {
      let params={
        vehicleCodes: equipment,
        startTime: startDate,
        endTime: endDate,
        pageNum: pageNo,
        pageSize: this.pageSize
      }
      return workDetailInfoByEquipmentNo(params);
    },
    /**
     * 设备信息类型切换
     * */
    deviceMessageChange(e) {
      this.deviceInfo = [];
      if (e === "equipmentNo") {
        this.deviceInfoOptions = this.deviceEquipmentNoList;
      } else if (e === "equipmentName") {
        this.deviceInfoOptions = this.deviceNameList;
      } else if (e === "plateNo") {
        this.deviceInfoOptions = this.plateNoList;
      }
    },
    /**
     * 页码切换
     * */
    handleCurrentChange(val) {
      this.currentPage = val;
      let equipment = this.deviceEquipmentNoList.join(",");
      this.workOtherInfo(equipment, val);
    },
    /**
     * 导出
     * */
    downloadData() {
      let params={
        vehicleCodes: this.conditionDealInfo(),
        startTime: dateFormat(this.chooseTime[0], "yyyy-MM-dd"),
        endTime: dateFormat(this.chooseTime[1], "yyyy-MM-dd"),
        searchType: 3,
        sortType: null,
        sortWay: 2
      }
      drivingDataDownload(params)
        .then((res) => {
          let fileNameUnicode =
            res.headers["content-disposition"].split("filename=")[1];
          let fileName = decodeURIComponent(fileNameUnicode);
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
     * 详情
     * */
    deviceDetailInfo(equipmentNo) {},
    /**
     * 返回
     * */
    backOut() {
      this.conditionDetails = false;
      this.columns = this.columns1;
      this.$nextTick(() => {
        this.$refs.conditionTable.doLayout();
        let equipment = this.deviceEquipmentNoList.join(",");
        this.workOtherInfo(equipment, 1);
        // this.initDeviceInfo();
      });
      this.currentPage = 1;
      this.pageSize = 15;
      this.detailsDeviceId = "";
    },
    /**
     * 详情
     * */
    sevenDayWorkConditionInfo(equipmentNo) {},
  },
};
</script>
<style lang="less">
.EquipmentCondition {
  .navbar {
    padding: 0 10px;
    min-height: 44px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f7;
    .el-breadcrumb {
      font-weight: 600 !important;
      color: #999;
      font-size: 16px;
      margin-left: 8px;
    }
  }
  // 内容区域
  .content {
    min-width: 1200px;
    margin: 0 32px;
    .module {
      .header {
        display: flex;
        align-items: center;
        /* justify-content: space-around; */
        margin: 0 20px;
      }
      .searchCondition {
        margin: 0 32px;
        display: flex;
        align-items: center;
        padding: 20px 0 10px 0;
      }

      .content {
        .countData {
          position: relative;
          display: flex;
          justify-content: space-around;
          background: #2c2b30cc;
          padding: 15px;
          margin: 10px 0;
          border-radius: 10px;
          .back {
            // position: absolute;
            // top: 20px;
            // right: 20px;
            background: #565559;
            color: rgb(220, 223, 230);
          }
          .back:hover {
            outline: 1px #ffffff solid;
            color: rgb(255, 255, 255);
          }
          div {
            font-size: 12px;
            color: #f2ce91;
          }

          p {
            margin: 0 0 10px 0;
            color: #ead4ae;
          }

          h4 {
            span {
              font-size: 20px;
            }
          }
        }

        /*.module {
            height: 500px;
            overflow: auto;
          }*/
      }
    }
  }
}
</style>
