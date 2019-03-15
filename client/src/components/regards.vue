<template>
    <div class="index " style="height:100%" >
      <div class="main " style="word-wrap:break-word;padding:1em;background-color:white;height:100%" >
       本项目源码:  <a  target="_blank"  :href="url">https://github.com/spfv/blog</a>
    
            </div>
             
    </div>
    
</template>
<script>
export default {
  data() {
    return {
      imgsrc: "/static/img/",
      url:'https://github.com/spfv/blog'
    
    };
  },
mounted:function(){


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

</style>
<style  lang="less" >
@import "~@/common/markdown.less";


</style>


