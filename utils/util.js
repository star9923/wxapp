const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
* 对象编程formData格式数据
* @param {*} obj
*/
const formdata = (obj = {}) => {
 let result = "";
 for (let name of Object.keys(obj)) {
	 let value = obj[name];
	 result +=
		 "\r\n------WebKitFormBoundarylsFtrJlDjccKG0SX" +
		 '\r\nContent-Disposition: form-data; name="' +
		 name +
		 '"' +
		 "\r\n" +
		 "\r\n" +
		 value;
 }
 return result + "\r\n------WebKitFormBoundarylsFtrJlDjccKG0SX--";
};

/**
 * 生成uuid
 */
const uuid = function () {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};

/**
 * toast提示
 */
const Toast = (msg, duration) => {
  wx.showToast({
    title: msg || "网络异常，请重新进入",
    icon: "none",
    duration: duration || 1500,
  });
};

/**
 * 微信震动
 * @param {*} flag 
 */
const vibrateShort = (flag) => {
	if (!flag) return;
  wx.vibrateShort({
    type: "heavy",
    success: (res) => {
      console.log(res);
    },
    fail: (err) => {
      console.error(err, "震动失败");
    },
  });
};

module.exports = {
  formatTime,
  formdata,
  uuid,
  Toast,
	vibrateShort,
};