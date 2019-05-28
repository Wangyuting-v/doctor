'use strict';
import fetch from '../utils/fetch';

export default {
  //获取手机号码
  GetCode(id,phone){
    return fetch({
      url: '/get_sms_code',
      method: 'POST',
      data: {
        "id": id,
        "phone": phone
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },


  // 用户登陆
  checkUser(id,phone,code){
    return fetch({
      url: '/check_sms_code',
      method: 'POST',
      data: {
        "id": id,
        "phone": phone,
        "code":code,
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //获取用户信息
  getUserInfo(id){
    return fetch({
      url: '/user/'+id,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //获取医生的二维码
  getQrcode(id){
    return fetch({
      url: '/qrcode',
      method: 'POST',
      data:{
        id:id
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },


  //图片上传接口
  upDataImg(file,type){
    return fetch({
      url: '/upload?type='+type,
      method: 'POST',
      data:file,
      headers: {
        'Content-Type': 'multipart/form-data',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  // 更新用户信息
  updateUser(user){
    return fetch({
      url: '/user/update',
      method: 'POST',
      data: user,
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //获取医生某一天的任务列表
  getCustomerTask(id,date){
    return fetch({
      url: '/doctor/customer_task/list',
      method: 'POST',
      data:{
        id:id,
        date:date,
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //医生创建任务
  createTask(data){
    return fetch({
      url: '/doctor/customer_task',
      method: 'POST',
      data:data,
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //医生获取患者列表
  getpatientList(id){
    return fetch({
      url: '/doctor/customer_list',
      method: 'POST',
      data:{
        id:id
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //获取患者详细信息
  getpatientDetail(id){
    return fetch({
      url: '/user/'+id,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //获取当月的含有任务的天数
  getDays(id,year,month){
    return fetch({
      url: '/doctor/customer_task/month',
      method: 'POST',
      data:{
        id:id,
        year:year,
        month:month,
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },


  //医生更新任务内容
  editTask(data){
    return fetch({
      url: '/doctor/customer_task',
      method: 'PUT',
      data:data,
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //获取用户的健康档案
  getHealthInfo(id){
    return fetch({
      url: '/customer/userinfo/get',
      method: 'POST',
      data:{
        id:id,
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //医生获取患者的健康用例报告
  getReport(srcId,dstId){
    return fetch({
      url: '/prescription/doctor/customer',
      method: 'POST',
      data:{
        srcId:srcId,//医生id
        dstId:dstId,//病人id
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //医生新增患者的健康用例报告
  addReport(doctorId,customerId,desc,images){
    return fetch({
      url: '/prescription/add',
      method: 'POST',
      data:{
        doctorId:doctorId,//医生id
        customerId:customerId,//病人id
        desc:desc,//描述
        images:images
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  },

  //医生获取患者的健康用例报告详情
  reportDetail(){
    return fetch({
      url: '/prescription/add',
      method: 'POST',
      data:{
        doctorId:doctorId,//医生id
        customerId:customerId,//病人id
        desc:desc,//描述
        images:images
      },
      headers: {
        'Content-Type': 'application/json',
        "Accept": "*/*",
        "X-Accept-Locale": "zh_CN"
      }
    })
  }



};
