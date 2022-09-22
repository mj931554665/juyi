import request from "@/utils/dataRequest";
import qs from 'qs';
import en from "element-ui/src/locale/lang/en";

/**
 * 2.12——获取设备在线状态接口
 * */
export function onLineStatus() {
    return request({
        url: '/equipment/getOnlineEquipmentAmountByRiskLevel',
        method: 'get'
    })
}
/**
 * 2.14——设备总数
 * */
export function equipmentAmountByType() {
    return request({
        url: '/equipment/getEquipmentAmountByType',
        method: 'get'
    })
}
/**
 * 2.15——定位设备数量
 * */
export function equipmentAmountByLocated() {
    return request({
        url: '/equipment/getEquipmentAmountByLocated',
        method: 'get'
    })
}
/**
 * 2.3-设备列表(有地图定位) 新
 * */
export function queryEquipmentsByPage(data) {
    return request({
        url: '/equipment/queryEquipmentsByPage',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/**
 * 获取大屏设备列表数据
 * */
export function customerScreen(data) {
    return request({
        url: '/customerScreen/equipments',
        method: 'post',
        dataType: 'json',
        data: data,
    })
}

/**
 * 2.16-设备详细信息（分页获取/条件查询，也可获取全部）
 * 参数  equipmentNo: equipmentNo,
 name: name,
 plateNo: plateNo,
 types: types,
 pageNum: pageNum,
 pageSize: pageSize,
 * */
export function selectBaseInfoByPage(data) {
    return request({
        url: '/equipment/selectBaseInfoByPage',
        method: 'post',
        dataType: 'json',
        data: data,
    })
}
/**
 * 2.17-设备列表信息（所有设备列表）
 * */
export function selectList(data) {
    return request({
        url: '/equipment/selectList',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}
/**
 * 2.18-设备工况信息
 * */
export function detailWithWorkConditionData(data) {
    return request({
        url: '/equipment/detailWithWorkConditionData/'+ data,
        method: 'get'
    })
}

/**
 * 2.20 历史轨迹
 * */
export function historyTrackDetail(params) {
    return request({
        url: '/historytrack/queryHistoryTrackDetail',
        method: 'post',
        dataType: 'json',
        data: params
    })
}

/**
 * 2.21 设备风险列表
 * */
export function equipmentAlarmList(params) {
    return request({
        url: '/equipment/alarmList',
        method: 'post',
        dataType: 'json',
        data: params
    })
}
/**
 * 风险类型
 * */
export function alarmType(params){
    return request({
        url: '/alarmType/selectAlarmFrom',
        method: 'post',
        dataType: 'json',
        data: params
    })
}
/**
 * 风险的事件名称列表
 * */
export function alarmEventListInfo(params){
    return request({
        url: '/alarmType/selectWarnTypeByAlarmFrom',
        method: 'post',
        dataType: 'json',
        data: params
    })
}
/**
 * 设备风险列表导出
 * */
export function downAlarmListInfo(params){
    return request({
        url: '/alarmCustomerEvent/exportAlarms',
        method: 'post',
        dataType: 'json',
        responseType: 'blob',
        data: params
    })
}

export function deviceOilFoundInfo(start,end) {
    // 如果返回信息为空数组则代码该设备天眼不在线
    return request({
        url: '/dayReport/?date='+start+'&endDate='+end,
        method: 'post',
    })
}

/**
 * 2.5-视频通道信息（新天眼）
 * */
export function vehicleCode(data) {
    return request({
        url: '/cranecloud/map/getVideoCarByVehicleCode',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/**
 * 2.6-视频各通道状态（新天眼）
 * */
export function videoChannelState(params) {
    return request({
        url: '/cranecloud/converge/getVideoChannelState',
        method: 'get',
        params
    })
}

/**
 * 2.7-实时视频地址获取（新天眼）
 * */
export function videoPlay(params) {
    return request({
        url: '/cranecloud/videoClient/videoPlay',
        method: 'get',
        params
    })
}

/**
 * 2.8-实时视频播放发送心跳请求（新天眼）
 * */
export function flashHeartBeat(data) {
    return request({
        url: '/cranecloud/videoClient/flashHeartBeat',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/**
 * 2.29.根据设备编号获取设备基础信息
 * */
export function equipmentBusinessNameByNo(data) {
    return request({
        url: '/equipmentDepository/selectEquipmentBusinessNameByEquipmentNos',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/**
 * 2.30.根据设备编号获取工况统计信息
 * */
export function workStatInfo(data) {
    return request({
        url: '/cranecloud/oil/statsByVehicleCode',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}
/**
 * 2.31.根据设备编号获取工况明细信息
 * */
export function workDetailInfoByEquipmentNo(data) {
    return request({
        url: '/cranecloud/oil/listByVehicleCode',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/**
 * 行驶数据下载
 * */
export function drivingDataDownload(data) {
    return request({
        url: '/drivingData/download/list',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}
/**
 * 设备详情页最新设备风险信息获取
 * */
export function newAlarm(id,time){
    return request({
        url: '/equipment/getEquipmentRiskAmountByRiskLevel/'+id+'?t='+time,
        method: 'get',

    })
}
