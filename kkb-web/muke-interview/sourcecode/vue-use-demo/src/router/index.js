import Vue from 'vue'
import VueRouter from 'vue-router'
import TplDemo from '../views/TplDemo.vue'
import ComputedDemo from '../views/ComputedDemo.vue'
import WatchDemo from '../views/WatchDemo'
import ClassStyleDemo from '../views/ClassStyleDemo'
import ConditionDemo from '../views/ConditionDemo'
import ListDemo from '../views/ListDemo'
import EventDemo from '../views/EventDemo.vue'
import SlotScopeDemo from '../views/ScopedSlotDemo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TplDemo',
    component: TplDemo
  },
  {
    path: '/ComputedDemo',
    name: 'ComputedDemo',
    component: ComputedDemo
  },
  {
    path: '/WatchDemo',
    name: 'WatchDemo',
    component: WatchDemo
  },
  {
    path: '/ClassStyleDemo',
    name: 'ClassStyleDemo',
    component: ClassStyleDemo
  },
  {
    path: '/ConditionDemo',
    name: 'ConditionDemo',
    component: ConditionDemo
  },
  {
    path: '/ListDemo',
    name: 'ListDemo',
    component: ListDemo
  },
  {
    path: '/EventDemo',
    name: 'EventDemo',
    component: EventDemo
  },
  {
    path: '/SlotScopeDemo',
    name: 'SlotScopeDemo',
    component: SlotScopeDemo
  }
]

const router = new VueRouter({
  routes
})

export default router
