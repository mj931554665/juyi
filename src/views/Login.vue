<template>
  <div id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="密码" clearable show-password>
        </el-input>
        <p>{{ errMsg }}&nbsp;</p>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "LoginFrom",
  data() {
    return {
      loginForm: {
        username: 'shuju',
        password: 'Shuju1234'
      },
      errMsg: '',
      responseResult: []
    }
  },
  methods: {
    async login() {
      let userInfo = await this.$api.getLogin(this.loginForm.username, this.loginForm.password)
      if (userInfo.data.code === 200) {
        localStorage.setItem('Login_userInfo',JSON.stringify(userInfo.data.data))
        // JSON.parse(localStorage.getItem('userInfo'))
        this.$router.replace({ path: '/' })
      } else {
        this.errMsg = userInfo.data.message
      }
    }
  }
}
</script>

<style>
#poster {
  opacity: .8;
  background: url("@/assets/images/Login_bg.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
  padding: 0;
}

.login-container {
  margin: 266px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>

