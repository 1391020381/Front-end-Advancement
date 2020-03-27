<template>
  <div>
   <input :type="type" :value="value" @input="onInput">
  </div>
</template>

<script>
// 一个组件上的 v-model默认会利用名为value 的prop和名为input的事件，但是像单选框 复选框等类型的输入控件可能会将value特性用于 不同的目的。
export default {
  name: 'KInput',
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
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
    onInput (e) {
      let value = e.target.value
      this.$emit('input', value)
      this.$parent.$emit('validate')
      //  vm.$parent vue instance 父实例，如果当前有实例的话
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>
