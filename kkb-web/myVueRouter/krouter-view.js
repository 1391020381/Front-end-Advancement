export default {
    render(h) {
      //获取path对应的component    这里性能太低，path每变一次都需要都去循环一下
      /* let component = null;
      this.$router.$options.routes.forEach(route => {
        if (route.path === this.$router.current) {
          component = route.component
        }
      }) */
   
      //标记当前router-view深度
      this.$vnode.data.routerView = true;
      let depth = 0
      let parent = this.$parent
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData) {
          if (vnodeData.routerView) {
            //说明当前parent是一个router-view
            depth++
          }
        }
        parent = parent.$parent
      }
   
   
      let component = null
      const route = this.$router.matched[depth]
      if (route) {
        component = route.component    //当前的组件component设为匹配到的路由的组件
      }
   
      return h(component)
    }
  }