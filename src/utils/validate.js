/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(http?:|https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor', 'lebooo']
  return false;
}
/**
 * 时间格式转换
 * */
export function dateFormat(originVal, format) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, 0);
  const d = (dt.getDate() + "").padStart(2, 0);
  const hh = (dt.getHours() + "").padStart(2, 0);
  const mm = (dt.getMinutes() + "").padStart(2, 0);
  const ss = (dt.getSeconds() + "").padStart(2, 0);
  if (format === "yyyy-MM-dd") {
    return `${y}-${m}-${d}`;
  } else if (format === "yyyy-MM-dd HH:mm:ss") {
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
}
//获取两日期之间日期列表函数
export function getdiffdate(stime, etime) {
  //初始化日期列表，数组
  var diffdate = new Array();
  var i = 0;
  //开始日期小于等于结束日期,并循环
  while (stime <= etime) {
    diffdate[i] = stime;

    //获取开始日期时间戳
    var stime_ts = new Date(stime).getTime();
    // console.log('当前日期：'+stime   +'当前时间戳：'+stime_ts);

    //增加一天时间戳后的日期
    var next_date = stime_ts + 24 * 60 * 60 * 1000;

    //拼接年月日，这里的月份会返回（0-11），所以要+1
    var next_dates_y = new Date(next_date).getFullYear() + "-";
    var next_dates_m =
      new Date(next_date).getMonth() + 1 < 10
        ? "0" + (new Date(next_date).getMonth() + 1) + "-"
        : new Date(next_date).getMonth() + 1 + "-";
    var next_dates_d =
      new Date(next_date).getDate() < 10
        ? "0" + new Date(next_date).getDate()
        : new Date(next_date).getDate();

    stime = next_dates_y + next_dates_m + next_dates_d;

    //增加数组key
    i++;
  }
  // console.log(diffdate);
  return diffdate;
}
//网页全屏
export function fullScreen(ScreenStatus) {
  if (!ScreenStatus) {
    // 全屏方法
    let el = document.documentElement;
    let rfs =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullScreen;

    //typeof rfs != "undefined" && rfs
    if (rfs) {
      rfs.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
      //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
      let wscript = new ActiveXObject("WScript.Shell");
      if (wscript != null) {
        wscript.SendKeys("{F11}");
      }
    }
    // 修改屏幕状态数据
    return true;
  } else {
    //退出全屏
    let el = document;
    let cfs =
      el.cancelFullScreen ||
      el.webkitCancelFullScreen ||
      el.mozCancelFullScreen ||
      el.exitFullScreen;

    //typeof cfs != "undefined" && cfs
    if (cfs) {
      cfs.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
      //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
      let wscript = new ActiveXObject("WScript.Shell");
      if (wscript != null) {
        wscript.SendKeys("{F11}");
      }
    }
    // 修改屏幕状态数据
    return false;
  }
}
