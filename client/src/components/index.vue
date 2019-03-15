<template>

    <div class="index " style="height:100%;z-index:100" @click="hidePanel">
        <el-container style="">
            <el-header class="nav pc" style="background-color:white">
                <div>
                    <img class='imglogo' :src="imgsrc+'logo.jpeg'" alt="" width="50">
                </div>
                <!-- 作者昵称 -->
                <address class=""> Vkm Fei </address>
                <nav style="">
                    <el-row style="margin-bottom:2px">
                        <el-col :span="2" :offset="9">
                            <div @mouseover='isActivex(1)' @mouseout='isActivef' class="grid-content bg-purple-light">
                                <el-button type="text" :class="[type==1?'greenLine':'',isActive==1 ? 'greenLinex': '']" @click="type=1;dump()">首页</el-button>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div @mouseover='isActivex(2)' @mouseout='isActivef' class="grid-content bg-purple-light">
                                <el-button type="text" :class="[type==2?'greenLine':'',isActive==2 ? 'greenLinex' : '']" @click="type=2;dump()">导航</el-button>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div @mouseover='isActivex(3)' @mouseout='isActivef' class="grid-content bg-purple-light">
                                <el-button type="text" :class="[type==3?'greenLine':'',isActive==3 ? 'greenLinex' : '']" @click="type=3;dump()">关于</el-button>
                            </div>
                        </el-col>
                        <!-- <el-col :span="2">
                            <div @mouseover='isActivex(4)' @mouseout='isActivef' class="grid-content bg-purple-light">
                                <el-button type="text" :class="[type==4?'greenLine':'',isActive==4 ? 'greenLinex' : '']" @click="type=4;dump()">留言</el-button>
                            </div>
                        </el-col> -->
                    </el-row>

                </nav>

            </el-header>

            <!-- 移动端显示 -->
            <el-header class="navp phone bgw">
                <el-row :gutter="20">

                    <el-col :span="3"><img id="myPanel" style="z-index:11" @click="isopen=true" :src="imgsrc+'menu.png'" alt="" class="icon mgt5 myPanel"></el-col>
                    <el-col :span="6" :offset="15" style="white-space:nowrap">Vkm Fei</el-col>
                </el-row>

            </el-header>
            <!-- 移动端显示 -->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>

            </keep-alive>

            <router-view v-if="!$route.meta.keepAlive"></router-view>

         

        </el-container>

        <!-- 移动端显示 -->

        <!-- 遮罩 -->
  <div class="overlayer" v-if="isopen" ></div>

        <div id="myPanel1" class="sidebar myPanel " :class="{open:isopen}">
            <ul>
                <li @mouseover='isActivex(1)' @mouseout='isActivef' class="grid-content bg-purple-light">
                    <el-button type="text" :class="[type==1?'greenLine':'',isActive==1 ? 'greenLinex': '']" @click="type=1;dump()">首页</el-button>
                </li>
                <li @mouseover='isActivex(2)' @mouseout='isActivef' class="grid-content bg-purple-light">
                    <el-button type="text" :class="[type==2?'greenLine':'',isActive==2 ? 'greenLinex' : '']" @click="type=2;dump()">导航</el-button>
                </li>
                <li @mouseover='isActivex(3)' @mouseout='isActivef' class="grid-content bg-purple-light">
                    <el-button type="text" :class="[type==3?'greenLine':'',isActive==3 ? 'greenLinex' : '']" @click="type=3;dump()">关于</el-button>
                </li>
                <!-- <li @mouseover='isActivex(4)' @mouseout='isActivef' class="grid-content bg-purple-light">
                    <el-button type="text" :class="[type==4?'greenLine':'',isActive==4 ? 'greenLinex' : '']" @click="type=4">留言</el-button>
                </li> -->
            </ul>
        </div>
        <!-- 移动端显示 -->

    </div>
</template>
<script>
export default {
  data() {
    return {
      type: 1,
      isActive: null,
      imgsrc: "/static/img/",
      isopen: false,
      articleData: []
    };
  },
  mounted: function() {
    let name=this.$route.name
    if(name==''){

    }
    switch(name){
      case 'article':this.type=1
      break;
       case 'navigate':this.type=2
      break;
       default:this.type=0
      break;
      
    }
    // this.$http
    //   .getArticle()
    //   .then(res => {
    //     this.articleData = res.data.data;
    //   })
    //   .catch(err => {});
  },
  watch:{
  //    $route(to,from){
  //   console.log(to.path);
  //   alert(1)
    
  // },
    // $route:{
      
    //   handler:function(val,oldval){
    //     // alert(1)
        
    //     // console.log(val)
    //     // console.log(oldval)
        
    //   }
      
    // }
  },
  methods: {
    dump() {
      if (this.type == 1) {
        this.$router.push({
          path: "/article"
        });
      } else if (this.type == 2) {
        this.$router.push({
          path: "/navigate"
        });
      }else if(this.type==3){
         this.$router.push({
          path: "/regards"
        });
      }
    },
    hidePanel(event) {
      var sp = document.getElementById("myPanel");
      var sp1 = document.getElementById("myPanel1");
      if (sp) {
        if (!sp.contains(event.target) && !sp1.contains(event.target)) {
          //这句是说如果我们点击到了id为myPanel以外的区域

          this.isopen = false;
          return false
        }
      }
    },
    isActivex(index) {
      this.isActive = index;
    },
    isActivef() {
      this.isActive = null;
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/common/index.less";
//  @import "~@/common/markdown.less";

.imglogo {
  border-radius: 50%;
}
.nav {
  height: auto !important;
  //   line-height: 5em;
  box-shadow: 2px 2px 20px #9b9b9b;
  text-align: center;
  position: relative;
}
.navp {
  box-shadow: 2px 2px 20px #9b9b9b;
  height: 3rem !important;
  line-height: 3rem;
}
.main {
  margin: 1rem auto;
  min-width: 1000px;
}
.ar {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3.9rem;
  line-height: 1.3rem;
}
/*遮罩层*/
.overlayer{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:10;
    background-color:rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) { //移动端
  .pc {
    display: none;
  }
  .main {
    margin: 0;
    min-width: 0;
  }

  .sidebar {
    position: fixed;
    z-index: 10;
    background-color: #f9f9f9;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
    -webkit-transform: translate(-280px, 0);
    transform: translate(-280px, 0);
    ul {
      padding: 2rem;
      line-height: 4rem;
    }
  }
  .open {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}
@media screen and (min-width: 768px) { //pc端
  .phone {
    display: none;
  }
  .sidebar {
    display: none;
  }
}
</style>


