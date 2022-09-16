import request from "@/utils/loginRequest";
/* user login*/
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
/*
// 分页
export function accountPage(data) {
  return request({
    url: '/consumer/page',
    method: 'post',
    datatype: 'json',
    data: data
  })
}
/!* 删除*!/
export function acInfoChange(data) {
  return request({
    url: '/consumer/change/message',
    method: 'post',
    datatype: 'json',
    data: data
  })
}
// 添加
export function acInfoInsert(data) {
  return request({
    url: '/consumer/put/message',
    method: 'post',
    datatype: 'json',
    data: data
  })
}
// 修改
export function acInfoUpdate(data) {
  return request({
    url: '/consumer/update/info',
    method: 'post',
    datatype: 'json',
    data: data
  })
}
/!* 获取角色信息*!/
export function roleInfo() {
  return request({
    url: '/role/message',
    method: 'get'
  })
}
*/
/* 刷新访问页面token*/
export function refreshToken(token) {
  return request({
    url: "/refreshToken",
    method: "post",
    token,
  });
}

/*给挤离线重新获取租起数据的token*/
export function ZQToken(token) {
  return request({
    url: "/loginZQToken",
    method: "post",
    token,
  });
}

export function getInfo(token) {
  return request({
    url: "/sys/user/info",
    method: "get",
    token,
  });
}
/* 退出登录*/
export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}

/**
 * 电子围栏的信息保存
 * */
export function fenceInfoSave(data) {
  return request({
    url: "/api/fence/save",
    method: "post",
    data: data,
  });
}

/**
 * 电子围栏信息分页
 * */
export function fencePageInfo(params) {
  return request({
    url: "/api/fence/page",
    method: "get",
    params,
  });
}

/**
 * 电子围栏的信息修改
 * */
export function fenceInfoUpdate(data) {
  return request({
    url: "/api/fence/update",
    method: "post",
    data: data,
  });
}

/**
 * 电子围栏的信息删除
 * */
export function fenceInfoDelete(data) {
  return request({
    url: "/api/fence/delete",
    method: "post",
    // dataType: 'json',
    data: data,
  });
}
