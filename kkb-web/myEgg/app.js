const koa = require('koa')
const {initRouter,initController,initService} = require('./loader')
class myEgg{
    constructor(conf){
        this.$app = new koa(conf)
        this.$service = initService()
        this.$ctrl = initController()
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }
    start(port){
        this.$app.listen(port,()=>{
            console.log(`myEgg服务启动成功:端口为${port}`)
        })
    }
}
module.exports = myEgg