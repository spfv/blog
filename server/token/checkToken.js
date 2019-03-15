const jwt = require("jsonwebtoken");
module.exports = async (ctx, next) => {
  const authorization = ctx.get("authorization");
  ctx.response.type = "application/json";

  if (authorization === "") {
    throw ("401", "no token in headers");
  }
  let token;
  try {
    token = await jwt.verify(authorization, "ttt");
  } catch (err) {
    ctx.throw(401, "token lose");
  }

  await next();
};
