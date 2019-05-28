<template>
<div class="reviewFail-page">
  <x-header>审核结果</x-header>
  <img src="../assets/processFail.jpeg" alt="" class="imgBox">
  <div class="desc">职业资格证不清晰</div>
  <x-button type="primary" class="loginBtn"  @click.native="submit">重新提交</x-button>
</div>
</template>

<script>
  import {XHeader,XInput,Group,XButton,Cell} from 'vux'
    export default {
        name: "reviewFail",
      data(){
        return{
        }
      },
      components: {
        XHeader,
        XInput,
        Group,
        XButton,
        Cell
      },
      methods:{
        submit(){
          this.$router.push('/userEdit');
        }
      }
    }
</script>

<style scoped>
.imgBox{
  height: 80px;
  width: 200px;
  margin: 0 auto;
  margin-top: 50%;
}
.reviewFail-page{
  height: 100vh;
  width: 100vw;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
}
.desc{
  font-size: 16px;
  color: gray;
  width: 100%;
  text-align: center;
  margin-top: 15px;
}
.loginBtn{
  width: 50%;
  margin-top: 100px;
  margin-left: 25%;
  background-color: #38495c;
}
</style>
