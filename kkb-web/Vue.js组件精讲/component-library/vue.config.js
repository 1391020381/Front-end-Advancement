const path = require('path')
const resolve = dir => path.join(__dirname,dir)
const IS_PROS = ["production","pro"].includes(process.env.NODE.ENV)

module.exports = {
runtimeCompiler: true,
 chainWebpack:config=>{
     // 添加别名
     config.resolve.alias
        .set("@",resolve("src"))
        .set("@mixins",resolve("src/mixins"))
        .set("@components",resolve("src/components"))
        .set("@views",resolve("src/views"))
        .set("@utils",resolve("src/utils"))
 }
}