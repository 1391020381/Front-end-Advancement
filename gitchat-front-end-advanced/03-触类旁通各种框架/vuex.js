/***

vuex原理
install 方法 和mixin方法
$store 注入
$store.state
$store.getters
$store.mutations
$store.actions
commit dispatch方法的处理
收集模块
装载模块
定义子模块
Vuex的辅助方法
 mapState
 mapGetter
 mapMutations
 mapActions


 new Vuex.Store（{
  state:{
      age:10
  },
  getters:{
      myAge(state){
          return state.age + 10
      }
  },
mutations:{
    syncAdd(state,payload){
        state.age += payload
    }
},
actions:{

}

 }）
 * 
 */

 let Vue  // vue的构造函数
 // vue 的组件渲染 先渲染父组件 再渲染子组件 深度优先

class Store {
    constructor(options){
        // this._s = options.state
        this._vm = new Vue({
            data:{
                state:options.data
            }
        })
        let getters = options.getters || {}
        this.getters = {}
        Object.keys(getters).forEach(getterName=>{
            Object.defineProperty(this.getters,getterName,{
                get:()=>{
                    return getters[getterName](this.state)
                }
            })
        })
        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName=>{
           this.mutations[mutationName] = (payload)=>{
               mutations[mutationName](this.state,payload)
           }
        })
        let actions = options.actions || {}
        this.actions = {}
        Object.keys(actions).forEach(actionName=>{
            this.actions[actionName] = (payload)=>{
                
            }
        })
    }
    commit=(type,payload)=>{
        this.mutations[type](payload)
    }
    dispatch=(type,payload)=>{
     this.actions[type](payload)
    }
    get state(){
        return this._vm.state
    }
}


 // parent Render  child Render  child Did   parent Did
 const install = _Vue =>{
     console.log('install')
     Vue = _Vue
     // 全局注册一个混入 影响注册之后的所有创建的每个Vue实例.插件作者可以使用混入，向组件注入自定义的行为。
     Vue.mixin({
         beforeCreate(){
             console.log(this.$options.name)
             // 在 vue 的组件 使用store ,需要给 注册 store
             // 如果是子组件应该把父组件的store增加给子组件
             if(this.$options&&this.$options.store){
                 this.$store = this.$options.store
             }else{
                 this.$store = this.$parent && this.$parent.$store
             }
         }
     })
 }

 export default {
     install,
     Store
 }