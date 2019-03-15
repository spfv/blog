const mongoose = require("mongoose");
const moment = require("moment");

mongoose.connect("mongodb://localhost/blog");

let db = mongoose.connection;

db.on("error", function() {
  console.log("数据库连接出错！");
});
db.on("open", function() {
  console.log("数据库连接成功！");
});
// //统计
// const statisticsScheme = mongoose
//用户
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String
});
//文章
const articleSchema = mongoose.Schema(
  {
    title: String,
    creatTime: {
      type: String,
      default: moment().format("YYYY-MM-DD HH:mm")
    },
    content: String,
    htmlCode: String,
    show: {
      type: Number,
      default: 0
    },
    content: String,
    htmlCode: String,
    tag: {
      type: Number,
      default: -1
    }
  },
  { versionKey: false }
);
//统计
const statisticsSchema = mongoose.Schema({
  day: {
    type: Number,
    default: 0
  },
  mouth: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number,
    default: 0
  }
});

const model = {
  User: mongoose.model("User", userSchema),
  Article: mongoose.model("Article", articleSchema),
  statistics: mongoose.model("statistics", statisticsSchema)
};
module.exports = model;
