# React 全家桶


[更新18](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)

```
pnpm update react react-dom
```


```js
// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
```


## 数据流
https://npmtrends.com/mobx-vs-recoil-vs-redux-vs-zustand

https://redux-toolkit.js.org/

1. redux + redux-kit
2. mobx
3. redoil
4. zustand

## 路由
react-router-dom

https://github.com/remix-run/react-router
