const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack-dev-server-config.js')

const options = {
    contentBase:'./dist',
    hot:true,
    host:'localhost'
}
webpackDevServer.addDevServerEntrypoints(config,options)
const compiler = webpack(config)

const server = new webpackDevServer(compiler,options)

server.listen(3000,'localhost',()=>{
    console.log('dev server listening on prot 3000')
})