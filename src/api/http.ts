import axios from 'axios'
import { message } from 'antd';
const loadingInstance = {
  close: () => { console.log()}
}
// 创建axios实例
const service = axios.create({
  // baseURL: "https://www.bpscap.com/website", // api的base_url
  baseURL: "/api",
  // timeout: 10000, // 请求超时时间
  //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded"
  // },
  // withCredentials: true, // 允许携带cookie
})
// function cloneLoading() {
//   loadingInstance.close()
// }

// request 请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // cloneLoading()
  // Do something with request error
  Promise.reject(error)
})

// respone 响应拦截器
service.interceptors.response.use(
  response => {
    // cloneLoading()
    if (response.data && response.data.code === 0) {
      message.error('出错', 1.5)
    } else if (response.data && response.data.code === 200 && response.data.message) {
      message.success('成功', 1.5)
    }
    return response.data
  }, error => {
    // cloneLoading()
    return Promise.reject(error)
  })

export default service

