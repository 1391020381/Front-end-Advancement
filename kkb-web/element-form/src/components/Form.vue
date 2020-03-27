<template>
  <div>
  <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  provide () {
    return {
      kForm: this
    }
  },
  components: {},
  props: {
    model: {
      type: Object,
      require: true
    },
    rules: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  created () {},
  mounted () {},
  activited () {},
  update () {},
  beforeRouteUpdate () {},
  methods: {

  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>
