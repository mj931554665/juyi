// 监听token有效期
import store from '../store'
// 默认纸条
let isRefreshing = true
// 观察者
let subscribers = []
const watch = {

  checkStatus(config, token, resolve, reject,where) {
    // 刷新token的函数,这需要添加一个开关，防止重复请求
    if (isRefreshing) {
      if(where==='login'){ //获取登录账号的token
        store.dispatch('user/refreshToken').then(() => {
          // 并且将所有存储到观察者数组中的请求重新执行。
          this.onAccessTokenFetched(store.getters.token)
          // 纸条撕掉
          isRefreshing = true
        }).catch(() => {
          // this.loading = false
        })
      }else if(where==='zq'){  //重新获取租起的访问数据的token
        store.dispatch('user/newZQToken').then(() => {
          // 并且将所有存储到观察者数组中的请求重新执行。
          this.onAccessTokenFetched(store.getters.token)
          // 纸条撕掉
          isRefreshing = true
        }).catch(() => {
          // this.loading = false
        })
      }
    }
    isRefreshing = false
    // 将当前的请求保存在观察者数组中
    subscribers.push((token) => {
      config.headers['Authorization'] = token
      resolve(config)
    })
  },
  // 刷新请求（subscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）
  onAccessTokenFetched(token) {
    subscribers.forEach((callback) => {
      callback(token)
    })
    subscribers = []
  }
}
export default watch
