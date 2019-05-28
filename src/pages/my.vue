<template>
  <div class="my-page">
    <x-header :left-options="{backText: ''}">我的</x-header>
    <div class="info">
      <img :src="imgUrl" alt="" style="height: 60px;width: 60px;border-radius: 60px; background-color: #fff;">
      <div class="infoName">{{name}}</div>
    </div>
    <group>
      <cell title="我的基本信息" is-link class="cellList" :link="{path:'/baseInfo'}"></cell>
      <cell title="我的二维码" is-link class="cellList" :link="{path:'/myCode'}"></cell>
      <cell title="任务管理" is-link class="cellList" :link="{path:'/taskManagement'}"></cell>
      <cell title="患者管理" is-link class="cellList" :link="{path:'/patientFiles'}"></cell>
    </group>
  </div>
</template>

<script>
  import Service from '../service/service';
  import { Group, Cell,XHeader } from 'vux'
    export default {
      name: "my",
      data () {
        return {
          imgUrl:null,
          name:null,
        }
      },
      mounted: function () {
        // let userInfo=JSON.parse(localStorage.getItem('userInfo'));
        let id=localStorage.getItem('userId');
        Service.getUserInfo(id).then((res) => {
          if(res.data.message=="SUCCESS"){
            var userInfo=res.data.data;
            this.imgUrl = userInfo.imgUrl;
            this.name = userInfo.name;
            localStorage.setItem('userInfo',res.data.data);
          }else{
            this.showToast=true;
            this.toastTest=res.data.message;
          }
        });

      },
      components: {
        Cell,
        Group,
        XHeader
      },


    }
</script>

<style scoped>
  .info{
    height: 90px;
    background-color: #38495c;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
  }
  .infoName{
    margin-left: 15px;
    color: #fff;
  }
  .cellList{
    height: 28px;
    font-size: 18px;
  }
</style>
