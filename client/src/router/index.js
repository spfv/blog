import Vue from "vue";
import Router from "vue-router";
import index from "@/components/index";

Vue.use(Router);

export default new Router({
  routes: [
    //用户路由
    {
      path: "/",
      name: "/",
      component: index,
      redirect: "/article",
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: "/article",
          name: "article",
          component: resolve => require(["@/components/article"], resolve),
          meta: {
            keepAlive: true
          }
          // type: 1
        },
        {
          path: "/articleInfo",
          name: "articleInfo",
          component: resolve => require(["@/components/articleinfo"], resolve),
          meta: {
            keepAlive: false
          }
        },
        {
          path: "/navigate",
          name: "navigate",
          component: resolve => require(["@/components/navigate"], resolve),
          meta: {
            keepAlive: true
          }
          // type: 2
        },
        {
          path: "/regards",
          name: "regards",
          component: resolve => require(["@/components/regards"], resolve),
          meta: {
            keepAlive: true
          }
          // type: 3
        }
      ]
    },
    {
      path: "/index",
      name: "index",
      component: index,
      meta: {
        keepAlive: true
      }
    }
  ]
});
