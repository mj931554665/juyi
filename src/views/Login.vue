<template>
  <div id="poster">
    <el-form class="login-container demo-ruleForm" :model="loginForm" ref="loginForm" :rules="loginRules" label-position="left" label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" clearable></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input ref="password" type="text" v-model="loginForm.password" auto-complete="off" placeholder="密码" clearable show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <div style="display: flex">
          <el-input type="text" v-model="loginForm.captcha"  placeholder="验证码" clearable style="width: 53%"/>
          <img :src="captchaPath" @click="getCaptcha" style="cursor: pointer"/>
        </div>
      </el-form-item>


      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
    <p v-if="errMsg">{{ errMsg }}&nbsp;</p>
  </div>
</template>
<script>
  import { validUsername } from '@/utils/validate'
export default {
  name: "LoginFrom",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value==='') {
        callback(new Error('请输入用户名称'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码长度不能少于6位'))
      } else {
        callback()
      }
    }
    const validateCaptcha = (rule, value, callback) => {
      if (value==='') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      captchaPath:'',
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        uuid:''
        // username: 'shuju',
        // password: 'Shuju1234'
        // username: 'moj1',
        // password: '12345678Mj'
        // username: 'juyi010',
        // password: 'xiaoCAI1101'
        // username: 'kaif11',
        // password: '12345678Aa'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }],
      },
      errMsg: '',
      responseResult: [],
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    idGen(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c =>{
        return (c === 'x'? (Math.random()*16|0):('r&0x3' | '0x8')).toString(16)
      })
    },
    getCaptcha(){
      this.loginForm.uuid= this.idGen()
      this.captchaPath="http://192.168.0.103:8081/renren-admin/captcha?uuid="+this.loginForm.uuid
    },
    /*async login() {

      let userInfo = await this.$api.getLogin(this.loginForm.username, this.loginForm.password)
      if (userInfo.data.code === 200) {
        console.info('----------------->',userInfo)
        localStorage.setItem('Login_userInfo',JSON.stringify(userInfo.data.data))
        // JSON.parse(localStorage.getItem('userInfo'))
        this.$router.replace({ path: '/' })
      } else {
        this.errMsg = userInfo.data.message
      }
    },*/
    login() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login',this.loginForm).then(res=>{
            if(res.code === 200){
              this.$router.push({ path: this.redirect || '/' })
            }else{
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }else {
          console.log('error submit!!')
          return false
        }
      })
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

