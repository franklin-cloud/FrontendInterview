<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [react 中怎么检验 props](#react-%E4%B8%AD%E6%80%8E%E4%B9%88%E6%A3%80%E9%AA%8C-props)
- [react 组件之间的通信](#react-%E7%BB%84%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1)
- [hooks 使用限制是什么?](#hooks-%E4%BD%BF%E7%94%A8%E9%99%90%E5%88%B6%E6%98%AF%E4%BB%80%E4%B9%88)
- [React Hooks 和生命周期的关系？](#react-hooks-%E5%92%8C%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%9A%84%E5%85%B3%E7%B3%BB)
- [useEffect 与 useLayoutEffect 的区别](#useeffect-%E4%B8%8E-uselayouteffect-%E7%9A%84%E5%8C%BA%E5%88%AB)
- [react 性能优化的手段，避免不必要的 render](#react-%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E7%9A%84%E6%89%8B%E6%AE%B5%E9%81%BF%E5%85%8D%E4%B8%8D%E5%BF%85%E8%A6%81%E7%9A%84-render)
- [react 组件中怎么做事件代理, 它的原理是什么, SyntheticEvent 层（合成事件层)](#react-%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%80%8E%E4%B9%88%E5%81%9A%E4%BA%8B%E4%BB%B6%E4%BB%A3%E7%90%86-%E5%AE%83%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88-syntheticevent-%E5%B1%82%E5%90%88%E6%88%90%E4%BA%8B%E4%BB%B6%E5%B1%82)
- [如何解决 react 层级嵌套过深的问题](#%E5%A6%82%E4%BD%95%E8%A7%A3%E5%86%B3-react-%E5%B1%82%E7%BA%A7%E5%B5%8C%E5%A5%97%E8%BF%87%E6%B7%B1%E7%9A%84%E9%97%AE%E9%A2%98)
- [react 框架是 mvvm 框架还是 mvc 框架](#react-%E6%A1%86%E6%9E%B6%E6%98%AF-mvvm-%E6%A1%86%E6%9E%B6%E8%BF%98%E6%98%AF-mvc-%E6%A1%86%E6%9E%B6)
- [类组件与函数组件有什么异同？](#%E7%B1%BB%E7%BB%84%E4%BB%B6%E4%B8%8E%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E6%9C%89%E4%BB%80%E4%B9%88%E5%BC%82%E5%90%8C)
- [有受控组件和不受控组件的理解](#%E6%9C%89%E5%8F%97%E6%8E%A7%E7%BB%84%E4%BB%B6%E5%92%8C%E4%B8%8D%E5%8F%97%E6%8E%A7%E7%BB%84%E4%BB%B6%E7%9A%84%E7%90%86%E8%A7%A3)
- [有状态组件和无状态组件的理解、使用场景](#%E6%9C%89%E7%8A%B6%E6%80%81%E7%BB%84%E4%BB%B6%E5%92%8C%E6%97%A0%E7%8A%B6%E6%80%81%E7%BB%84%E4%BB%B6%E7%9A%84%E7%90%86%E8%A7%A3%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- [对 React 的插槽(Portals)的理解，如何使用，有哪些使用场景](#%E5%AF%B9-react-%E7%9A%84%E6%8F%92%E6%A7%BDportals%E7%9A%84%E7%90%86%E8%A7%A3%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E6%9C%89%E5%93%AA%E4%BA%9B%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- [React 声明组件有哪几种方法，有什么不同？](#react-%E5%A3%B0%E6%98%8E%E7%BB%84%E4%BB%B6%E6%9C%89%E5%93%AA%E5%87%A0%E7%A7%8D%E6%96%B9%E6%B3%95%E6%9C%89%E4%BB%80%E4%B9%88%E4%B8%8D%E5%90%8C)
- [refs、react 中可以在 render 访问 refs 吗?](#refsreact-%E4%B8%AD%E5%8F%AF%E4%BB%A5%E5%9C%A8-render-%E8%AE%BF%E9%97%AE-refs-%E5%90%97)
- [react 路由的实现原理](#react-%E8%B7%AF%E7%94%B1%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86)
- [如何配置 React-Router 实现路由切换](#%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE-react-router-%E5%AE%9E%E7%8E%B0%E8%B7%AF%E7%94%B1%E5%88%87%E6%8D%A2)
- [react 循环列表为什么要使用 key](#react-%E5%BE%AA%E7%8E%AF%E5%88%97%E8%A1%A8%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BD%BF%E7%94%A8-key)
- [react 与 vue 区别](#react-%E4%B8%8E-vue-%E5%8C%BA%E5%88%AB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 组件之间的通信

- 父组件向子组件通信, 父级通过 props 向子组件传递需要的信息

  ```js
  const Child = props => { return
  <p>{props.name}</p>
  } const Parent = () => { return <Child name="react"></Child> }
  ```

- 子组件向父组件通信, 通过 props 传回调函数的方式

  ```js
  const Child = props => {
    const test = (params) => {
      props.deal(msg)
    }
    return (
    <button onclick={test('你好)}></button>)
  }

  const Parent = () => {
    const deal = (msg) => {
      console.log(msg)
    }
    render(){
      return <Child deal={this.deal.bind(this)}></Child>
    }
  }
  ```

- 跨级组件通信

  父组件向子组件的子组件通信，以及向更深层的子组件通信
  （1）props 层层传递，但是如果父级的结构较深，那么需要一层曾的去传递，增加了复杂度，并且，这些 props 并不是中间组件需要的
  （2）context，相当是一个大容器，可以把要通信的内容放在这个容器中，不管嵌套多深，都可使用。对于跨域多层的全局数据可以使用 context 实现

  ```js
  const BatContext = createContext();
  // 父组件
  class Parent extends Component {
    render() {
      const {color} = this.state
      return (
      <BatContext.Provider value={color}>
        <Child></Child>
      </BatContext.Provide>
      )
    }
  }
  // 子组件
  const Child = () => {
    return (
    <GrandChild />)
  }
  // 子组件的子组件
  class GrandChild extends Component {
  render(){
    return (
      <BatContext.Consumer>
        {color => <h1 style={{"color": color}}>我是彩色的</h1>}
      </BatContext.Consumer>
    )
  }
  }
  ```

- 非嵌套关系的组件通信
  没有任何包含关系的组件，包括兄弟组件以及不在同一父级中的非兄弟组件
  （1）发布订阅者
  （2）全局状态管理器，dva,redux 等
  （3）如果是兄弟组件通信，可以找到两个兄弟节点的共同父级节点，结合父子间通信方式进行通信

## hooks 使用限制是什么?

(1)不可以在循环、条件或者嵌套函数中调用 hook
(2)在 react 函数组件中调用 hook

hooks 是基于函数组件设计的，只支持函数组件。
React 需要利用调用顺序来正确更新相应的状态，以及调用相应的钩子函数。一旦在循环或条件分支语句中调用 Hook，就容易导致调用顺序的不一致性，导致错误。

## React Hooks 和生命周期的关系？

函数组件 的本质是函数，没有 state 的概念的，因此不存在生命周期一说，仅仅是一个 render 函数而已。
引入 Hooks 之后的函数组件，让组件在不使用 class 的情况下拥有 state，也就有了生命周期的概念，所谓的生命周期其实就是 useState、 useEffect() 和 useLayoutEffect()

总结：
Hooks 组件（使用了 Hooks 的函数组件）有生命周期，而函数组件（未使用 Hooks 的函数组件）是没有生命周期的。

具体的 class 组件与 hooks 组件生命周期的对应关系：
(1): constructor -->> useState(0), useState 来初始化 state
(2): shouldComponentUpdate -->> React.memo 包裹一个组件来对它的 props 进行浅比较，其中，React.memo 等效于 PureComponent，它只浅比较 props。这里也可以使用 useMemo 优化每一个节点。
(3): componentDidMount, componentDidUpdate -->> useEffect
(4): render：这是函数组件体本身
(5): componentWillUnmount：相当于 useEffect 里面返回的 cleanup 函数
(6): componentDidCatch and getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法

```js
// componentDidMount
useEffect(() => {
  // 需要在componentDidMount执行内容
}, []);

// componentDidMount,仅在 count 更改时更新
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);

// componentDidMount/componentWillUnmount
useEffect(() => {
  // 需要在 componentDidMount 执行的内容
  return function cleanup() {
    // 需要在 componentWillUnmount 执行的内容
  };
}, []);
```

## useEffect 与 useLayoutEffect 的区别

同：useEffect 与 useLayoutEffect 两者都是用于处理副作用；使用方式也完全相同
不同：useEffect 在 React 渲染过程中是被异步调用的，用于绝大多数场景
useLayoutEffect 在 DOM 变更之后渲染之前同步调用，需要避免在 useLayoutEffect 做计算量较大的耗时任务从而造成阻塞。

## 性能优化的手段，避免不必要的 render

- 避免不必要的 render，可以使用 shouldComponentUpdate 和 PureComponent 来减少因父组件更新而触发子组件的其中，purecomponent 只做浅层的比较。
- React.memo 来实现，缓存组件的渲染，避免不必要的更新
- 使用 usememo 或者 usecallback 缓存变量或者函数
- 使用 suspense(react16.6 新增组件)或者 lazy 进行组件的懒加载，suspense 可以在组件请求数据时展示一个 pending 状态。请求成功后渲染数据。
- 在显示列表或表格时始终使用 Keys，这会让 React 的更新速度更快

## react 框架是 mvvm 框架还是 mvc 框架

MVVM
model 层(模型层，主要负责处理业务数据)；view 层(视图层，主要负责视图显示)；VM(ViewModel, V 与 M 之间的桥梁，负责监听 M 或者 V 的修改);典型的特征：数据双向绑定，
也就是当 M 层数据进行修改时，VM 层会监测到变化，并且通知 V 层进行相应的修改，反之修改 V 层则会通知 M 层数据进行修改，以此也实现了视图与模型层的相互绑定。(vue)

MVC
M(model 数据模型层 ) V（view 视图层 ） C（controller 控制层 ）
主要实现通过控制层监听 model 的变化，数据变化后通过 controller 控制层 来实现 view 层的渲染。(react)

```txt
React是一个单向数据流的库，状态驱动视图。
State --> View --> New State --> New View
```

## 类组件与函数组件有什么异同？

- 相同点
  组件是 react 可以复用的最小代码片段，最终返回在页面上渲染的 react 元素，无论是函数组件，还是类组件，在最终的呈现方式上是完全一致的。
  甚至可以将一个类组件改写成函数组件，或者把函数组件改写成一个类组件；
  从使用者的角度而言，很难从使用体验上区分两者，而且在现代浏览器中，闭包和类的性能只在极端场景下才会有明显的差别。
- 不同点
  - (1)类组件是基于面向对象编程的，主要有继承、生命周期等概念；函数组件是函数式编程，主打的是没有副作用，引用透明，immutable 等特点
  - (2)之前，使用场景上，如果存在需要使用生命周期的组件，那么主推类组件；设计模式上，如果需要使用继承，那么主推类组件。
    但现在由于 React Hooks 的推出，生命周期概念的淡出，函数组件可以完全取代类组件。其次继承并不是组件最佳的设计模式，官方更推崇“组合优于继承”的设计概念，所以类组件在这方面的优势也在淡出。
  - (3)性能优化上，类组件主要依靠 shouldComponentUpdate 阻断渲染来提升性能，而函数组件依靠 React.memo 缓存渲染结果来提升性能。
  - (4)从上手程度而言，类组件更容易上手，从未来趋势上看，由于 React Hooks 的推出，函数组件成了社区未来主推的方案。
  - (5)从未来发展来看，由于生命周期带来的复杂度，并不易于优化；而函数组件本身轻量简单，更能适应 React 的未来发展。

## 有受控组件和不受控组件的理解

**受控组件**
官方定义：在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。

受控组件更新 state 的流程：

- 可以通过初始 state 中设置表单的默认值
- 每当表单的值发生变化时，调用 onChange 事件处理器
- 事件处理器通过事件对象 e 拿到改变后的状态，并更新组件的 state
- 一旦通过 setState 方法更新 state，就会触发视图的重新渲染，完成表单组件的更新

```js
class NameFrom extends React.Component {
  constroctor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setSate({ value: e.target.value });
  }
  handleSubmit(event) {
    alert("提交的名字: " + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit="{this.handleSubmit}">
        <label>
          名字：
          <input type="text" value="{this.state.value}" onChange="{this.handleChange}" />
        </label>
      </form>
    );
  }
}
```

**非受控组件**
官方定义：表单数据的处理都由 DOM 节点处理，要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 使用 ref 来从 DOM 节点中获取表单数据。

```js
class NameFrom extends React.Component {
  constroctor(props) {
    super(props);
    this.input = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.input.current.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit="{this.handleSubmit}">
        <label>
          名字：
          <input type="text" ref="{this.input}" />
        </label>
      </form>
    );
  }
}
```

总结：当有多个输入框，或者多个这种组件时，如果使用受控组件，需要编写多个事件处理函数，使得代码非常臃肿。

## 有状态组件和无状态组件的理解、使用场景

- 有状态组件
  特点：是类组件、有继承、可以使用 react 的生命周期、可以使用 this、内部可以使用 state,维护自身状态的变化，可以根据外部组件传入的 props 和 state 进行渲染。
  （当一个类组件不需要管理自身状态时，也可称为无状态组件。）
- 无状态组件
  特点：是类组件或者函数组件、没有 this(使用箭头函数事件无需绑定)、组件内部不维护 state，只根据外部组件传入的 props 进行渲染组件，当 props 改变时，组件重新渲染。
  优点：组件不需要被实例化，无生命周期，提升性能。 输出（渲染）只取决于输入（属性），无副作用； 简化代码、专注于 render； 视图和数据的解耦分离
  缺点：无法使用 ref；无生命周期方法；无法控制组件的重渲染，因为无法使用 shouldComponentUpdate 方法，当组件接受到新的属性时则会重渲染；

使用场景：当一个组件不需要管理自身状态时，也就是无状态组件，应该优先设计为函数组件。比如自定义的 `<Button />`、 `<Input />` 等组件。

## 对 React 的插槽(Portals)的理解，如何使用，有哪些使用场景

官方定义：

提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀方案。

Portals 是 React 16 提供的官方解决方案，使得组件可以脱离父组件层级挂载在 DOM 树的任何位置。

通俗来讲，就是我们 render 一个组件，但这个组件的 DOM 结构并不在本组件内。

有些元素需要被挂载在更高层级的位置。

最典型的应用场景：

当父组件具有 overflow: hidden 或者 z-index 的样式设置时，组件有可能被其他元素遮挡，这时就可以考虑要不要使用 Portal 使组件的挂载脱离父组件。例如：对话框，模态窗，悬浮卡以及提示框。

```txt
ReactDOM.createProtal(child, container)
// 参数child是任何可以渲染的React子元素，例如一个元素，字符串，或者fragment；container是一个dom元素
```

```js
render() {
  // 挂载了一个新的div，并且把子元素渲染其中
  return (
    <div>{this.props.children}</div>
  )
}

render() {
  // 并没有创建新的div，只是把子元素渲染到domNode中
  // domNode 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal( this.props.children, domNode )
}
```

## react 路由的实现原理

- 基于 hash 的路由：通过监听 hashchange 事件，感知 hash 的变化
  (1):改变 hash 可以直接通过 location.hash=xxx
- 基于 H5 history 路由：
  (1):改变 url 可以通过 history.pushState 和 resplaceState 等，会将 URL 压入堆栈，同时能够应用 history.go() 等 API
  (2):监听 url 的变化可以通过自定义事件触发实现

## 循环列表为什么要使用 key

```text
参考链接https://juejin.cn/post/6940974776441634823#heading-8
```

- 组件没有设置 key 时，react 会默认将 react 索引设置为 key 属性的值，对于静态的页面（首次渲染后不变化），当第一次渲染时，子组件 列表的 key 属性被赋值为数组索引， 如果仅仅在尾部插入一个新的组件，前面组件的索引值并不会被变化， 但是，对数据进行了重新排序，数组索引 index 仍然稳定地从 0 开始自增， React 认为组件并没有发生变更。比如：复选框勾选的数据，需要移动，会发现复选框并没有移动。
- key 是稳定+唯一的，不能是随即数

## react 与 vue 区别

相同点

- 都是创建 UI 界面的 JavaScript 库，
- 都是组件化思想，组件化开发
- 都是使用了虚拟 DOM，来提升渲染速度
- 都有独立的状态管理库

不同点

1. 数据流：
   - vue 的思想是响应式的（MVVM），实现了数据的双向绑定。对每个属性建立 watcher,通过 getter,setter 劫持监听变化，响应式的更新对应的虚拟 DOM
   - react 是函数式思想，单向数据流，react 在 setState 后会通过 diff 算法计算不同，重新走渲染的流程
2. 模板语法
   - vue 使用 template 模板，以 template+JavaScript+CSS 的组合模式呈现，通过 vue 是指令+模板语法实现。
   - react 使用 jsx 模板，函数式编程，通过原生 JS 语法实现，比如插值，条件，循环等。map, if{}， A&&B
3. 渲染
   - vue 会跟踪组件的依赖关系，vue 是数据变化通知依赖项精确的驱动渲染，不需要重新渲染整个组件树
   - react 在应用的状态被改变时，重新渲染全部子组件，但是可以通过 shouldComponentUpdate 等一些方法进行优化控制全部子组件都会重新渲染。
4. diff 算法
   - vue Diff 使用双向链表边对比边更新
   - react 的 diff 将需要更新的部分添加到任务队列进行批量更新
5. 事件机制
   - vue 直接是原生事件
   - react 是合成事件: 事件冒泡到根节点进行事件委托处理，且做了跨端兼容处理。
6. 性能优化
   - 在 Vue 中，一个组件在渲染期间依赖于自动追踪，因此系统知道提前预判哪一个组件需要渲染当组件状态发生改变时。每个组件可以被认为具有自动为你实现 shouldComponentUpdate，不需要注意嵌套的组件
   - 在 react 中，当组件状态改变时，它会触发整个子组件数重新渲染，以根组件作为渲染基点。为了避免不必要的子组件重新渲染，你需要使用 PureComponent 或者实现 shouldComponentUpdate
   - 但是 vue 的响应式机制也有问题，就是当 state 特别多的时候，Watcher 也会很多，会导致卡顿，所以大型应用（状态特别多的）一般用 react，更加可控
