<template>
  <iframe :src="src" frameborder="0"></iframe>
</template>

<script>
export default{
  props: ['id'],
  computed:{
    src(){
      return 'https://www.bilibili.com/video/'+this.id
    }
  },
  mouted(){
    console.log(this.props)
  }

}
</script>
