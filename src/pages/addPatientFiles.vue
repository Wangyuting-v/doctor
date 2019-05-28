<template>
  <div class="addPatientFiles-page">
    <x-header>患者档案</x-header>
    <div class="info">
      <img :src="detail.imgUrl?detail.imgUrl:'../assets/nv.jpeg'" alt="" style="height: 80px;width: 80px;border-radius: 80px; background-color: gray;">
      <div class="infoName">{{detail.name}}</div>
    </div>
    <group>
      <cell title="移动电话" :value="detail.mobile" class="cellItem"></cell>
      <cell title="电子邮箱" :value="info.email" class="cellItem"></cell>
      <cell title="性别" :value="detail.sex" class="cellItem"></cell>
      <cell title="出生年月" :value="info.birth" class="cellItem"></cell>
      <cell title="婚姻" :value="info.marriage?'已婚':'未婚'" class="cellItem"></cell>
      <cell title="地址" :value="detail.address" class="cellItem"></cell>
      <cell title="身高" :value="info.height+'cm'" class="cellItem"></cell>
      <cell title="体重" :value="info.weight+'kg'" class="cellItem"></cell>
      <cell title="BMI" :value="info.bmi" class="cellItem"></cell>
      <cell title="健康档案" value="点击进入" is-link class="cellItem" :link="{path:'/records?id='+this.customerId}"></cell>
      <cell title="报告" value="点击进入" is-link class="cellItem" :link="{path:'/healthRecords?id='+this.customerId}"></cell>
      <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
      <toast v-model="showFail" >{{toastTest}}</toast>
      <!--<x-input title="移动电话" name="mobile" v-model="detail.mobile"  keyboard="number" is-type="china-mobile"></x-input>-->
      <!--<x-input title="电子邮箱" name="email" v-model="email"  is-type="email"></x-input>-->
      <!--<popup-picker title="婚姻状况" :data="marryList" v-model="marry" ></popup-picker>-->
      <!--<popup-picker title="姓别" :data="genderList" v-model="gender"></popup-picker>-->
      <!--<x-input title="年龄" name="age" v-model="age" is-type="number"></x-input>-->
    <!--</group>-->
    <!--<group>-->
      <!--<popup-picker title="医保类型" :data="medicalList" v-model="medical"  placeholder="请选择"></popup-picker>-->
      <!--<x-address @on-hide="logHide" @on-show="logShow" title="家庭地址" v-model="detail.address" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址"  :show.sync="showAddress"></x-address>-->
    <!--</group>-->
    <!--<group>-->
      <!--<cell title="健康档案" value="点击进入" is-link class="cellItem" :link="{path:'/records'}"></cell>-->
      <!--<cell title="报告" value="点击进入" is-link class="cellItem" :link="{path:'/healthRecords'}"></cell>-->
    </group>
  </div>
</template>

<script>
  import Service from '../service/service';
  import {XHeader,XInput,Group,XButton,Cell,PopupPicker,XAddress,ChinaAddressV4Data,CellBox,Toast} from 'vux'
  export default {
      name: "addPatientFiles",
    data(){
      return{
        genderList:[['男','女']],
        gender:['女'],
        marryList:[['已婚','未婚']],
        marry:['未婚'],
        medicalList: [['城乡', '一线城市', '二线城市', '三线城市']],
        medical: ['城乡'],
        addressData: ChinaAddressV4Data,
        showAddress: false,
        value: [],
        mobile:null,
        email:null,
        age:null,
        customerId:null,//患者id
        detail:{},
        info:{},
        showToast:false,
        toastTest:'',
        showFail:false,
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
        console.log(ids, names)
      },
      logHide (str) {
        console.log('on-hide', str)
      },
      logShow (str) {
        console.log('on-show')
      },

      //获取用户的详细信息
      getpatientDetail(id){
        Service.getpatientDetail(id).then((res) => {
          if(res.data.message=="SUCCESS"){
            this.detail=res.data.data;
            if(res.data.data.sex==1){
              this.detail.sex='男'
            }else{
              this.detail.sex='女'
            }

            console.log('病人详情',res.data.data);
          }else{
            this.showToast=true;
            this.toastTest=res.data.message;
          }
        });
        Service.getHealthInfo('5cdc1554afcde901b1688557').then((res) => {
          if(res.data.message=="SUCCESS"){
            var info=res.data.data;
            var birth=new Date(info.birth);
            var birthtime=birth.getFullYear() + '-' + (birth.getMonth() + 1) + '-' + birth.getDate();
            info.birth=birthtime;
            this.info=info;
            console.log('病人健康档案详情',this.info);
          }else{
            this.showToast=true;
            this.toastTest=res.data.message;
          }
        });
      }

    },
    mounted(){
      if(this.$route.query){
        this.customerId=this.$route.query.id;
        console.log('customerId:',this.customerId);
        this.getpatientDetail(this.customerId);
      }
    },
  }
</script>

<style scoped>
  .cellItem{
    height: 20px;
  }
  .addPatientFiles-page{
    padding-bottom: 20px;
  }
.info{
  height: 130px;
  background-color: #38495c;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;

}
.infoName{
  color: #fff;
  margin-top: 15px;
}
.cellItem{
  height: 30px;
}
</style>
