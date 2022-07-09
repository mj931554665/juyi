<template>
  <div class="HistoricalTrack">
    <div class="navbar">

      <el-breadcrumb separator=">">
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备列表</el-breadcrumb-item>
        <el-breadcrumb-item active>轨迹查询</el-breadcrumb-item>
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
      <div class="module1">
        <div class="mainWarp">
          <div class="map"></div>
          <div class="controls">
            <div>轨迹里程：0.05km</div>
            <div class="playControls">
              <i class="el-icon-video-play"></i>
              <i class="el-icon-video-pause"></i>
              <i class="el-icon-d-arrow-left"></i>
              <div class="block">
                <!-- <span class="demonstration">0.01km</span> -->
                <el-slider v-model="valueslider" :step="10">
                </el-slider>
              </div>
              <i class="el-icon-d-arrow-right"></i>
            </div>
            <div>
              暂停中... 速度X1
            </div>
          </div>
        </div>
      </div>
      <div class="module2">
        <div class="mainWarp">
          <el-tabs type="border-card">
            <el-tab-pane label="设备信息">
              <div class="container">
                <div>
                  设备名称：
                  <el-select v-model="value" filterable placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="block">
                  <span class="demonstration">开始时间： </span>
                  <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" align="right"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
                <div class="block">
                  <span class="demonstration">结束时间： </span>
                  <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" align="right"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
                <div class="speed">
                  速度大于 &nbsp;
                  <el-input v-model="input" placeholder="50"></el-input>
                  &nbsp; km/h
                </div>
                <div>
                  速度大于50时突出显示
                  <el-switch v-model="valueswitch" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </div>
                <div>
                  高风险事件显示
                  <el-switch v-model="valueswitch" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </div>
                <div>
                  中风险事件显示
                  <el-switch v-model="valueswitch" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </div>
                <div>
                  低风险事件显示
                  <el-switch v-model="valueswitch" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </div>
                <div>
                  电子围栏显示
                  <el-switch v-model="valueswitch" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                </div>
                <div>
                  <el-button type="primary">查询</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="轨迹信息">

              <!-- <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
              </el-table> -->

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      valueslider: 0,
      valueswitch: true,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value1: '',
      value2: '',
      value3: '',
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄'
      // }, {
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄'
      // }]
    }
  },
  methods: {

  }
}
</script>
<style lang="less">
.HistoricalTrack {
  .content {
    background-color: #dfdfdf;
    display: flex;

    .module1 {
      margin: 10px 10px 0 10px;
      background-color: #fff;
      padding: 10px;
      border-radius: 10px;

      .map {
        width: 985px;
        height: 590px;
        padding-bottom: 30px;
        background: url('@/assets/test/lsgj.png');
        background-size: contain;
      }

      .controls {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .playControls {
          display: flex;
          align-items: center;

          .block {
            margin: 0 10px 0 20px;
            width: 400px;
          }

          i {
            margin: 0 5px;
          }
        }
      }
    }

    .module2 {
      background-color: #fff;
      margin-top: 10px;
      padding: 10px;
      border-radius: 10px;

      .mainWarp {
        width: 100%;
        // height: 534px;
        background-color: blue;

        .el-tabs {
          width: 100%;
          height: 100%;

          .container {
            &>div {
              height: 40px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top:10px;

              .el-button {
                width: 100%;
              }
            }

            .speed {
              font-size: 20px;

              .el-input {
                width: 80px;
              }
            }
          }
        }
      }
    }
  }
}
</style>