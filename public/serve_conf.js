'use strict'

let loc = (window.location + '').split('/')
let baseURL = loc[0] + '//' + loc[2]

const SERVICE_CONFIG = {
    // 服务器请求地址
    // REQUEST_BASEURL: baseURL,
    // REQUEST_BASEURL: '"http://172.18.11.21:9200"',   // 张
    REQUEST_BASEURL: '"http://172.18.11.126:9222"', // 李
    // 申报鉴权地址 联调环境
    // IDAUTHURL: "https://202.127.48.157:443",
    // 申报鉴权地址 开发环境
    IDAUTHURL: "https://172.18.11.3:8443",
    // IDAUTHURL: "https://172.18.11.193:8443",
    USER_ACOUNT: "HT01",
    USER_PASSWORD: "HT01"
}
