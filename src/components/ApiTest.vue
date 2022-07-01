<template>
  <div class="hello">
    <button id="btnGet" @click="login()">登录</button>
    <br />
    <br />
    <button id="btnOffLine" @click="offLine()">查询设备在线信息</button>
    <br />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  methods: {
    login() {
      console.log(123);
        let formData = new FormData();
        formData.append('username', 'shuju');
        formData.append('password', 'Shuju1234')
        axios
        .post('/api/login', formData)
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              console.log(200);
              console.log(successResponse.data.data);
              // this.$router.replace({ path: '/index' })
            }
          })
          .catch(failResponse => {
          })
      },
      offLine() {
        console.log(456);
      axios
      .get('/api/equipment/getOnlineEquipmentAmountByRiskLevel')
        .then(successResponse => {
          console.log('sss');
          if (successResponse.data.code === 200) {
            console.log(200);
            console.log(successResponse.data.data);
            // this.$router.replace({ path: '/index' })
          }else{
            console.log(successResponse.data.message);
          }
        })
        .catch(failResponse => {
          console.log('fff');
          console.log(failResponse);
        })
    },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
