import Alert from './alert.vue'
import Vue from 'vue'

Alert.newInstance = properties =>{
    console.log(properties,'newInstance')
    const props = properties || {}
    const Instance = new Vue({
        data:props,
        render(h){
            return h(Alert,{
                props:props
            })
        }
    })
    const component = Instance.$mount()
    console.log('composnent:',component)
    document.body.appendChild(component.$el) // 先挂再 一个实例
    const alert = Instance.$children[0]
    return {
        add(noticeProps){
            alert.add(noticeProps)
        },
        remove(name){
            alert.remove(name)
        }
    }
}

export default Alert