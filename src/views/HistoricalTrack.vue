<template>
  <div class="HistoricalTrack">
    <el-container>
      <el-main>
        <el-amap
          class="amap-box"
          :vid="'amap-vue'"
          ref="GdMap"
          style="height: 100%"
        ></el-amap>
      </el-main>
      <el-aside width="650px">
        <el-tabs
          v-model="activeName"
          :stretch="true"
          type="card"
          @tab-click="handleClick"
        >
          <el-tab-pane name="first">
            <span class="title" slot="label"> 设备信息</span>

            设备信息</el-tab-pane
          >
          <el-tab-pane name="second">
            <span class="title" slot="label"> 轨迹信息</span>
            <div style="height: calc(100vh - 170px);">
              <TrackTable></TrackTable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
    <!-- <div class="deviceInfo">
      <el-row type="flex" align="middle">
        <el-col :span="12">设备名称:</el-col>
        <el-col :span="12"
          ><el-select
            v-model="deviceActive"
            placeholder="请选择"
            filterable
            size="small"
            clearable
            @change="selectChange(deviceActive)"
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.name + ` | ` + item.equipmentNo"
              :value="item.id"
            >
            </el-option> </el-select
        ></el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">开始时间:</el-col>
        <el-col :span="12">
          <el-date-picker
            v-model="start"
            type="datetime"
            :editable="false"
            :clearable="false"
            align="right"
            size="small"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">结束时间:</el-col>
        <el-col :span="12">
          <el-date-picker
            v-model="end"
            type="datetime"
            :editable="false"
            :clearable="false"
            align="right"
            size="small"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="12">速度大于</el-col>
        <el-col :span="3"><el-input v-model="speedInput"></el-input></el-col>
        <el-col :span="1"></el-col>
        <el-col :span="3">km/h</el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">速度大于50时突出显示</el-col>
        <el-col :span="1">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#DBDEE5"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">高风险事件显示</el-col>
        <el-col :span="1">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#DBDEE5"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">中风险事件显示</el-col>
        <el-col :span="1">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#DBDEE5"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">低风险事件显示</el-col>
        <el-col :span="1">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#DBDEE5"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row type="flex" justify="space-between">
        <el-col :span="12">电子围栏显示</el-col>
        <el-col :span="1">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#DBDEE5"
          >
          </el-switch
        ></el-col>
      </el-row>

      <el-row>
        <el-col><el-button type="primary" round>主要按钮</el-button></el-col>
      </el-row>
    </div> -->
  </div>
</template>
<script>
import TrackTable from "@/components/TrackTable.vue";
import { dateFormat } from "@/utils/validate";
export default {
  components: {
    TrackTable,
  },
  data() {
    return {
      activeName: "second",
      // 设备列表及选中设备
      deviceList: [],
      deviceActive: null,
      // 开始时间及结束时间
      start: "2022-08-26 00:00:00",
      end: "2022-08-26 23:59:59",
      speedInput: 50,
      value: true,
    };
  },
  created() {
    this.initDeviceInfo();
  },
  methods: {
    initDeviceInfo() {
      // 获取设备列表
      this.$api.getSelectList("", "", "", "", 1, 9999).then((res) => {
        console.log("res.data", res.data);
        this.deviceList = res.data.data.rows;
      });
    },
    selectChange() {
      console.log("selectChange");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="less">
.HistoricalTrack {
  box-sizing: border-box;
  margin: 15px;
  height: calc(100vh - 100px);
  .el-container {
    box-sizing: border-box;
    height: 100%;
    .el-main {
      background: #fff;
      box-sizing: border-box;
      width: calc(100% - 270px);
      padding: 14px !important;
      .amp-box {
        margin: 14px;
      }
    }
    .el-aside {
      background: #fff;
      margin-left: 15px;
      min-width: 270px;
      .el-tabs__nav.is-top.is-stretch {
        border-left: none !important;
        border-top: none !important;
        .el-tabs__item {
          background: hsla(0, 0%, 85%, 0.14);
          color: #999;
          .title {
            font-size: 18px;
            font-weight: 700;
            padding-right: 10px;
          }
          .title::before {
            content: "";
            display: inline-block;
            width: 6px;
            height: 12px;
            margin-right: 10px;
            background: #bfbfbf;
            border-radius: 1px;
          }
        }
        .is-active {
          background: #fff;
          color: #333232;
          .title::before {
            background: #f2ce91;
          }
        }
      }
      .el-tabs__content {
        padding: 0 15px;
      }
    }
  }
}
</style>
