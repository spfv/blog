const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
//日志
const log4js = require("./utils/log");

//koa2-cors解决跨域
const cors = require("koa2-cors");

//bodyparser:该中间件用于post请求的数据 获取json
const bodyParser = require("koa-bodyparser");
const childRouter = require("./routes/main.js");

app.use(cors());
app.use(bodyParser());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log4js.resLogger(ctx, ms);
});
app.on("error", (err, ctx) => {
  log4js.errLogger(ctx, err);
  console.error("server error", err, ctx);
});
// 装载子路由
router.use("/api", childRouter.routes(), childRouter.allowedMethods());

// 加载中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(8887, () => {
  console.log("this serve if running at http://localhost:" + 8887);
});
