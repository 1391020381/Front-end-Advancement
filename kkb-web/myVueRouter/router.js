import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'
 
Vue.use(VueRouter)
 
//路由表
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '/about/info',
        component: {
          render(h) {
            return h('div', 'about child :info page')
          }
        }
      }
    ]
 
 
  }
]
 
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
 
export default router