// import Koa from 'koa'
// import path from 'path'
// import resource from 'koa-static'

// const app = new Koa()
// const host = 'localhost'
// const port = 5999

// app.use(resource(path.join(__dirname, './static')))

// app.listen(port, () => {
//   console.log(`server is listen in ${host}:${port}`)
// })


// import Koa from 'koa'
// import path from 'path'
// import resource from 'koa-static'

// const app = new Koa()
// const host = 'localhost'
// const port = 5999

// app.use(async (ctx, next) => {
//   ctx.set({
//     'Cache-Control': 'max-age=5'  
//   })
//   await next()
// })

// app.use(resource(path.join(__dirname, './static')))

// app.listen(port, () => {
//   console.log(`server is listen in ${host}:${port}`);
// })



import Koa from 'koa'
import path from 'path'
import resource from 'koa-static'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'

const app = new Koa()
const host = 'localhost'
const port = 5999

app.use(conditional())
app.use(etag())
app.use(resource(path.join(__dirname, './static')))

app.listen(port, () => {
 console.log(`server is listen in ${host}:${port}`)
})

















