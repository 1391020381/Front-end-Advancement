# JSX基本使用
* 变量表达式
* class style
* 子元素和组件 props  this.props.children

# 条件判断
* if else
* 三元表达式
* 逻辑运算符 && || 

# 列表渲染
* map
* key

# 事件
* bind this   a = ()=>{} 
    - this 默认是 undefined 可以在 constructor 或者 在使用函数的时候 使用 bind
* 关于 event参数
    - SyntheticEvent 组合事件 模拟dom事件所有能力
    - event.nativeEvent 原生事件对象
    - 所有事件都被挂载到 document上

    - vue 的 event是原生的 事件被挂载到当前元素
* 传递自定义参数
    - 最后一个参数是 event

# 表单
* 受控组件
* 非受控组件
* input textarea select 用 value
* checkbox radio 用  checked
* label  htmlFor
* onChange = ()=>{ this.setState({name:e.target.value})}
 
 # 组件使用 
 * props 传递数据
 * props 传递函数
 * props 类型检查    PropTypes

 # setState
 * 不可变值   setState不改变原来  state值  基本api 不满足 可以生成副本 再做其他操作
    - concat [... list]  filter 数组
    - Object.assign({},this.state.obj,{a:100})  {...this.state.obj,a:100}
 * 可能是异步更新
    - this.setState({},()=>{})
    - setTimeout(()=>{ this.setState({count:this.state.count+1};console.log(this.state.count))},0)
    - document.body.addEventListener("click",()=>{  this.setState({count:this.state.count+1};console.log(this.state.count))  })
 * 可能会被合并
    - setState({})  会合并
    - setState((prevState,props)=>{ return { count:prevState.count+1}}) 不会合并

# 组件生命周期  挂载 更新 销毁
* 单个生命周期 
* 父子组件生命周期 和 Vue的一样

# React高级特性
* 函数组件
    - 纯函数  输入 props 输入 jsx
    - 没有实例  没有生命周期 没有state
    - 不能扩展其他方法
* 非受控组件
    - ref
    - defaultValue defaultChecked
    - 手动操作 DOM元素

    - 必须手动操作 dom元素 setState 实现不了
    - 文件上传 <input type="file">
    - 某些富文本编辑器 需要传入 dom元素



    - 优先使用受控组件  必须操作dom时 再使用非受控组件

 ```
 constructor(){
     this.nameInputRef = React.createRef()
     this.fileInputRef = React.createRef()
 }
 <input defaultValue={this.state.name} ref={this.nameInputRef}/>

alertName = ()=>{
    const elem = this.nameInputRef.current
    console.log(elem.value)
}

<input type="file" ref={this.fileInputRef}/>
 ```   
* Portals
    - 组件默认会按照既定层次嵌套渲染
    - 如何让组件渲染到父组件以外
    - import ReactDOM from ’react-dom‘
    - ReactDOM.createPortal(<div>{this.props.children}</div>,document.body)
    - Portals 使用场景  
    - overflow:hidden
    - 父组件 z-index值太小
    - fixed 需要放在 body 第一层级
* context
    - const MyContext = React.createContext(defaultValue);
    - <MyContext.Provider value={/* 某个值 */}>
    - Context.Consumer  函数式组件
    - Context。contextType
* 异步组件
    - import
    - React.lazy(()=> import())
    - React.Suspense 包裹  React.lazy加载的组件  并显示 loading
* 性能优化    
    - shouldComponentUpdate  默认返回true 为什么还可以自己定制
    - PureComponent 和 React.memo
    - 不可变值 immutable.js  彻底拥抱 不可变值

    - React 默认 父组件有更新  子组件则无条件也更新
    - 例如一个 todoList 应用   一个父组件 state   一个input组件 一个 List 组件  一个footer组件 （footer组件中的文字是不变的，但是由于 React 默认父组件有更新 子组件则无条件也更新 ，当有 input输入时, state改变 此时  List 和 footer都会render。 footer的渲染是多余的,此时可以在 footer的 shouldComponentUpdate(nextProps,nextState){}来判断） 

    - shouldComponentUpdate 需要的时候才优化
    - 例如 在改变 state 的时候 没有遵循 不变值的原则 使用 push改变 state 但是在 list的shouldComponentUpdate中又对 nextProps和 this.props.list 进行比较 一致的化 返回 false 不渲染。 如果 React 内部做了此类优化的化,对开发这不友好,不知道哪里出错啦。

    - shouldComponentUpdate 默认返回true 即React 默认重新渲染所有子组件
    - 必须配合 “不可变值” 一起使用
    - 可先不用 shouldComponentUpdate 有性能问题时再考虑使用
* PureComponent和 memo
    - PureComponent 在 shouldComponentUpdate中实现了浅比较 React.PureComponent
    - memo  函数式组件的    PureComponent
    - state 层级浅一点

 ```
function MyComponent(props){
    // 使用props 渲染
}
function areEqual(prevProps,nextProps){
    // 一致的化返回 false
}

export default React.memo(MyComponent,areEqual)
 ```   


* 高级组件 HOC
    - 接受一个组件 返回一个组件

```

const HOCFactory = (Component) =>{
    class HOC extends React.Component{
        render(){
            return <Component {...this.props}/>
        }
    }
    return HOC
}
const EnhancedComponent1 = HOCFactory(WrappedComponent1)

const withMouse = (Component) =>{
    class withMouseComponent extends React.Component{
        constructor(props){
            super(props)
            this.state = {x:0,y:0}
        }
        handleMouseMove = (event)=>{
            this.setState({
                x:event.clientX,
                y:event.clientY
            })
        }
        render(){
            return (
                <div style={{height:"500px"}} onMouseMove={this.handleMouseMove}>
                <!-- 1. 透传所有 props 2 增加 mouse 属性 -->
                <Component {...this.props} mouse={this.sate}>
                </div>
            )
        }
    }
}


const App = (props)=>{
    const {x,y} = props.mouse
    return (
        <div style={{height:'500px'}}>
            <h1>The mouse position is ({x},{y})</h1>
        </div>
    )
}

export default withMouse(App)


// 例如 react-redux  中的 connect
```
* Render Props


```
// Render Props 的核心思想
// 通过 一个函数将 class 组件 的 state 作为 props 传递给纯函数组件渲染


const App = ()=>{
    <Factory render={
        // render 是一个函数组件
        （props）=> <p>{props.a}{props.b}</p>
    }/>
}

class Factory extends React.Component{
    constructor(){
        this.state = {
             // state 即多个组件的公共逻辑的数据
        }
    }
    render(){
        return <div>{this.props.render(this.state)}</div>
    }
}

```
# Redux使用
* 基本概念 
    - 创建reducer function reducer(state=0,action){} 不同的 action返回不同的 state
    - store = createStore(reducer)
    - store.subscribe(()=>{}) 定义
    - store.dispatch({type:"add"}) dispatch action
* 单项数据流
* react-redux
    - <Provider>
    - connect
    - mapStateToProps
    - mapDispatchToProps
* 异步action
```
export const addTodo = text =>{
    return {
        type:"ADD_TODO",
        id:nextTodoId++,
        text
    }
}

export const addTodoAsync = text=>{
    return (dispatch)=>{
        fetch(url).then(res=>{
            dispatch(addTodo(res.text))
        })
    }
}
<!-- redux-thunk -->
 createStore(reducer,applyMiddleware(thunk))

```
* 中间件 在 dispatch中增加逻辑

# react-router
    - 路由模式  hash  h5history
    - 路由懒加载