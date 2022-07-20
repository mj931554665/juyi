<template>
  <div class="FloatCard-module">
    <div class="FloatCard-item-header" :class="more ? 'FloatCard-item-more' : ''">
      <slot name="header">
        <span> 某地区某设备 </span>
      </slot>
      <slot name="more"></slot>
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
  props: {
    more: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // console.log(this.more);
  },
};
</script>

<style lang="less" scoped>
.FloatCard-module {
  /* width: 300px; */
  // outline: 1px solid #409EFF;
  background-color: #fff;
  // border-radius: 10px;
  margin-bottom: 10px;    
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.5);
}

.FloatCard-item-header {
  // background-color: #409EFF;
  // border-radius: 10px 10px 0 0;
  height: 48px;
  padding: 0 15px;
  font-size: 16px;
  color: rgb(0, 0, 0);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
}
.FloatCard-item-more {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  .moreContent{
    cursor: pointer;
    font-weight: normal;
    font-size: 14px;
  }
  .moreContent:hover{
    color: #ff0000;
    text-decoration: underline;
  }
}

.FloatCard-item-detail {
  padding: 15px 15px 20px;
  color: rgb(0, 0, 0);
}
</style>