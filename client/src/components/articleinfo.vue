<template>
    <div class="index " style="height:100%" >
      <div class="main line mgb10 " style="word-wrap:break-word;padding:1em;background-color:white;height:100%" >
        <div class="header ">
    <div class="title">{{data.title}}</div>
<div class="meta">
	<time class="muted">  <i class="fa fa-clock-o" style="margin-right:0.4em;" ></i>{{data.creatTime}}</time>
     
        </div>
        </div>
    
             <div class="markdown-body"  v-html="data.htmlCode" style="margin-top:1em"></div>
            </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      imgsrc: "/static/img/",
      articleData:[],
      data:'',
    };
  },
mounted:function(){
 this.data=JSON.parse(sessionStorage.getItem('content'))
    console.log(this.content)

},
  methods: {
   
  }
};
</script>
<style  lang="less"  scoped>
.line{
    box-shadow: 5px 5px 10px #9b9b9b;
    -webkit-box-shadow: 5px 5px 10px #9b9b9b;
}
i{
    color: rgb(97, 97, 97) !important
  }
.title{
      color: #444;
    font-weight: 400;
    font-size: 24px;
    line-height: 40px;
}
.header{
  line-height: 2em;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 0.5em;
}
.main {
  margin: 0.7em 0.5em;
  
}
.ar{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height:3.9em;
    line-height:1.3em
}
</style>
<style  lang="less" >
@import "~@/common/markdown.less";


</style>


