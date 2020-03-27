<template>
  <div>
      <p v-if="type==='a'">A</p>
      <p v-else-if="type==='b'">B</p>
      <p v-else>other</p>

      <p v-show="type==='a'">A by v-show</p>
      <p v-show="type==='b'">B by v-show</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      type: 'a'
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
