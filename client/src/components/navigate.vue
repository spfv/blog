<template style=''>
  <div class=" mainx  bgw">
    <div>
      <ul class="tag">
        <li v-if="tag" class="tagStyle" :class="type==100?'clickStyle':''" @click="type=100;getArticle(100)">resume</li>
        <li class="tagStyle" :class="type==1?'clickStyle':''" @click="type=1;getArticle(1)">javascript/html/css</li>
        <li class="tagStyle" :class="type==2?'clickStyle':''" @click="type=2;getArticle(2)">vue</li>
        <li class="tagStyle" :class="type==3?'clickStyle':''" @click="type=3;getArticle(3)">node</li>

      </ul>
    </div>
    <timeline>
      <!-- <timeline-title>title</timeline-title> -->
      <!-- <timeline-item color="#9dd8e0">item1</timeline-item> -->
      <timeline-item v-if="articleData.length>0" v-for="data in articleData" :key="articleData._id" line-color="#4fc08d" :hollow="true">
        <div @click="goAr(data)" style="cursor:pointer">{{data.title}}</div>
        <p class="timeColor" style="margin-top:0.5em">{{data.creatTime}}</p>
        
        <!-- <div class="contentColor">{{data.content}}</div> -->

      </timeline-item>

    </timeline>
    <div v-if="articleData.length<=0" style="margin: 1em 0.5em;">暂无分类数据....</div>
  </div>
</template>
<script>
import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";
// type 1:js 2:vue 3:node  100:简历文章
export default {
  data() {
    return {
      articleData: [],
      type: 1,
      tag: false
    };
  },
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  mounted: function() {
    //判断是否查看简历
    if (this.$route.query.tag == 100) {
      this.tag = true;
      this.type = 100;
    }

    //。。。。
    this.$http
      .getArticle({
        params: { tag: this.type }
      })
      .then(res => {
        this.articleData = res.data.data;
      })
      .catch(err => {});
  },
  methods: {
    getArticle(tag) {
      this.type = tag;
      this.$http
        .getArticle({ params: { tag: this.type } })
        .then(res => {
          this.articleData = res.data.data;
          console.log(this.articleData);
        })
        .catch(err => {});
    },
    goAr(data) {
      sessionStorage.setItem("content", JSON.stringify(data));
      this.$router.push({
        path: "/articleinfo"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/common/index.less";

@media screen and (min-width: 768px) {
  //pc
  .mainx {
    margin: 0.7rem 0.5rem;
    height: 100%;
    // width: 80%;
  }
}

@media screen and (max-width: 768px) {
  //移动
  .mainx {
    margin: 0.7rem 0.3rem;
  }
}

.tag {
  display: flex;
  // padding: 1rem 1rem 0rem;
  padding: 1em 0.5em;
  border-bottom: 1px #dadada dashed;
  .tagStyle {
    font-size: 14px;
    padding: 0.2rem 0.6rem;
    margin: 0.2rem;
    border: 1px solid #d2d2d2;
    border-radius: 0.5rem;
    color: rgba(0, 0, 0, 0.8);
    background-color: #f7f7f7;
    transition: all 0.4s;
    // vertical-align:middle;
    cursor: pointer;
  }
  .clickStyle {
    background-color: #555;
    border-color: #555;
    color: #fff;
  }
}
li:hover {
}
// li:active{
//   background-color: #555;
//     border-color: #555;
//     color: #fff;
// }
</style>

