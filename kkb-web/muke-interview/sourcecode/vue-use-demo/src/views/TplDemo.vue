<template>
  <div>
      <p>文本插值{{message}}</p>
      <p>js表达式{{flag?'yes':'no'}} (只能是表达式,不能是js 语句)</p>
      <p :id="dynamicId">动态属性id</p>
      <hr>
      <p v-html="rawHtml">
          <span>注意使用 v-html之后, 将会覆盖 子元素</span>
      </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      message: 'hello vue',
      flag: true,
      rawHtml: '指令-原始html <b>加粗</b><i>斜体</i>',
      dynamicId: `id-${Date.now()}`
    }
  },
  created () {},
  mounted () {},
  activited () {},
  methods: {

  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>
