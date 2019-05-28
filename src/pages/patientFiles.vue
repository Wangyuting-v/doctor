<template>
    <div class="patientFiles-page">
      <x-header>患者档案<a slot="right"></a></x-header>
      <!--<search-->
        <!--@result-click="resultClick"-->
        <!--@on-change="getResult"-->
        <!--:results="results"-->
        <!--v-model="value"-->
        <!--position="absolute"-->
        <!--top="46px"-->
        <!--@on-submit="onSubmit"-->
        <!--ref="search"></search>-->

      <div class="contact">
        <div>
          <!--<div class="firstNo">A</div>-->
          <div class="nameList">
            <div class="nameItem" v-for="item in results" @click="chooseMe(item.id,item.name)">{{item.name}}</div>
          </div>
        </div>
      </div>
      <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
      <toast v-model="showFail" >{{toastTest}}</toast>
    </div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XButton,XTextarea,Group,Search,Toast} from 'vux'
  export default {
    name: "patientFiles",
    data(){
      return{
        results: [],
        showToast:false,
        toastTest:'',
        showFail:false,
        value: '',
        type:null,
        info:null,
      }
    },
    components: {
      XHeader,
      XButton,
      XTextarea,
      Group,
      Search,
      Toast
    },
    mounted(){
      if(this.$route.query.type){
        console.log('新增页面进来的：',this.$route.query);
        this.type=this.$route.query.type;
      }
      var id=localStorage.getItem('userId');
      Service.getpatientList(id).then((res) => {
        if(res.data.message=="SUCCESS"){
          this.results=res.data.data;
          console.log('病人列表',res.data.data[0].id);
        }else{
          this.showToast=true;
          this.toastTest=res.data.message;
        }
      });
    },
    methods:{
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },

      getResult (val) {
        console.log('on-change', val);
      },


      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },

      //选中要创建任务的患者
      chooseMe(id,name){
        if(this.type){
          this.$router.push({path:'/addTask',query:{id:id,name:name}});
        }else{
          this.$router.push({path:'/addPatientFiles',query:{id:id}});
        }

      },

      //新增患者
      addPatientFile(){
        this.$router.push({path:'/addPatientFiles'});
      }
    },

  }
</script>

<style scoped>
.patientFiles-page{

}
.contact{
  margin-top: 40px;
}
.firstNo{
  height: 20px;
  background-color: #f5f5f5;
  padding-left: 15px;
  color: #000;
}
.nameList{

  font-size: 16px;
}
.nameItem{
  padding-left: 15px;
  height: 30px;
  line-height: 30px;
  color: #000;
  border-bottom: 1px solid ghostwhite;
}
</style>
