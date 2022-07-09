import axios from "./axios";

export default {
  // 判断数据是否获取成功，成功则存入，不成功则弹出错误，登录失效则返回登录页面
  judgeResponse(response, storageName) {
    if (response.data.code === 200) {
      localStorage.setItem(storageName, JSON.stringify(response.data.data));
    } else if (response.data.code === 401) {
      this.$notify.error({
        title: response.data.code + " 错误",
        message: response.data.message,
      });
      this.$router.replace({ path: "/login" });
    } else {
      this.$notify({
        title: response.data.code + " 警告",
        message: response.data.message,
        type: "warning",
        duration: 0,
      });
    }
  },
  // 登录接口
  getLogin(username, password) {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password)
    return axios.post('/login', formData)
  },
  // 2.12——获取设备在线状态接口
  getonlineStatus() {
    return axios.get('/equipment/getOnlineEquipmentAmountByRiskLevel')
  },
  // 2.14——设备总数
  getEquipmentAmountByType(){
    return axios.get('/equipment/getEquipmentAmountByType')
  },
  // 2.15——定位设备数量
  getEquipmentAmountByLocated(){
    return axios.get('/equipment/getEquipmentAmountByLocated')
  },
  getqueryEquipmentsByPage(pageNum, pageSize) {
    let formData = new FormData();
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    return axios.post('/equipment/queryEquipmentsByPage', pageNum && pageSize ? formData : '')
  },
  getselectBaseInfoByPage(equipmentNo, name, plateNo, types) {
    return axios.post('/equipment/selectBaseInfoByPage', {
      'equipmentNo': equipmentNo,
      'name': name,
      'plateNo': plateNo,
      'types': types
    })
  },
  getVehicleCode(vehicleCodes) {
    // 如果返回信息为空数组则代码该设备天眼不在线
    let formData = new FormData();
    formData.append('vehicleCodes', '20CC03208229');
    return axios.post('/cranecloud/map/getVideoCarByVehicleCode', formData)
  },
  getVideoChannelState() {
    return axios.get('cranecloud/converge/getVideoChannelState', {
      params:{
        terminalId:localStorage.getItem('terminalId')
      }
    })
  },
}