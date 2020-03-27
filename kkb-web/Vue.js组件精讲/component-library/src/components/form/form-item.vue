<template>
  <div>
      <label v-if="label" :class="{'i-form-item-label-required':isRequired}">{{label}}</label>
      <div>
          <slot></slot>
          <div v-if="validateState==='error'" class="i-form-item-message">{{validateMessage}}</div>
      </div>
  </div>
</template>
<script>
import Emitter from "@mixins/emitter"
import AsyncValidator from 'async-validator'
export default {
  name:"iFormItem",
  mixins:[Emitter],
  components: {},
  inject:['form'],
  props: {
      label:{
          type:String,
          default:''
      },
      prop:{
          type:String
      }
  },
  data() {
    return {
        isRequired:false,
        validateState:'',
        validateMessage:''
    };
  },
  created() {},
  mounted() {
      // 如果没有传入 prop 则无需校验 也就无需缓存
      
      if(this.prop){
          this.dispatch('iForm','on-form-item-add',this)
          this.initalVal = this.fieldValue
          this.setRules()
      }
  },
  beforeDestroy(){
      this.dispatch('iForm','on-form-item-remove',this)
  },
  methods: {
      getRules(){ // 根据 prop 获取到 此 prop 该字段的检验规则
        let formRules = this.form.rules
        formRules = formRules ? formRules[this.prop]:[]
        return [].concat(formRules||[])
      },
      getFilteredRle(trigger){
          // 获取到该字段下 触发条件一样的规则
          const rules = this.getRules()
          return rules.filter(rule=>!rule.trigger||rule.trigger.indexOf(trigger)!==-1)
      },
      validate(trigger,callback=function(){}){
          let rules = this.getFilteredRle(trigger)
          if(!rules||rules.length===0){
              return true
          }
          // 设置状态为校验中
          this.validateState = 'validating'
          let descriptor = {}
          descriptor[this.prop] = rules
          const validate = new AsyncValidator(descriptor)
          let model = {}
          model[this.prop] = this.fieldValue
          validate.validate(model,{firstFields:true},errors=>{
              this.validateState = !errors ?'success':'error'
              this.validateMessage = errors?errors[0].message:''
              callback(this.validateMessage)

              // 这个回调主要是给 Form 用的 因为Form 中可以通过提交按钮一次性 校验所有的FormItem
          })
          
      },
      resetField(){
          this.validateState = ''
          this.validateMessage = ''
          this.form.model[this.prop] = this.initialValue
      },
      onFieldBlur(){
          this.validate('blur')
      },
      onFieldChange(){
          this.validate('change')
      },
      setRules(){
          let rules = this.getRules()
          if(rules.length){
              rules.every(rule=>{
                  this.isRequired = rule.required
              })
          }
          this.$on('on-form-blur',this.onFieldBlur)
          this.$on('on-form-change',this.onFieldChange)
      }
  },
  filter: {},
  computed: {
      fieldValue(){
          return this.form.model[this.prop]
      }
  },
  watch: {},
};
</script>

<style lang="less" scoped>
 .i-form-item-label-required:before {
        content: '*';
        color: red;
    }
    .i-form-item-message {
        color: red;
    }
</style>
