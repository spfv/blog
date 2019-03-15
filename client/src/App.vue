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
  name: 'App',
   created:function() {
    var doc=document;
    var win=window;
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 14 * (clientWidth / 320) + 'px';
      };
    if (!doc.addEventListener) return;
    doc.addEventListener('DOMContentLoaded', recalc, false);

  }
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
