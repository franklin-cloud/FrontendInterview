### 渲染模式

主体函数的入口有 3 种模式：

- legacy 模式： `ReactDOM.render(<App />, rootNode)`,这是当前 React app 使用的方式。
- blocking 模式： `ReactDOM.createBlockingRoot(rootNode).render(<App />)`。
- concurrent 模式： `ReactDOM.createRoot(rootNode).render(<App />)`。

  [concurrent 官方文档](https://zh-hans.reactjs.org/blog/2021/12/17/react-conf-2021-recap.html#react-18-and-concurrent-features)

### legacy 模式

它构建 dom 的过程是同步的，所以在 render 的 reconciler 中，如果 diff 的过程特别耗时，那么导致的结果就是 js 一直阻塞高优先级的任务(例如用户的点击事件)，表现为页面的卡顿，无法响应。
**所有更新都是同步调度，没有优先级之分**

### concurrent 模式

#### 时间分片

该模式下当更新任务的 render 过程无法在浏览器的一帧内完成时，会被分为多个 task 进行**可中断的更新**，以此来保证浏览器每一帧都有空余时间进行绘制，可以说时间分片是 concurrent 的实现基础。

#### 更新优先级

更新任务会带有优先级，低优先级任务的执行将让位于高优先级任务。同一上下文中的高优先级任务将优先执行；不同上下文中的高优先级任务将打断正在执行的低优先级任务。

- 开启并发特性后更新任务将带有优先级，click 事件的更新优先级高于接口请求的更新优先级，因而前者会打断后者的 render 过程优先执行。
- 当更新的 render 流程过于耗时而超过浏览器一帧的时间时，更新任务将被分割为多个 task 进行可中断的更新，每个 task 的执行时间不超过 16ms（time slice）。这使得浏览器的每一帧中有空余时间进行绘制，点击事件的更新可以优先呈现到视图中。
- 渲染阶段（commit）是不可被打断的。

> 1. legacy 模式在合成事件中有自动批处理的功能，但仅限于一个浏览器任务。非 React 事件想使用这个功能必须使用 unstable_batchedUpdates。
> 2. 在 blocking 模式和 concurrent 模式下，所有的 setState 在默认情况下都是批处理的。
