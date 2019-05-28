<template>
    <div class="review-page">
      <x-header>审核结果</x-header>
      <img src="../assets/process.jpeg" alt="" class="imgBox">
    </div>
</template>

<script>
  import {XHeader} from 'vux'
    export default {
        name: "review",
      data(){
        return{
        }
      },
      components: {
        XHeader,
      },
    }
</script>

<style scoped>
  .imgBox{
    height: 160px;
    width: 160px;
    margin: auto;
  }
  .review-page{
    height: 100vh;
    width: 100vw;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
  }
</style>
