import createApp from './main'

// 服务端需要调用当前实例产生一个  vue实例

// 打包成node可以使用的文件
export default context => {
    return new Promise((resolve, reject) => {
      const { app, router, store } = createApp()
  
      router.push(context.url)
  
      router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()
        if (!matchedComponents.length) {
          return reject({ code: 404 })
        }
  
        // 对所有匹配的路由组件调用 `asyncData()`
        Promise.all(matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })).then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
           context.state = store.state
  
          resolve(app)
        }).catch(reject)
      }, reject)
    })
  }




// export default (context)=>{
// //    涉及到异步组件
// return new Promise((resolve,reject)=>{
//     const {app,router,store} = createApp()
//     // 返回实例应该跳转的 页面
//     router.push(context.url)
//     router.onReady(()=>{
//       let matchs =   router.getMatchedComponents()
//         if(matchs.length === 0){
//             reject({code:404})
//         }
//        Promise.all(matchs.map(component=>{
//         if(component.asyncData){
//             return component.asyncData(store)
//         }
//     })).then(()=>{
//         // 把 vuex的状态挂载到上下文中
//         context.state = store.state
//         resolve(app)
//     })
//     },reject)   
// })
// }