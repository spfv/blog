// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router";
import api from "@/axios.js";
import mavonEditor from "mavon-editor";
import axios from "axios";
import "mavon-editor/dist/css/index.css";
import store from "./store/";
Vue.use(mavonEditor);

Vue.use(ElementUI);

Vue.prototype.$http = api;

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");

  //修复登录axios headers不带token 问题
  if (!axios.defaults.headers.common["Authorization"] && token) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );
  }

  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (!token) {
      alert("主人,您还没有登录哟");
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else next();

  //判断认证
});

Vue.config.productionTip = false;

/* eslint-disable */

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
