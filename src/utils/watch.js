// 监听token有效期
import store from '../store'
import axios from 'axios'
// 默认纸条
let isRefreshing = true
let zqIsRefreshing = true
// 观察者
let subscribers = []
let zqSubscribers = []
const watch = {

  checkStatus(config, token, resolve, reject,where) {
    // 刷新token的函数,这需要添加一个开关，防止重复请求
    if(isRefreshing && where === 'login'){
      store.dispatch('user/refreshToken').then(() => {
        // 并且将所有存储到观察者数组中的请求重新执行。
        this.onAccessTokenFetched(store.getters.token)
        // 纸条撕掉
        isRefreshing = true
      }).catch(() => {
        // this.loading = false
      })
    }
    if(zqIsRefreshing && where === 'zq'){
      console.info('-------------刷新token ')
      store.dispatch('user/newZQToken').then(() => {
        // 并且将所有存储到观察者数组中的请求重新执行。
        console.info('------------------新token22222---->>>>> ',store.getters.dataToken)
        this.zqOnAccessTokenFetched(store.getters.dataToken)
        // 纸条撕掉
        zqIsRefreshing = true
      }).catch(() => {
        // this.loading = false
      })
    }
    if( where === 'login') {
      isRefreshing = false
      subscribers.push((token) => {
        config.headers['Authorization'] = token
        resolve(config)
      })
    }else if(where === 'zq') {
      zqIsRefreshing = false
      zqSubscribers.push((token) => {
        // config.headers['SHIRO_SESSION_ID'] = token
        // config.headers['Cookie']='SHIRO_SESSION_ID='+token
        resolve(axios(config))
      })
    }
  },
  // 刷新请求（subscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）
  onAccessTokenFetched(token) {
    subscribers.forEach((callback) => {
      callback(token)
    })
    subscribers = []
  },
  zqOnAccessTokenFetched(token) {
    zqSubscribers.forEach((callback) => {
      callback(token)
    })
    zqSubscribers = []
  }
}
export default watch
