<template>
  <div>
      <input v-model="name">
     <input v-model="info.city">
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      name: 'justdoit',
      info: {
        city: '深圳'
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
  watch: {
    name (oldVal, val) {
      console.log('watch name', oldVal, val)
    },
    info: {
      handler (oldVal, val) {
        console.log('watch info', oldVal, val)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
