const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry:{
        vendors:[
            "vue","vuex",'vue-router'
        ]
    },
    output:{
        filename:'[name].dll.js',
        path:path.resolve(__dirname,'./dll')
    },
    plugins:[
        new webpack.DllPlugin({
            context:__dirname,
            name:'[name]_[hash]',
            path: path.join(__dirname, 'manifest.json')
        })
    ]
}


