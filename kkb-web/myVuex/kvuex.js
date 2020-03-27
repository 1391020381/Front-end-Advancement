let Vue;//保存vue构造函数，避免打包时import导致文件过大
 
class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._wrappedGetters = options.getters
 
    //定义computed选项
    const computed = {}
    this.getters = {}
    //doubleCounter(state){}
    const store = this
    Object.keys(this._wrappedGetters).forEach(key => {
      //获取用户定义的getter
      const fn = store._wrappedGetters[key]
      //转换为computed可以使用的无参数形式，因为在使用时doubleCounter(state){}需要传参，但是computed计算属性不能传参数所以在这里进行封装
      //key就是上面的doubleCounter
      computed[key] = function () {
        return fn(store.state)    //6666这步操作把computed赋值为一个函数，这个函数返回fn,fn里面把state传进去
      }
      //为getters定义只读属性   
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]   //想一下这里为什么可以这样写 ,因为我们上面定义的computed对象会把所有的key都放到new Vue实例的computed上
 
      })
    })
 
    //响应化处理state
    /*  this.state = new Vue({
       data:options.state
     }) */
    //这种方式比上面的更好
    this._vm = new Vue({
      data: {
        //加两个$,Vue不做代理
        $$state: options.state
      },
      computed
    })
 
    //绑定commit,dispatch的上下文为Store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  //存取器   store.state
  get state() { return this._vm._data.$$state }    //这里不太清楚，还得再看看
  set state(v) {
    console.error('你造吗？你这样直接改store.state不好！')
  }
 
  //store.commit('add',1)
  //type:mutation的类型
  //paylod是载荷，是参数
  commit(type, payload) {
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }
  dispatch(type, payload) {
    const entry = this._actions[type]
    if (entry) {
      //把this传进来，那用的时候就可以解构赋值传个add({commit,state,type}),{commit,state,type}这个是解构赋值，对应着这里传入的this
      entry(this, payload)
    }
  }
 
}
 
function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
 
}
 
export default {
  Store,
  install
}