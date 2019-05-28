<template>
<div class="userEdit-page">
  <x-header>医师认证</x-header>
  <div class="info">
    <div class="img"><img :src="userInfo.imgUrl" alt="" style=" height: 80px; width: 80px;"></div>
    <input type="text" v-model="realName" placeholder="请填入您的真实姓名" class="realName">
  </div>
  <x-input title="身份证号:" name="age" placeholder="请输入身份证号" v-model="idCard"></x-input>
  <div class="count">
    职业资格证:
  </div>
  <div  class="imgBox">
    <div class="imgItem" v-for='(value, key) in imgs'>
      <div class="close" @click="delImg(key)">-</div>
      <img :src="getObjectURL(value)" style=" height: 50px; width: 50px;"/>
    </div>
    <div class="addImg"  @click="chooseType" v-if="imgLen==0">
      <img src="../assets/addPic.jpeg" style=" height: 50px; width: 50px;opacity: 0.8" alt="">
    </div>
  </div>
  <input type="file" id="upload_file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg" style="display: none" />

  <x-button type="primary" size="large" class="loginBtn"  @click.native="submit">提交</x-button>
  <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
  <toast v-model="showFail" >{{toastTest}}</toast>
</div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XButton,XTextarea,Group,Search,XInput,Toast} from 'vux'
    export default {
      name: "userEdit",
      components: {
        XHeader,
        XButton,
        XTextarea,
        Group,
        Search,
        XInput,
        Toast
      },
      data(){
        return{
          realName:null,
          idCard:null,
          img:null,
          maxStatus: true,
          max:3,
          age:'',
          userInfo:{},
          showToast:false,
          toastTest:null,
          showFail:false,
          formData:new FormData(),
          imgs: {},
          imgLen:0,
        }
      },
      mounted(){
      // let userInfo=JSON.parse(localStorage.getItem('userInfo'));
        this.getUserInfo();
      },
      methods:{
        //获取用户信息
        getUserInfo(){
          let id=localStorage.getItem('userId');
          Service.getUserInfo(id).then((res) => {
            if(res.data.message=="SUCCESS"){
              this.userInfo=res.data.data;
              localStorage.setItem('userInfo',res.data.data);
              console.log('this.userInfo-----',this.userInfo)
            }else{
              this.showToast=true;
              this.toastTest=res.data.message;
            }
          });
        },
        chooseType(){
          document.getElementById("upload_file").click();
        },
        delImg(key){
          this.$delete(this.imgs,key);
          this.imgLen--;
        },

        addImg(event){
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.fil = inputDOM.files;
            let oldLen=this.imgLen;
            let len=this.fil.length+oldLen;
            if(len>4){
              alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
              return false;
            }
            for (let i=0; i < this.fil.length; i++) {
              let size = Math.floor(this.fil[i].size / 1024);
              if (size > 5*1024*1024) {
                alert('请选择5M以内的图片！');
                return false
              }
              this.imgLen++;
              this.$set(this.imgs,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
            }
          },
        getObjectURL(file) {
          var url = null ;
          if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
          } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
          } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
          }
          return url ;
        },

        submit(){
          var realName=this.realName;
          var idCard=this.idCard;
          var imgLen=this.imgLen;
          var imgs=this.imgs;
          var id=this.userInfo.id;
          var openid=this.userInfo.openid;
          if(realName==''||!realName){
            this.showToast=true;
            this.toastTest='姓名不能为空!'
          }else if(idCard==''||!idCard){
            this.showToast=true;
            this.toastTest='请填写份证号!'
          }else if(imgLen==0){
            this.showToast=true;
            this.toastTest='请上传资格证!'
          }else{
            for(let key in imgs){
              //let name=key.split('?')[0];
              this.formData.append('file',this.imgs[key]);
            }
            Service.upDataImg(this.formData,'certificate').then((res) => {
              if(res.data.message=="SUCCESS"){
                var user={};
                user.euserType="DOCTOR";
                user.idCard=idCard;
                user.name=realName;
                user.openid=openid;
                user.certificate=res.data.data;
                user.id=id;
                Service.updateUser(user).then((res) => {
                  if(res.data.message=="SUCCESS"){
                    var userInfo=res.data.data;
                    localStorage.setItem('userInfo',userInfo);
                    this.$router.push('/review');
                  }else{
                    this.showToast=true;
                    this.toastTest=res.data.message;
                  }
                });
              }else{
                this.showToast=true;
                this.toastTest='图片上传失败!'
              }
            });
          }
        },
      },


    }
</script>

<style scoped>
.userEdit-page{

}
.info{
  height: 140px;
  background-color: #38495c;
  text-align: center;
  padding-top: 20px;
}
.imgItem{
  position: relative;
  margin: 15px 10px;
}
.close{
  position: absolute;
  right: -3px;
  top: -3px;
  height: 10px;
  line-height: 10px;
  font-size: 18px;
  width: 10px;
  color: #fff;
  background-color: cadetblue;
  border-radius: 10px;
  text-align: center;
}
.img{
  height: 80px;
  width: 80px;
  background-color: #fff;
  border-radius: 50%;
  margin: 0 auto;
  overflow: hidden;
}
.imgBox{
  display: flex;
  flex-direction: row;
}
.realName{
  margin-top: 10px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 2px;
  outline: none;
}
.count{
  padding-left: 16px;
  font-size: 16px;
}
.addImg{
  margin: 15px;
}
.loginBtn{
  width: 95%;
  margin: 20px auto;
  background-color: #38495c;
  opacity: 0.8;
}

</style>
