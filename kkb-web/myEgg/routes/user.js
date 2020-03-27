module.exports = {
//    /user/
  "get /": async app => {
    const name = await app.$service.user.getName()
    app.ctx.body = "用户" + name;
  },
  // /user/info
  "get /detail": app => {
    app.ctx.body = "用户年龄"+ app.$service.user.getAge();
  }
 }