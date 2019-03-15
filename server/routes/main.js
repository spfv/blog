const login = require("../info/login.js");
const article = require("../info/article.js");
const Router = require("koa-router");
const checkToken = require("../token/checkToken.js");

const childRouter = new Router();
//前台接口
childRouter.get("/getArticle", article.getArticle);

//end
//登录
childRouter.post("/login", login.login);
//后台文章管理
childRouter.post("/articleList", article.articleList);
childRouter.get("/getArticleList", checkToken, article.getArticleList);
childRouter.post("/postArticleContent", checkToken, article.postArticleContent);
childRouter.post("/saveArticle", checkToken, article.saveArticle);
childRouter.post("/deleteArticle", checkToken, article.deleteArticle);
childRouter.post("/upArticle", checkToken, article.upArticle);
childRouter.post("/downArticle", checkToken, article.downArticle);
//获取访问统计量
childRouter.get("/getStatistics", article.getStatistics);

module.exports = childRouter;
