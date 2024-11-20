### 虚拟 DOM

virtual Dom 是一种编程方式，它以对象的形式保存在内存中，它描述了我们 dom 的必要信息，并且用类似 react-dom 等模块与真实 dom 同步，这一过程也叫协调(reconciler)，这种方式可以声明式的渲染相应的 ui 状态，让我们从 dom 操作中解放出来，在 react 中是以 fiber 树的形式存放组件树的相关信息，在更新时可以增量渲染相关 dom，所以 fiber 也是 virtual Dom 实现的一部分。

原因如下：

- 核心是为了跨平台，jsx --> ReactElement 对象 --> 真实节点，有中间层的存在，就可以在操作真实节点之前进行对应的处理，处理的结果反映到真实节点上，这个真实节点可以是浏览器环境，也可以是 Native 环境。
- 大量的 dom 操作慢，很小的更新都有可能回流，js 对象存储在内存中处理起来更快，通过 diff 算法比较新老 virtual Dom 的差异，并且批量、异步、最小化的执行 dom 的变更，以提高性能。

### jsx&createElement

jsx 可以声明式的描述视图，提升开发效率，通过 babel 可以转换成 React.createElement()的语法糖，也是 js 语法的扩展。
jsx 是 ClassComponent 的 render 函数或者 FunctionComponent 的返回值，可以用来表示组件的内容，在经过 babel 编译之后，最后会被编译成 React.createElement，这就是为什么 jsx 文件要声明 import React from 'react'的原因（react17 之后不用导入）。

​React.createElement 的源码中做了如下几件事：

- 处理 config，把除了保留属性外的其他 config 赋值给 props
- 把 children 处理后赋值给 props.children
- 处理 defaultProps
- 调用 ReactElement 返回一个 DOM 对象(virtual-dom)

```javascript
function createElement(type, config, children) {
  var propName; // Reserved names are extracted
  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
      // ...
    }

    if (hasValidKey(config)) {
      // ...
      key = "" + config.key;
    }
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object
    // ...
  }
  // ...
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
/**
 * Factory method to create a new React element. This no longer adheres to the class pattern, so do not use new to call it. Also, instanceof check will not work. Instead test $$typeof field against Symbol.for('react.element') to check if something is a React Element.
 */
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    // REACT_ELEMENT_TYPE = Symbol.for('react.element'), 会全局注册这个Symbol, 已经注册就直接返回
    $$typeof: REACT_ELEMENT_TYPE,
    type: type, // 元素名称或组件名称
    key: key, //key
    ref: ref, //ref属性
    props: props, // className, style, children等
    _owner: owner, // Record the component responsible for creating this element.
  };
  // ...
  return element;
};
```

总结：

- jsx 对象上没有优先级、状态、effectTag 等标记，这些标记在 Fiber 对象上；jsx 对象上只有 type、key、ref、props 等属性，这些属性在 Fiber 对象上也有。
- 在 mount 时 Fiber 根据 jsx 对象来构建 fiber 树；
- 在 update 时根据最新状态的 jsx 和 current Fiber 对比，形成新的 workInProgress Fiber 树；
- 最后 workInProgress Fiber 切换成 current Fiber。
