<template>
  <div class="NavBar">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="item in breadCrumbList" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="operate">
      <FuncBtn :isScreen="true">
        <i slot="content" class="el-icon-full-screen"></i>
      </FuncBtn>
      <FuncBtn>
        <div slot="content" style="display: flex">
          <i class="el-icon-s-custom"></i>
          <span slot="content">{{ userInfo.user.userName }}</span>
        </div>
      </FuncBtn>
    </div>
  </div>
</template>

<script>
import FuncBtn from "@/components/FuncBtn.vue";
export default {
  components: {
    FuncBtn,
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("Login_userInfo")),
    };
  },
  props: {
    breadCrumbList: {
      type: Array,
    },
  },
  mounted() {
  },
};
</script>


<style lang="less" scoped>
.NavBar {
  padding: 0 10px;
  min-height: 56px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ededed;

  .el-breadcrumb {
    font-weight: 600 !important;
    color: #999;
    font-size: 20px;
    margin-left: 8px;
  }
  .operate {
    display: flex;
    width: 185px;
    justify-content: space-between;
  }
}
</style>