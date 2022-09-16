import * as echarts from "echarts";
export default {
  // #region 数据大屏图表配置数据-------------------------------------------------------------------------------------------------------------------------------------------
  // 近7日工况信息表
  Schart1(value) {
    // 声明图表x,Y轴初始变量
    let dataX = [];
    let dataY1 = [];
    let dataY = [];
    // 对数据进行遍历，提取日期数据并转换格式
    if (value === null) {
      dataX = dataY1 = dataY = [0, 0, 0, 0, 0, 0, 0];
    } else {
      value.forEach((item) => {
        // 近七日耗油量
        dataY1.push(item.oilCost);
        // 近七日工作时间
        dataY.push(item.workTime);
        if (item.dataDate.slice(4, 8)[0] == 0) {
          // 截取拼接字符
          dataX.push(
            item.dataDate.slice(5, 6) + "/" + item.dataDate.slice(6, 8)
          );
        } else {
          dataX.push(
            item.dataDate.slice(4, 6) + "月" + item.dataDate.slice(6, 8)
          );
        }
      });
    }
    let option = {
      // backgroundColor: "#0D2753",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        formatter: function (params) {
          return (
            dataX[params[0].dataIndex] +
            "<br/>工作时长：" +
            dataY[params[0].dataIndex] +
            " h" +
            "<br> 油耗：" +
            dataY1[params[0].dataIndex] +
            " L"
          );
        },
      },
      grid: {
        top: "12%",
        bottom: "2%",
        left: "5%",
        right: "5%",
        containLabel: true,
      },
      legend: {
        show: true,
        data: ["油耗(L)", "工作时长(h)"],
        left: "center",
        top: "0",
        textStyle: {
          padding: [4, 0, 0, 0],
          color: "#33FFFF",
        },
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 25,
      },
      xAxis: {
        type: "category",
        data: dataX,
        axisLine: {
          lineStyle: {
            color: "rgba(66, 192, 255, .3)",
          },
        },

        axisLabel: {
          rotate: -45,
          color: "#33FFFF",
        },
      },

      yAxis: [
        {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "#5FBBEB",
          },
          axisLine: {
            lineStyle: {
              fontSize: 12,
              color: "rgba(66, 192, 255, .3)",
            },
          },
        },
        {
          type: "value",
          name: "",
          nameTextStyle: {
            color: "#d2d2d2",
          },
          // max: "100",
          min: "0",
          scale: true,
          position: "right",
          axisLine: {
            lineStyle: {
              color: "rgba(66, 192, 255, .3)",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            formatter: "{value} ", //右侧Y轴文字显示
            fontSize: 12,
            color: "#42C0FF",
          },
        },
      ],
      series: [
        {
          name: "油耗(L)",
          type: "bar",
          barWidth: "12px",
          itemStyle: {
            color: "rgba(36,144,206,.2)",
            borderColor: "#267ea9",
          },
          data: dataY1,
        },
        {
          name: "工作时长(h)",
          type: "line",
          yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: false, //平滑曲线显示

          symbol: "circle", //标记的图形为实心圆
          symbolSize: 8, //标记的大小
          itemStyle: {
            color: "rgb(117, 249, 185)",
            borderColor: "rgba(117, 249, 185,0.8)", //圆点透明 边框
            borderWidth: "1px",
          },
          lineStyle: {
            color: "rgba(117, 249, 185,0.5)",
          },

          data: dataY,
        },
      ],
    };
    return option;
  },
  // 页面四个圆形图表的配置数据
  Schart2(value) {
    /* const obj = {
      name: "Bobo",
      job: " Master",
      number: 1234,
    };
    const renameKeys = (keysMap, obj) => {
      console.log('Object.keys(obj)',Object.keys(obj))
      let asd = Object.keys(obj).reduce((acc, key) => {
        // console.log('12333',{[keysMap[key] || key]: obj[key]});
        // return acc
        // console.log("keysMap", keysMap);
        // console.log("obj", obj);
        console.log("acc", acc);
        console.log("key", key);
      });
      console.log('asd',asd)
    };
    console.log(
      "====================",
      renameKeys(
        {
          name: " firstName",
          number: " id",
        },
        obj
      )
    ); */
    //{ job: 'Master', id: 1234, Las tName: ' Bobo ' }

    let arr = [],
    total = 0;
    value.forEach((item) => {
      total += item.amount;
      let obj = {
        value: item.amount,
        name: item.typeLabel,
      };
      arr.push(obj);
    });
    let option = {
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "设备总数",
        textStyle: {
          fontSize: 10,
          color: "#78898f",
        },
        left: "center",
        top: "58%",
      },
      series: [
        {
          name: "设备类型",
          type: "pie",
          radius: ["70%", "80%"],
          avoidLabelOverlap: false,
          // color: "#75d059",
          label: {
            color: "#05afe0",
            formatter: `${total}`,
            show: true,
            fontSize: "16",
            fontWeight: "bold",
            position: "center",
          },
          data: arr,
        },
      ],
    };
    return option;
  },
  Schart3() {
    let option = {
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "风险总数",
        textStyle: {
          fontSize: 10,
          color: "#78898f",
        },
        left: "center",
        top: "58%",
      },
      series: [
        {
          color: ["#dd0000", "#ff8a00", "#ebce41"],
          name: "风险事件",
          type: "pie",
          radius: ["70%", "80%"],
          label: {
            color: "#05afe0",
            formatter: "{c}",
            show: true,
            fontSize: "16",
            fontWeight: "bold",
            position: "center",
          },
          data: [
            { value: 0, name: "高风险" },
            { value: 0, name: "中风险" },
            { value: 0, name: "低风险" },
          ],
        },
      ],
    };
    return option;
  },
  Schart4() {
    let option = {
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "运输总数",
        textStyle: {
          fontSize: 10,
          color: "#78898f",
        },
        left: "center",
        top: "58%",
      },
      series: [
        {
          name: "履带吊",
          type: "pie",
          radius: ["70%", "80%"],
          avoidLabelOverlap: false,
          color: "#2144c9",
          label: {
            color: "#05afe0",
            formatter: "{c}",
            show: true,
            fontSize: "15",
            fontWeight: "bold",
            position: "center",
          },
          data: [{ value: 7977, name: "年运输公里数" }],
        },
      ],
    };
    return option;
  },
  // #endregion
  // #region 设备详情图表配置数据-------------------------------------------------------------------------------------------------------------------------------------------
  // 近7日工况信息表
  // 模块二工作时长图表
  Dchart1(value) {
    // 声明图表x,Y轴初始变量
    let dataX = [];
    let dataY1 = [];
    let dataY = [];
    // 对数据进行遍历，提取日期数据并转换格式
    value.forEach((item) => {
      // 近七日耗油量
      dataY1.push(item.oilCost);
      // 近七日工作时间
      dataY.push(item.workTime);
      if (item.dataDate.slice(4, 8)[0] == 0) {
        // 截取拼接字符
        dataX.push(item.dataDate.slice(5, 6) + "/" + item.dataDate.slice(6, 8));
      } else {
        dataX.push(
          item.dataDate.slice(4, 6) + "月" + item.dataDate.slice(6, 8)
        );
      }
    });
    let option = {
      // backgroundColor: "#0D2753",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        formatter: function (params) {
          return (
            dataX[params[0].dataIndex] +
            "<br/>工作时长：" +
            dataY[params[0].dataIndex] +
            " h" +
            "<br> 油耗：" +
            dataY1[params[0].dataIndex] +
            " L"
          );
        },
      },
      grid: {
        top: "10%",
        bottom: "0%",
        left: "5%",
        right: "5%",
        containLabel: true,
      },
      legend: {
        show: true,
        data: ["油耗", "工作时长"],
        left: "center",
        top: "0",
        textStyle: {
          padding: [4, 0, 0, 0],
          color: "33FFFF",
        },
        itemWidth: 15,
        itemHeight: 10,
        itemGap: 25,
      },
      xAxis: {
        type: "category",
        data: dataX,
        axisLine: {
          lineStyle: {
            color: "rgba(66, 192, 255, .3)",
          },
        },

        axisLabel: {
          rotate: -45,
          color: "#000",
        },
      },

      yAxis: [
        {
          type: "value",
          splitLine: {
            show: true,
          },
          axisLabel: {
            color: "#000",
          },
          axisLine: {
            lineStyle: {
              fontSize: 12,
              color: "rgba(66, 192, 255, .3)",
            },
          },
        },
        {
          type: "value",
          name: "",
          nameTextStyle: {
            color: "#d2d2d2",
          },
          // max: "100",
          min: "0",
          scale: true,
          position: "right",
          axisLine: {
            lineStyle: {
              color: "rgba(66, 192, 255, .3)",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            formatter: "{value} ", //右侧Y轴文字显示
            fontSize: 12,
            color: "#000",
          },
        },
      ],
      series: [
        {
          name: "油耗",
          type: "bar",
          barWidth: "12px",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#205aff",
              },
              {
                offset: 1,
                color: "#4bdfff",
              },
            ]),
            borderRadius: 6,
          },
          data: dataY1,
        },
        {
          name: "工作时长",
          type: "line",
          yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
          smooth: false, //平滑曲线显示

          symbol: "circle", //标记的图形为实心圆
          symbolSize: 8, //标记的大小
          itemStyle: {
            color: "#ffa43a",
            borderColor: "rgba(255, 234, 0, 0.5)", //圆点透明 边框
            borderWidth: 5,
          },
          lineStyle: {
            color: "#ffa43a",
          },

          data: dataY,
        },
      ],
    };
    return option;
  },
  // 模块三油量图表
  Dchart2(value) {
    // value; 图上角度数据
    let angle = 0; //角度，用来做简单的动画效果的
    let option = {
      // backgroundColor: "#061740",
      title: [
        {
          text: "{a|" + value + "}{c|%}",
          x: "center",
          y: "50%",
          textStyle: {
            rich: {
              a: {
                // fontSize: 45,
                color: "#000",
                fontWeight: "bold",
              },
              c: {
                // fontSize: 45,
                color: "#000",
                fontWeight: "normal",
              },
            },
          },
        },
      ],
      series: [
        //内环
        {
          name: "",
          type: "custom",
          coordinateSystem: "none",
          renderItem: function (params, api) {
            return {
              type: "arc",
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2.3) * 0.65,
                startAngle: ((0 + -angle) * Math.PI) / 180,
                endAngle: ((360 + -angle) * Math.PI) / 180,
              },
              style: {
                stroke: "#0CD3DB",
                fill: "transparent",
                lineWidth: 0.5,
              },
              silent: true,
            };
          },
          data: [0],
        },
        //外环
        {
          name: "",
          type: "pie",
          radius: ["85%", "70%"],
          silent: true,
          clockwise: true,
          startAngle: 90,
          z: 0,
          zlevel: 0,
          label: {
            position: "center",
          },
          data: [
            {
              value: value,
              name: "",
              itemStyle: {
                //外环发光
                borderWidth: 0.5,
                shadowBlur: 20,
                borderColor: "#4bf3f9",
                shadowColor: "#9bfeff",
                color: {
                  // 圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color: "#205aff", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#4bf3f9", // 100% 处的颜色
                    },
                  ],
                },
              },
            },
            {
              value: 100 - value,
              name: "",
              label: {
                show: false,
              },
              itemStyle: {
                color: "#173164",
              },
            },
          ],
        },
      ],
    };
    return option;
  },
  // #endregion
};
