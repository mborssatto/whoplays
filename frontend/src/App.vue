<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #e9ecf0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 3px;
  background-color: #2c3e50;
  color: #e9ecf0;

  a {
    font-weight: bold;
    color: #e9ecf0;

    &.router-link-exact-active {
      color: #81b7ed;
    }
  }
}
</style>
