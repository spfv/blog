<template>
  <el-container style="height:100%;min-width:1080px;">
    <!-- <el-header class="bgc nav">个人博客后台管理系统</el-header> -->
    <el-header class="bgc nav">
      个人博客后台管理系统
    </el-header>
      <div style='position:absolute;color:white;right:1em;top:12.5px'>今日人数: {{data.day}} 总人数: {{data.amount}}</div>

    <el-container style="height: 100%;">
      <el-aside class="aside" @click="">
        <router-link to="/admin">
          <div @click="type1()" style="margin-top:20px;" :style="type==1?'background-color:#efefef':''"><img class="icon" :src="imgsrc+'home.png'" alt=""></div>
        </router-link>

        <router-link to="/article">
          <div @click="type2();" :style="type==2?'background-color:#efefef':''"><img class="icon" :src="imgsrc+'article.png'" alt=""></div>
        </router-link>

      </el-aside>

      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>

      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </el-container>

  </el-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import state from "vuex";
import axios from "axios";

export default {
  name: "adminindex",
  data() {
    return {
      imgsrc: "./static/img/",
      data: {
        day:0,
        amount:0
      },
    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      type: state => state.self.adminType
      // ...
    })
  },
  mounted: function() {
    let _this = this;
  //  setTimeout(()=>{
     this.$http.getStatistics().then(res => {
      _this.data = res.data.data;
    });
  //  },1000)

    
  },
  watch: {
    $route: function(to, from, next) {
      if (to.path == "/admin") {
        this.SET_TYPE(1);
      } else if (to.path == "/article") {
        this.SET_TYPE(2);
      }
    }
  },
  methods: {
    ...mapActions(["SET_TYPE"]),
    type1() {
      this.SET_TYPE(1);
    },
    type2() {
      this.SET_TYPE(2);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/common/index.less";

.nav {
  width: 100%;
  height: 50px !important;
  line-height: 50px;
  text-align: center;
  .font13;
  color: white;
}
.aside {
  border-right: 1px @greencolors solid;
  width: 65px !important;
  // background-color: #f7f7f7;

  div {
    height: 100px;
    position: relative;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
