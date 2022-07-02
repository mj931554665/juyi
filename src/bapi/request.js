import axios from "./axios";

export default {
  getLogin(username, password) {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password)
    return axios.post('/login', formData)
  },
  getonlineStatus() {
    return axios.get('/equipment/getOnlineEquipmentAmountByRiskLevel')
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
        terminalId:sessionStorage.getItem('terminalId')
      }
    })
  },
}