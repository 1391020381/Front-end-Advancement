class SyncBailHook{ // 返回非 undefined 就停止 
    constructor(args){
        this.tasks = []
    }
    tap(name,task){
        // this.tasks.push(task)
        let ret 
        let index  = 0
        do{
            ret = this.tasks[index++](...args)
        }while(ret === undefined && index<this.tasks.length)
    }
    call(...args){
        this.tasks.forEach(task=>task(...args))
    }
}


let hook = new SyncBailHook(['name'])

hook.tap('react',function(name){
    console.log('react',name)
    return 'zj'
})
hook.tap('node',function(name){
    console.log('node',name)
})
hook.call('zj')