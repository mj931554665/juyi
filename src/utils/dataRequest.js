import axios from 'axios'
import watch from '@/utils/watch'
import storage from "@/utils/storage";
import {getLoginToken,getDataToken} from "@/utils/auth";
import {Message} from "element-ui";
import Router from "@/router";



const service = axios.create({
    baseURL: ' /cp_api', // url = base url + request url
    // baseURL: '/ask',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 20000 // request timeout
})


// request interceptor
service.interceptors.request.use(config =>{

    const url = config.url
    // Check whether the token validity period has expired.
    // If yes, the subsequent requests are saved and the request is revisited after the token is renewed
    if (storage.get('token_expire_time') === false && url !== '/login') {
        return new Promise((resolve, reject) => {
            watch.checkStatus(config, getLoginToken(), resolve, reject,'login')
        })
    }else{
        const token = getDataToken()
        const nonce = randomString(12)
        const timestamp = new Date().getTime()
        // const sign = getSign(token, nonce, timestamp, config)
        token && (config.headers.SHIRO_SESSION_ID = token) && (config.headers.timeStamp = timestamp) && (config.headers.nonce = nonce)
        return config
    }
})

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response =>{

        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.type) {
            return response
        }
        if(res.code !==200){
            if(res.code===503){
                Message({
                    message: res.message || 'Error',
                    type: 'warning',
                    duration: 5 * 1000
                })
                return Promise.reject(new Error(res.message || 'Error'))
            }else if(res.code===401){
                return new Promise((resolve, reject) => {
                    watch.checkStatus(response.config, getLoginToken(), resolve, reject,'zq')
                })
            } else{
                Message({
                    message: res.message || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(new Error(res.message || 'Error'))
            }

        }else{
            return res
        }
    }
)

// 随机字符串
function randomString(len) {
    len = len || 32
    const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const maxPos = $chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
}

export default service
