import Vue from "vue";
import Router from "vue-router";
import login from "@/components/loginAdmin";

Vue.use(Router);

export default new Router({
  routes: [
    //管理路由
    {
      path: "/",
      name: "",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/administration",
      name: "administration",
      component: resolve => require(["@/components/administration"], resolve),
      redirect: "/admin",

      children: [
        //这里就是二级路由的配置

        {
          path: "/admin",
          name: "admin",
          component: resolve => require(["@/components/admin"], resolve),
          meta: {
            keepAlive: true,
            requiresAuth: true
          }
        },
        {
          path: "/article",
          name: "article",
          component: resolve => require(["@/components/article"], resolve),
          meta: {
            keepAlive: true,
            requiresAuth: true
          }
        }
      ],
      meta: {
        keepAlive: true
      }
    }
  ]
});
