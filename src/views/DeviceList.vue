<template>
  <div class="deviceList">
    <div class="module">
      <el-breadcrumb separator="/" style="margin: 10px 0 20px 0px">
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form :inline="true" v-if="queryType === 'simple'">
        <el-form-item>
          <el-input
            style="width: 300px"
            prefix-icon="el-icon-search"
            @keyup.enter.native="doRefresh('search')"
            v-model="searchKey"
            placeholder="请输入设备名称或者设备编号"
            size="medium"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button
            type="primary"
            style="background-color: #2c2b30; border: none"
            @click="doRefresh('search')"
            size="medium"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            @click="doReset()"
            size="medium"
            icon="el-icon-refresh"
            class="btnChangeColor"
            >重置</el-button
          >
          <el-button
            type="text"
            style="color: #2c2b30"
            icon="el-icon-arrow-down"
            @click="doSwitchQueryType()"
            >高级查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-form label-width="100px" v-if="queryType === 'advanced'">
        <el-row :gutter="24">
          <el-col :span="5" :offset="1">
            <el-form-item label="设备名称">
              <el-input size="medium" v-model="name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="设备编号">
              <el-input size="medium" v-model="equipmentNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="车牌号">
              <el-input size="medium" v-model="plateNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="设备类型">
              <el-select
                v-model="types"
                multiple
                collapse-tags
                size="medium"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) of deviceTypeList"
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
            <el-form-item label="设备型号">
              <el-select
                v-model="modelLabel"
                multiple
                collapse-tags
                size="medium"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) of deviceModelList"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="租赁状态">
              <el-select
                v-model="leaseStatus"
                collapse-tags
                size="medium"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) of leaseList"
                  :key="index"
                  :label="item"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="设备状态">
              <el-select
                v-model="carStatus"
                multiple
                collapse-tags
                size="medium"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) of deviceStatusList"
                  :key="index"
                  :label="item"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="视频终端">
              <el-select
                v-model="onlineStatus"
                collapse-tags
                size="medium"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) of onLineList"
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
            <el-form-item label="经营状态">
              <el-select
                v-model="customRentType"
                collapse-tags
                size="medium"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) of customRentList"
                  :key="index"
                  :label="item"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="权限类型">
              <el-select
                v-model="permissionType"
                collapse-tags
                size="medium"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) of permissionList"
                  :key="index"
                  :label="item"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="5" >
            <el-form-item label="我的收藏">
              <el-input size="medium" v-model="collect"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="5" :offset="0" align="right" style="float: right">
            <el-button
              type="primary"
              style="background-color: #2c2b30; border: none"
              @click="doRefresh()"
              size="medium"
              icon="el-icon-search"
              >查询</el-button
            >
            <el-button @click="doReset()" size="medium" icon="el-icon-refresh"
              >重置</el-button
            >
            <el-button
              type="text"
              style="color: #2c2b30"
              icon="el-icon-arrow-up"
              @click="doSwitchQueryType()"
              >高级查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>

      <div class="detail">
        <div class="operate">
          <!-- <el-button plain class="btnChangeColor">列表显示配置</el-button>
          <el-button plain class="btnChangeColor">批量权限申请</el-button>
          <el-button plain class="btnChangeColor">导入</el-button>
          <el-button plain class="btnChangeColor">删除</el-button>
          <el-button plain class="btnChangeColor">新增</el-button> -->
        </div>
        <el-tabs type="border-card">
          <el-tab-pane label="全部设备">
            <el-table
              v-loading="loading"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="deviceList"
              style="width: 100%"
              stripe
              :height="tableHeight"
            >
              <!--region 选择框-->
              <!-- <el-table-column type="selection" width="55" align="center" /> -->
              <el-table-column
                type="index"
                width="50"
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
          </el-tab-pane>
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
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      loading: false,
      tableHeight: window.innerHeight - 320,
      searchKey: "", //模糊查询的
      name: "", //设备名称
      equipmentNo: "", //设备编码
      plateNo: "", //车牌号
      types: [], //设备类型
      deviceTypeList: {
        1: "汽车起重机",
        2: "履带式起重机",
        3: "塔式起重机",
        4: "平板车",
      },
      modelLabel: [], //设备型号
      deviceModelList: [],
      leaseStatus: "", //租赁状态
      leaseList: {
        1: "闲置",
        2: "在租",
        3: "完成",
        4: "审核中",
      },
      carStatus: [], //设备状态
      deviceStatusList: {
        1: "行驶在线",
        3: "停车在线",
        5: "离线",
        6: "未知",
        8: "工作中",
      },
      onlineStatus: "0", //视频终端
      onLineList: {
        0: "全部",
        1: "在线",
        2: "离线",
      },
      permissionType: "", //权限类型
      permissionList: {},
      customRentType: "", //经营状态
      customRentList: {
        5: "开工",
        10: "退场",
        15: "闲置",
      },
      collect: "", //我的收藏

      queryType: "simple",
      total: 0, //数据总量
      pageSize: 15, //每页数据数量
      currentPage: 1, //当前页码
      columns: [
        {
          prop: "name",
          columnKey: "name",
          label: "设备名称",
          align: "center",
          minWidth: 80,
        },
        {
          prop: "equipmentNo",
          columnKey: "equipmentNo",
          label: "设备编号",
          align: "center",
          minWidth: 100,
        },
        {
          prop: "typeLabel",
          columnKey: "typeLabel",
          label: "设备类型",
          align: "center",
          minWidth: 100,
        },
        {
          prop: "equipmentBrandLabel",
          columnKey: "equipmentBrandLabel",
          label: "设备品牌",
          align: "center",
          minWidth: 80,
        },
        {
          prop: "modelLabel",
          columnKey: "modelLabel",
          label: "设备型号",
          align: "center",
          minWidth: 80,
        },
        {
          prop: "carStatusLabel",
          columnKey: "carStatusLabel",
          label: "设备状态",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            let carStatus = params.row.carStatus;
            let style = {};
            if (carStatus === 3) {
              style = {
                style: {
                  border: "1px #e5bf3f solid",
                  padding: "1px 3px",
                  color: "#e5bf3f",
                  backgroundColor: "rgba(255, 255, 205, 0.7)",
                  fontSize: "12px",
                },
              };
            } else if (carStatus === 5) {
              style = {
                style: {
                  border: "1px #c3c3c3 solid",
                  padding: "1px 12px",
                  color: "#c3c3c3",
                  backgroundColor: "rgba(239, 239, 239, 0.5)",
                  fontSize: "12px",
                },
              };
            } else if (carStatus === 8) {
              style = {
                style: {
                  border: "1px #00a8f3 solid",
                  padding: "1px 6px",
                  color: "#00a8f3",
                  backgroundColor: "rgba(201, 238, 255, 0.5)",
                  fontSize: "12px",
                },
              };
            }
            return h("span", style, params.row.carStatusLabel);
          },
        },
        {
          prop: "leaseStatusLabel",
          columnKey: "leaseStatusLabel",
          label: "经营状态",
          align: "center",
          minWidth: 80,
        },
        {
          prop: "permissionTypeLabel",
          columnKey: "permissionTypeLabel",
          label: "权限类型",
          align: "center",
          minWidth: 80,
        },
        {
          prop: "address",
          columnKey: "address",
          label: "设备位置",
          align: "center",
          minWidth: 120,
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
                    title: params.row.address,
                  },
                },
                params.row.address
              ),
            ]);
          },
        },
        {
          prop: "controller",
          columnKey: "controller",
          align: "center",
          label: "操作",
          fixed: "right",
          minWidth: 160,
          render: (h, params) => {
            let detail, real, history, alarm;
            let hasVideo = params.row.hasVideo;
            detail = {
              class: "el-icon-tickets",
              style: {
                fontSize: "18px",
                cursor: "pointer",
                color: "red",
              },
              on: {
                click: () => {
                  this.$router.push({
                    name: "deviceDetails",
                    params: {
                      id: params.row.id,
                    },
                  });
                },
              },
              domProps: {
                title: "详情",
              },
            };
            if (hasVideo === 1) {
              let video = params.row.videoStatus;
              real = {
                class: "el-icon-video-camera",
                style: {
                  fontSize: "18px",
                  cursor: video === 1 ? "pointer" : "not-allowed",
                  margin: "0 15px",
                  color: video === 1 ? "red" : "#c3c3c3",
                },
                domProps: {
                  title: "实时监控",
                },
                on: {
                  click: () => {
                    if (video === 1) {
                      this.$router.push({
                        name: "realTimeMonitoring",
                        params: {
                          deviceInfo: params.row,
                        },
                      });
                    }
                  },
                },
              };
              history = {
                class: "el-icon-film",
                style: {
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "red",
                },
                domProps: {
                  title: "历史轨迹",
                },

                on: {
                  click: () => {
                    this.$router.push({
                      name: "historicalTrack",
                      params: {
                        equipmentNo: params.row.equipmentNo,
                      },
                    });
                  },
                },
              };
              alarm = {
                class: "el-icon-aim",
                style: {
                  fontSize: "18px",
                  cursor: "pointer",
                  margin: "0 15px",
                  color: "red",
                },
                domProps: {
                  title: "风险报警",
                },

                //风险报警
                on: {
                  click: () => {
                    this.$router.push({
                      name: "deviceAlarm",
                      params: {
                        deviceInfo: params.row,
                      },
                    });
                  },
                },
              };
              // more = [
              //   h("span", {
              //     class: "el-dropdown-link el-icon-more-outline",
              //     style: {
              //       fontSize: "18px",
              //       cursor: "pointer",
              //       color: "red",
              //       marginLeft: "15px",
              //     },
              //     domProps: {
              //       title: "更多",
              //     },
              //   }),
              //   h(
              //     "el-dropdown-menu",
              //     {
              //       slot: "dropdown",
              //     },
              //     [
              //       h(
              //         "el-dropdown-item",
              //         {
              //           //历史轨迹
              //           on: {
              //             click: () => {
              //               this.$router.push({
              //                 name: "historicalTrack",
              //                 params: {
              //                   equipmentNo: params.row.equipmentNo,
              //                 },
              //               });
              //             },
              //           },
              //         },
              //         "历史轨迹"
              //       ),
              //       h(
              //         "el-dropdown-item",
              //         {
              //           //风险报警
              //           on: {
              //             click: () => {
              //               this.$router.push({
              //                 name: "deviceAlarm",
              //                 params: {
              //                   equipmentId: params.row.id,
              //                 },
              //               });
              //             },
              //           },
              //         },
              //         "风险报警"
              //       ),
              //       // h(
              //       //   "el-dropdown-item",
              //       //   {
              //       //     //收藏
              //       //     on: {
              //       //       click: () => {},
              //       //     },
              //       //   },
              //       //   "收藏"
              //       // ),
              //     ]
              //   ),
              // ];
              return h("div", [
                h("i", detail),
                h("i", real),
                h("i", history),
                h("i", alarm),
              ]);
            } else {
              real = {
                class: "el-icon-film",
                style: {
                  fontSize: "18px",
                  cursor: "pointer",
                  margin: "0 15px",
                  color: "red",
                },
                domProps: {
                  title: "历史轨迹",
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: "historicalTrack",
                      params: {
                        equipmentNo: params.row.equipmentNo,
                      },
                    });
                  },
                },
              };
              history = {
                class: "el-icon-star-off",
                style: {
                  fontSize: "18px",
                  cursor: "pointer",
                  margin: "0 15px",
                  color: "red",
                },
                domProps: {
                  title: "收藏",
                },
              };
              return h("div", [
                h("i", detail),
                h("i", real),
                h("i", history),
                h("i", alarm),
              ]);
            }
          },
        },
      ],

      // 设备列表
      deviceList: [],
      multipleSelection: [],
    };
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
    this.initDeviceList(this.currentPage, this.pageSize);
    this.initSearchData();
  },
  methods: {
    /**
     * 搜索的条件数据
     * */
    initSearchData() {
      this.$api
        .getSelectList(
          this.equipmentNo,
          this.name,
          this.plateNo,
          this.types,
          1,
          9999
        )
        .then((res) => {
          if (res.data.code === 200) {
            this.deviceModelList = [];
            this.permissionList = {};
            let data = res.data.data.rows;
            for (let info of data) {
              //设备型号
              let model = info.modelLabel;
              if (!this.deviceModelList.includes(model)) {
                this.deviceModelList.push(model);
              }
              //权限类型
              let permission = info.permissionType;
              let permissionKey = Object.keys(this.permissionList);
              if (!permissionKey.includes(permission)) {
                Vue.set(
                  this.permissionList,
                  permission,
                  info.permissionTypeLabel
                );
              }
            }
          }
        });
    },
    /**
     * 表格数据
     * */
    initDeviceList(pageNo, pageSize) {
      this.loading = true;
      this.$api
        .getSelectList(
          this.equipmentNo,
          this.name,
          this.plateNo,
          this.types,
          pageNo,
          pageSize
        )
        .then((res) => {
          if (res.data.code === 200) {
            let deviceList = res.data.data;
            this.total = deviceList.total;
            this.pages = deviceList.pages;
            this.pageSize = deviceList.pageSize;
            this.pageNum = deviceList.pageNum;
            this.deviceList = deviceList.rows;
            this.loading = false;
          } else {
            this.$message.error("接口出错，请联系维护人员");
            this.loading = false;
          }
        });
    },
    /**
     * 查询
     * */
    doRefresh(value) {
      if (value) {
        this.equipmentNo = this.searchKey;
        this.name = this.searchKey;
      }
      this.currentPage = 1;
      this.initDeviceList(this.currentPage, this.pageSize);
    },
    /**
     * 重置
     * */
    doReset() {
      this.searchKey = ""; //模糊查询的
      this.name = ""; //设备名称
      this.equipmentNo = ""; //设备编码
      this.plateNo = ""; //车牌号
      this.types = []; //设备类型
      this.modelLabel = []; //设备型号
      this.leaseStatus = ""; //租赁状态
      this.carStatus = []; //设备状态
      this.onlineStatus = "0"; //视频终端
      this.permissionType = ""; //权限类型
      this.customRentType = ""; //经营状态
    },
    /**
     * 高级查询
     * */
    doSwitchQueryType() {
      if (this.queryType === "simple") {
        this.queryType = "advanced";
        this.tableHeight = window.innerHeight - 450;
      } else {
        this.queryType = "simple";
        this.tableHeight = window.innerHeight - 320;
      }
    },
    /**
     * 更换每页的数据量
     * */
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.initDeviceList(this.currentPage, this.pageSize);
    },
    /**
     * 页码切换
     * */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initDeviceList(this.currentPage, this.pageSize);
    },
  },
};
</script>
<style lang="less">
.deviceList {
  .el-breadcrumb {
    font-size: 16px;
  }
  .el-breadcrumb :nth-child(3) {
    color: #2c2b30;
  }
  .el-breadcrumb :nth-child(1) {
    color: #999;
  }
  .el-form-item {
    margin-bottom: 15px !important;
  }

  // 内容区域

  .module {
    margin: 0 10px;

    .el-input__inner:focus {
      border: 1px black solid !important;
    }
    .btnChangeColor:hover {
      border: 1px #818181 solid;
      color: black;
    }
    .header {
      position: relative;
      display: flex;
      justify-content: space-between;
      min-height: 50px;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;

      .left {
        display: flex;
        height: 40px;

        .reset {
          margin-left: 20px;
        }
      }

      .search {
        position: relative;
        width: 300px;

        input,
        button {
          border: none;
          outline: none;
        }

        input {
          width: 100%;
          height: 40px;
          padding-left: 13px;
        }

        button {
          height: 40px;
          width: 42px;
          cursor: pointer;
          position: absolute;
        }

        input {
          border: 2px solid rgb(0, 0, 0);
          border-radius: 5px;
          background: transparent;
          top: 0;
          right: 0;
          box-sizing: border-box;
        }

        button {
          background: rgb(0, 0, 0);
          border-radius: 0 5px 5px 0;
          width: 60px;
          top: 0;
          right: 0;
        }

        button:before {
          content: "查询";
          font-size: 13px;
          color: #fff;
        }
      }
    }

    // 列表区域
    .detail {
      position: relative;

      .el-tabs__item {
        height: 50px;
      }

      .operate {
        position: absolute;
        right: 20px;
        top: 5px;
        z-index: 9;
      }

      .el-tabs {
        .el-tabs__content {
          display: flex;
          // align-items: flex-end;
          flex-direction: column;

          .el-pagination.is-background {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
