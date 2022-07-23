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
  getEquipmentAmountByType() {
    return axios.get('/equipment/getEquipmentAmountByType')
  },
  // 2.15——定位设备数量
  getEquipmentAmountByLocated() {
    return axios.get('/equipment/getEquipmentAmountByLocated')
  },
  // 2.3-设备列表(有地图定位)
  getqueryEquipmentsByPage(pageNum, pageSize) {
    let formData = new FormData();
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    return axios.post('/equipment/queryEquipmentsByPage', pageNum && pageSize ? formData : '')
  },
  // 2.17-设备列表信息（所有设备列表）
  getselectList(pageNum, pageSize) {
    let formData = new FormData();
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    return axios.post('/equipment/selectList', pageNum && pageSize ? formData : '')
  },
  // 获取大屏设备列表数据
  getcustomerScreen(pageNum, pageSize) {
    let formData = new FormData();
    formData.append('pageNum', pageNum);
    formData.append('pageSize', pageSize);
    return axios.post('/customerScreen/equipments', pageNum && pageSize ? formData : '')
  },
  // 2.16-设备详细信息（获取id
  getselectBaseInfoByPage(equipmentNo, name, plateNo, types) {
    return axios.post('/equipment/selectBaseInfoByPage', {
      'equipmentNo': equipmentNo,
      'name': name,
      'plateNo': plateNo,
      'types': types
    })
  },
  // 2.18-设备工况信息
  getDetailWithWorkConditionData(id) {
    return axios.get(`/equipment/detailWithWorkConditionData/${id}`)
  },
  // 2.5-视频通道信息（新天眼）
  getVehicleCode(vehicleCodes) {
    // 如果返回信息为空数组则代码该设备天眼不在线
    let formData = new FormData();
    formData.append('vehicleCodes', vehicleCodes);
    return axios.post('/cranecloud/map/getVideoCarByVehicleCode', formData)
  },
  // 2.6-视频各通道状态（新天眼）
  getVideoChannelState(terminalId) {
    return axios.get('cranecloud/converge/getVideoChannelState', {
      params: {
        terminalId: terminalId
      }
    })
  },
  // 2.7-实时视频地址获取（新天眼）
  getvideoPlay(vehicleCode) {
    return axios.get('/cranecloud/videoClient/videoPlay', {
      params: {
        // 整车编号
        vehicleCode: vehicleCode,
        // 终端类型 1上车 2下车
        videoTerType: 1,
        // 通道号
        channel: 5,
        // 视频地址类型0 rtmp 1http-flv
        videoAddrType: 1,
        // 视频清晰度 0高清 1流畅
        streamType: 0
      }
    })
  },
  // 2.8-实时视频播放发送心跳请求（新天眼）
  getflashHeartBeat(heartBeat) {
    let formData = new FormData();
    formData.append('streamingMediaUId', heartBeat);
    return axios.post('/cranecloud/videoClient/flashHeartBeat', formData)
  }
}