<template>
  <div class="hello">
    <x-header :left-options="{backText: ''}">注册</x-header>
    <group>
      <cell title="title" value="这个"></cell>
    </group>
  </div>
</template>
<script>
  import { Group, Cell,Actionsheet, XSwitch, Toast,TransferDom,XHeader } from 'vux'
  export default {
  name: 'HelloWorld',
  data () {
    return {
      value:true,

    }
  },
  components: {
    Cell,
    Actionsheet,
    Group,
    XSwitch,
    Toast,
    XHeader
  },
    methods: {
      log (str) {
        console.log(str)
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
</style>
