class AsyncParralleHook{
    constructor(args){
        this.tasks = []
    }
    tapPromise(name,task){
        this.tasks.push(task)
    }
    promise(...args){
        let tasks = this.task.map(task=> task(...args))
        return Promise.all(tasks)
    }
}