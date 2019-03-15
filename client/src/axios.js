import axios from "axios";
import Vue from "vue";

var $http = axios.create({
  headers: { "content-type": "application/json" },
  timeout: 10000
  // withCredentials: true
});
// axios.defaults.baseURL = "http://localhost:8887";

axios.defaults.baseURL = "http://138.128.198.202:8887";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
export default {
  // $http,
  getArticle(data) {
    //获取文章列表
    return $http.get("api/getArticle", data);
  }
};
