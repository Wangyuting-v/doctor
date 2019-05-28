<template>
  <div class="loginPage">
    <x-header>{{header}}</x-header>
    <group>
      <cell title="患者姓名" is-link class="cellItem" :value="nameValue" :link="{path:'/patientFiles?type=add'}" v-if="!info"></cell>
      <cell title="患者姓名" class="cellItem" :value="nameValue" v-if="info"></cell>
      <x-input title="任务标题" v-model="taskTitle" placeholder="请输入标题"></x-input>
      <datetime v-model="startaValue" format='YYYY-MM-DD HH:mm' title="开始时间" class="cellItem"></datetime>
      <datetime v-model="endValue" format='YYYY-MM-DD HH:mm' title="结束时间" class="cellItem"></datetime>
      <x-switch title="提醒" v-model="alarm"></x-switch>
      <popup-picker title="重复" :data="repeatTypeList" v-model="repeatType"  placeholder="请选择"></popup-picker>
      <datetime v-model="selfValue" v-if="repeatType=='自定义'" format='YYYY-MM-DD HH:mm' title="自定义时间" class="cellItem"></datetime>
      <popup-picker title="优先级" :data="priorityList" v-model="priority"  placeholder="请选择"></popup-picker>
      <x-textarea :max="200" placeholder="备忘录" v-model="remark"></x-textarea>
    </group>
    <x-button type="primary" class="loginBtn"  @click.native="createTask('add')" v-if="!info">创建</x-button>
    <x-button type="primary" class="loginBtn"  @click.native="createTask('edit')" v-if="info">更新</x-button>
    <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
    <toast v-model="showSuccess" >{{toastTest}}</toast>
  </div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XInput,Group,XButton,Cell,Toast,Datetime,PopupPicker,XTextarea,XSwitch} from 'vux'
    export default {
        name: "addTask",
      data(){
        return{
          nameValue:null,
          showToast:false,
          toastTest:'',
          showSuccess:false,
          startaValue:null,//任务开始时间
          endValue:null,//任务结束时间
          alarm:true,//是否提醒
          repeatTypeList: [['每小时','每半天','每天','每周','每月','每季','自定义']],
          repeatType: ['每天'],
          priorityList:[['一级', '二级','三级']],
          priority:['一级'],//优先级
          remark:null,//备注
          selfValue:null,//自定义时间
          doctorId:null,//医生id
          customerId:null,//病人id
          taskTitle:null,//任务题目
          info:null,//任务详情
          header:null,//标题
          taskId:null,//任务id
        }
      },
      components: {
        XHeader,
        XInput,
        Group,
        XButton,
        Cell,
        Toast,
        Datetime,
        PopupPicker,
        XTextarea,
        XSwitch
      },
      activated(){
        //  设置缓存时写这里
        if(this.$route.query){
          this.customerId=this.$route.query.id;
          this.nameValue=this.$route.query.name;
          this.info=this.$route.query.info;
          var info=this.$route.query.info;
          if(info){
            this.header='任务详情'
            this.taskTitle=info.title;
            this.startaValue=info.begin;
            this.endValue=info.end;
            this.alarm=info.alarm;
            this.remark=info.mark;
            this.selfValue=info.customizeTime;
            if(info.recurrenceType=='CUSTOMIZE'){
              this.repeatType=['自定义']
            }else if(info.recurrenceType=='HOUR'){
              this.repeatType=['每小时']
            }else if(info.recurrenceType=='HALF_DAY'){
              this.repeatType=['每半天']
            }else if(info.recurrenceType=='DAY'){
              this.repeatType=['每天']
            }else if(info.recurrenceType=='WEEK'){
              this.repeatType=['每周']
            }else if(info.recurrenceType=='MONTH'){
              this.repeatType=['每月']
            }else if(info.recurrenceType=='SEASON'){
              this.repeatType=['每季']
            }else if(info.recurrenceType=='YEAR'){
              this.repeatType=['每年']
            }

            if(info.priority=='FIRST'){
              this.priority=['一级'];
            }else if(info.priority=='SECOND'){
              this.priority=['二级'];
            }else if(info.priority=='THIRD'){
              this.priority=['三级'];
            }

          }else{
            this.header='新增任务'
          }
          console.log('任务详情：',this.info)
        }
        this.doctorId=userInfo.id;
      },
      mounted(){
          if(this.$route.query){
            this.customerId=this.$route.query.id;
            this.nameValue=this.$route.query.name;
            this.info=this.$route.query.info;
            var info=this.$route.query.info;
            if(info){
              this.header='任务详情'
              this.customerId=info.customerId;
              this.nameValue=info.customerName;
              this.taskTitle=info.title;
              this.startaValue=info.begin;
              this.endValue=info.end;
              this.alarm=info.alarm;
              this.remark=info.mark;
              this.taskId=info.id;
              this.selfValue=info.customizeTime;
              if(info.recurrenceType=='CUSTOMIZE'){
                this.repeatType=['自定义']
              }else if(info.recurrenceType=='HOUR'){
                this.repeatType=['每小时']
              }else if(info.recurrenceType=='HALF_DAY'){
                this.repeatType=['每半天']
              }else if(info.recurrenceType=='DAY'){
                this.repeatType=['每天']
              }else if(info.recurrenceType=='WEEK'){
                this.repeatType=['每周']
              }else if(info.recurrenceType=='MONTH'){
                this.repeatType=['每月']
              }else if(info.recurrenceType=='SEASON'){
                this.repeatType=['每季']
              }else if(info.recurrenceType=='YEAR'){
                this.repeatType=['每年']
              }
              if(info.priority=='FIRST'){
                this.priority=['一级'];
              }else if(info.priority=='SECOND'){
                this.priority=['二级'];
              }else if(info.priority=='THIRD'){
                this.priority=['三级'];
              }

            }else{
              this.header='新增任务'
            }
            console.log('任务详情：',this.info)
          }

        // let userInfo=JSON.parse(localStorage.getItem('userInfo'));
        var userInfo= {
          "id": "5cdae391afcde97973a02e04",
          "openid": "o9btq1CYJ3WjiNRSOtU4xMKqaOdc",
          "name": "林晓鑫",
          "mobile": "18017977986",
          "password": null,
          "address": "广东 深圳",
          "certificate": null,
          "resume": null,
          "imgUrl": "http://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLBkZtcrJgJjWzMwOhEKuvfrZAYlGk3RFFBYdmd8Gu7NkQicMhZU6wEL1Rs0gTEzmQEsvKz4ibpp2TBg/132",
          "status": 1,
          "sex": 1,
          "qrcodeUrl": "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGW8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyWl9IVkptUlhkR2sxU2c4QjFzMXIAAgQQDtxcAwSAOgkA",
          "qrcodeExpire": 1558530192,
          "ticket": "gQGW8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyWl9IVkptUlhkR2sxU2c4QjFzMXIAAgQQDtxcAwSAOgkA",
          "doctorId": null,
          "initStep": "EUS_INFO_FILL",
          "smsRandom": 644833,
          "smsExpire": 1558168104666,
          "createdDate": null,
          "lastModifiedDate": null,
          "oid": {
            "timestamp": 1557848977,
            "machineIdentifier": 11521513,
            "processIdentifier": 31091,
            "counter": 10497540,
            "time": 1557848977000,
            "date": "2019-05-14T15:49:37.000+0000",
            "timeSecond": 1557848977
          },
          "euserType": "DOCTOR",
          "idCard": null
        };

        this.doctorId=localStorage.getItem('userId');;
      },
      methods:{
        //时间转换的方法
        parserDate(date) {
          var t = Date.parse(date);
          if (!isNaN(t)) {
            return new Date(Date.parse(date.replace(/-/g, "/")));
          } else {
            return new Date();
          }
        },

        //错误提示
        warn(message){
          this.showToast=true;
          this.toastTest=message;
        },

        createTask(type){
          console.log('type:',type)
          var startaValue=this.startaValue;
          var endValue=this.endValue;
          var alarm=this.alarm;
          var selfValue=this.selfValue;
          var remark=this.remark;
          var customerId=this.customerId;
          var title=this.taskTitle;
          var doctorId=this.doctorId;
          if(!customerId){
            this.warn('请选择患者');
          }else if(!title){
            this.warn('请输入任务标题');
          }else if(!startaValue){
            this.warn('请选择开始时间');
          }else if(!endValue){
            this.warn('请选结束时间');
          }else{
            var priority;
            var repeatType;
            if(this.repeatType[0]=='自定义'){
              repeatType='CUSTOMIZE';
            }else if(this.repeatType[0]=='每小时'){
              repeatType='HOUR';
            }else if(this.repeatType[0]=='每半天'){
              repeatType='HALF_DAY';
            }else if(this.repeatType[0]=='每天'){
              repeatType='DAY';
            }else if(this.repeatType[0]=='每周'){
              repeatType='WEEK';
            }else if(this.repeatType[0]=='每月'){
              repeatType='MONTH';
            }else if(this.repeatType[0]=='每季'){
              repeatType='SEASON';
            }else if(this.repeatType[0]=='每年'){
              repeatType='YEAR';
            }
            if(this.priority[0]=='一级'){
              priority='FIRST'
            }else if(this.priority[0]=='二级'){
              priority='SECOND'
            }else if(this.priority[0]=='三级'){
              priority='THIRD'
            }
            var taskInfo={};
            taskInfo.customerId=customerId;
            taskInfo.doctorId=doctorId;
            taskInfo.begin=this.parserDate(startaValue);
            taskInfo.end=this.parserDate(endValue);
            taskInfo.recurrenceType=repeatType;
            taskInfo.customizeTime=this.parserDate(selfValue);
            taskInfo.title=this.taskTitle;
            taskInfo.mark=remark;
            taskInfo.alarm=alarm;
            taskInfo.priority=priority;
            console.log('taskInfo:',taskInfo);
            if(type=='add'){  //新增
              Service.createTask(taskInfo).then((res) => {
                if(res.data.message=="SUCCESS"){
                  this.showSuccess=true;
                  this.toastTest='创建成功!';
                  this.$router.push('/taskManagement');
                }else{
                  this.showToast=true;
                  this.toastTest=res.data.message;
                }
              });
            }else{  //修改
              taskInfo.id=this.taskId;
              Service.editTask(taskInfo).then((res) => {
                if(res.data.message=="SUCCESS"){
                  this.showSuccess=true;
                  this.toastTest='修改成功!';
                  this.$router.push('/taskManagement');
                }else{
                  this.showToast=true;
                  this.toastTest=res.data.message;
                }
              });
            }

          }
        }
      }
    }
</script>

<style scoped>
.cellItem{
  height: 30px;
}
.loginBtn{
  width: 95%;
  margin: 20px auto;
  background-color: #38495c;
  opacity: 0.8;
}
</style>
