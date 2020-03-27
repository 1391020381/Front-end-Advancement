<template>
  <form>
      <slot></slot>
  </form>
</template>

<script>
export default {
  name:"iForm",
  components: {},
  provide(){
      return {
          form:this
      }
  },
  props: {
      model:{
          type:Object
      },
      rules:{
          type:Object
      }
  },
  data() {
    return {
        fields:[]
    };
  },
  created() {
     // Vue.js 组件渲染顺序是由内而外
     this.$on('on-form-item-add',(field)=>{
         if(field){
             this.fields.push(field)
             // 在Form 中通过调用 缓存的FormItem实例 方法 实现校验
         }
     }) 
     this.$on('on-form-item-remove',(field)=>{
         if(field.prop){
             this.fields.splice(this.fields.indexOf(field),1)
         }
     })
  },
  mounted() {},
  methods: {
      resetFields(){
          this.fields.forEach(field=>{
              field.resetField()
          })
      },
      validate(callback){
          return new Promise(resolve=>{
              let valid = true
              let count = 0
              this.fields.forEach(field=>{
                field.validate('',errors=>{
                    if(errors){
                        valid = false
                    }
                    if(++count === this.fields.length){
                        resolve(valid)
                        if(typeof callback === 'function'){
                            callback(valid)
                        }
                    }
                })
              })
          })
      }
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>

</style>
