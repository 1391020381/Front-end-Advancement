import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
// 箭头函数是默认返回一个 =>后面的

// 如果是服务端渲染,每个人都应该有一个自己的vue实例
export default ()=>{
   const router = createRouter()
   const store = createStore()
    const app = new Vue({
        router,
        store,
        render:h=>h(App)
    })
    return {app,router,store}
}