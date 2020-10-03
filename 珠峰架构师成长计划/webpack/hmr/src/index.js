let root = document.getElementById('root')
function render(){
    let title = require('./title').default
    root.innerHTML = title
}
render()

if(module.hot){
    module.hot.accept(['./title.js'],()=>{
        render()
    })
}