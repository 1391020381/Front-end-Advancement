<template>
  <div>
      Foo

      <p>{{this.$store.state.name}}</p>
      <button @click="clickMe">点击</button>
  </div>
</template>

<script>
export default {
  asyncData({store}){
    console.log('asyncData server')
    return store.dispatch('changeName')
  },
  name:"Foo",
  components: {},
  props: {},
  data() {
    return {

    };
  },
  created() {},
  mounted() {
    this.$store.dispatch('changeName')
  },
  activited() {},
  methods: {
      clickMe(){
         console.log('clickMe')
      }
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" scoped>

</style>
