import request from "@/utils/loginRequest";
import qs from "qs";

/**
 * 2.12——获取设备在线状态接口
 * */
export function onLineStatus() {
    return request({
        url: '/api/equipment/getOnlineEquipmentAmountByRiskLevel',
        method: 'get'
    })
}
/**
 * 2.14——设备总数
 * */
export function equipmentAmountByType() {
    return request({
        url: '/api/equipment/getEquipmentAmountByType',
        method: 'get'
    })
}
/**
 * 2.15——定位设备数量
 * */
export function equipmentAmountByLocated() {
    return request({
        url: '/api/equipment/getEquipmentAmountByLocated',
        method: 'get'
    })
}
/**
 * 2.3-设备列表(有地图定位) 新
 * */
export function queryEquipmentsByPage(data) {
    return request({
        url: '/api/equipment/queryEquipmentsByPage',
        method: 'post',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}
/**
 * 2.17-设备列表信息（所有设备列表）
 * */
export function selectList(data) {
    return request({
        url: '/api/equipment/selectList',
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
export function customerScreen() {
    return request({
        url: '/api/equipment/customerScreen',
        method: 'get',
        dataType: 'json',
    })
}

/**
 * 获取重机云上的设备编号
 * */
export function craneCloudEquipmentNo() {
    return request({
        url: '/api/equipment/craneCloudEquipmentNo',
        method: 'get',
        dataType: 'json',
    })
}
/**
 * 2.21 设备风险列表
 * */
export function equipmentAlarmList(params) {
    return request({
        url: '/api/equipment/alarm/alarmList',
        method: 'post',
        dataType: 'json',
        data: params,
    })
}
/**
 * 设备风险列表导出
 * */
export function downAlarmListInfo(params){
    return request({
        url: '/api/equipment/alarm/exportAlarms',
        method: 'post',
        dataType: 'json',
        responseType: 'blob',
        data:params,
    })
}
