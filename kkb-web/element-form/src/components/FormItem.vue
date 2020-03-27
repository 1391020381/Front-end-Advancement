<template>
  <div>
    <label for="">{{label}}</label>
    <div>
        <slot></slot>
        <p v-if="errStatus">{{errMessage}}</p>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  name: '',
  inject: ['kForm'],
  components: {},
  props: ['label', 'prop'],
  data () {
    return {
      errMessage: '',
      errStatus: false
    }
  },
  created () {},
  mounted () {
    this.$on('validate', this.validator)
  },
  activited () {},
  update () {},
  beforeRouteUpdate () {},
  methods: {
    validator () {
      const rules = this.kForm.rules[this.prop]
      const value = this.kForm.model[this.prop]
      const descriptor = { [this.prop]: rules }
      const schema = new Schema(descriptor)
      schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errMessage = errors[0].message
          this.errStatus = true
        } else {
          this.errMessage = ''
          this.errStatus = ''
        }
      })
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>
