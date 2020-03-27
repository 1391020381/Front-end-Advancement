const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");

// tap 注册同步   tapAsync 异步注册

 class Lesson {
     constructor(){
         this.hooks = {
           arch:new SyncHook(['name'])
         }
     }
     tap(){
        this.hooks.arch.tap('node',function(name){
            console.log('node',name)
        })
        this.hooks.arch.tap('react',function(name){
            console.log('react',name)
        })
     }
     start(){
        this.hooks.arch.call('zj')
     }
 }
 let l = new Lesson()
 l.tap()
 l.start() // 启动钩子