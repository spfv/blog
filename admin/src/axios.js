import axios from "axios";
import Vue from "vue";

var $http = axios.create({
  headers: { "content-type": "application/json;charset=UTF-8" },
  timeout: 10000
  // withCredentials: true
});
// axios.defaults.baseURL = "http://localhost:8887";
axios.defaults.baseURL = "http://138.128.198.202:8887";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
// axios.defaults.headers["Content-Type"] =
//   "application/x-www-form-urlencoded;charset=UTF-8"; //此处是增加的代码，设置请求头的类型
export default {
  //获取统计数据
  getStatistics(data) {
    return $http.get("/api/getStatistics", data);
  },
  //post
  login(data) {
    //登录
    return $http.post("/api/login", data);
  },
  //get
  getArticleList(data) {
    //获取文章列表
    return $http.get("api/getArticleList", data);
  },

  //post
  ArticleList(data) {
    //新增文章
    return $http.post("api/ArticleList", data);
  },
  postArticleList(data) {
    //文章
    return $http.post("api/postArticleContent", data);
  },
  saveArticle(data) {
    //保存文章
    return $http.post("api/saveArticle", data);
  },
  deleteArticle(data) {
    //删除文章
    return $http.post("api/deleteArticle", data);
  },

  upArticle(data) {
    //上线文章
    return $http.post("api/upArticle", data);
  },
  downArticle(data) {
    return $http.post("api/downArticle", data);
  }
};
