<template>
  <div :id="uuid" :style="style"></div>
</template>

<script>
import * as echarts from "echarts";

const idGen = () => {
  let id = new Date().getTime() + "" + Math.random() * 10000;
  return id;
};

export default {
  props: {
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },

    options: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      uuid: null,
      myChart: null,
    };
  },

  watch: {
    width(a, b) {
      if (this.myChart) {
        setTimeout(() => {
          this.myChart.resize({
            animation: {
              duration: 300,
            },
          });
        }, 0);
      }
    },

    options() {
      if (this.myChart) {
        this.myChart.setOption(this.options, {
          notMerge: true,
        });
      }
    },
  },

  computed: {
    style() {
      return {
        height: this.height,
        width: this.width,
      };
    },
  },

  created() {
    this.uuid = idGen();
  },

  mounted() {
    // 准备实例
    let echart= echarts.init(document.getElementById(this.uuid));
    this.myChart = echart;
    window.addEventListener("resize", function () {
      echart.resize();
    });

    // 应用配置项
    this.myChart.setOption(this.options);
  },
};
</script>