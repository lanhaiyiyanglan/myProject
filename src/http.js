import axios from 'axios'
import store from '@/store/store'
import router from '@/router'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = ''

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('Login')
          
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== '/' &&
            router.replace({
              path: '/',
              query: { redirect: router.currentRoute.path },
            })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  },
)
// 配置API接口地址
/*var root = process.env.API;*/
let http = axios.create({
	/*baseURL: root,*/
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});
function apiAxios(method, url, params,response) {
  http({
    method: method,
    url: url,
    data: method === 'POST'  ? params : null,
    params: method === 'GET'  ? params : null,
     withCredentials: true,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}
 
// 返回在vue模板中的调用接口
export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  }
 
}