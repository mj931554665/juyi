<template>
  <div class="EquipmentCondition">
    <div class="navbar">

      <el-breadcrumb separator=">">
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        <el-breadcrumb-item active>设备工况数据</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="operate">
        <div class="fullScreen">
          <div class="btn">
            <i class="el-icon-full-screen"></i>
          </div>
        </div>

        <div class="userMenu">
          <div class="btn">
            <div style="margin-left: 5px;" class="username">userName</div>
            <i style="margin-left: 10px;" class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>

    </div>

    <div class="content">
      <div class="module">
        <div class="header">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value2" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <div class="block">
            <span class="demonstration">时间范围：</span>
            <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          快捷时间
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary">查询</el-button>
          <el-button type="primary">导出</el-button>
        </div>

        <div class="content">
          <div class="countData">
            <div>
              <p>行驶里程</p>
              <h4><span>0.00</span> 公里</h4>
            </div>
            <div>
              <p>行驶油耗</p>
              <h4><span>0.00</span> 升</h4>
            </div>
            <div>
              <p>工作时长</p>
              <h4><span>515.40</span> 小时</h4>
            </div>
            <div>
              <p>工作油耗</p>
              <h4><span>2986.00</span> 升</h4>
            </div>
            <div>
              <p>吊载次数</p>
              <h4><span>480</span> 次</h4>
            </div>
          </div>
          <div class="module">
            <el-table :data="tableData" style="width: 100%" stripe height="500">
              <el-table-column type="index" width="50" label="序号">
              </el-table-column>
              <el-table-column prop="numberPlate" label="车牌号" width="100">
              </el-table-column>
              <el-table-column prop="deviceId" label="设备编号" width="140">
              </el-table-column>
              <el-table-column prop="equipmentType" label="设备类型">
              </el-table-column>
              <el-table-column prop="drivenDistance" label="行驶里程（km）" width="130">
              </el-table-column>
              <el-table-column prop="fuelConsumption" label="行驶油耗（L）">
              </el-table-column>
              <el-table-column prop="workTime" label="工作时长（h）">
              </el-table-column>
              <el-table-column prop="workingFuelConsumption" label="工作油耗（L）">
              </el-table-column>
              <el-table-column prop="liftingTimes" label="吊载次数">
              </el-table-column>
              <el-table-column prop="deviceOwnership" label="设备归属">
              </el-table-column>
              <el-table-column prop="lastLocation" label="最后定位位置">
              </el-table-column>
              <el-table-column prop="lastPositioningTime" label="最后定位时间">
              </el-table-column>
              <el-table-column prop="operate" label="操作" width="160">
              </el-table-column>
            </el-table>


          </div>
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>

        </div>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      options1: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }, {
        value: '选项3',
        label: '选项3'
      }, {
        value: '选项4',
        label: '选项4'
      }, {
        value: '选项5',
        label: '选项5'
      }],
      value: '',
      options2: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }, {
        value: '选项3',
        label: '选项3'
      }, {
        value: '选项4',
        label: '选项4'
      }, {
        value: '选项5',
        label: '选项5'
      }],
      value1: [],
      value2: [],
      options3: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }, {
        value: '选项3',
        label: '选项3'
      }, {
        value: '选项4',
        label: '选项4'
      }, {
        value: '选项5',
        label: '选项5'
      }],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tableData: [{
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }, {
        numberPlate: '',
        deviceId: '20CC01500023',
        equipmentType: '履带式起重机',
        drivenDistance: '0.00',
        fuelConsumption: '0.00',
        workTime: '8.30',
        workingFuelConsumption: '53.00',
        liftingTimes: '41',
        deviceOwnership: '深圳钜亿',
        lastLocation: '山东省青岛市黄岛区薛家岛街道连江路294号',
        lastPositioningTime: '2022-06-28 15:50:52',
        operate: '详情 七日工况分析',
      }
      ],
      currentRow: null
    }
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
}
</script>
<style lang="less">
// 导航栏
.navbar {
  padding: 0 10px;
  min-height: 56px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f7;

  .el-breadcrumb {
    font-weight: 600 !important;
    color: #999;
    font-size: 21px;
    margin-left: 8px;
  }

  .operate {
    display: flex;

    .fullScreen {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 35px;
      border-radius: 8px;
      border: #DCDFE6 solid 1px;
      background: #fff;
      margin-right: 10px;
    }

    .userMenu {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 168px;
      height: 35px;
      border-radius: 8px;
      border: #DCDFE6 solid 1px;
      background: #fff;

      .btn {
        display: flex;
        align-items: center;
        justify-content: space-around;

        img {
          position: relative;
          width: 24px;
          height: 24px;
          border-radius: 5px;
          margin-right: 5px;
        }
      }
    }
  }
}

// 内容区域
.content {
  .module {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .content {
      .countData {
        display: flex;
        justify-content: space-around;
        background: #CCD6D7;
        padding: 20px;
        margin: 10px;
        border-radius: 10px;
        div{
          font-size: 16px;
          color: #909399;
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

      .module {
        height: 500px;
        overflow: auto;
      }
    }
  }
}
</style>