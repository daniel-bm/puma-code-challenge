<template>
  <MainScreen/>
</template>

<script>
import MainScreen from './pages/MainScreen.vue'

export default {
  name: 'App',
  components: {
    MainScreen
  }
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
