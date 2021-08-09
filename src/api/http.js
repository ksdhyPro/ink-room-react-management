import axios from 'axios'
import { message } from 'antd';
export const ConfigBaseURL = process.env.NODE_ENV == "development" ? "http://localhost:8080" : "https://www.ksdhy.xyz"
let hide = null;
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // refresh_token:'refresh_token',
    // access_token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmZDc0MzQ0Ny1hNzE5LTQ4YjQtYTQyMS00YTIyYzg1NjA4ZTIiLCJpYXQiOjE2Mjg0NzgwMzcsImV4cCI6MTYyODQ3OTgzNywidXNlcklkIjoxMDAyfQ.wbTU2ctCgbMRuMVquO_ivwR3o65qIRoJnv2uv6-bc9s'
  },
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
  console.log(config);
   hide=message.loading("内容载入中...")
  return config
},error=>{
    hide()
    message.error("加载失败，请检查网络！")
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  // console.log(response)
    hide()
  return {data:response.data,code:response.code}
}, error => {
  // console.log(error)
    hide()
    message.error("加载失败，请检查网络！")
    return Promise.reject(error)
})


export function get(url,params = {}){
    return new Promise((resolve, reject) => {
        Service.get(url, {
            params: params,
          }).then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
}


export function post(url,data = {}){
    return new Promise((resolve, reject) => {
        Service.post(url, data).then((response) => {
            resolve(response.data);
           },(err) => {
           reject(err);
         }
       );
   });
}

