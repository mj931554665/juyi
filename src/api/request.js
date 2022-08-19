import axios from "./axios";

export default {
  // 实时刷新判断用户是否账号在线
  refreshSession(that) {
    axios.get("/refreshSession").then((response) => {
      if (response.data.code === 200) {
        console.log("刷新成功", response.data.data);
      } else if (response.data.code === 401) {
        console.log("失败失败", that);
        that.$notify.error({
          title: response.data.code + " 错误",
          message: response.data.message,
        });
        that.$router.replace({ path: "/login" });
      } else {
        that.$notify({
          title: response.data.code + " 警告",
          message: response.data.message,
          type: "warning",
          duration: 0,
        });
      }
    });
  },
  // 登录接口
  getLogin(username, password) {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return axios.post("/login", formData);
  },
  // 保持登录状态接口
  // 2.12——获取设备在线状态接口
  getonlineStatus() {
    return axios.get("/equipment/getOnlineEquipmentAmountByRiskLevel");
  },
  // 2.14——设备总数
  getEquipmentAmountByType() {
    return axios.get("/equipment/getEquipmentAmountByType");
  },
  // 2.15——定位设备数量
  getEquipmentAmountByLocated() {
    return axios.get("/equipment/getEquipmentAmountByLocated");
  },
  // 2.3-设备列表(有地图定位)
  getqueryEquipmentsByPage(pageNum, pageSize) {
    let formData = new FormData();
    formData.append("pageNum", pageNum);
    formData.append("pageSize", pageSize);
    return axios.post(
      "/equipment/queryEquipmentsByPage",
      pageNum && pageSize ? formData : ""
    );
  },
  // 2.17-设备列表信息（所有设备列表）
  getselectList(pageNum, pageSize) {
    let formData = new FormData();
    formData.append("pageNum", pageNum);
    formData.append("pageSize", pageSize);
    return axios.post(
      "/equipment/selectList",
      pageNum && pageSize ? formData : ""
    );
  },
  // 获取大屏设备列表数据
  getcustomerScreen(pageNum, pageSize) {
    return axios.post("/customerScreen/equipments", {
      pageNum: pageNum,
      pageSize: pageSize,
    });
  },
  // 2.18-设备工况信息
  getDetailWithWorkConditionData(id) {
    return axios.get(`/equipment/detailWithWorkConditionData/${id}`);
  },
  // 2.5-视频通道信息（新天眼）
  getVehicleCode(vehicleCodes) {
    // 如果返回信息为空数组则代码该设备天眼不在线
    let formData = new FormData();
    formData.append("vehicleCodes", vehicleCodes);
    return axios.post("/cranecloud/map/getVideoCarByVehicleCode", formData);
  },
  // 2.6-视频各通道状态（新天眼）
  getVideoChannelState(terminalId) {
    return axios.get("cranecloud/converge/getVideoChannelState", {
      params: {
        terminalId: terminalId,
      },
    });
  },
  // 2.7-实时视频地址获取（新天眼）
  getvideoPlay(vehicleCode, channel, clarity) {
    return axios.get("/cranecloud/videoClient/videoPlay", {
      params: {
        // 整车编号
        vehicleCode: vehicleCode,
        // 终端类型 1上车 2下车
        videoTerType: 1,
        // 通道号
        channel: channel,
        // 视频地址类型0 rtmp 1http-flv
        videoAddrType: 1,
        // 视频清晰度 0高清 1流畅
        streamType: clarity === undefined ? 1 : clarity,
      },
    });
  },
  // 2.8-实时视频播放发送心跳请求（新天眼）
  getflashHeartBeat(heartBeat) {
    let formData = new FormData();
    formData.append("streamingMediaUId", heartBeat);
    return axios.post("/cranecloud/videoClient/flashHeartBeat", formData);
  },
  // 工况数据（简版）
  getDayReport(date, endDate) {
    return axios.post(`/dayReport/?date=${date}&endDate=${endDate}`);
  },
  // 历史轨迹
  getHistorytrack(pageNum, pageSize) {
    return axios.post("/historytrack/queryHistoryTrackDetail", {
      startDate: "2022-06-08 00:00:00",
      endDate: "2022-06-08 23:59:59",
      vehicleCode: "CC0260CB5352",
    });
  },
};
