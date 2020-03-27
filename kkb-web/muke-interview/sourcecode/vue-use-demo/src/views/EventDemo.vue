<template>
  <div>
    <p>{{ num }}</p>
    <button @click="increment1">+1</button>
    <button @click="increment2(2, $event)">+2</button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      num: 0
    }
  },
  created () {},
  mounted () {},
  activited () {},
  methods: {
    increment1 (event) {
      // eslint-disable-next-line
      console.log("event:", event, event.__proto__constructor); // 原生event对象
      // eslint-disable-next-line
      console.log(event.target);
      // eslint-disable-next-line
      console.log(event.currentTarget); // 事件被挂载在当前元素
      this.num++
    },
    increment2 (val, $event) {
      // eslint-disable-next-line
      console.log(event.target);
      console.log('increment2:', val, $event)
      this.num = this.nm + val
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
