<template>
  <div>
    <input type="checkbox" :checked="checked" @change="onChange"/>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  components: {},
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
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
    onChange (e) {
      let checked = e.target.checked
      this.$emit('change', checked)
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>
