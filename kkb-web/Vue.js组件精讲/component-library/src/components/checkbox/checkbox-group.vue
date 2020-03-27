<template>
  <div>
      <slot></slot>
  </div>
</template>

<script>
import {findComponentsDownward} from "@utils/assist.js"
import Emitter from '@mixins/emitter.js'
export default {
  name:"iCheckboxGroup",
  mixins:[Emitter],
  components: {},
  props: {
      value:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data() {
    return {
        currentValue:this.value,
        childrents:[]
    };
  },
  created() {},
  mounted() {
      this.updateModel(true)
  },
  activited() {},
  methods: {
      updateModel(update){
          this.childrents = findComponentsDownward(this,'iCheckbox')
          if(this.childrents){
              const {value} = this
              this.childrents.forEach(child=>{
                  child.model = value
                  if(update){
                      child.currentValue = value.indexOf(child.label)>=0
                      child.group = true
                  }
              })
          }
      },
      change(data){
          this.currentValue = data
          this.$emit('input',data)
          this.$emit('on-change',data)
          this.dispatch('iFormItem','on-form-change',data)
      }
  },
  filter: {},
  computed: {},
  watch: {
      value(){
          this.updateModel(true)
      }
  },
};
</script>

<style lang="scss" scoped>

</style>
