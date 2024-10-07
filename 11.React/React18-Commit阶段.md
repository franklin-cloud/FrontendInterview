### commit 阶段

render 阶段的末尾会调用`commitRoot(root)`进入**commit 阶段**，这里的 root 指的就是 fiberRoot，然后会遍历**render 阶段**生成的 effectList，effectList 上的 Fiber 节点保存着对应的 props 变化，之后会遍历 effectList 进行对应的 dom 操作和生命周期、hooks 回调或销毁函数。

### 前置阶段

1. 调用 flushPassiveEffects 执行完所有 effect 的任务;
2. 初始化相关变量;
3. 赋值 firstEffect 给后面遍历 effectList 用;

### mutation 阶段

1. `commitBeforeMutationEffects`
   1）同步执行 `getSnapshotBeforeUpdate`;
   2）异步调度 `useEffect`, 是调度，不是执行。在这个阶段，会把使用了 useEffect 组件产生的生命周期函数入列到 React 自己维护的调度队列中，给予一个普通的优先级，让这些生命周期函数异步执行;
2. `commitMutationEffects`
   1）调用 commitDetachRef 解绑 ref;
   2）根据 effectTag 执行对应的 dom 操作;
   3）切换 fiber 树，root.current = finishedWork;
3. `commitLayoutEffects`
   1）调用 commitLayoutEffectOnFiber 执行相关生命周期函数或者 hook 相关 callback;
   2）执行 commitAttachRef 为 ref 赋值

### mutation 后

1. 根据 `rootDoesHavePassiveEffects` 赋值相关变量
2. 执行 `flushSyncCallbackQueue` 处理 `componentDidMount` 等生命周期或者 `useLayoutEffect` 等同步任务

此时所有的 dom 操作都已经完成，可以访问 dom 了。但由于 JS 线程和浏览器渲染线程是互斥的，因为 JS 虚拟机还在运行，即使内存中的真实 DOM 已经变化，浏览器也没有立刻渲染到屏幕上，此时会进行收尾工作，同步执行对应的生命周期方法，我们说的 componentDidMount，componentDidUpdate 以及 useLayoutEffect(create, deps) 的 create 函数都是在这个阶段被同步执行。

### React 的 useLayoutEffect 和 useEffect 执行时机有什么不同?

赋值给 useEffect 的函数会在组件渲染到屏幕之后执行;
useLayoutEffectshi 在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。
