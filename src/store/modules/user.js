import { login, logout, getInfo, refreshToken,ZQToken } from '@/api/user'
import { getLoginToken, setLoginToken, removeLoginToken,getDataToken, setDataToken, removeDataToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import storage from '@/utils/storage'
import store from "@/store";


const getDefaultState = () => {
  return {
    token: getLoginToken(),
    dataToken: getDataToken(),
    name: '',
    avatar: '',
    parentUrl: [],
    childUrl: [],
    terminalIdList: [],
    deviceList:[],
    cloudDevice:[],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_DATA_TOKEN: (state, dataToken) => {
    state.dataToken = dataToken
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PARENT: (state, parent) => {
    state.parentUrl = parent
  },
  SET_CHILD: (state, child) => {
    state.childUrl = child
  },
  SET_TERMINAL_ID:(state, terminal) =>{
    state.terminalIdList=terminal
  },
  SET_DEVICE:(state, device)=>{
    state.deviceList=device
  },
  SET_CLOUD_DEVICE:(state,cloudDevice) =>{
    state.cloudDevice=cloudDevice
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        if (res.code === 200) {
          const { data } = res
          commit('SET_TOKEN', data.Authorization)
          commit('SET_DATA_TOKEN', data.dataToken)
          setLoginToken(data.Authorization)
          setDataToken(data.dataToken)
          const num = Math.random() * 10
          storage.set('token_expire_time', { nums: num }, (data.expire-180)*1000)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // refresh token
  refreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshToken(state.token).then(res => {
        const { data } = res
        commit('SET_TOKEN', data.Authorization)
        commit('SET_DATA_TOKEN', data.dataToken)
        setLoginToken(data.Authorization)
        setDataToken(data.dataToken)
        storage.set('token_expire_time', Math.random() * 10, (data.expireTime-180)*1000)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 重新获取租起的token
  newZQToken({commit,state}){
    return new Promise( (resolve, reject) =>{
      ZQToken(state.token).then(res=>{
        console.info('------------------新token---->>>>> ',res)
        const { data } = res
        removeDataToken()
        commit('SET_DATA_TOKEN', data.dataToken)
        setDataToken(data.dataToken)
        console.info("---------------88888888888    ",store.getters.dataToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { baseInfo, deviceList, terminalIdList,cloudDeviceList } = data
        commit('SET_NAME', baseInfo.username)
        commit('SET_TERMINAL_ID',terminalIdList)//设备终端号
        commit('SET_DEVICE',deviceList)//设备编号
        commit('SET_CLOUD_DEVICE',cloudDeviceList) //云上使用的设备编号
        // commit('SET_AVATAR', account.imgUrl)
        // commit('SET_PARENT', pUrl)
        // commit('SET_CHILD', cUrl)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeLoginToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
        storage.remove('token_expire_time')
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeLoginToken() // must remove  token  first
      removeDataToken()
      commit('RESET_STATE')
      resolve()
      storage.remove('token_expire_time')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

