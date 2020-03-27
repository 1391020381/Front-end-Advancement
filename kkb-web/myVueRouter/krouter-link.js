export default {
    props: {
      to: {
        type: String,
        required: true
      },
    },
    render(h) {
      //<a href="#/about">abc</a>   url中最终渲染的
      //<router-link :to="/about">XXXX</router-link>   最终使用时的用法
      //h(tag ,data, children)
      console.log('this.$slots:===', this.$slots);
   
      return h('a', {
        attrs: { href: '#' + this.to }, class: 'router-link'
      }, this.$slots.default)
      //下面是jsx的写法   但是脱离了vue-cli没办法成功，因为vue-cli有webpack可以进行编译
      // return <a href={'#' + this.to}>{this.$slots.default}</a>   
    }
  }