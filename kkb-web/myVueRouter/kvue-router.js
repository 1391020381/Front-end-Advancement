 
import Link from './krouter-link'
import View from './krouter-view'
 
 
//1.创建一个krouter对象，只需要把krouter挂载到Vue.prototype.$router = router上  这样在所有的组件中都可以使用$router了
//krouter是一个对象，只需要实现一个{install（）} 方法就可以了
 
let Vue;
class kVueRouter {
  constructor(options) {    //options接收用户传进来的配置及属性
    this.$options = options
 
    //创建响应式的current
    // Vue.util.defineReactive(this, 'current', '/')   //看vue文档
 
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', [])
    //match方法可以递归遍历路由表，获得匹配关系数据matched

    // defineReactive:定义一个对象的响应属性（core/observer/index.js）

    // usage:
    //     Vue.util.defineReactive(obj,key,value,fn)
        
    //     obj: 目标对象，
    //     key: 目标对象属性；
    //     value: 属性值
    //     fn: 只在node调试环境下set时调用


    this.match()
 
 
 
    /*  
    //这里注释掉是不希望有重复的代码  
    window.addEventListener('hashchange', () => {
      console.log('window.location.hash:===', window.location.hash);
      this.current = window.location.hash.slice(1)
    })
    window.addEventListener('load', () => {
      console.log('window.location.hash:===', window.location.hash);
      this.current = window.location.hash.slice(1)
    }) */
 
    //这里使用bind(this)的原因是因为是window调用的，用bind(this)就是重新指向当前类KVueRouter
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
 
    //创建一个path和component之间的路由映射表
    /* this.routeMap = {}
    console.log('options.routes:===', options.routes)
    options.routes.forEach(route => {
      this.routeMap[route.path] = route     //这里还得再看看看why?????   2020.01.11
    }) */
 
  }
 
  onHashChange() {
    console.log('window.location.hash:===', window.location.hash);
 
    this.current = window.location.hash.slice(1)
    //当路由变化的时候，把matched数组清空，重新匹配
    this.matched = []
    this.match()
  }
  match(routes) {
    routes = routes || this.$options.routes
 
    //递归遍历
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      //this.current是/about/info时的判断
      if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        //路由/info
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
 
}
kVueRouter.install = function (_vue) {
  //保存构造函数，在KVueRouter中使用
  Vue = _vue
 
  //挂载$router   
  //怎么获取根实例下的router选项
  Vue.mixin({
    beforeCreate() {
      // console.log(this);
      //确保根实例的时候才执行，只有根实例的时候才会存在router,所以用下面的判断
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
 
    }
  })
 
 
 
  //任务2：实现两个全局组件router-line 和router-view
  /* Vue.component('router-link', {
    template:'<a></a>'       //在这里不能使用template的原因是现在是run-time only,即纯运行时的环境，没有编译器，所以不能使用template
  }) */
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
 
}
 
export default kVueRouter
 
 
 
 
 
 
 
 
 