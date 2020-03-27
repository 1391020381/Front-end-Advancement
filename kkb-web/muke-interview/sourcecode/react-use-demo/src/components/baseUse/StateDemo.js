import React,{Component} from "react"

export default class StateDemo extends Component{
    constructor(props){
        super(props)
        this.state = {
            count:0
        }
    }
   increase = ()=>{
       this.setState({
           count:this.state.count + 1
       })
   }
    render(){
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.increase}>累加</button>
            </div>
        )
    }
}