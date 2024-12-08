## 前言

Event Loop 即事件循环，是指浏览器或 Node 的一种解决 javaScript 单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

#### 为啥要弄懂 Event Loop

是要增加自己技术的深度，也就是懂得 JavaScript 的运行机制。
现在在前端领域各种技术层出不穷，掌握底层原理，可以让自己以不变，应万变。
应对各大互联网公司的面试，懂其原理，题目任其发挥。

#### Event Loop 是什么

event loop 是一个执行模型，在不同的地方有不同的实现。浏览器和 Node.js 基于不同的技术实现了各自的 Event Loop。
浏览器的 Event Loop 是在 html5 的规范中明确定义。
NodeJS 的 Event Loop 是基于 libuv 实现的。可以参考 Node 的官方文档以及 libuv 的官方文档。
libuv 已经对 Event Loop 做出了实现，而 HTML5 规范中只是定义了浏览器中 Event Loop 的模型，具体的实现留给了浏览器厂商。

#### 浏览器架构图

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d6f4972fd6a0b5c921e8edb4e0a34e97.png)

#### Node.js 架构图

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2a8823ffba1b6484784c17c167860c4d.png)

#### 宏任务和微任务

宏任务，macrotask，也叫 tasks。一些异步任务的回调会依次进入 macro task queue，等待后续被调用，这些异步任务包括：
setTimeout
setInterval
setImmediate (Node 独有)
requestAnimationFrame (浏览器独有)
I/O
UI rendering (浏览器独有)

微任务，microtask，也叫 jobs。 另一些异步任务的回调会依次进入 micro task queue，等待后续被调用，这些异步任务包括：
process.nextTick (Node 独有)
Promise.then()
Object.observe
MutationObserver
（注：这里只针对浏览器和 NodeJS）

注意：Promise 构造函数里的代码是同步执行的。

#### 浏览器端和 Node 端有什么不同

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1fa00aa94b92392405ca24ea05aefa6e.png)
//浏览器 1 3 2
//node 1 2 3

#### 浏览器的 Event Loop

一个函数执行栈、一个事件队列和一个微任务队列。

每从事件队列中取一个事件时有微任务就把微任务执行完，然后才开始执行事件
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/41dc23e097140b79616f86506e28d90a.png)

#### Node 端的 Event Loop

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/236bafe9691197ff5b564575eef1a87e.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/fe7916230f0e5146f3a050a3d395dfeb.png)
Node.js 的 Event Loop 过程： 1.执行全局 Script 的同步代码 2.执行 microtask 微任务，先执行所有 Next Tick Queue 中的所有任务，再执行 Other Microtask Queue 中的所有任务 3.开始执行 macrotask 宏任务，共 6 个阶段，从第 1 个阶段开始执行相应每一个阶段 macrotask 中的所有任务，注意，4.这里是所有每个阶段宏任务队列的所有任务，在浏览器的 Event Loop 中是只取宏队列的第一个任务出来执行，每一个阶段的 macrotask 任务执行完毕后，开始执行微任务，也就是步骤 2
4.Timers Queue -> 步骤 2 -> I/O Queue -> 步骤 2 -> Check Queue -> 步骤 2 -> Close Callback Queue -> 步骤 2 -> Timers Queue ...... 5.这就是 Node 的 Event Loop

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0113ca4859f52f03fb053fb22b201f05.png)

#### 总结

1.浏览器的 Event Loop 和 Node.js 的 Event Loop 是不同的，实现机制也不一样，不要混为一谈。
2.Node.js 可以理解成有 4 个宏任务队列和 2 个微任务队列，但是执行宏任务时有 6 个阶段。
3.Node.js 中，先执行全局 Script 代码，执行完同步代码调用栈清空后，先从微任务队列 Next Tick Queue 中依次取出所有的任务放入调用栈中执行，再从微任务队列 Other Microtask Queue 中依次取出所有的任务放入调用栈中执行。然后开始宏任务的 6 个阶段，每个阶段都将该宏任务队列中的所有任务都取出来执行（注意，这里和浏览器不一样，浏览器只取一个），每个宏任务阶段执行完毕后，开始执行微任务，再开始执行下一阶段宏任务，以此构成事件循环。
4.MacroTask 包括： setTimeout、setInterval、 setImmediate(Node)、requestAnimation(浏览器)、IO、UI rendering
5.Microtask 包括： process.nextTick(Node)、Promise.then、Object.observe、MutationObserver

注意：new Promise() 构造函数里面是同步代码，而非微任务。

#### 细节特性

##### 微任务有两种 nextTick 和 then 那么这两个谁快呢？

```
Promise.resolve('123').then(res=>{  console.log(res)})
process.nextTick(() => console.log('nextTick'))
//顺序 nextTick 123
//很明显 nextTick快
```

解释：
promise.then 虽然和 process.nextTick 一样，都将回调函数注册到 microtask，但优先级不一样。process.nextTick 的 microtask queue 总是优先于 promise 的 microtask queue 执行。

##### setTimeout 和 setImmediate

setTimeout 和 setImmediate 执行顺序不固定 取决于 node 的准备时间

```
setTimeout(() => {
    console.log('setTimeout')
}, 0)
setImmediate(() => {
    console.log('setImmediate')
})
```

运行结果：
setImmediate
setTimeout
或者：
setTimeout
setImmediate
为什么结果不确定呢？
解释：
setTimeout/setInterval 的第二个参数取值范围是：[1, 2^31 - 1]，如果超过这个范围则会初始化为 1，
即 setTimeout(fn, 0) === setTimeout(fn, 1)。
我们知道 setTimeout 的回调函数在 timer 阶段执行，setImmediate 的回调函数在 check 阶段执行，event loop 的开始会先检查 timer 阶段，但是在开始之前到 timer 阶段会消耗一定时间；
所以就会出现两种情况：
1timer 前的准备时间超过 1ms，满足 loop->time >= 1，则执行 timer 阶段（setTimeout）的回调函数
2timer 前的准备时间小于 1ms，则先执行 check 阶段（setImmediate）的回调函数，下一次 event loop 执行 timer 阶段（setTimeout）的回调函数。

```
setTimeout(() => {
    console.log('setTimeout')
}, 0)
setImmediate(() => {
    console.log('setImmediate')
})
const start = Date.now()
while (Date.now() - start < 10);
```

运行结果一定是：
setTimeout
setImmediate

```
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('setTimeout')
    }, 0)
    setImmediate(() => {
        console.log('setImmediate')
    })
})
```

运行结果：
setImmediate
setTimeout
解释：
fs.readFile 的回调函数执行完后：
注册 setTimeout 的回调函数到 timer 阶段
注册 setImmediate 的回调函数到 check 阶段
event loop 从 pool 阶段出来继续往下一个阶段执行，恰好是 check 阶段，所以 setImmediate 的回调函数先执行
本次 event loop 结束后，进入下一次 event loop，执行 setTimeout 的回调函数
所以，在 I/O Callbacks 中注册的 setTimeout 和 setImmediate，永远都是 setImmediate 先执行。

**可视化演绎**
简单演示：[https://ejzimmer.github.io/event-loop-talk/simple.html](https://ejzimmer.github.io/event-loop-talk/simple.html)
深入演示：[https://github.com/latentflip/loupe](https://github.com/latentflip/loupe)
浏览器端：[https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules)
