<template>
<div class="taskManagement-page">
  <x-header>任务管理</x-header>
  <div class="fixedContent">
    <div class="calendar">
      <div class='data_header'>
        <div class='prevBtn' @click='handlePrev'></div>
        <div class="showData">{{year}}年{{month}}月{{day}}日</div>
        <div class="nextBtn" @click='handleNext'></div>
      </div>
      <div class="week">
        <div class="week-header">
          <div>日</div>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
          <div>五</div>
          <div>六</div>
        </div>

        <div class='week_day'>
          <div v-for='i in 42'>
            <div v-if='i-beginDay<= 0' class='other-day'>{{ prevMonthDays - beginDay + i }}</div>
            <div v-else-if='i-beginDay > currentMonthDays' class='other-day'>{{i-beginDay-currentMonthDays}}</div>
            <div v-else :class="{
                 'now-day':currentDay == `${year}-${month}-${i-beginDay}`,
                 'active-day':`${year}-${month}-${day}` == `${year}-${month}-${i-beginDay}`
              }" :data-set="i-beginDay" @click='chosenDay' style=" position: relative">{{i-beginDay}}
              <div class="dian" v-if="dayList.indexOf(i-beginDay)>-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="countTime">{{currentDayText}}</div>
    <div v-if="taskList.length==0" class="nodata">
      <img src="../assets/nodata.jpeg" alt="" class="nodataImg">
    </div>
    <div class="taskItem" v-for="item in taskList" @click="detail(item)">
      <div class="taskDesc">{{item.title?item.title:'暂无标题'}}</div>
      <div class="taskTime">{{item.begindatetime}}</div>
      <div class="taskRemark" v-if="item.mark"><img src="../assets/remark.jpeg" alt="" class="remarkImg"></div>
    </div>
  </div>
  <img src="../assets/addTask.jpeg" alt="" class="addImg" @click="addTask">
  <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
  <toast v-model="showFail" >{{toastTest}}</toast>
</div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XInput,Group,XButton,Cell,PopupPicker,XAddress,ChinaAddressV4Data,CellBox,Toast} from 'vux'
  export default {
    name: "taskManagement",
    data(){
      return{
        year: null,
        month: null,
        day: null,
        currentDay: null,
        showToast:false,
        toastTest:'',
        showFail:false,
        dayList:[],
        currentDayText:null,
        taskList:[],
      }
    },
    components: {
      XHeader,
      Group,
      XButton,
      Cell,
      XInput,
      PopupPicker,
      XAddress,
      CellBox,
      Toast
    },
    created() {
      this.intiDate()
    },
    methods: {
      intiDate() { // 当天的年月日
        let date = new Date();
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        this.day = date.getDate()
        this.currentDay = `${this.year}-${this.month}-${this.day}`
        this.currentDayText=`${this.month}月${this.day}日`
      },
      chosenDay(e,option) {
        this.day = e.target.dataset.set;
        var currentDay=this.parserDate(this.year+'-'+this.month+'-'+this.day);
        this.getTaskManagement(currentDay);
        console.log('选中的日期',this.year+'-'+this.month+'-'+this.day);
      },
      handlePrev(e) {
        console.log('选中的日期',e);
        if (this.month === 1) {
          this.month = 12
          this.year--;
        } else {
          this.month--
        }
        this.getDays();
        var currentDay=this.parserDate(this.year+'-'+this.month+'-'+this.day);
        this.getTaskManagement(currentDay);
        console.log('选中的日期',this.year+'-'+this.month+'-'+this.day);
      },
      handleNext() {
        if (this.month === 12) {
          this.month = 1
          this.year++
        } else {
          this.month++
        }

        this.getDays();
        var currentDay=this.parserDate(this.year+'-'+this.month+'-'+this.day);
        this.getTaskManagement(currentDay);
        console.log('选中的日期',this.year+'-'+this.month+'-'+this.day);
      },

      //获取医生某天的任务管路列表
      getTaskManagement(getCustomerTask){
        let id=localStorage.getItem('userId');
        Service.getCustomerTask(id,getCustomerTask).then((res) => {
          if(res.data.message=="SUCCESS"){
            var taskList=res.data.data;
            for(var i=0;i<taskList.length;i++){
              var begin=new Date(res.data.data[i].begin);
              var end=new Date(res.data.data[i].end);
              var customizeTime=new Date(res.data.data[i].customizeTime);
              var begindatetime=begin.getHours() + ':' + begin.getMinutes();
              var begindatetime2=begin.getHours() + ':' + begin.getMinutes()+ '-' + begin.getDate() + ' ' + begin.getHours() + ':' + begin.getMinutes() + ':' + begin.getSeconds();;
              var enddatetime=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();
              var customizeTimetime=customizeTime.getFullYear() + '-' + (customizeTime.getMonth() + 1) + '-' + customizeTime.getDate() + ' ' + customizeTime.getHours() + ':' + customizeTime.getMinutes() + ':' + customizeTime.getSeconds();
              taskList[i].begindatetime=begindatetime;
              taskList[i].begin=begindatetime2;
              taskList[i].end=enddatetime;
              taskList[i].customizeTime=customizeTimetime;
            }
            this.taskList=res.data.data;
            console.log('查询接口：',this.taskList);
          }else{
            this.showToast=true;
            this.toastTest=res.data.message;
          }
        });
      },

      //获取某年、某月份下的有任务的天数列表
      getDays(){
        let id=localStorage.getItem('userId');
        var year=this.year;
        var month=this.month;
        Service.getDays(id,year,month).then((res) => {
          if(res.data.message=="SUCCESS"){
            this.dayList=res.data.data;
               console.log('本月的任务列表：',res.data.data);
          }else{
            this.showToast=true;
            this.toastTest=res.data.message;
          }
        });
      },
      //时间转换的方法
      parserDate(date) {
        var t = Date.parse(date);
        if (!isNaN(t)) {
          return new Date(Date.parse(date.replace(/-/g, "/")));
        } else {
          return new Date();
        }
      },

      //新增任务列表
      addTask(){
        this.$router.push('/addTask');
      },

      //查看任务详情
      detail(item){
        this.$router.push({path:'/addTask',query:{info:item}});
      }

    },
    mounted(){
      this.getDays();
      var currentDay=this.parserDate(this.currentDay);
      this.getTaskManagement(currentDay);
    },
    computed: {
      beginDay() { //每个月第一天从星期几开始
        return new Date(this.year, this.month - 1, 1).getDay()
      },
      prevMonthDays() { // 上一个月共有多少天
        return new Date(this.year, this.month - 1, 0).getDate()
      },
      currentMonthDays() { // 当前这个月共有多少天
        return new Date(this.year, this.month, 0).getDate()
      },
    }
  }
</script>

<style scoped>
.taskManagement-page{
 /*padding-top: 300px;*/
}
.addImg{
  height: 40px;
  width: 40px;
  border-radius: 40px;
  position: fixed;
  bottom: 20px;
  right: 10px;
  opacity: 0.6;
}
.fixedContent{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.remarkImg{
  height: 16px;
  width: 12px;
  display: flex;
  margin: 2px 10px;
  margin-right: 0;
  opacity: 0.5;
}
.nodata{
  width:100vw;
  padding-top: 60px;
  height: 230px;
  background-color: #fafafa;
  margin-top: -15px;
}
.nodataImg{
  width: 200px;
  margin:0 auto;
  display: flex;
}
.taskItem{
  display: flex;
  flex-direction: row;
  height: 25px;
  line-height: 25px;
  padding-left: 5vw;
  padding-right: 10px;
  font-size: 13px;
  color: gray;
  border-bottom: 1px solid ghostwhite;
}
.taskDesc{
  width: 60vw;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.taskTime{
  margin-left: 15px;
  flex: 1;
  text-align: right;
}
.taskRemark{
  margin-left: 15px;
}
.countTime{
  height: 30px;
  background-color: #f5f5f5;
  line-height: 30px;
  padding-left: 5vw;
  margin-bottom: 10px;
}

.calendar{
  width: 90vw;
  margin-left: 5vw;
}
.addTask{
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 30px;
  border-radius: 30px;
  background-color: yellow;
  color: #fff;
  font-size: 50px;
  position: fixed;
  bottom: 5px;
  right: 10px;
}
.data_header {
  width: 100%;
  /* height:30px; */
  line-height: 30px;
  display: flex;
}

.prevBtn,
.nextBtn {
  width: 0;
  height: 0;
  border: 10px solid transparent;
}

.prevBtn {
  border-right-color: #38495c;
}

.nextBtn {
  border-left-color: #38495c;
}

.showData {
  flex: 1;
  text-align: center;
  color: #38495c;
}

.week-header {
  display: flex;
  background: #f5f5f5;
}

.week-header div {
  flex: 1;
  text-align: center;
  line-height: 30px;
  color: #000;
  font-weight: 600;
}
.dian{
  position: absolute;
  height: 4px;
  width: 4px;
  border-radius: 4px;
  background-color: cornflowerblue;
  bottom: 0;
  right: 10px;
}
.week_day {
  display: flex;
  flex-wrap: wrap;
}
.week_day>div {
  width: 14.28%;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.other-day {
  color: #ccc;
}

.now-day {
  background-color: #007fff;
  color: #fff;
  font-weight: 600;
  position: relative;
}

.active-day:not(.now-day) {
  color: #007fff;
  border: 2px solid #007fff;
  line-height: 26px;
  position: relative;
}

</style>
