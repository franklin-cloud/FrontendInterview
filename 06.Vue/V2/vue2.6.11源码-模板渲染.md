### 模板渲染的过程

[compile 源码](./vue2.6.11/src/compiler/index.js)

![模板渲染的过程](https://i-blog.csdnimg.cn/blog_migrate/e78d30f7c38cb98983952b9bc710ccc0.png)

[$mount](./vue2.6.11/src/platforms/web/entry-runtime-with-compiler.js#L17-L83)
根据不同的情况获取 template，然后调用 compileToFunctions。

```js
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (el?: string | Element, hydrating?: boolean): Component {
  el = el && query(el);

  const options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template;
    if (template) {
      if (typeof template === "string") {
        if (template.charAt(0) === "#") {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== "production" && !template) {
            warn(`Template element not found or is empty: ${options.template}`, this);
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== "production") {
          warn("invalid template option:" + template, this);
        }
        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== "production" && config.performance && mark) {
        mark("compile");
      }

      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          outputSourceRange: process.env.NODE_ENV !== "production",
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      );
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== "production" && config.performance && mark) {
        mark("compile end");
        measure(`vue ${this._name} compile`, "compile", "compile end");
      }
    }
  }
  return mount.call(this, el, hydrating);
};
```

[compileToFunctions](./vue2.6.11/src/compiler/index.js)
compileToFunctions 内部的调用逻辑如下：
createCompiler: 提供 baseCompile, baseCompile 函数对模板的处理：parse,optimize,generate；
createCompilerCreator：自定义的 options 与 baseOptions 进行合并，返回 compileToFunctions 函数（也就是 createCompileToFunctionFn）；
createCompileToFunctionFn 先读缓存，没有缓存就调用 compile（createCompiler 提供的 baseCompile 函数）方法拿到的抽象语法树和字符串形式的 render 函数(后续详解)，在通过 `new Function` 的方式生成`render`函数。

createCompiler

```js
export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  const code = generate(ast, options);
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns,
  };
});
```

createCompileToFunctionFn

```js
export function createCompileToFunctionFn(compile: Function): Function {
  // check cache
  const key = options.delimiters ? String(options.delimiters) + template : template;
  if (cache[key]) {
    return cache[key];
  }

  // compile 将template 编译成 render 函数的字符串形式
  const compiled = compile(template, options);
  // turn code into functions
  const res = {};
  //通过 new Function 的方式生成 render 函数并缓存
  res.render = createFunction(compiled.render, fnGenErrors);
  res.staticRenderFns = compiled.staticRenderFns.map((code) => {
    return createFunction(code, fnGenErrors);
  });
}

function createFunction(code, errors) {
  try {
    return new Function(code);
  } catch (err) {
    errors.push({ err, code });
    return noop;
  }
}
```

#### parse

[parse](vue2.6.11/src/compiler/parser/index.js#L79)
parse 函数就是将 template 里的结构（指令，属性，标签等）转换为 AST 形式存进 ASTElement 中，最后解析生成 AST。采用了 jQuery 作者 John Resig 的 [HTML Parser](https://johnresig.com/blog/pure-javascript-html-parser/)。 ASTElement 的数据结构后续会详细说明。

#### optimize 函数

[optimize](vue2.6.11/src/compiler/optimizer.js)
主要功能就是标记静态节点，为后面 patch 过程中对比新旧 VNode 树形结构做优化。被标记为 static 的节点在后面的 diff 算法中会被直接忽略，不做详细的比较。

```
export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  // staticKeys 是那些认为不会被更改的ast的属性
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // first pass: mark all non-static nodes.
  markStatic(root)
  // second pass: mark static roots.
  markStaticRoots(root, false)
}
```

#### generate 函数

[optimize](vue2.6.11/src/compiler/codegen/index.js)
根据 AST 结构拼接生成 render 函数的字符串。

```js
const code = ast ? genElement(ast) : '_c("div")';
staticRenderFns = prevStaticRenderFns;
onceCount = prevOnceCount;
return {
  render: `with(this){return ${code}}`, // 最外层包一个 with(this) 之后返回
  staticRenderFns: currentStaticRenderFns,
};

export function genElement(el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state);
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.tag === "template" && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || "void 0";
  } else if (el.tag === "slot") {
    return genSlot(el, state);
  } else {
    // component or element
    let code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      let data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state);
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = `_c('${el.tag}'${
        data ? `,${data}` : "" // data
      }${
        children ? `,${children}` : "" // children
      })`;
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code;
  }
}
```

以上就是` compile` 函数中三个核心步骤的介绍，`compile` 之后我们得到了 render function 的字符串形式，后面通过 `new Function `得到真正的渲染函数。数据发现变化后，会执行 `Watcher` 中的` _update` 函数（src/core/instance/lifecycle.js），`_update `函数会执行这个渲染函数，输出一个新的 VNode 树形结构的数据。然后在调用 `__patch__` 函数，拿这个新的 VNode 与旧的 VNode 进行对比，只有发生了变化的节点才会被更新到真实 DOM 树上。
​

```js
//更新dom的方法，主要是调用 __patch__ 方法
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this;
  if (vm._isMounted) {
    callHook(vm, "beforeUpdate");
  }
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(
      // 将vnode patch到真实节点上去
      vm.$el,
      vnode,
      hydrating,
      false /* removeOnly */,
      vm.$options._parentElm,
      vm.$options._refElm
    );
  } else {
    // updates
    // __patch__ 方法在web-runtime.js中定义了，最终调用的是 core/vdom/patch.js 中的 createPatchFunction 方法
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
};
```

### AST 抽象语树

AST 的全称是 Abstract Syntax Tree（抽象语法树），是源代码的抽象语法结构的树状表现形式，计算机学科中编译原理的概念。Vue 源码中借鉴 jQuery 作者 John Resig 的 HTML Parser 对模板进行解析，得到的就是 AST 代码。
Vue2 源码中 [AST 数据结构](https://github.com/vuejs/vue/blob/v2.6.14/flow/compiler.js#L97-L204) 的定义

```js
declare type ASTNode = ASTElement | ASTText | ASTExpression;
declare type ASTElement = {
  type: 1,
  tag: string,
  attrsList: Array<{ name: string, value: string }>,
  attrsMap: { [key: string]: string | null },
  parent: ASTElement | void,
  children: Array<ASTNode>,
  //......
};
declare type ASTExpression = {
  type: 2,
  expression: string,
  text: string,
  static?: boolean,
};
declare type ASTText = {
  type: 3,
  text: string,
  static?: boolean,
};
```

我们看到 ASTNode 有三种类型：ASTElement，ASTText，ASTExpression。用属性 type 区分。当然还有很多其他的抽象语法类型，不一一列举。

### VNode 数据结构

VNode 是 VDOM 中的概念，是真实 DOM 元素的简化版，与真实 DOM 元素是一一对应的关系。后面的 `render function` 的生成跟这些属性相关。

[源码中 VNode 数据结构](./vue2.6.11/src/core/vdom/vnode.js) 的定义

```js
constructor {
  this.tag = tag   //元素标签
  this.data = data  //属性
  this.children = children  //子元素列表
  this.text = text
  this.elm = elm  //对应的真实 DOM 元素
  this.ns = undefined
  this.context = context
  this.functionalContext = undefined
  this.key = data && data.key
  this.componentOptions = componentOptions
  this.componentInstance = undefined
  this.parent = undefined
  this.raw = false
  this.isStatic = false //是否被标记为静态节点
  this.isRootInsert = true
  this.isComment = false
  this.isCloned = false
  this.isOnce = false
}
```

虚拟 DOM 与真是 DOM(document.createElement) 的区别？
`document.createElement` 这个方法创建的真实 DOM 元素会带来性能上的损失，属性多达 228 个，而这些属性有 90% 多对我们来说都是无用的。VNode 就是简化版的真实 DOM 元素，只将我们需要的属性拿过来，并新增了一些在 diff 过程中需要使用的属性，例如 isStatic。

### render function

`render function` 顾名思义就是渲染函数，这个函数通过解析模板得到，其运行结果是 VNode。`render function` 与 `JSX `类似，Vue 2 中除了 Template 也支持 JSX 的写法。大家可以使用 Vue.compile(template) 方法编译模板。

```js
<div id="app">
  <header>
    <h1>I'm a template!</h1>
  </header>
  <p v-if="message">{{ message }}</p>
  <p v-else>No message.</p>
</div>
```

方法会返回一个对象，对象中有`render` 和 `staticRenderFns` 两个值,生成的 `render function` ：

```
(function() {
  with(this){
    return _c('div',{   //创建一个 div 元素
      attrs:{"id":"app"}  //div 添加属性 id
      },[
        _m(0),  //静态节点 header，此处对应 staticRenderFns 数组索引为 0 的 render function
        _v(" "), //空的文本节点
        (message) ?_c('p',[_v("\n    "+_s(message)+"\n  ")]) :_c('p',[_v("\n    No message.\n  ")])
      ]
    )
  }
})
```

`staticRenderFns` 数组，这个数组中的函数与 VDOM 中的 diff 算法优化相关，我们会在编译阶段给后面不会发生变化的 VNode 节点打上 static 为 true 的标签，那些被标记为静态节点的 VNode 就会单独生成 staticRenderFns 函数：

```js
(function () {
  //上面 render function 中的 _m(0) 会调用这个方法
  with (this) {
    return _c("header", [_c("h1", [_v("I'm a template!")])]);
  }
});
```

要看懂上面的 render function，只需要了解 \_c，\_m，\_v，\_s 这几个函数的定义，其中 \_c 是 createElement，\_m 是 renderStatic，\_v 是 createTextVNode，\_s 是 toString。除了这个 4 个函数，还有另外 10 个函数，我们可以在源码 [vue2.6.11\src\core\instance\render.js](vue2.6.11\src\core\instance\render.js) 中可以查看这些函数的定义。

[installRenderHelpers](vue2.6.11\src\core\instance\render-helpers\index.js)

```js
export function installRenderHelpers(target: any) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
```
