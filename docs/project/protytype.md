# 原型链污染

最近`Evil.js`被讨论的很多，项目介绍如下
![](https://cdn.jsdelivr.net/gh/course-dasheng/fullstack/docs/public/2022-08-22-16-17-24.png)

项目被发布到npm上后，引起了激烈的讨论，最终因为安全问题被npm官方移除，代码也闭源了

作为一个前端老司机，我肯定是反对这种行为，泄私愤有很多种方式，代码里下毒会被git log查到，万一违法了，还不如离职的时候给老板一个大逼兜来的解恨

今天我们来讨论一下，如果你作为项目的负责人，如何甄别这种代码下毒

[欢迎加入前端学习](https://shengxinjing.cn/support.html)，一起上王者

## 下毒手法

最朴实无法的下毒手法就是直接替换函数，比如evil.js中，给JSON.stringify下毒了，把里面的I换成了l ，每周日prmise的then方法有10%的概率不触发，只有周日能触发着实有点损了



```js
function isEvilTime(){
  return new Date().getDay() === 0 && Math.random() < 0.1 
}
const _then = Promise.prototype.then
Promise.prototype.then = function then(...args) {
  if (isEvilTime()) {
    return
  } else {
    _then.call(this, ...args)
  }
}

const _stringify = JSON.stringify
JSON.stringify = function stringify(...args) {
  return _stringify(...args).replace(/I/g, 'l') 
}
console.log(JSON.stringify({name:'Ill'})) // {"name":"lll"}


```

## 检测函数toString

检测函数是否被原型链投毒，我首先想到的方法就是检测代码的toString，默认的这些全局方法都是内置的，我们在命令行里执行一下

![](https://cdn.jsdelivr.net/gh/course-dasheng/fullstack/docs/public/2022-08-22-16-17-49.png)

我们可以简单粗暴的检查函数的toString

```js
function isNative(fn){
  return fn.toString() === `function ${fn.name}() { [native code] }`
}

console.log(isNative(JSON.parse)) // true
console.log(isNative(JSON.stringify)) // false

```

不过我们可以直接重写函数的toString方法，返回native这几个字符串，就可以越过这个检查

```js

JSON.stringify = ...
JSON.stringify.toString = function(){
  return `function stringify() { [native code] }`
}
function isNative(fn){
  return fn.toString() === `function ${fn.name}() { [native code] }`
}
console.log(isNative(JSON.stringify)) // true
```

## iframe 

我们还可以在浏览器里通过iframe创建一个被隔离的window, iframe被加载到body后，获取iframe内部的contentWindow

```js
let iframe = document.createElement('iframe')
iframe.style.display = 'none'
document.body.appendChild(iframe)
let {JSON:cleanJSON} = iframe.contentWindow
console.log(cleanJSON.stringify({name:'Illl'}))  // '{"name":"Illl"}'
```

这种解决方案对运行环境有要求，iframe只有浏览器里才有， 而且攻击者够聪明的话，iframe这种解决方案也可以被下毒,重写appendChild函数，当加载进来的标签是iframe的时候，重写contentWindow的stringify方法

```js
const _stringify = JSON.stringify
let myStringify = JSON.stringify = function stringify(...args) {
  return _stringify(...args).replace(/I/g, 'l')
}

// 注入
const _appenChild = document.body.appendChild.bind(document.body)
document.body.appendChild = function(child){
  _appenChild(child)
  if(child.tagName.toLowerCase()==='iframe'){
    // 污染
    iframe.contentWindow.JSON.stringify = myStringify
  }
}

// iframe被污染了
let iframe = document.createElement('iframe')
iframe.style.display = 'none'
document.body.appendChild(iframe)
let {JSON:cleanJSON} = iframe.contentWindow
console.log(cleanJSON.stringify({name:'Illl'}))  // '{"name":"llll"}'

```


## node 的vm模块
node中也可以通过vm模块创建一个沙箱来运行代码，[教程可以看这里](https://zhuanlan.zhihu.com/p/106503378)，不过这对我们代码的入侵性太大了，适用于发现bug后的调试某段具体的代码，并且没法再浏览器里直接用

```js
const vm = require('vm')

const _stringify = JSON.stringify
JSON.stringify = function stringify(...args) {
  return _stringify(...args).replace(/I/g, 'l')
}
console.log(JSON.stringify({name:'Illl'}))
let sandbox = {}
vm.runInNewContext(`ret = JSON.stringify({name:'Illl'})`,sandbox)
console.log(sandbox)
```

## ShadowRealm API
TC39有一个新的ShadowRealm api，已经stage3了，可以手动创建一个隔离的js运行环境，被认为是下一代微前端的利器，不过现在兼容性还不太好，代码看起来有一丢丢像eval，不过和vm的问题一样，需要我们指定某段代码执行

更多ShadowRealm的细节可以参考贺老的这个回答 [如何评价 ECMAScript 的 ShadowRealm API 提案](https://www.zhihu.com/question/507404363)


```js
const sr = new ShadowRealm()
console.log( sr.evaluate(`JSON.stringify({name:'Illl'})`) )

```

## Object.freeze

我们还可以项目代码的入口处，直接用Object.freeze冻住相关函数，确保不会被修改, 所以下面的代码会打印出`{"name":"Illl"}`，但是有些框架会对原型链进行适当的修改（比如Vue2里对数组的处理），而且我们在修改stringify失败的时候没有任何提醒，所以此方法也慎用，可能会导致你的项目里有bug

```js

!(global => { 
  ;['JSON','Date'].forEach(n=>Object.freeze(global[n]))
  ;['Promise','Array'].forEach(n=>Object.freeze(global[n].prototype))
})((0, eval)('this'))
// 下毒
const _stringify = JSON.stringify
let myStringify = JSON.stringify = function stringify(...args) {
  return _stringify(...args).replace(/I/g, 'l')
}

// 使用
console.log(JSON.stringify({name:'Illl'}))
    
```

## 备份检测
还有一个很简单的方法，我们可以在项目启动的一开始，就备份一些重要的函数，比如Promise，Array原型链的方法，JSON.stringify、fetch、localstorage.getItem等方法, 然后在需要的时候,运行检测函数, 判断`Promise.prototype.then`和我们备份的是否相等，就可以甄别出原型链有没有被污染 ,我真是一个小机灵

首先我们要备份相关函数，由于我们需要检查的不是很多，就不需要对window进行遍历了，指定几个重要的api函数，都存在了`_snapshots`对象里


```js
// 这段代码一定要在项目的一开始执行
!(global => { 
  const MSG = '可能被篡改了，要小心哦'
  const inBrowser = typeof window !== 'undefined'
  const {JSON:{parse,stringify},setTimeout,setInterval} = global
  let _snapshots = {
    JSON:{
      parse,
      stringify
    },
    setTimeout,
    setInterval,
    fetch
  }
  if(inBrowser){
    let {localStorage:{getItem,setItem},fetch} = global
    _snapshots.localStorage = {getItem,setItem}
    _snapshots.fetch = fetch
  }
})((0, eval)('this'))

```

除了直接调用的JSON，setTimeout，还有Promise，Array等原型链上的方法，我们可以通过getOwnPropertyNames获取后，备份到`_protytypes`里，比如Promise.prototype.then 存储的结果就是
```js
// _protytypes
{
  'Promise.then': function then(){ [native code]}
}
```

```js
!(global => { 
  let _protytypes = {}
  const names = 'Promise,Array,Date,Object,Number,String'.split(",")

  names.forEach(name=>{
    let fns = Object.getOwnPropertyNames(global[name].prototype)
    fns.forEach(fn=>{
      _protytypes[`${name}.${fn}`] = global[name].prototype[fn]
    })
  })
  console.log(_protytypes)
})((0, eval)('this'))

```
![](https://cdn.jsdelivr.net/gh/course-dasheng/fullstack/docs/public/2022-08-22-16-19-28.png)


然后我们在global上注册一个检测函数`checkNative`就可以啦，存储在_snapshot和_prototype里的内容，嘎嘎遍历出来，和当前运行时获取的JSON，Promise.prototype.then对比就可以啦， 还可以加一个reset参数，直接把污染的函数还原回去

代码比较粗糙，大家凑合看，函数也就两层嵌套，直接暴力循环 ，欢迎有志之士优化


```js

global.checkNative = function (reset=false){
  for (const prop in _snapshots) {
    if (_snapshots.hasOwnProperty(prop) && prop!=='length') {
      let obj = _snapshots[prop]
      // setTimeout顶层的
      if(typeof obj==='function'){
        const isEqual = _snapshots[prop]===global[prop]
        if(!isEqual){
          console.log(`${prop}${MSG}`)
          if(reset){
            window[prop] = _snapshots[prop]
          }
        }
      }else{
        // JSON这种还有内层api
        for(const key in obj){
          const isEqual = _snapshots[prop][key]===global[prop][key]
          if(!isEqual){
            console.log(`${prop}.${key}${MSG}`)
            if(reset){
              window[prop][key] = _snapshots[prop][key]
            }
          }
        }
      }

    }
  }
  // 原型链
  names.forEach(name=>{
    let fns = Object.getOwnPropertyNames(global[name].prototype)
    fns.forEach(fn=>{
      const isEqual = global[name].prototype[fn]===_protytypes[`${name}.${fn}`]
      if(!isEqual){
        console.log(`${name}.prototype.${fn}${MSG}`)
        if(reset){
          global[name].prototype[fn]=_protytypes[`${name}.${fn}`]
        }
      }
    })
  })
}

```

我们测试一下代码，可以看到checkNative传递reset是true后，打印且重置了我们污染的函数，JSON.stringify的行为也符合我们的预期

```html
<script src="./check-native.js"></script>
<script src="./evil.js"></script>
<script>
function isNative(fn){
  return fn.toString() === `function ${fn.name}() { [native code] }`
}
let obj = {name:'Illl'}
console.log(obj)
console.log('isNative',isNative(JSON.stringify))
console.log('被污染了',JSON.stringify(obj)) 

let iframe = document.createElement('iframe')
iframe.style.display = 'none'
document.body.appendChild(iframe)
let {JSON:cleanJSON} = iframe.contentWindow
console.log('iframe也被污染了',cleanJSON.stringify(obj)) 
console.log('*'.repeat(20))

checkNative(true)
console.log('checkNative重置了',JSON.stringify(obj)) 
</script>
```
![](https://cdn.jsdelivr.net/gh/course-dasheng/fullstack/docs/public/2022-08-22-16-19-46.png)
![](https://cdn.jsdelivr.net/gh/course-dasheng/fullstack/docs/public/2022-08-22-20-11-22.png)
## 总结

好像没啥总结得了，祝大家天天开心，做一个开心的程序员，回见

[代码在Github](https://github.com/course-dasheng/check-native/tree/main)

[在线环境在StackBlitz](https://stackblitz.com/edit/web-platform-72jjnl?devToolsHeight=80&file=index.html)
