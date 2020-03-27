import store from './kstore'   //引入我们手写的store
 
new Vue({
  //Vue.prototype.$router = router   在所有组件中都可以使用$router
  router,
 
  store,
  render: h => h(App)
}).$mount('#app')