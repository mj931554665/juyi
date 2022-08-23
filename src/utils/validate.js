/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
 export function isExternal(path) {
  return /^(http?:|https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor', 'lebooo']
  return false
}
/**
 * 时间格式转换
 * */
export function dateFormat(originVal,format){
  const dt =new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,0)
  const d = (dt.getDate() + '').padStart(2,0)
  const hh = (dt.getHours() + '').padStart(2,0)
  const mm = (dt.getMinutes() + '').padStart(2,0)
  const ss = (dt.getSeconds() + '').padStart(2,0)
  if(format==='yyyy-MM-dd'){
    return `${y}-${m}-${d}`
  }else if(format==='yyyy-MM-dd HH:mm:ss'){
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }

}