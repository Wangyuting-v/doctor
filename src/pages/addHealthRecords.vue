<template>
    <div class="addHealthRecords-page">
      <x-header>{{title}}</x-header>
      <div class="addBox" v-if="detail">
        <img :src="src" alt="" class="addImg">
        <div class="addDesc">此次就诊的病例、处方、检查报告和检验报告等。</div>
      </div>

      <div class="addBox" v-if="!detail">
        <div class="imgItem" v-for='(value, key) in imgs'>
          <div class="close" @click="delImg(key)">-</div>
          <img :src="getObjectURL(value)" style=" height: 50px; width: 50px;"/>
        </div>
        <img src="../assets/add.png" alt="" class="addImg" @click="chooseType" v-if="imgLen==0">
        <div class="addDesc">此次就诊的病例、处方、检查报告和检验报告等。</div>
      </div>
      <group>
        <x-textarea :max="200" placeholder="此次患病的主要症状和体征" v-model="desc" :disabled="disabled" style="background-color:#fff;"></x-textarea>
      </group>
      <input type="file" id="upload_file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg" style="display: none" />
      <x-button type="primary" class="loginBtn"  @click.native="addReport" v-if="!detail">提交</x-button>
      <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
      <toast v-model="showFail" >{{toastTest}}</toast>
    </div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XButton,XTextarea,Group,Toast} from 'vux'
    export default {
      name: "addHealthRecords",
      data(){
        return{
          showToast:false,
          toastTest:null,
          showFail:false,
          customerId:null,
          doctorId:null,
          desc:null,
          formData:new FormData(),
          imgs:{},
          imgLen:0,
          images:[],
          title:null,
          detail:null,
          src:null,
          disabled:true
        }
      },
      components: {
        XHeader,
        XButton,
        XTextarea,
        Group,
        Toast
      },
      mounted(){
        if(this.$route.query){
          this.customerId=this.$route.query.customerId;
          this.doctorId=this.$route.query.doctorId;
          this.detail=this.$route.query.detail;
          console.log('detail',this.detail);
        }
        if(this.detail){
          this.title='病例详情'
          this.desc=this.detail.desc;
          if(this.detail.images.length>0){
            this.src=this.detail.images[0];
          }
          this.disabled=true;
        }else{
          this.title='上传病例';
          this.disabled=false;
        }
      },
      methods:{
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

        //新增病例
        addReport(){
          var desc=this.desc;
          var imgLen=this.imgLen;
          var imgs=this.imgs;
          if(imgLen==0){
            this.showToast=true;
            this.toastTest='请上传病例!'
          }else if(!desc){
            this.showToast=true;
            this.toastTest='请填写备注信息!'
          }else{
            for(let key in imgs){
              //let name=key.split('?')[0];
              this.formData.append('file',this.imgs[key]);
            }
            Service.upDataImg(this.formData,'prescription').then((res) => {
              if(res.data.message=="SUCCESS"){
                console.log('图片上传：',res.data.data);
                this.images.push(res.data.data);
                Service.addReport(this.doctorId,this.customerId,this.desc,this.images).then((res) => {
                  if(res.data.message=="SUCCESS"){
                    this.showFail=true;
                    this.toastTest='操作成功';
                    this.$router.push({path:'/healthRecords',query:{id:this.customerId,}});
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
        }
      }
    }
</script>

<style scoped>
  body,html{
    margin: 0;
    padding: 0;
  }
.addHealthRecords-page{
  width: 100vw;
}

.addBox{
  display: flex;
  flex-direction: row;
  margin-left: 5%;
  margin-bottom: 15px;
  margin-top: 20px;
}
.addImg{
  height: 80px;
  width: 80px;
}
.addDesc{
  padding: 15px;
  font-size: 13px;
  color: gray;
}
.loginBtn{
  width: 90%;
  margin-top: 40px;
  margin-left: 5%;
  background-color: #38495c;
  opacity: 0.8;
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
.textareaBox{
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  width: 50%;
  margin-left: 25%
}

</style>
