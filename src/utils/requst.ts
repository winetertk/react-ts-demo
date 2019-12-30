import axios from 'axios'

// 创建axios实例
let baseURL = 'http://172.18.11.232:9200'

const service = axios.create({
  baseURL: baseURL, // api 的 base_url process.env.BASE_API
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (!(config.url.indexOf('api/identity') > -1 || config.url.indexOf('api/iccard_read') > -1 || config.url.indexOf('api/finger_templet') > -1 || config.url.indexOf('api/serverstat') > -1)) {
      config.headers['authorization'] = localStorage.token
    }
    let pattern = new RegExp("auth/authCenter")
    if(!pattern.test(config.url)){
      //除了登录接口，所有接口都会带此content-type
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
     
    const res: any = response.data
    if(!res.success && res.error){
        console.error('请求失败，', res.error.message)
        return Promise.reject('error')
    }else{
      return Promise.resolve(res)
    }
    
  },
  error => {
    alert(error.message)
    return Promise.reject(error)
  }
)


export default service
