<template>
  <div>
    <x-header>基本信息</x-header>
    <div class="info">
      <div class="img"><img :src="imgUrl" alt="" style=" height: 80px; width: 80px;"></div>
      <div class="realName">{{name}}</div>
    </div>
    <group>
      <x-input title="身份证号:"  placeholder="待完善" v-model="idCard"></x-input>
      <!--<x-input title="诊所" placeholder="待完善" v-model="clinic"></x-input>-->
      <x-address @on-hide="logHide" @on-show="logShow" title="地址" v-model="address" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址"  :show.sync="showAddress"></x-address>
      <!--<x-input title="邮箱" placeholder="待完善" v-model="email" is-type="email"></x-input>-->
      <cell title="资质证书" :value="certificateStatus" class="cellItem"></cell>
    </group>
    <x-button type="primary" size="large" class="loginBtn"  @click.native="submit">保存</x-button>
    <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
    <toast v-model="showFail" >{{toastTest}}</toast>
  </div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XButton,XTextarea,Group,Search,XInput,XAddress,ChinaAddressV4Data,Cell,Toast} from 'vux'
    export default {
      name: "baseInfo",
      data () {
        return {
          showToast:false,
          toastTest:null,
          showFail:false,
          idCard:'',
          clinic:'',
          address:[],
          addressNew:[],
          email:'',
          addressData: ChinaAddressV4Data,
          showAddress: false,
          userInfo:null,
          imgUrl:null,
          name:null,
          certificateStatus:null,
        }
      },
      components: {
        XHeader,
        XButton,
        XTextarea,
        Cell,
        Group,
        Search,
        XInput,
        XAddress,
        ChinaAddressV4Data,
        Toast
      },
      mounted: function () {
     //   let userInfo2=JSON.parse(localStorage.getItem('userInfo'));
        let id=localStorage.getItem('userId');
        Service.getUserInfo(id).then((res) => {
          if(res.data.message=="SUCCESS"){
            var userInfo=res.data.data;
            this.userInfo = userInfo;
            this.imgUrl = userInfo.imgUrl;
            this.name = userInfo.name;
            this.idCard = userInfo.idCard;
            this.address = userInfo.address?userInfo.address.split(" "):[];
            this.certificateStatus = userInfo.certificate ? '已上传' : '未上传';
            localStorage.setItem('userInfo',res.data.data);
          }else{
            this.showToast=true;
            this.toastTest=res.data.message;
          }
        });
      },
      methods: {
        onChange (val) {
          console.log('val change', val)
        },
        onShow () {
          console.log('on show')
        },
        onHide (type) {
          console.log('on hide', type)
        },
        onShadowChange (ids, names) {
             var that=this;
             that.addressNew=names;
        },
        logHide (str) {
          console.log('on-hide', str)
        },
        logShow (str) {
          console.log('on-show')
        },
        submit(){
          var user=this.userInfo;
           user.name=this.name;
           user.idCard=this.idCard;
           user.address=this.addressNew.join(' ');
           console.log('address',this.address);
           console.log('最新用户信息',user);
          Service.updateUser(JSON.stringify(user)).then((res) => {
            if(res.data.message=="SUCCESS"){
              var userInfo=res.data.data;
              localStorage.setItem('userInfo',userInfo);
              this.showFail=true;
              this.toastTest='更新成功';
            }else{
              this.showToast=true;
              this.toastTest=res.data.message;
            }
            console.log('验证的结果',res)
          });
        },
      },
    }
</script>

<style scoped>
  .cellItem{
    height: 30px;
  }
  .loginBtn{
    width: 90%;
    background-color: #38495c;
    margin-top: 25px;
  }
  .info{
    height: 130px;
    background-color: #38495c;
    text-align: center;
    padding-top: 20px;
  }
  .img{
    height: 80px;
    width: 80px;
    background-color: #fff;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
  }
  .realName{
    margin-top: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    text-align: center;
    color: #fff;
  }
</style>
