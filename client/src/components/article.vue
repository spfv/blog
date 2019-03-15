<template>
    <div class="index " style="height:100%" >
      <div class="main bgw" v-for="data in articleData" :key="articleData._id"  @click="goAr(data)">
                <el-main class=" " style="cursor:pointer" >
                    <h2 class="mgb5">{{data.title}}</h2>
                    <time class="Green font8 ">{{data.creatTime}}</time>
                    <div class="mgt5 ar"  v-html="data.htmlCode"></div>

                </el-main>
              
            </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      imgsrc: "/static/img/",
      articleData:[]
    };
  },
mounted:function(){
   
this.$http.getArticle()
.then(res=>{
this.articleData=res.data.data

})
.catch((err)=>{

})
},
  methods: {
    goAr(data){
      sessionStorage.setItem('content',JSON.stringify( data))
    this.$router.push({
      path:'/articleinfo'
    })
    }
   
  }
};
</script>
<style lang="less" scoped>

@import "~@/common/index.less";
// @import "~@/common/markdown.less";

.nav {
  height: auto !important;
  // line-height: 5em;
  box-shadow: 2px 2px 20px #9b9b9b;
  text-align: center;
  position: relative;
}
.navp {
  box-shadow: 2px 2px 20px #9b9b9b;
  height: 3em !important;
  line-height: 3em;
}
.main {
  margin: 1em auto;
  // min-width: 1000px;
}
.ar{
    display: -webkit-box;
    -webkit-line-clamp: 2;
     /*! autoprefixer: off */
    -webkit-box-orient: vertical;
     /* autoprefixer: on */
    overflow: hidden;
    height:3.9em;
    line-height:1.3em
}


</style>


