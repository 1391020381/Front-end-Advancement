let Vue 
// 在 使用 new myRouter（） 之前会 vue.use(myRouter)
class myRouter {
    static install(_vue){
        Vue = _vue  
        Vue.mixin({
            beforeCreate(){
            if(this.$options.router){
               Vue.prototype.$myRouter = this.$options.router
               this.$options.router.init()
            }
            }
        })
    }
    constructor(options){ // 初始化 myRouter 时 传入的参数
       this.$options = options
       this.routeMap = {}
       this.app = new Vue({
           data:{
               current:'/'
           }
       })
    }
    init(){
        this.initEvent()
        this.createRouterMap()
        this.installComponent()
    }
    initEvent(){
        window.addEventListener('hashchange',this.onHashChange.bind(this))
        window.addEventListener('load',this.onHashChange.bind(this))
    }
    onHashChange(e){
        let hash = this.getHash()
        this.app.current = hash
        let router = this.routeMap[hash]
        let {form,to} = this.getFrom(e)
        if(router.beforeEnter){
            router.beforeEnter(from,to,()=>{
                this.app.current = hash
            })
        }else{
            this.app.current = hash
        }
    }
    getFrom(e){
        let form ,to
        if(e.newURL){
            from  = e.oldURL.split('#')[1]
            to = e.newURL.split('#')[1]
        }else{
           from = ''
           to = this.getHash()
        }
        return { from ,to}
    }
    getHash(){
        return window.location.hash.slice(1)||'/'
    }
    push(url){
        // hash 直接赋值
        window.location.hash = url

        // history模式使用对应的api
    }
    installComponent(){
        Vue.component('router-view',{
            render:h=>{
                const component = this.routeMap[this.app.current].component
                return h(component)
            }
        })
        Vue.component('router-link',{
            props:{
                to:String
            },
            render(h){
                return h('a',{
                    attrs:{
                        href:'#' + this.a
                    },
                    
                },[this.$slots.default])
            }
        })
    }
    createRouterMap(){
        this.$options.routes.forEach(item=>{
            this.routeMap[item.path] = item
        })
    }

    /**
    
     main.js    new Vue({router,render:h=> h(app)}).$mount('#app')
     router.js  引入 组件 new myRouter({
         routes:[]
     })
    1. myRouter 需要提供一个 install 方法 这个方法是提供给 vue使用的    
    在 myRouter 的构造函数中 获取 在使用前需要 Vue.use(myRouter)其实就是在vue 启动的过程中初始化一些值 实际上是调用myRouter的install方法。 在router.js中的路由配置  routerMap  current(利用了vue的响应式)

    在 static 的 install的方法里 保存了 vue   并通过 Vue.mixin() 在 beforeCreate 生命周期里面 调用 myRouter.init()

    init 方法里面 会注册 事件监控 路由hash 变化   创建 routerMap path = item 
    注册  全局的组件 view-router  link  组件   这里使用到 render 方法

    在 hashchange 时改变  this.current   view-router 就会渲染对应对应组件
     **/
}