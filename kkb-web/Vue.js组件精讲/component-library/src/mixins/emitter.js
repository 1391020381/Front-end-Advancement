function broadcast(componentName,eventName,params){
    this.$children.forEach(child=>{
        const name = child.$options.name
        if(name === componentName){
            child.$emit.apply(child,[eventName].concat(params))
        }else{
            broadcast.apply(child,[componentName,eventName].concat([params]))
        }
    })
}

export default{
   methods:{
       dispatch(componentName,eventName,params){ 
           // componentName 需要找到的组件名称

           // 从当前组件 向上找 componentName 
           // 首先获取 当前组件的 $parent 并获取到 name
           // 当父组件存在 但  name 与 componentName 不一致就一直向上查询
           // 当向上查询 name === componentName 时 while 不执行 执行$emit方法
           let parent = this.$parent || this.$root
           let name = parent.$options.name
           while(parent && (!name||name!==componentName)){
               parent = parent.$parent
               if(parent){
                   name = parent.$options.name
               }  
           }
           if(parent){
               parent.$emit.apply(parent,[eventName].concat(params))
           }
       },
       broadcast(componentName,eventName,params){
           broadcast.call(this,componentName,eventName,params)
       }
   }
}