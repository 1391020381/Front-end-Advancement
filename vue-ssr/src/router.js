import Vue from 'vue'
import VueRouter from 'vue-router'

import Foo from './components/Foo.vue'
import Bar from './components/Bar.vue'
Vue.use(VueRouter)

export default ()=>{
    const router = new VueRouter({
        mode:'history',
        routes:[
            {
                path:'/',
                component:Foo
            },
            {
                path:'/bar',
                // component:Bar
                component:()=> import('./components/Bar.vue')
            }
        ]
    })
    return router
}