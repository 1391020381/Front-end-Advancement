<template>
  <a :href="url">
      <slot :slotData="website">
          {{website.subTitle}}
      </slot>
  </a>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['url'],
  data () {
    return {
      website: {
        url: 'http://wangEditor.com/',
        title: 'wangEditor',
        subTitle: '轻量级富文本编辑器'
      }
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
