# 官网阅读

[指南](https://vuejs.org/guide/introduction.html)

https://sfc.vuejs.org/

## 简介

`declarative`  声明式 , 就像打车的时候我们跟司机打个说目的地，中间怎么走交给自动的导航（响应式，组件化，虚拟dom）

对应的命令式（jquery）

前面红绿灯右转，走200米，然后左转走200米，上高架... 每个步骤都手写

```js
let input = document.querySelector('#input')
input.addEventListener('input',function(){
  document.querySelector('#app').innerHTML = input.value
},false)
```
声明式的本质也是内部执行命令式代码，只不过有自动导航系统，开发效率高

命令式性能好，不过如果不认识路，忘写代码就有bug

::: tip 浏览器体验下Vue
:::

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .done{
      color:gray;
      text-decoration: line-through;
    }
  </style>
</head>
<body>
  <div id="vue-app">
    <h1>{{title}}语法入门</h1>
    <input type="text" v-model="title" @keydown.enter="addTodo">
    <button @click="addTodo">添加</button>
    <button v-if="active<all" @click="clear">清理</button>
    <!-- <span v-else>快去完成把</span> -->
    <!-- <ol>
      <li v-for="todo in todos">{{todo}}</li>
    </ol> -->
    <!-- :style="{color:todo.done?'#eee':'black'}" -->
    <ul>
      <li v-for="(todo,i) in todos">
        {{i+1}}:
        <input type="checkbox" v-model="todo.done">
        <span :class="{done:todo.done}">
          {{todo.title}}
        </span>
      </li>
    </ul>
    <div>
      全选 <input type="checkbox" v-model="allDone">

      {{active}} / {{all}}
    </div>
    <!-- <table></table> -->

  </div>
  
  <script src="https://unpkg.com/vue@3"></script>
  <script>
    // console.log(localStorage.getItem('name'))
    // localStorage.setItem('name','vue3入门')
    // h2标签的内容 和input的值一样，都是一个变量
    let TODO_KEY = 'todos'

    const App = {
      data(){
        return {
          title: "vuejs",
          todos:JSON.parse(localStorage.getItem(TODO_KEY)) || [],
          showBtn:true
        }
      },
      computed:{
        active(){
          return this.todos.filter(todo=>!todo.done).length
        },
        all(){
          return this.todos.length
        },
        allDone:{
          get(){
            return this.active===0
          },
          set(val){
            this.todos.forEach(function(todo){
              todo.done = val
            })
          }
        }
      },
      watch:{
        todos:{
          handler(val, oldVal) {
            localStorage.setItem(TODO_KEY, JSON.stringify(this.todos))
          },
          deep: true
        }
      },
      methods:{
        addTodo(){
          this.todos.push({
            title:this.title,
            done:false
          })
          // localStorage.setItem(TODO_KEY, JSON.stringify(this.todos))
          this.title = ''
          // alert(this.title)
          // alert('hello')
        },
        clear(){
          this.todos = this.todos.filter(todo=>!todo.done)
        }
      }
    }
    // 启动vue应用
    Vue.createApp(App).mount('#vue-app')
  </script>
</body>
</html>
```

[Single-File Components](https://sfc.vuejs.org/)
build-tool-enabled  构建工具，像webpack vite等等环境
构建工具就像是化妆品+好看的衣服，我们出门前包装一下，更精致 

不用构建工具，就是家里啥样直接出门，所见即所得，简单粗暴

`Progressive` 渐进式，
就像一个英雄，能打辅助，能打野，也能打上单，Vue可以直接在浏览器里引入就开发，也可以配合构建工具和全家桶开发复杂项目 ,可以逐步增强


`Compositon ` 和 `Option`的区别
函数式写法 VS 对象式写法

::: tip 体验一下
:::

`Component` 组件化


## 快速开始


