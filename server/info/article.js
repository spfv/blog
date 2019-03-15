const Article = require("../db.js").Article;
const mongoose = require("mongoose");
const moment = require("moment");
let ObjectID = require("mongodb").ObjectID;
const statisticsx = require("../db.js").statistics;
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.hour = 24;
rule.minute = 0;
schedule.scheduleJob(rule, function() {
  //自动清除天数统计  每天24点。
  statisticsx.update({}, { day: 0 }, (err, doc) => {
    if (err) {
      console("查询错误");
    } else if (doc) {
      console.log("更新成功,每日统计成功");
    }
  });
});

//获取统计量
const getStatistics = async ctx => {
  let doc = await new Promise((resolve, reject) => {
    statisticsx.find({}, (err, doc) => {
      if (err) {
        ctx.throw(500, "error");
      } else if (doc) {
        ctx.body = {
          status: 200,
          msg: "获取统计成功",
          data: doc[0]
        };
        resolve(doc);
      }
    });
  });
};
//统计获取量
const statistics = async ctx => {
  // console.log(statistics);
  console.log(ctx);
  let doc = await new Promise((resolve, reject) => {
    statisticsx.find({}, (err, doc) => {
      if (err) {
        console("查询错误");
        reject(err);
      } else if (doc) {
        let day = doc[0].day;
        let month = doc[0].month;
        let amount = doc[0].amount;
        statisticsx.update(
          {},
          { day: day + 1, amount: amount + 1 },
          (err, doc) => {
            if (err) {
              console("查询错误");
            } else if (doc) {
              console.log("更新成功");
            }
          }
        );
        // resolve(doc);
      }
    });
  });
};
//前台
const getArticle = async ctx => {
  const body = ctx.ip;
  const tag = ctx.request.query.tag;
  if (tag) {
    let doc = await new Promise((resolve, reject) => {
      try {
        //强制获取特定文章
        if (tag == 100) {
          Article.find({ tag: tag }, (err, doc) => {
            if (err) reject(err);
            else if (doc) {
              statistics(body);
              ctx.body = {
                status: 200,
                msg: "获取文章列表成功",
                data: doc
              };
              resolve(doc);
            }
          });
        } else {
          Article.find({ show: 1, tag: tag }, (err, doc) => {
            if (err) reject(err);
            else if (doc) {
              statistics(body);
              ctx.body = {
                status: 200,
                msg: "获取文章列表成功",
                data: doc
              };
              resolve(doc);
            }
          });
        }
      } catch (err) {
        ctx.throw(403, "get Data error");
      }
    });
  } else {
    let doc = await new Promise((resolve, reject) => {
      try {
        Article.find({ show: 1 }, (err, doc) => {
          if (err) reject(err);
          else if (doc) {
            statistics(body);
            ctx.body = {
              status: 200,
              msg: "获取文章列表成功",
              data: doc
            };
            resolve(doc);
          }
        });
      } catch (err) {
        ctx.throw(403, "get Data error");
      }
    });
  }
};

//获取文章列表
const getArticleList = async ctx => {
  let doc = await new Promise((resolve, reject) => {
    Article.find((err, doc) => {
      if (err) reject(err);
      else if (doc) {
        ctx.body = {
          status: 200,
          msg: "获取文章列表成功",
          data: doc
        };
        resolve(doc);
      }
    });
  });
};

//添加文章
const articleList = async ctx => {
  let doc = new Article({
    title: "新标题",
    creatTime: moment().format("YYYY-MM-DD HH:mm"),
    content: null,
    htmlCode: "",
    show: 0
  });
  await new Promise((resolve, reject) => {
    doc.save(err => {
      if (err) reject(err);
      resolve();
    });
  });
  ctx.body = {
    status: 200,
    success: true,
    data: doc,
    msg: "添加成功"
  };
};

//获取文章内容
const postArticleContent = async ctx => {
  const id = ctx.request.body.id;

  let data = await new Promise((resolve, reject) => {
    Article.findOne({ _id: ObjectID(id) }, (err, doc) => {
      if (err) reject(err);
      else resolve(doc);
    });
  });
  if (data) {
    ctx.body = {
      status: 200,
      data
    };
  } else {
    ctx.throw(403, "has not article");
  }
};
//保存,更改数据
const saveArticle = async ctx => {
  const id = ctx.request.body.id;
  const title = ctx.request.body.title;
  const content = ctx.request.body.content;
  const htmlCode = ctx.request.body.htmlCode;
  const tag = ctx.request.body.tag;

  let saveData = {
    id,
    title,
    content,
    htmlCode,
    tag
  };

  let data = await new Promise((resolve, reject) => {
    Article.update({ _id: ObjectID(id) }, saveData, (err, doc) => {
      if (err) reject(err);
      else resolve(doc);
    });
  });
  try {
    let newData = await new Promise((resolve, reject) => {
      Article.findOne({ _id: ObjectID(id) }, (err, doc) => {
        if (err) reject(err);
        else resolve(doc);
      });
    });
    ctx.body = {
      status: 200,
      msg: "保存成功",
      data: newData
    };
  } catch (err) {
    ctx.throw(403, "save error");
  }
};
//发布功能
const upArticle = async ctx => {
  const id = ctx.request.body.id;
  let data = await new Promise((resolve, reject) => {
    Article.update({ _id: ObjectID(id) }, { show: 1 }, (err, doc) => {
      if (err) {
        reject(err);
        return;
      } else {
        if (doc.n == 1) {
          ctx.body = {
            status: 200,
            msg: "上线成功"
          };
          resolve(doc);
        } else {
          ctx.body = {
            status: 201,
            msg: "文章不存在"
          };
          resolve(doc);
        }
      }
    });
  });
};
//删除功能
const deleteArticle = async ctx => {
  let id = ctx.request.body.id;

  try {
    let data = await new Promise((resolve, reject) => {
      Article.remove({ _id: ObjectID(id) }, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
      ctx.body = {
        status: 200,
        msg: "文章删除成功"
      };
    });
  } catch (err) {
    console.log(err);
  }
};
//下线文章
const downArticle = async ctx => {
  const id = ctx.request.body.id;
  let data = await new Promise((resolve, reject) => {
    Article.update({ _id: ObjectID(id) }, { show: 0 }, (err, doc) => {
      if (err) {
        reject(err);
        return;
      } else {
        if (doc.n == 1) {
          ctx.body = {
            status: 200,
            msg: "下线成功"
          };
          resolve(doc);
        } else {
          ctx.body = {
            status: 201,
            msg: "文章不存在"
          };
          resolve(doc);
        }
      }
    });
  });
};

module.exports = {
  //前端获取文章
  getArticle,

  //-------后台功能
  //发布功能
  upArticle,
  //添加文章
  articleList,
  //获取文章列表
  getArticleList,
  //获取文章内容
  postArticleContent,
  //保存,更改数据
  saveArticle,
  //删除文章
  deleteArticle,
  //下线文章
  downArticle,
  //获取统计数
  getStatistics
};
