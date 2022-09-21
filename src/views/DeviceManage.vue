<template>
  <div>
    <el-container>
      <device-menu />

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import DeviceMenu from "@/components/DeviceMenu";
export default {
  name: "DeviceManage",
  components: {
    DeviceMenu,
  },
};
</script>

<style scoped>
.el-main {
  background-color: #f6f6f6;
}
</style>
