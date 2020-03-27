<template>
 <table>
     <head>
         <tr>
             <th v-for="(col,index) in columns" :key="index">{{col.title}}</th>
         </tr>
     </head>
   <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col,index) in columns" :key="index">
          <template v-if="'render' in col">
            <Render :row="row" :column="col" :index="rowIndex" :render="col.render"></Render>
          </template>
          <template v-else>{{ row[col.key] }}</template>
        </td>
      </tr>
    </tbody>
 </table>
</template>

<script>
// let columns = [
//   {
//     title: '姓名',
//     key: 'name'
//   },
//   {
//     title: '年龄',
//     key: 'age'
//   }
// ]
// let data = [
//   {
//     name: '王小明',
//     age: 18
//   },
//   {
//     name: '张小刚',
//     age: 25
//   }
// ]
import Render from './render.js'
export default {
  name:"iTable",
  components: {Render},
  props: {
      columns:{
          type:Array,
          defalut(){
              return []
          }
      },
      data:{
          type:Array,
          defalut(){
              return []
          }
      }
  },
  data() {
    return {

    };
  },
  created() {},
  mounted() {},
  activited() {},
  methods: {

  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" scoped>
table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th{
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  table td, table th{
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
</style>
