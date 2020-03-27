module.exports = {
    configureWebpack:config=>{
        const plugins = []
        // plugins.push(
        //     new webpack.DllReferencePlugin({
        //         context: __dirname,
        //         manifest: require('./manifest.json'),
        //         scope: 'xyz',
        //         sourceType: 'commonjs2'
        //       })
        // )
        config.plugins = [...config.plugins,...plugins]
    }
}