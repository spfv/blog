// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
import "font-awesome/css/font-awesome.css";
import "element-ui/lib/theme-chalk/index.css";
import "mavon-editor/dist/css/index.css";

import App from "./App";
import router from "./router";
import api from "@/axios.js";

Vue.use(ElementUI);

Vue.prototype.$http = api;

Vue.config.productionTip = false;

/* eslint-disable */

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
