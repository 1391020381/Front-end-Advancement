class CopyrightWebpackPlugin{
    constructor(options){
        console.log("CopyrightWebpackPlugin:",options)
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync("CopyrightWebpackPlugin",(compilation,cb)=>{
            compilation.assets["copyright.txt"] = {
                source:function(){
                    return 'copyright'
                },
                size:function(){
                    return 20
                }
            }
            cb();
        })
    }
}

module.exports = CopyrightWebpackPlugin