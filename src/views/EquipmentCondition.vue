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
        <el-row :gutter="20">
          <el-col :span="2" :offset="2" style="margin-right: -20px">
            <el-select
              v-model="deviceMessage"
              placeholder="请选择"
              size="medium"
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
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="deviceInfo"
              multiple
              collapse-tags
              filterable
              placeholder="请选择"
              size="medium"
              style="width: 300px"
            >
              <el-option
                v-for="(item, index) in deviceInfoOptions"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1" style="width: 87px; margin: 9px 0 0 40px">
            <div style="color: #909399">时间范围</div>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="chooseTime"
              type="datetimerange"
              :editable="false"
              clearable
              size="medium"
              range-separator="-"
              style="width: 280px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              align="center"
              :format="'yyyy-MM-dd'"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="5">
            <el-col :span="7">
              <el-button
                type="primary"
                style="background-color: #2c2b30; border: none"
                size="medium"
                icon="el-icon-search"
                @click="foundInfByCondition"
                >查询</el-button
              >
            </el-col>
            <el-col :span="7">
              <el-button
                type="primary"
                style="background-color: #2c2b30; border: none"
                size="medium"
                icon="el-icon-download"
                @click="downloadData"
                >导出</el-button
              >
            </el-col>
          </el-col>
        </el-row>
        <div class="content">
          <div class="countData">
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
          <div class="module">
            <el-table
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
              <el-table-column
                prop="numberPlate"
                label="车牌号"
                align="center"
                width="140"
              >
              </el-table-column>
              <el-table-column
                prop="deviceId"
                label="设备编号"
                align="center"
                width="140"
              >
              </el-table-column>
              <el-table-column
                prop="equipmentType"
                label="设备类型"
                align="center"
                width="140"
              >
              </el-table-column>
              <el-table-column
                prop="drivenDistance"
                label="行驶里程（km）"
                align="center"
                width="140"
              >
              </el-table-column>
              <el-table-column
                prop="fuelConsumption"
                label="行驶油耗（L）"
                align="center"
                width="130"
              >
              </el-table-column>
              <el-table-column
                prop="workTime"
                label="工作时长（h）"
                align="center"
                width="130"
              >
              </el-table-column>
              <el-table-column
                prop="workingFuelConsumption"
                label="工作油耗（L）"
                align="center"
                width="130"
              >
              </el-table-column>
              <el-table-column
                prop="liftingTimes"
                label="吊载次数"
                align="center"
                width="130"
              >
              </el-table-column>
              <el-table-column
                prop="deviceOwnership"
                label="设备归属"
                align="center"
                width="130"
              >
              </el-table-column>
              <el-table-column
                prop="lastLocation"
                label="最后定位位置"
                align="center"
                show-overflow-tooltip
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="lastPositioningTime"
                label="最后定位时间"
                align="center"
                width="160"
              >
              </el-table-column>
              <el-table-column
                prop="operate"
                label="操作"
                width="160"
                align="center"
              >
                <template slot-scope="scope">
                  <span>
                    <el-button
                      @click="deviceDetailInfo(scope.row.deviceId)"
                      type="text"
                      size="medium"
                      >详情</el-button
                    >
                    <el-button
                      @click="sevenDayWorkConditionInfo(scope.row.deviceId)"
                      type="text"
                      size="medium"
                      >七日工况分析</el-button
                    >
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
  </div>
</template>
<script>
import Vue from "vue";
import { dateFormat } from "@/utils/validate";
import {queryEquipmentsByPage,historyTrackDetail,equipmentBusinessNameByNo,workStatInfo,workDetailInfoByEquipmentNo,drivingDataDownload} from "@/api/zqData";

export default {
  data() {
    return {
      loading: false, //是否加载
      tableHeight: window.innerHeight - 370,
      allDeviceInfo: [], //全部设备信息
      deviceNameList: [], //设备名称信息
      deviceEquipmentNoList: [], //设备编号信息
      plateNoList: [], //车牌信息
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
      deviceMessage: "equipmentNo", //条件类型选择的值
      deviceInfo: [], // 选择的设备的信息
      deviceInfoOptions: [], // 对应条件搜索的数据
      chooseTime: [
        new Date().getTime() - 3600 * 1000 * 24,
        new Date().getTime() - 3600 * 1000 * 24,
      ], //时间范围
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
      tableData: [],
      total: 0, //数据总量
      pageSize: 15, //每页数据数量
      currentPage: 1, //当前页码
      roadHaul: 0.0, // 行驶里程
      travelOil: 0.0, //行驶油耗
      workHours: 0.0, //工作时长
      workOils: 0.0, //工作油耗
      craneLoadCount: 0.0, //吊载次数
    };
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
      style.background = "#2c2b30";
      style.color = "whitesmoke";
      return style;
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let style = {};
      style.borderColor = "#C0C0C0";
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
            this.allDeviceInfo
              .filter(
                (p) => p.entity == null && p.name != null && name === p.name
              )
              .map((p) => {
                equipment.push(p.equipmentNo);
              });
          }
        } else if (this.deviceMessage === "plateNo") {
          for (let name of this.deviceInfo) {
            this.allDeviceInfo
              .filter(
                (p) =>
                  p.entity == null && p.plateNo != null && name === p.plateNo
              )
              .map((p) => {
                equipment.push(p.equipmentNo);
              });
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
     * 详情
     * */
    sevenDayWorkConditionInfo(equipmentNo) {},
  },
};
</script>
<style lang="less">
.EquipmentCondition {
  .el-breadcrumb {
    font-weight: 600 !important;
    color: #999;
    font-size: 18px;
    margin-left: 8px;
  }
  .navbar {
    padding: 0 10px;
    min-height: 56px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f7;
  }
  // 内容区域
  .content {
    margin: 0 32px;
    .module {
      .header {
        display: flex;
        align-items: center;
        /*justify-content: space-around;*/
        margin: 0 20px;
      }

      .content {
        .countData {
          display: flex;
          justify-content: space-around;
          background: #2c2b30;
          padding: 20px;
          margin: 20px 0;
          border-radius: 10px;
          div {
            font-size: 16px;
            /*color: #909399;*/
            color: whitesmoke;
          }

          p {
            margin: 0 0 20px 0;
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
