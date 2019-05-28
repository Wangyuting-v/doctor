<template>
  <div class="recordsPage">
    <x-header>健康档案</x-header>
    <group>
      <cell title="家族史" :value="detail.familyIllness" class="cellItem"></cell>
      <cell title="疾病史" :value="detail.illness" class="cellItem"></cell>
      <cell title="过敏史" :value="detail.allergyIllness" class="cellItem"></cell>
      <cell title="用药史" :value="detail.medicalHistory" class="cellItem"></cell>
      <cell title="手术史" :value="detail.allergyHistory" class="cellItem"></cell>
      <!--<cell title="月经史" :value="detail.mobile" class="cellItem"></cell>-->
      <!--<cell title="生育史" :value="detail.mobile" class="cellItem"></cell>-->
      <cell title="吸烟史" :value="detail.smokingHistory" class="cellItem"></cell>
      <cell title="血糖" :value="detail.bloodSugar" class="cellItem"></cell>
      <cell title="血压" :value="detail.bloodPressure" class="cellItem"></cell>
      <cell title="运动" :value="detail.sports" class="cellItem"></cell>
      <cell title="睡眠情况" :value="detail.sleep" class="cellItem"></cell>
    </group>
    <toast v-model="showToast" type="cancel">{{toastTest}}</toast>
    <toast v-model="showFail" >{{toastTest}}</toast>
  </div>
</template>

<script>
    import Service from '../service/service';
    import {XHeader,XButton,Group,Cell,Toast} from 'vux'
    export default {
      name: "records",
      data(){
        return{
          detail:{},
          customerId:null,
          showToast:false,
          toastTest:null,
          showFail:false,
        }
      },
      components: {
        XHeader,
        XButton,
        Group,
        Cell,
        Toast
      },
      mounted(){
        if(this.$route.query){
          this.customerId=this.$route.query.id;
          console.log('customerId:',this.customerId);
          this.getHealthInfo();
        }
      },
      methods:{
        getHealthInfo(){
          var id=localStorage.getItem('userId');
          Service.getHealthInfo(id).then((res) => {
            if(res.data.message=="SUCCESS"){
              this.detail=res.data.data.healthyFile;
              console.log('病人健康档案详情',this.detail);
            }else{
              this.showToast=true;
              this.toastTest=res.data.message;
            }
          });

        }
      }
    }
</script>

<style scoped>
.recordsPage{
  min-height:100vh;
}
  .cellItem{
    height: 25px;
  }
</style>
