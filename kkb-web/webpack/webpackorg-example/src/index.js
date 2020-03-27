import './a'
import './b'
import './c.css'
import('./async-module').then(a=>{
    console.log(a)
})
console.log('index.js')