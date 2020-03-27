import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/form',
    component: () => import('@views/form.vue')
},
{
  path: '/checkbox',
  component: () => import('@views/checkbox.vue')
},
{
  path: '/display',
  component: () => import('@views/display.vue')
},
{
  path: '/alert',
  component: () => import('@views/alert.vue')
},
{
  path: '/table-render',
  component: () => import('@views/table-render.vue')
},
{
  path: '/tree',
  component: () => import('@views/tree.vue')
},
]

const router = new VueRouter({
  routes
})

export default router
