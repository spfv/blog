<template>
  <div id="app">
     <keep-alive>
    <transition name="fade">    
    <router-view   v-if="$route.meta.keepAlive"></router-view>
    </transition>
    
    </keep-alive>
    
  <router-view   v-if="!$route.meta.keepAlive"></router-view>
  
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
