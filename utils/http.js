const apiUrl = "https://";

const { Toast } = require("./util");

let flag = false;

function getPromise(url, data, method, contentType) {
  console.log(`请求接口: ${url}, 请求参数: ${data}`);

  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + url,
      header: {
        "content-type": contentType || "application/json",
      },
      method: method,
      data: data,
      success: function (res) {
        if (res.data.code !== 0) {
          reject(res.data);
        } else {
          resolve(res.data.data);
        }
      },
      fail: function (err) {
        console.warn(err);
        reject(err);
        Toast("网络异常！");
      },
    });
  }).catch(function (err) {
    console.error("错误接口" + url, err);
    return new Promise((resolve, reject) => {
      reject(err);
    });
  });
}

const http = {
  get: function (url, data, contentType) {
    return getPromise(url, data, "GET", contentType);
  },
  post: function (url, data, contentType) {
    return getPromise(url, data, "POST", contentType);
  },
  put: function (url, data, contentType) {
    return getPromise(url, data, "PUT", contentType);
  },
  delete: function (url, data, contentType) {
    return getPromise(url, data, "DELETE", contentType);
  },
};

module.exports.http = http;
