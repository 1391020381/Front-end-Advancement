<template>
  <div>
      <p>num {{num}}</p>
      <p>double1:{{double1}}</p>
      <input v-model="double2">
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      num: 20
    }
  },
  created () {},
  mounted () {},
  activited () {},
  methods: {

  },
  filter: {},
  computed: {
    double1 () {
      return this.num * 2
    },
    double2: {
      get () {
        return this.num * 2
      },
      set (val) {
        this.num = val / 2
      }
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>
