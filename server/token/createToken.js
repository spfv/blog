const jwt = require("jsonwebtoken");
let token = use_id => {
  const token = jwt.sign(
    {
      use_id: use_id
    },
    "ttt", //随便一点内容，撒盐：加密的时候混淆
    {
      expiresIn: "7d" //60秒到期时间
    }
  );
  return token;
};

module.exports = token;
