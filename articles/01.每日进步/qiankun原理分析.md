# qiankun 总结

## 核心库-single-spa
由于我们的子应用都是 `lazy load` 的，当浏览器重新刷新时，主框架的资源会被重新加载，同时异步 `load`子应用的静态资源，由于此时主应用的路由系统已经激活，但子应用的资源可能还没有完全加载完毕，从而导致路由注册表里发现没有能匹配子应用 `/subApp/123/detail` 的规则，这时候就会导致跳 `NotFound` 页或者直接路由报错。

当浏览器的地址为 `/subApp/abc` 时，框架需要先加载 `entry` 资源，待 `entry` 资源加载完毕，确保子应用的路由系统注册进主框架之后后，再去由子应用的路由系统接管 `url change` 事件。同时在子应用路由切出时，主框架需要触发相应的 `destroy` 事件，子应用在监听到该事件时，调用自己的卸载方法卸载应用, 推荐直接选择社区比较完善的相关实践[single-spa](https://zh-hans.single-spa.js.org/docs/getting-started-overview)

single-spa管理注册的应用程序，并负责其所有生命周期。这样就可以避免你写什么时候应该安装和卸载应用程序的大量逻辑。 single-spa可以帮你解决这个问题。所有single-spa要定义激活方法来自动完成这项工作，该方法描述了你的应用程序什么时候时应处于激活状态。

## 子应用加载-import-html-entry
`JS Entry` 的方式通常是子应用将资源打成一个 `entry script`; 所有资源打包到一个 `js bundle` 里，包括 css、图片等资源。除了打出来的包可能体积庞大之外的问题之外，资源的并行加载等特性也无法利用上。

`HTML Entry` 则更加灵活，直接将子应用打出来 HTML 作为入口，主框架可以通过 fetch html 的方式获取子应用的静态资源，同时将 HTML document 作为子节点塞到主框架的容器中。

## 模块导入-子应用umd格式打包
微前端架构下，我们需要获取到子应用暴露出的一些钩子引用，如 `bootstrap、mount、unmout` 等。只需要采用`umd` 打包格式中的 `global export` 方式获取子应用的导出即可，大体的思路是通过给 `window` 变量打标记，记住每次最后添加的全局变量，这个变量一般就是应用 `export` 后挂载到 `global` 上的变量。实现方式可以参考 [systemjs global import](https://github.com/systemjs/systemjs/blob/master/src/extras/global.js)

## 样式隔离-Dynamic Stylesheet 
**1.Shadow DOM**
 存在浏览器兼容性。另外子应用的样式作用域仅在 `shadow`元素下，那么一旦子应用中出现运行时越界跑到外面构建 DOM 的场景，必定会导致构建出来的 DOM 无法应用子应用的样式的情况(比如挂载在body上的弹窗)

```js
const shadow = document.querySelector('#hostElement').attachShadow({ mode: 'open' });
shadow.innerHTML = '<sub-app>Here is some new text</sub-app><link rel="stylesheet" href="//unpkg.com/antd/antd.min.css">';
```

**2.CSS Module? BEM?**
社区通常的实践是通过约定 css 前缀的方式来避免样式冲突，即各个子应用使用特定的前缀来命名 class，或者直接基于 css module 方案写样式。对于一个全新的项目，这样当然是可行，但是通常微前端架构更多的目标是解决存量/遗产 应用的接入问题。很显然遗产应用通常是很难有动力做大幅改造的。

最主要的是，约定的方式有一个无法解决的问题，假如子应用中使用了三方的组件库，三方库在写入了大量的全局样式的同时又不支持定制化前缀？比如 a 应用引入了 antd 2.x，而 b 应用引入了 antd 3.x，两个版本的 antd 都写入了全局的 .menu class，但又彼此不兼容怎么办？

**3.Dynamic Stylesheet !**
应用切出/卸载后，同时卸载掉其样式表即可，原理是浏览器会对所有的样式表的插入、移除做整个 CSSOM 的重构，从而达到 插入、卸载 样式的目的。这样即能保证，在一个时间点里，只有一个应用的样式表是生效的。

HTML Entry 方案则天生具备样式隔离的特性，因为应用卸载后会直接移除去 HTML 结构，从而自动移除了其样式表。

**4.总结**
如果存在多个子应用同时挂载的情况，还是得`CSS Module` && [BEM](https://zhuanlan.zhihu.com/p/446649602) 并行, 对组件顶层样式采用CSS Module，对组件内部样式采用BEM。

## 沙箱-基于Proxy实现
针对 JS 隔离的问题独创了一个运行时的 JS 沙箱。
即在应用的 bootstrap 及 mount 两个生命周期开始之前分别给全局状态打下快照，然后当应用切出/卸载时，将状态回滚至 bootstrap 开始之前的阶段，确保应用对全局状态的污染全部清零。而当应用二次进入时则再恢复至 mount 前的状态的，从而确保应用在 remount 时拥有跟第一次 mount 时一致的全局上下文。

**with**
`with` 语句将改变作用域，会让内部的访问优先从传入的对象上查找。例如：

    ```js
        const obj = {
            a: 1
        }

    const a = 9

    const fun = (obj) => {
    with(obj) { 
        console.log(a)
        a = 3
    }
    }

    fun(obj) // 1
    console.log(obj) // { a: 3 }
    ```
`fun()`相当于{}内访问的变量都会从obj上查找,在当前的内部环境中找不到某个变量时，会沿着作用作用域链一层层向上查找，如果找不到就拋出ReferenceError异常。
虽然with实现了在当前上下文中查找变量的效果，但是仍然存在一下问题：

- 找不到时会沿着作用域链往上查找
- 当修改存在的变量时，会同步修改外层的变量
- 除此之外with还有其他的一些弊端

**Proxy**

`Proxy` 对象可以拦截并改变对对象的访问，可以用来实现一些高级功能，比如：监听对象属性的读取、赋值、删除等操作

**qiankun 源码**
```js
export function createSandboxContainer(appName, elementGetter, scopedCSS, useLooseSandbox, excludeAssetFilter, globalContext, speedySandBox) {
  var sandbox;
  if (window.Proxy) {
    sandbox = useLooseSandbox ? new LegacySandbox(appName, globalContext) : new ProxySandbox(appName, globalContext, {
      speedy: !!speedySandBox
    });
  } else {
    sandbox = new SnapshotSandbox(appName);
  }
  return {
     instance: sandbox,
     mount: function() {},
     unmount: function() {}
  }
}
```
我们可以看到QianKun里的沙箱主要分为三种:

- LegacySandbox：单实例代理沙箱，简单来讲就是只存在一个window实例，所有的操作都是对这一个实例的操作。
- ProxySandbox：多实例代理沙箱，通过对window的拷贝建立多个副本`fakeWindow`，在沙箱中对建立的副本进行操作。
- SnapshotSandbox：快照沙箱，基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器。

LegacySandbox 基于Proxy实现的, 收集windows上的属性变更，在激活时active把上一次沙箱激活时的变更，设置到window上; 失活时通过遍历还原window上的初始值;
ProxySandbox 创建一个window的副本fakeWindow实现每个ProxySandbox实例之间属性互不影响。
SnapshotSandbox 基于diff方式实现的沙箱, 所有的更改都在window上，只是在激活沙箱的时候保存一个window的初始快照，并在期间对变更的属性进行记录，失活时恢复初始的window，但是会造成全局window的污染。

## 应用通信 
典型的订阅发布的设计模式
```js
var globalState = {};
var deps = {};
// 触发全局监听
function emitGlobal(state, prevState) {
  Object.keys(deps).forEach(function (id) {
    if (deps[id] instanceof Function) {
      deps[id](_cloneDeep(state), _cloneDeep(prevState));
    }
  });
}
```

[可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)
[聊聊 QianKun JS 沙箱的那些事](https://zhuanlan.zhihu.com/p/658452336)
