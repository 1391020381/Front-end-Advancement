<template>
  <div class="alert">
          <div class="alert-main" v-for="item in notices" :key="item.name"> 
              <div class="alert-content">
                  {{item.content}}
              </div>
          </div>
      </div>
</template>

<script>
let seed = 0
function getUuid(){
    return 'alert_' + (seed++)
}
export default {
  name:"iAlert",
  components: {},
  props: {},
  data() {
    return {
        notices:[]
    }
  },
  created() {},
  mounted() {},
  activited() {},
  methods: {
      add({duration,content}){
          console.log('alert-add:',duration,content,this.notices)
          const name = getUuid()
          let _notice = Object.assign({name:name},{content})
          this.notices.push(_notice)
          setTimeout(()=>{
          this.remove(name)
          },duration*1000)
      },
      remove(name){
          const notices = this.notices
          for(let i =0;i<notices.length;i++){
              if(notices[i].name === name){
                  this.notices.splice(i,1)
                  break
              }
          }
      }
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" >
.alert{
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0;
    text-align: center;
    pointer-events: none;
  }
  .alert-content{
    display: inline-block;
    padding: 20px 30px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    margin-bottom: 8px;
  }
</style>
