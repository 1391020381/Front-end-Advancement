<template>
  <div>
      <input
      type="text"
      :value="currentValue"
      @input="handleInput"
      @blur="handleBlur"
      />
  </div>
</template>

<script>
import Emitter from "@mixins/emitter.js"
export default {
  name:"iIput",
  mixins:[Emitter],
  components: {},
  props: {
      value:{
          type:String,
          default:''
      }
  },
  data() {
    return {
        currentValue:this.value
    };
  },
  created() {},
  mounted() {},
  activited() {},
  methods: {
      handleInput(event){
          const value = event.target.value
          this.currentValue = value
          this.$emit('input',value)
          this.dispatch('iFormItem','on-form-change',value)
      },
      handleBlur(){
          this.dispatch('iFormItem','on-form-blur',this.currentValue)
      }
  },
  filter: {},
  computed: {},
  watch: {
      value(val){
          this.currentValue = val
      }
  },
};
</script>

<style lang="scss" scoped>

</style>
