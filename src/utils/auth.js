import Cookies from 'js-cookie'

const TokenKey = 'token'
const DataTokenKey= 'SHIRO_SESSION_ID'

/*登录的*/
export function getLoginToken() {
  return Cookies.get(TokenKey)
}

export function setLoginToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeLoginToken() {
  return Cookies.remove(TokenKey)
}
/*数据的*/
export function getDataToken() {
  return Cookies.get(DataTokenKey)
}

export function setDataToken(token) {
  return Cookies.set(DataTokenKey, token)
}

export function removeDataToken() {
  return Cookies.remove(DataTokenKey)
}
