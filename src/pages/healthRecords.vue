<template>
 <div class="healthRecords-page">
   <x-header>用户病例</x-header>
   <div v-if="reportList.length==0" class="nodata">
     <img src="../assets/nodata.jpeg" alt="" class="nodataImg">
   </div>
   <div class="healthList">
     <div class="healthItem" v-for="item in reportList" @click="goDetail(item)">
       <div class="healthImg"><img :src="item.firstImg" alt="" class="img"></div>
       <div class="healthContent">
         <div>{{item.desc}}</div>
         <div class="time">上传时间 {{item.createdAt}}</div>
       </div>
     </div>
   </div>
   <div class="bottonBtn">
     <x-button type="primary" size="large" class="loginBtn"  @click.native="addReport">去上传病例</x-button>
   </div>
   <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
   <toast v-model="showFail" >{{toastTest}}</toast>
 </div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XButton,Group,Toast} from 'vux'
    export default {
        name: "healthRecords",
      data(){
        return{
          srcId:null,//医生id
          dstId:null,//病人id
          showToast:false,
          toastTest:null,
          showFail:false,
          reportList:[],//报告列表
        }
      },
      components: {
        XHeader,
        XButton,
        Group,
        Toast
      },
      mounted(){
        // let userInfo=JSON.parse(localStorage.getItem('userInfo'));
        this.srcId=localStorage.getItem('userId');
        if(this.$route.query){
          this.dstId=this.$route.query.id;
          console.log('病人用例customerId:',this.dstId);
        }

        this.getReport();
      },
      methods:{
        //获取病例列表
        getReport(){
          Service.getReport(this.srcId,this.dstId).then((res) => {
            if(res.data.message=="SUCCESS"){
              var reportList=res.data.data;
              for(var i=0;i<reportList.length;i++){
                var createdAt=new Date(reportList[i].createdAt);
                var createdAttime=createdAt.getFullYear() + '-' + (createdAt.getMonth() + 1) + '-' + createdAt.getDate() + ' ' + createdAt.getHours() + ':' + createdAt.getMinutes() + ':' + createdAt.getSeconds();
                reportList[i].createdAt=createdAttime;
                if(res.data.data[i].images){
                  reportList[i].firstImg=res.data.data[i].images[0];
                }else{
                  reportList[i].firstImg='../assets/store.png';
                }
              }
              this.reportList=reportList;
              console.log('用户病例99：',reportList);
            }else{
              this.showToast=true;
              this.toastTest=res.data.message;
            }
          });
        },

        //上传病例报告
        addReport(){
          this.$router.push({path:'/addHealthRecords',query:{customerId:this.dstId,doctorId:this.srcId}});
        },

        //查看病例报告
        goDetail(detail){
          this.$router.push({path:'/addHealthRecords',query:{customerId:this.dstId,doctorId:this.srcId,detail:detail}});
        }

      },

    }
</script>

<style scoped>

  .healthRecords-page{
    padding-bottom: 50px;
    background-color: #fafafa;
  }
  .healthList{
    padding: 15px;

  }
  .healthItem{
    display: flex;
    flex-direction: row;
    border: 1px solid #f5f5f5;
    padding: 5px;
    margin-top: 10px;
  }
  .healthImg{
    height: 80px;
    width: 80px;
  }
  .img{
    height: 80px;
    width: 80px;
  }
  .healthContent{
    font-size: 14px;
    margin-left: 10px;
    padding-top: 10px;
  }
  .time{
    margin-top: 5px;
    font-size: 12px;
    color:gray;
  }
  .bottonBtn{
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fafafa;
    width: 100vw;
    padding: 15px 0;
  }

  .loginBtn{
    width: 90%;
    background-color: #38495c;
  }
  .heathDesc{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .nodata{
    width:100vw;
    padding-top: 30vh;
    height: 50vh;
    background-color: #fafafa;
    margin-top: -15px;
  }
  .nodataImg{
    width: 200px;
    margin:0 auto;
    display: flex;
  }
</style>
