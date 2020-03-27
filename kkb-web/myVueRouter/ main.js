import router from './krouter'
 
import store from './kstore'
 
Vue.config.productionTip = false
 
new Vue({
  //Vue.prototype.$router = router   在所有组件中都可以使用$router
  router,
 
  store,
  render: h => h(App)
}).$mount('#app')