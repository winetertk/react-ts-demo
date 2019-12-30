import request from '../utils/requst.ts'

//通过身份证阅读器读取身份证件号
export function getUserIdno() {
    return new Promise(function(resolve, reject) {
      request({
        url: 'http://127.0.0.1:8091/api/identity?readtimeout=4000',
        method: 'post',
        params: null
      }).then((res) => {
        if(res.Result!==0){
          console.log('ID卡无结果返回')
          reject(res.Result)
        }else if(res.Data&&res.response!==''){
          resolve(res.Data);
        }
      })
    });
  }
  //通过IC卡读器读取ic卡信息
export function getIcCardMsg() {
    return new Promise(function (resolve, reject) {
        request({
            url: 'http://127.0.0.1:8091/api/iccard_read?readtimeout=4000',
            method: 'GET',
            params: null
        }).then((res) => {
            if (res.Result !== 0) {
                reject(res.Result)
                console.log('IC卡读取无结果返回')
            } else if (res.Data && res.response !== '') {
                resolve(res.Data);
            }
        })
    });
}

//读取指纹
export function getFingerMsg() {
    return new Promise(function (resolve, reject) {
        request({
            url: 'http://127.0.0.1:8091/api/finger_templet?readtimeout=4000',
            method: 'get',
            params: null
        }).then((res) => {
            if (res.Result !== 0) {
              console.log('指纹无结果返回')
              reject()
            } else if (res.Data && res.response !== '') {
                resolve(res.Data.Templet);
            }
        })
    });
}
export function getUserLimit(cardNo) {
  return request({
    url: '/BMHSCS-ORDER/tTradingOrder/validateIsCreateOrder',
    method: 'post',
    data: JSON.stringify({borderPeopleIcardNo: cardNo})
  })
}

// 根据IC卡读取用户信息
export function getUserInfoByIc(params) {
  return request({
    url: '/BMHSCS-BACK/tPerson/selectByIcPhNo',
    method: 'post',
    // data: JSON.stringify({icPhNo: icNo})
    params
  })
}

// 获取设备连接状态
export function getDeviceStatus() {
  return new Promise(function (resolve) {
      request({
          url: 'http://127.0.0.1:8091/api/serverstat',
          method: 'get',
          params: null
      }).then((res) => {
          if (res.Result !== 0) {
              alert('请确定驱动是否正常工作')
          } else {
              resolve(res);
          }
      })
  });
}

// 根据IC卡读取用户信息
export function getToken(username, password, systemCode) {
  return request({
    url: '/auth/authCenter/sysLoginForUser',
    method: 'post',
    data: {
      userId: username,
      password: password,
      systemCode: systemCode
    }
  })
}