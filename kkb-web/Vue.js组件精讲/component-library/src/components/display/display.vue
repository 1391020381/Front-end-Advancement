<template>
  <div ref="display">

  </div>
</template>

<script>
import Vue from 'vue'
import randomStr from '@utils/random_str.js'
export default {
  name:"iDisplay",
  components: {},
  props: {
      code:{
          type:String,
          default:''
      }
  },
  data() {
    return {
        id:randomStr(),
        html:'',
        js:'',
        csss:''
    };
  },
  created() {},
  mounted() {
      this.renderCode()
  },
  activited() {},
  methods: {
      destroyCode () {
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    },
      getSource(source,type){
          const regex = new RegExp(`<${type}[^>]*>`)
          let openingTag = source.match(regex)
          if(!openingTag) {
              return ''
          }else {
              openingTag = openingTag[0]
          }
         
      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
      },
       splitCode () {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
      const style = this.getSource(this.code, 'style');
      const template = '<div id="app">' + this.getSource(this.code, 'template') + '</div>';

      this.js = script;
      this.css = style;
      this.html = template;
    },
    renderCode () {
        this.splitCode();

        if (this.html !== '' && this.js !== '') {
        if(this.css!==''){
         const style = document.createElement('style');
          style.type = 'text/css';
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName('head')[0].appendChild(style);
        }
          const parseStrToFunc = new Function(this.js)();

          parseStrToFunc.template =  this.html;
          const Component = Vue.extend( parseStrToFunc );
          this.component = new Component().$mount();

          this.$refs.display.appendChild(this.component.$el);
        }
      }
  },
  beforeDestroy(){
       this.destroyCode();
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>

</style>
