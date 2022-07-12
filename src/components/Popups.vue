<template>
  <div class="popups">
    <p class="name">
      <slot name="name"></slot>
      <!-- &nbsp;<i class="el-icon-location-outline"></i>&nbsp;<i class="el-icon-video-camera"></i> -->
    </p>
    <div class="rectangle">
      <div class="panel" @click="routerChange('deviceDetails')">
        <span>设备详情</span>
        <p>查看</p>
        <div class="panel-footer"></div>
      </div>
      <div
        class="panel"
        v-if="hasVideo"
        @click="routerChange('realTimeMonitoring')"
      >
        <span>视频监控</span>
        <p>实时</p>
        <div class="panel-footer"></div>
      </div>
      <div class="panel" @click="routerChange('deviceAlarm')">
        <span>风险事件</span>
        <p>查询</p>
        <div class="panel-footer"></div>
      </div>
      <div class="panel" @click="routerChange('historicalTrack')">
        <span>历史轨迹</span>
        <p>信息</p>
        <div class="panel-footer"></div>
      </div>
    </div>

    <div class="information">
      <p class="equipmentNo">
        <i class="el-icon-c-scale-to-original"></i>&nbsp;<slot
          name="equipmentNo"
        >
        </slot>
        <span class="data">
          <slot name="powerTypeLable"></slot>
          <slot name="carStatusLabel"></slot>
          <slot name="modelLabel"></slot>
        </span>
      </p>
      <p class="locationTime">
        <i class="el-icon-time"></i>&nbsp;<slot name="locationTime"
          >2022-02-22 22:22:22</slot
        >
      </p>
      <p class="address">
        <i class="el-icon-location-information"></i>&nbsp;<slot
          name="address"
        ></slot>
      </p>
    </div>
    <div class="someInfo">
      <!-- <div>
        定位状态：<span><slot name="locationState"></slot></span>
      </div> -->
      <div style="display: flex; width: 100%">项目名称：<span>test</span></div>
      <div>操作人员：<span>test</span></div>
      <div>项目时长：<span>test</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hasVideo", "id"],
  methods: {
    routerChange(path) {
      this.$router.push({
        name: path,
        params: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.popups {
  width: 360px;
  z-index: 999;
  margin: auto;
  background: #fff;
  cursor: context-menu;

  .name {
    text-align: center;
    font-weight: bolder;
    font-size: 20px;
    color: rgb(45, 23, 23);
  }

  .rectangle {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    .panel {
      position: relative;
      width: 70px;
      height: 66px;
      border: 2px solid #abb4b7;
      border-radius: 3px;
      background-color: #fff;
      margin: 6px;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: space-around;
      cursor: pointer;

      &::before {
        content: "";
        position: absolute;
        top: -6px;
        left: -6px;
        width: 5px;
        height: 5px;
        border-left: 2px solid #d0e4e4;
        border-top: 2px solid #d0e4e4;
      }

      &::after {
        content: "";
        position: absolute;
        top: -6px;
        right: -6px;
        width: 5px;
        height: 5px;
        border-right: 2px solid #d0e4e4;
        border-top: 2px solid #d0e4e4;
      }

      .panel-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        &::before {
          content: "";
          position: absolute;
          bottom: -6px;
          left: -6px;
          width: 5px;
          height: 5px;
          border-left: 2px solid #d0e4e4;
          border-bottom: 2px solid #d0e4e4;
        }

        &::after {
          content: "";
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 5px;
          height: 5px;
          border-right: 2px solid #d0e4e4;
          border-bottom: 2px solid #d0e4e4;
        }
      }

      p {
        font-size: 10px;
        color: rgb(108, 93, 93);
      }

      span {
        font-weight: bold;
        padding-top: 10px;
      }
    }
  }

  .information {
    display: flex;
    flex-direction: column;
    // margin-top: 10px;
    margin-left: 10px;
    padding-bottom: 10px;
    border-bottom: 1px gray dotted;
    .equipmentNo {
      position: relative;
      .data {
        position: absolute;
        right: 0px;
        span {
          margin-right: 20px;
        }
      }
    }
    p {
      margin-top: 10px;
      color: #4a5458;
    }
  }

  .someInfo {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 45%;
      padding: 5px 0 5px 10px;
    }
  }
}
</style>