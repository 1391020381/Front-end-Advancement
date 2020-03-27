const path = require('path')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
module.exports = {
    mode:"development",
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"./dist")
    },
    resolveLoader:{
            modules:["node_modules","./loaders"]
        },
    module:{
        rules:[
          {
              test:/\.js$/,
              use:["replaceLoader",{
                  options:{
                      name:'开课吧'
                  }
              }]
          }  
        ]
    },
    plugins:[
        new CopyrightWebpackPlugin({
            name:'kkb'
        })
    ]
}