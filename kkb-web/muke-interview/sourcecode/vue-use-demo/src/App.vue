<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">插值</router-link> |
      <router-link to="/ComputedDemo">ComputedDemo</router-link>|
      <router-link to="/WatchDemo">WatchDemo</router-link>|
      <router-link to="/ClassStyleDemo">ClassStyleDemo</router-link>|
      <router-link to="/ConditionDemo">ConditionDemo</router-link>|
      <router-link to="/ListDemo"> ListDemo</router-link>|
      <router-link to="/EventDemo">EventDemo</router-link>|
      <router-link to="/SlotScopeDemo">SlotScopeDemo</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
