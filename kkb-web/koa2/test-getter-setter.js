const obj = {
    info :{
        name:'rrrr',
        desc:'3434'
    },
    get name(){
        // console.log('get')
        return this.info.name
    },
    set name(val){
        this.info.name = val
    }
}

console.log(obj.name)
obj.name = 'justdoit'
console.log(obj.name)