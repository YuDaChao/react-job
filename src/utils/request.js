import axios from 'axios'
import { stringify } from 'qs'
import {
  Toast
} from 'antd-mobile'

/**
 * 请求封装
 * @param method 请求方法
 * @param url 请求url
 * @param params 请求参数
 * @param success 请求成功回调函数
 * @param failure 请求失败回调函数
 */
function request(method = "GET", url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? stringify(params) : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      withCredentials: true,
      headers: {
        'Content-Type': "application/x-www-form-urlencoded;charset=utf-8" //当post的时候请求头需要序列化
      }
    })
      .then(function (res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          Toast.fail(res.data.msg);
          reject(res.data);
        }
      })
      .catch(function (err) {
        let res = err.response;
        if (err) {
          window.alert('api error, HTTP CODE: ' + res.status)
        }
      })
  })
}

const get = function (url, params) {
    return request('GET', url, params)
};

const post = function (url, params) {
  return request('POST', url, params)
};

export {
  get,
  post
}
