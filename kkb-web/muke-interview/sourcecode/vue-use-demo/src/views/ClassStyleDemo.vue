<template>
  <div>
      <p :class="{black:isBlack,yellow:isYellow}">使用class</p>
      <p :calss="[black,yellow]">使用class 数组</p>
      <p :style="styleData">使用style</p>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      isBlack: true,
      isYellow: true,
      black: 'black',
      yellow: 'yellow',
      styleData: {
        fontSzie: '40px',
        color: 'red',
        backgroundColor: '#ccc'
      }
    }
  },
  created () {},
  mounted () {},
  activited () {},
  methods: {

  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>
