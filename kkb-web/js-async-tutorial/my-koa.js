const co = require('co')


class MyKoa extends Object{
    constructor(props){
        super(props)
        this.middlewares = []
    }
    use(generator){
        this.middlewares.push(generator)
    }
    listen(){
        this._run()
    }
    _run(){
        const ctx = this
        const middlewares = ctx.middlewares
        co(function*(){
            let prev = null
            let i = middlewares.length
            while(i--){
                prev = middlewares[i].call(ctx,prev)
            }
            yield prev
        })
    }
}


var app = new MyKoa();
app.use(function *(next){
    this.body = '1';
    yield next;
    this.body += '5';
    console.log(this.body);  // 12345
});
app.use(function *(next){
    this.body += '2';
    yield next;
    this.body += '4';
});
app.use(function *(next){
    this.body += '3';
});
app.listen();