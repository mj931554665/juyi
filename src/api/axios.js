import axios from "axios";

const test = axios.create({
  baseURL:' /cp_api',
  withCredentials: true,  // 允许请求携带 cookie
})

export default test