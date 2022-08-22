
# Hooks封装


## useEvent

```ts
import {useRef,useCallback,useLayoutEffect} from 'react'
// 实现一个技能缓存函数，又能获取最新组件内部状态的工具函数

type Fn = ()=>void
export function useStableCallback(callback:Fn){
  const callbackRef = useRef<null|Fn>(null)

  useLayoutEffect(()=>{
    callbackRef.current = callback
  })
  return useCallback(()=>{
    // 直接获取最新的callback指向，内部就会有最新的state
    const callback = callbackRef.current as Fn
    return callback()
  },[])
  // callbackRef.current
}
```