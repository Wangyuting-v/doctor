<template>
  <div class="loginPage">
    <x-header>登录</x-header>
    <group>
      <x-input title="手机号:"  placeholder="请输入手机号" v-model="phone"></x-input>
      <x-input title="验证码:" placeholder="请输入验证码" class="weui-vcode" v-model="validationCode">
        <x-button slot="right" type="primary" mini @click.native="sendVerifyCode()" v-if="codeMessage">发送验证码</x-button>
        <x-button slot="right" type="primary" mini disabled v-if="!codeMessage">{{second}}s重获</x-button>
      </x-input>
    </group>
    <x-button type="primary" class="loginBtn" @click.native="nextStep()">进入</x-button>
    <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
    <toast v-model="showFail" >{{toastTest}}</toast>

  </div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XInput,Group,XButton,Cell,Toast} from 'vux'
    export default {
      name: "Login",
      data(){
        return{
          phone:'',
          validationCode:'',
          codeMessage:true,
          second:60,
          showToast:false,
          toastTest:'',
          showFail:false,
        }
      },
      components: {
        XHeader,
        XInput,
        Group,
        XButton,
        Cell,
        Toast
      },
      methods: {
        sendVerifyCode () {
          let phone=this.phone;
          console.log('点击获取验证码按钮：',phone);
          var zephone=/^(0|86|17951)?(12[0-9]|13[0-9]|15[012356789]|16[012356789]|17[123456789]|19[123456789]|18[0-9]|14[57])[0-9]{8}$/;
          if(phone==''||!phone){
            this.showToast=true;
            this.toastTest='手机号不能为空!'
          }else if(zephone.test(phone)==false){
            this.showToast=true;
            this.toastTest='手机号码格式不正确!'
          }else{
            this.countNum();//60s倒计时
            var userId=localStorage.getItem('userId');
            Service.GetCode(userId,phone).then((res) => {
              if(res.data.message=="SUCCESS"){
                this.showFail=true;
                this.toastTest='验证码发送成功!';
              }else{
                this.showToast=true;
                this.toastTest='验证码发送失败!'
              }
            });
          }
        },

        nextStep () {
          let validationCode=this.validationCode;
          let phone=this.phone;
          if(!phone){
            this.showToast=true;
            this.toastTest='请输入手机号码!'
          }else if(!validationCode){
            this.showToast=true;
            this.toastTest='请输入验证码!'
          }else{
            var userId=localStorage.getItem('userId');
            Service.checkUser(userId,phone,this.validationCode).then((res) => {
              if(res.data.message=="SUCCESS"){
                this.showFail=true;
                this.toastTest='登录成功!';
                // var userInfo=JSON.string(res.data.data);
                // console.log('用户信息：',userInfo);
                // localStorage.setItem('userInfo',userInfo);
                this.$router.push('/userEdit');
              }else{
                this.showToast=true;
                this.toastTest=res.data.message;
              }
            });
          }

        },
        //60s倒计时
        countNum: function () {
          var that = this;
          if (that.second == 0) {
            that.second=60,
              that.codeMessage=true
            return
          }
          setTimeout(function () {
            that.second=that.second-1,
              that.codeMessage=false,
              that.countNum()
          }, 1000)
        },
      }
    }
</script>

<style scoped>
  .loginPage{
    background-color: #fafafa;
    width: 100vw;
    /*padding-top: 30px;*/
  }
  .title{
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #000;
  }
  .getcode{
    height:30px;
    width:80px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background-color: #38495c;
    border-radius: 5px;
    font-size: 12px;
  }
  .getcode2{
    opacity:0.8;
  }
  .loginBtn{
    /*background-color: #f8cc47;*/
    color: #fff;
    width: 90%;
    margin: 50px auto;
  }

</style>
