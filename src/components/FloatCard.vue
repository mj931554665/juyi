<template>
  <div class="FloatCard-module">
    <div class="FloatCard-item-header">
      <slot name="header">
        <span> 某地区某设备 </span>
      </slot>
    </div>

    <div class="FloatCard-item-detail">
      <div class="detail-line">
        <slot name="content">
          <span>图标--</span>
          <span>设备地址：某省某地区</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:[]
};
</script>

<style scoped>
.FloatCard-module {
  /* width: 300px; */
  border: 1px solid #cfc5c5;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.5);
}

.FloatCard-item-header {
  background-color: #efefef;
  border-bottom: 1px solid #a2a5ae;
  border-radius: 10px 10px 0 0;
  height: 48px;
  padding: 0 15px;
  font-size: 16px;
  color: rgb(0, 0, 0);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.FloatCard-item-detail {
  padding: 15px 15px 20px;
  color: rgb(0, 0, 0);
}
</style>