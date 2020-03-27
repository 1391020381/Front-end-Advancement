const  compiler = require('vue-template-compiler')

var  template = `<p>{{message}}</p>`
// with(this){return _c('p',[_v(_s(message))])}


template = `<p>{{flag?message:'no message found'}}</p>`
// with(this){return _c('p',[_v(_s(flag?message:'no message found'))])}

template = `<div id="div1" class="container" @click="handleClick">
    <img :src="imgUrl">
</div>`

// with(this){
//     return _c('div',
//     {
//     staticClass:"container",
//     attrs:{"id":"div1"},
//     on:{"click":handleClick}
// },
//     [_c('img',{attrs:{"src":imgUrl}})])
// }

const res = compiler.compile(template)

console.log(res.render) 
// function installRenderHelpers(target){}


// _v   createTextVnode
// _s    toString
// _l   renderList
