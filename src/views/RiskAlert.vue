<template>
  <div class="RiskAlert">
    <div class="navbar">

      <el-breadcrumb separator=">">
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        <el-breadcrumb-item active>风险报警</el-breadcrumb-item>
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
        <el-tabs type="border-card">
          <div class="search">
            <div>
              设备名称：
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              设备编号：
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- <div>
              车 牌 号：
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div> -->
            <div>
              风险类型：
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              事件名称：
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              处理状态：
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="display: flex;align-items: center;">
              选择时间：&nbsp; <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
              </el-date-picker>
            </div>
            <div></div>
            <div>
              <el-button type="primary">查询</el-button>
              <el-button plain>重置</el-button>
            </div>
          </div>
          <el-tab-pane label="全部风险事件">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号" width="50">
              </el-table-column>
              <el-table-column prop="beginTime" label="发生时间" width="180">
              </el-table-column>
              <el-table-column prop="alarmName" label="事件名称" width="120">
              </el-table-column>
              <el-table-column prop="rentAlarmLevelLabel" label="风险等级">
              </el-table-column>
              <el-table-column prop="alarmFrom" label="风险类型" width="140">
              </el-table-column>
              <el-table-column prop="address" label="位置">
              </el-table-column>
              <el-table-column prop="dealStatus" label="处理状态">
              </el-table-column>
              <el-table-column prop="total" label="发生次数">
              </el-table-column>
              <el-table-column prop="operate" label="操作">
              </el-table-column>
            </el-table>
              <el-pagination background layout="prev, pager, next" :total="1000">
              </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="高风险事件">配置管理</el-tab-pane>
          <el-tab-pane label="中风险事件">角色管理</el-tab-pane>
          <el-tab-pane label="低风险事件">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
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
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
      tableData: [{
        beginTime: '2016-05-02 09:32:26',
        alarmName: '不收车过夜行为',
        rentAlarmLevelLabel: '高风险',
        alarmFrom: '超大吨位安全预警',
        name: '852',
        equipmentNo: 'CC0260CB5352',
        numberPlate: '',
        address: '上海市普陀区金沙江路 1518 弄8',
        dealStatus: '未处理',
        total: '1',
        operate: '查看详情',
      }, {
        beginTime: '2016-05-04 09:32:26',
        alarmName: '不收车过夜行为',
        rentAlarmLevelLabel: '高风险',
        alarmFrom: '超大吨位安全预警',
        name: '852',
        equipmentNo: 'CC0260CB5352',
        numberPlate: '',
        address: '上海市普陀区金沙江路 1517 弄8',
        dealStatus: '未处理',
        total: '1',
        operate: '查看详情',
      }, {
        beginTime: '2016-05-01 09:32:26',
        alarmName: '不收车过夜行为',
        rentAlarmLevelLabel: '高风险',
        alarmFrom: '超大吨位安全预警',
        name: '852',
        equipmentNo: 'CC0260CB5352',
        numberPlate: '',
        address: '上海市普陀区金沙江路 1519 弄8',
        dealStatus: '未处理',
        total: '1',
        operate: '查看详情',
      }, {
        beginTime: '2016-05-03 09:32:26',
        alarmName: '不收车过夜行为',
        rentAlarmLevelLabel: '高风险',
        alarmFrom: '超大吨位安全预警',
        name: '852',
        equipmentNo: 'CC0260CB5352',
        numberPlate: '',
        address: '上海市普陀区金沙江路 1516 弄8',
        dealStatus: '未处理',
        total: '1',
        operate: '查看详情',
      }]
    }
  }
}
</script>
<style lang="less" scoped>
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

.content {
  .module {
    margin: 10px;

    .search {
      display: flex;
      flex-wrap: wrap;

      .el-date-editor {
        width: 220px;
      }

      &>div {
        width: 25%;
      }
    }
  }
}
</style>