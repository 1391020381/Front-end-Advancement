class SyncHook{  // 可以传递参数
    constructor(args){
        this.tasks = []
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
        let [first,...others] = this.tasks
        let ret = first()
        others.reduce((a,b)=>{
            return b(a)
        },ret)
    }
}


let hook = new SyncHook(['name'])

hook.tap('react',function(name){
    console.log('react',name)
})
hook.tap('node',function(name){
    console.log('node',name)
})
hook.call('zj')