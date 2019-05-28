import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login'
import My from '@/pages/my'
import MyCode from '@/pages/myCode'
import AddPatientFiles from '@/pages/addPatientFiles'
import TaskManagement from '@/pages/taskManagement'
import ReviewFail from '@/pages/reviewFail'
import Review from '@/pages/review'
import AddHealthRecords from '@/pages/addHealthRecords'
import HealthRecords from '@/pages/healthRecords'
import PatientFiles from '@/pages/patientFiles'
import UserEdit from '@/pages/userEdit'
import BaseInfo from '@/pages/baseInfo'
import AddTask from '@/pages/addTask'
import Records from '@/pages/records'

Vue.use(Router);

var userId=localStorage.getItem('userId');
var initStep=localStorage.getItem('initStep');
console.log('获取缓存值：',userId);

function firstPage(initStep){
     console.log('验证跳转页面：',initStep);
    if(initStep=='EUS_PHONE_VERIFY'){
      return resolve => require(['@/pages/login'], resolve);
    }else if(initStep=='EUS_CERTIFCATE'){
      return resolve => require(['@/pages/review'], resolve);
    }else if(initStep=='EUS_ERROR'){
      return resolve => require(['@/pages/reviewFail'], resolve);
    }else if(initStep=='EUS_INFO_FILL'){
      return resolve => require(['@/pages/userEdit'], resolve);
    }else if(initStep=='EUS_DONE'){
      return resolve => require(['@/pages/my'], resolve);
    }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: firstPage(initStep)
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/records',
      name: 'records',
      component: Records
    },
    {
      path: '/healthRecords',
      name: 'healthRecords',
      component: HealthRecords
    },
    {
      path: '/taskManagement',
      name: 'taskManagement',
      component: TaskManagement
    },
    {
      path: '/addTask',
      name: 'addTask',
      component: AddTask
    },
    {
      path: '/userEdit',
      name: 'userEdit',
      component: UserEdit
    },
    {
      path: '/patientFiles',
      name: 'patientFiles',
      component: PatientFiles
    },
    {
      path: '/baseInfo',
      name: 'baseInfo',
      component: BaseInfo
    },
    {
      path: '/healthRecords',
      name: 'healthRecords',
      component: HealthRecords
    },
    {
      path: '/addHealthRecords',
      name: 'addHealthRecords',
      component: AddHealthRecords
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: '/reviewFail',
      name: 'reviewFail',
      component: ReviewFail
    },
    {
      path: '/taskManagement',
      name: 'taskManagement',
      component: TaskManagement
    },
    {
      path: '/addPatientFiles',
      name: 'addPatientFiles',
      component: AddPatientFiles
    },
    {
      path: '/myCode',
      name: 'myCode',
      component: MyCode
    }
  ]
})
