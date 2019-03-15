<template>
  <el-container style="height:100%;">
    <el-aside class="article">
      <div class="title">文章列表 <img @click="addArticle" class="" :src="imgsrc+'add.png'" alt="" srcset=""></div>
      <div class="list" v-for="(data,index) in dataInfo" :key="dataInfo._id" :class="{'select':data.active}" @click="selectStyle(data),getContent(data._id,index)">
        <div>
          <div class="caption" :id="data._id">{{data.title}}</div>
          <div class="time Green">{{data.creatTime}}</div>
        </div>

      </div>

    </el-aside>
    <el-container style="" v-if="showEdit">

      <el-header class="articleTitle">

        <div style="display:flex">
          <el-input :disabled='disabled' v-model="input" placeholder="title"></el-input>
          <el-button style="padding: 5px;margin: 15px 10px; " type="primary" icon="el-icon-edit" circle @click="change()"></el-button>
        </div>
        <div>
          <el-button type="danger" @click="removeArticle" plain>删除文章</el-button>
        </div>
        <div>
          <el-button type="warning" @click="downArticle" plain :disabled="!showAc">下线文章</el-button>
        </div>
        <div>
          <el-button type="primary" @click="issue" plain :disabled="showAc">{{issuex}}</el-button>
        </div>

      </el-header>
       <el-header class="articleTag">
          <div class="">标签选择:</div>

        <div style="display:flex">
           <div>
          <el-button :disabled="disabledTag" :type="type==1?tarColor:''" @click="choseTag(1)" plain>javaScript/html/css</el-button>
        </div>
         <div>
          <el-button :disabled="disabledTag" :type="type==2?tarColor:''" @click="choseTag(2)" plain>vue</el-button>
        </div>
         <div>
          <el-button :disabled="disabledTag" :type="type==3?tarColor:''" @click="choseTag(3)" plain>node</el-button>
          <el-button :disabled="disabledTag" :type="type==100?tarColor:''" @click="choseTag(100)" plain>resume</el-button>
          <el-button :disabled="disabledTag" :type="type==1000?tarColor:''" @click="choseTag(1000)" plain>null</el-button>
          
          
        </div>
        
        </div>

      </el-header>
      <el-main style="padding:1px 0 0 0;height:100%">
        <mavon-editor class="editor" :ishljs="true" v-model="value" :toolbars='toolbars' @save='saveData' />
      </el-main>
    </el-container>

  </el-container>
</template>
<script>
// import api from "../axios.js";
// type 1:js 2:vue 3:node
import Vue from "vue";

export default {
  name: "adminindex",
  data() {
    return {
      imgsrc: "./static/img/",
      value: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: false, // 下划线
        strikethrough: false, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      dataInfo: [],
      active: true,
      articleId: "",
      articleIndex: "",
      token: "",
      input: "",
      disabled: true,
      disabledTag:false,
      creatTime: "",
      type: 0,
      showEdit: false,
      htmlCode: "",
      issuex: "发布文章",
      showAc: false,
      tarColor:'success',//标签颜色 success
    };
  },
  mounted: function() {
    this.token = localStorage.getItem("token");
    let _this = this;

    this.$http.getArticleList().then(res => {
      //获取列表数据
      _this.dataInfo = res.data.data;
      console.log(res.data.data)
     
    });
  },
  methods: {
    choseTag(type){  //标签选择
    this.type=type
      
    },
    change() {
      if (this.disabled == false) {
        this.saveData();
      }
      this.disabled = !this.disabled;
    },

    addArticle() {
      //添加文章
      let _this = this;

      this.$http.ArticleList().then(res => {
        _this.dataInfo.push(res.data.data);
      });
    },
    selectStyle(item) {
      //点击效果
      this.dataInfo.forEach(function(item) {
        Vue.set(item, "active", false);
      });
      Vue.set(item, "active", true);
    },
    removeArticle() {
      //删除文章
      let _this = this;
      let data = {
        id: _this.articleId
      };
      this.$confirm("此操作将永久删除该文章, 是否继续?", "删除文章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .deleteArticle(data)
            .then(res => {
              console.log(res);
              if (res.data.status == 200) {
                _this.dataInfo.splice(this.articleIndex, 1);
                _this.$message({
                  type: "success",
                  message: "恭喜主人,删除成功"
                });
                _this.showEdit = false;
              }
            })
            .catch(err => {
              _this.$message({
                type: "error",
                message: "主人主人,删除失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "主人主人,已取消删除"
          });
        });
    },
    downArticle() {
      //下线文章
      let _this = this;
      let data = {
        id: _this.articleId
      };
      this.$confirm("此操作将下线该文章, 是否继续?", "下线文章", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(data);
          this.$http
            .downArticle(data)
            .then(res => {
              console.log(res);
              if (res.data.status == 200) {
                _this.issuex = "发布文章";
                _this.showAc = false;
                _this.$message({
                  type: "success",
                  message: "恭喜主人,下线成功"
                });
              }
            })
            .catch(err => {
              _this.$message({
                type: "error",
                message: "主人主人,下线失败"
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "info",
            message: "主人主人,已取消下线"
          });
        });
    },
    issue() {
      //发布文章
      let _this=this
      let data = {
        id: this.articleId
      };
      this.$http.upArticle(data).then(res => {
        if (res.data.status == 200) {
          _this.issuex = "已发布";
          _this.showAc = true;
           _this.$message({
                type: "success",
                message: "主人主人,发布成功"
              });
        }else{
           _this.$message({
                type: "error",
                message: "主人主人,发布失败"
              });
        }
      });
    },
    saveData(value, html) {
   if(this.showAc) {  this.$message({
                type: "warning",
                message: "主人主人,请先下架文章在储存"
              })
              return false
              }
      //存草稿
      this.htmlCode = html;
      let _this = this;
      let data = {
        title: this.input,
        // token: this.token,
        content: this.value,
        id: this.articleId,
        htmlCode: this.htmlCode,
        tag:this.type,
      };

      this.$http
        .saveArticle(data)
        .then(res => {
          let thisTitle = document.getElementById(this.articleId);
          thisTitle.innerHTML = _this.input;
          _this.disabled = true;
          _this.$message({
            type: "success",
            message: "恭喜主人,草稿储存成功"
          });
        })
        .catch(err => {
          _this.$message({
            type: "error",
            message: "注意注意,储存失败！"
          });
        });
    },
    getContent(id, index) {
      let _this = this;
      //获取文章内容

      this.$http.postArticleList({ id }).then(res => {
        let data = res.data.data;
        if (data.content) {
          _this.value = data.content;
        } else {
          _this.value = "";
        }
        if (data.show == 0) {
          _this.issuex = "发布文章";
          _this.showAc = false;
        } else {
          _this.issuex = "已发布";
          _this.showAc = true;
        }
         if(data.tag>0){
        _this.type=res.data.data.tag
      }else{
        _this.type=0
      }
        _this.articleId = data._id;
        _this.input = data.title;
        _this.articleIndex = index;
        _this.creatTime = data.creatTime;
        _this.showEdit = true;
        _this.htmlCode = data.htmlCode;
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/common/index.less";
.editor {
  height: 100%;
  width: 100%;
}
.article {
  border-right: 1px @greencolors solid;
  width: 200px !important;
  background-color: white;
  position: relative;
  .title {
    font-size: 1.1em;
    width: 100%;
    text-align: center;
    height: 3em;
    line-height: 3em;
    border-bottom: 1px @greencolors solid;
    position: relative;
    img {
      position: absolute;
      right: 5px;
      width: 1.4em;
      top: 50%;
      right: 0.5em;
      transform: translate(0, -50%);
    }
  }
}
.list {
  border-bottom: 1px #969696 solid;
  padding: 0.5em;
  line-height: 1.5em;
}
.select {
  border-bottom: 1px #f37f7f solid;
  div {
    color: #f37f7f;
  }
}
.articleTitle {
  display: flex;
  line-height: 60px;
  justify-content: space-around;
  text-align: center;

  div {
    flex: 1;
  }
}
.articleTag{
   display: flex;
  line-height: 60px;
  // justify-content: space-around;
  // text-align: center;
.div{
  .mgr10
}

}

</style>
