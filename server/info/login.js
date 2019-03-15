const User = require("../db.js").User;
const createToken = require("../token/createToken.js");

const findUser = async username => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};

let user = new User({
  username: "name",
  password: "123" //加密
});
//登录功能
const login = async ctx => {
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  let doc = await findUser(username);
  if (!doc) {
    ctx.status = 200;
    ctx.body = {
      success: false,
      msg: "你不是管理员噢，请勿登录。"
    };
  } else if (doc.password == password) {
    console.log("密码正确");
    let token = createToken(username);
    doc.token = token;
    await new Promise((resolve, reject) => {
      doc.save(err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });

    ctx.body = {
      status: 200,
      success: true,
      token,
      msg: "恭喜主人,登录成功"
    };
  } else {
    console.log("密码错误!");
    ctx.status = 201;
    ctx.body = {
      success: false
    };
  }
};

module.exports = {
  login
};
