<template>
 <div class="myCode-page">
     <x-header>我的二维码</x-header>
     <div class="info">
       <img :src="imgUrl" alt="" style="height: 50px;width: 50px; background-color: #f5f5f5;">
       <div class="infoName">{{name}}</div>
     </div>
     <img :src="qrcodeUrl" alt="" class="code">
   <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
   <toast v-model="showFail" >{{toastTest}}</toast>
 </div>
</template>

<script>
  import Service from '../service/service';
  import { Group, Cell,XHeader,Toast } from 'vux'
    export default {
        name: "myCode",
      data () {
        return {
          imgUrl:null,
          name:null,
          qrcodeUrl:null,
        }
      },
      components: {
        Cell,
        Group,
        XHeader,
        Toast
      },
      mounted: function () {
        // let userInfo=JSON.parse(localStorage.getItem('userInfo'));
        let id=localStorage.getItem('userId');
        Service.getUserInfo(id).then((res) => {
          if(res.data.message=="SUCCESS"){
            var userInfo=res.data.data;
            this.imgUrl = userInfo.imgUrl;
            this.name = userInfo.name;
          }else{
            this.showToast=true;
            this.toastTest=res.data.message;
          }
        });
        Service.getQrcode(id).then((res) => {
          if(res.data.message=="SUCCESS"){
            this.qrcodeUrl=res.data.data;
          }else{
            this.showToast=true;
            this.toastTest=res.data.message;
          }
        });
      },
    }
</script>

<style scoped>
.myCode-page{
  width: 100vw;
}

.info{
  margin-top: 15px;
  height: 80px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 35px;
}
.infoName{
  margin-left: 15px;
  color: #000;
}
.code{
  height: 350px;
  width: 350px;
  margin: 0 auto;
  display: flex;
}
</style>
