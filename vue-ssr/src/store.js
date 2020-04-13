import Vue from 'vue'
import Vuex from 'vuex'
import { reject } from 'async'
Vue.use(Vuex)

export default (context)=>{
    const store = new Vuex({
        state:{
            name:''
        },
        mutations:{
            changeName(state){
                state.name  = 'justdoit'
            }
        },
        actions:{
            changeName({commit}){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        commit('changeName')
                        resolve()
                    },1000)
                })
            }
        }
    })
    // 如果浏览器执行的时候,我需要将服务器设置的最新状态 替换掉客户端的状态
    if(typeof window !=='undefined' && window.__INITAL_STATE__){
        store.replaceState(window.__INITAL_STATE__)
    }
    return store
}