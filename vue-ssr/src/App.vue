<template>
<!-- 客户端激活 -->
  <div id="app">
     <p> App.vue</p>
      <router-link to="/">foo</router-link> |
      <router-link to="/bar">bar</router-link>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name:"App",
  components: {
  },
  props: {},
  data() {
    return {

    };
  },
  created() {},
  mounted() {},
  activited() {},
  methods: {

  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>

</style>
