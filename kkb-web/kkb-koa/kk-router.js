// 搞个小路由


const router = {}

router['/login'] = ctx =>{
    ctx.body = {
        resultCode:1,
        result:{
            name:''
        }
    }
}