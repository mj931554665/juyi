<template>
  <div class="module">
    <div class="item-header">
      <slot name="header">
        <span> 某地区某设备 </span>
      </slot>
    </div>

    <div class="item-detail">
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

<style>
.module {
  width: 300px;
  border: 1px solid #cfc5c5;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}

.item-header {
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

.item-detail {
  padding: 15px 15px 20px;
  color: rgb(0, 0, 0);
}
</style>