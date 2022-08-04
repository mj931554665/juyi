<template>
  <div class="deviceList">
    <div class="content">
      <div class="module">
        <div class="header">
          <div class="left">
            <form class="search">
              <input type="text" placeholder="请输入设备名称或者设备编号">
              <button type="submit"></button>
            </form>
            <el-button class="reset" type="primary" plain>重置</el-button>
          </div>
          <div class="right">
            展开
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>

        <div class="detail">
          <div class="operate">
            <el-button plain>列表显示配置</el-button>
            <el-button plain>批量权限申请</el-button>
            <el-button plain>导入</el-button>
            <el-button plain>删除</el-button>
            <el-button plain>新增</el-button>
          </div>
          <el-tabs type="border-card">
            <el-tab-pane label="全部设备">

              <!-- height: calc(100vh - 295px) -->
              <el-table :data="deviceList" style="width: 100%;;" stripe :height="'calc(100vh - 295px)'">
                <el-table-column type="selection" width="55">
                </el-table-column>

                <el-table-column prop="actualReceipts" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="name" label="设备名称" width="120">
                </el-table-column>
                <el-table-column prop="equipmentNo" label="设备编号" width="150">
                </el-table-column>
                <el-table-column prop="typeLabel" label="设备类型">
                </el-table-column>
                <el-table-column prop="modelLabel" label="设备型号">
                </el-table-column>
                <el-table-column prop="carStatusLabel" label="设备状态">
                </el-table-column>
                <el-table-column prop="leaseStatusLabel" label="经营状态">
                </el-table-column>
                <el-table-column prop="address" label="设备位置">
                </el-table-column>
                <el-table-column prop="operate" label="操作">
                </el-table-column>
              </el-table>



            </el-tab-pane>
            <el-pagination background layout="prev, pager, next" @current-change="currentChange" :total="total"
              :page-count="pages" :current-page="pageNum" :page-size="pageSize">
            </el-pagination>
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
      // 总数据条目
      total: 0,
      // 是否有下一页
      hasNextPage: 0,
      // 当前数据页数
      pageNum: 1,
      // 每一页数据长度
      pageSize: 15,
      // 当前数据长度共有多少页数据
      pages: 0,
      // 设备列表
      deviceList: [],
      multipleSelection: []
    }
  },
  methods: {
    currentChange() {
      console.log('this.pageNum', this.currentPage)
    },
    initDeviceList() {
      this.$api.getselectList(1, 15).then(val => {
        let deviceList = val.data.data;
        this.total = deviceList.total;
        this.pages = deviceList.pages;
        this.pageSize = deviceList.pageSize;
        this.pageNum = deviceList.pageNum;
        this.deviceList = deviceList.rows;
        console.log('deviceList', deviceList)
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  },
  created() {
    this.initDeviceList();
  }
}
</script>
<style lang="less">
.deviceList {


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
      background-color: #f5f5f7;
      margin: 20px;

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
}
</style>