<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [源码能帮助理解的问题](#%E6%BA%90%E7%A0%81%E8%83%BD%E5%B8%AE%E5%8A%A9%E7%90%86%E8%A7%A3%E7%9A%84%E9%97%AE%E9%A2%98)
- [Vue 构造函数](#vue-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
- [initMixin 初始化](#initmixin-%E5%88%9D%E5%A7%8B%E5%8C%96)
  - [initProps](#initprops)
  - [initMethods](#initmethods)
  - [initData](#initdata)
  - [initComputed](#initcomputed)
  - [initWatch](#initwatch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 源码能帮助理解的问题

- 如何让构造函数和 class 一样，不能直接调用只能通过 new 实例化？
- 为什么在 beforeCreate 钩子中无法读取 data，props 等属性？
- 为什么 data、props、methods、computed 中的属性，我们可以直接通过 this.xx 访问？

## Vue 构造函数

> **Q**：如何让构造函数和`Class`一样，只能通过 `new` 实例化？
> **A**：为了防止构造函数被当成普通函数调用，可以根据构造函数内的 `this` 来进行判断。
> 通过 `new` 实例化调用时, `this` 指向实例，可以通过`this instanceof Vue` 来进行判断; 而以普通函数调用构造函数时，`this`指向调用者，一般是全局。

[Vue 其实就是一个构造函数](https://github.com/vuejs/vue/tree/v2.6.11/src/core/instance/index.js#L8)

```js
import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

function Vue(options) {
  /**
   * Vue是一个构造函数，通过this instanceof Vue 来判断是new 实例化调用，还是普通函数调用者（Window）
   */
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  // 实例化的时候进行初始化
  this._init(options);
}
// 为Vue构造函数的原型绑定初始化函数_init
initMixin(Vue);
/* 为Vue构造函数的原型绑定 $data,$props,$set,$delete,$watch */
stateMixin(Vue);
/* 为Vue构造函数的原型绑定$on,$once,$off,$off,$emit */
eventsMixin(Vue);
/* 为Vue构造函数的原型上绑定_update,$forceUpdate,$destroy */
lifecycleMixin(Vue);
/* 为Vue构造函数的原型绑定$nextTick, _render */
renderMixin(Vue);

export default Vue;
```

## initMixin 初始化

> **Q**：为什么在 beforeCreate 钩子中无法读取 data，props 等属性？
> **A**：根据以下代码，我们不难发现初始化的执行顺序：
> callHook(vm, 'beforeCreate') -> initState -> callHook(vm, 'created') ，
> 我们发现 initState 发生在 beforeCreate 和 created 两个钩子函数之间，initSate 方法中依次初始化 props,methods,data,computed,watch，这就是为什么我们在 beforeCreate 钩子中无法获取到 data 的原因，但是我们能获取到 this 对象。

[initMixin 代码](https://github.com/vuejs/vue/tree/v2.6.11/src/core/instance/init.js#L15)

```javascript
export function initMixin(Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this;
    // ...
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, "beforeCreate");
    initInjections(vm); // resolve injections before data/props
    initState(vm); // 初始化props,methods,data,computed,watch
    initProvide(vm); // resolve provide after data/props
    callHook(vm, "created");
    // 挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

// 初始化顺序： props -> methods-> data-> computed-> watch
export function initState(vm: Component) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props) initProps(vm, opts.props);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) {
    initData(vm);
  } else {
    /*该组件没有data的时候绑定一个空对象*/
    observe((vm._data = {}), true /* asRootData */);
  }
  if (opts.computed) initComputed(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
```

### initProps

- 遍历 props 上的属性调用 defineReactive 进行劫持监听;
- 同时将 props 的属性都调用自定义的 proxy 方法进行劫持 get 和 set;
- 当我们通过 this.xx 获取某个属性时，会返回 vm.\_props.xx（下面有自定义的 proxy 函数）；

[initProps](https://github.com/vuejs/vue/tree/v2.6.11/src/core/instance/state.js#L64)

```javascript
function initProps(vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {};
  // 引用类型的应用
  const props = (vm._props = {});
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = (vm.$options._propKeys = []);
  const isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  for (const key in propsOptions) {
    keys.push(key);
    const value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      const hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn(`"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`, vm);
      }
      // 进行数据劫持改写,回调检测props的异常overwritten
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
              `overwritten whenever the parent component re-renders. ` +
              `Instead, use a data or computed property based on the prop's ` +
              `value. Prop being mutated: "${key}"`,
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, `_props`, key);
    }
  }
  // 是否进行劫持改写的变量控制
  toggleObserving(true);
}
```

### initMethods

- 遍历 methods，将所有方法绑定到 vm 上，`vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)`, 这就是**Q3**为什么 methods 属性，我们可以直接通过 this.xx 访问的原因。
- 同时验证 methods 的名字是否重名；

[initMethods](https://github.com/vuejs/vue/tree/v2.6.11/src/core/instance/state.js#L262)

```javascript
function initMethods(vm: Component, methods: Object) {
  const props = vm.$options.props;
  for (const key in methods) {
    if (process.env.NODE_ENV !== "production") {
      if (typeof methods[key] !== "function") {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
            `Did you reference the function correctly?`,
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(`Method "${key}" has already been defined as a prop.`, vm);
      }
      if (key in vm && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
            `Avoid defining component methods that start with _ or $.`
        );
      }
    }
    vm[key] = typeof methods[key] !== "function" ? noop : bind(methods[key], vm);
  }
}
```

### initData

- 先判断 data 是否为函数，如果是函数调用 getData 添加依赖收集对象 Dep.target；
- 再判断 data 内的属性与 props，methods 是否重名；
- 将 data 内的属性都调用自定义的 proxy 方法重定义 get 和 set; 当我们通过 this.xx 获取某个属性时，会返回 vm.\_data.xx
- 遍历 data 内的属性，进行劫持监听 observe；

[initData](https://github.com/vuejs/vue/tree/v2.6.11/src/core/instance/state.js#L112)

```javascript
function initData(vm: Component) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};
  // ...略
  // proxy data on instance
  const keys = Object.keys(data);
  const props = vm.$options.props;
  const methods = vm.$options.methods;
  let i = keys.length;
  while (i--) {
    const key = keys[i];
    if (process.env.NODE_ENV !== "production") {
      if (methods && hasOwn(methods, key)) {
        warn(`Method "${key}" has already been defined as a data property.`, vm);
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== "production" &&
        warn(`The data property "${key}" is already declared as a prop. ` + `Use prop default value instead.`, vm);
    } else if (!isReserved(key)) {
      // 非服务端渲染data内的属性同步到vm 并且同步到vm._data
      proxy(vm, `_data`, key);
    }
  }
  // observe data 数据监听
  observe(data, true /* asRootData */);
}

export function getData(data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, `data()`);
    return {};
  } finally {
    popTarget();
  }
}

export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}
```

> **Q**：为什么 data，props 等属性可以直接通过 this.xx 访问？
> **A**：data、props 都调用了自定义的 proxy 方法对属性进行劫持，重新定义属性的 get 和 set，当我们调用 this.xx 将会返回 this.\_props.xx 或 this.\_data.xx，这就是为什么 data 和 props 中的数据，我们可以直接通过 this.xx 访问的原因；

### initComputed

- 遍历 computed 的 key，对每个计算属性创建一个 Watcher 实例，以便在数据依赖发生变化时，计算属性能够自动更新；
- 然后再调用 defineComputed 方法，为每一个计算属性重新定义调用函数 get 和 set，以便在使用计算属性的；

[initComputed](https://github.com/vuejs/vue/tree/v2.6.11/src/core/instance/state.js#L169)

```javascript
const computedWatcherOptions = { lazy: true };

function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null));
  // computed properties are just getters during SSR
  const isSSR = isServerRendering();

  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === "function" ? userDef : userDef.get;
    if (process.env.NODE_ENV !== "production" && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      // 定义计算属性
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== "production") {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm);
      }
    }
  }
}
export function defineComputed(target: any, key: string, userDef: Object | Function) {
  // 是否为服务端渲染判断是否需要缓存
  const shouldCache = !isServerRendering();
  // 函数式计算属性默认没有set,
  if (typeof userDef === "function") {
    // 判断创建监听还是使用自定义的方法
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    // 对象类型的计算属性可以自定义get，set
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  // ...
  // 将计算属性key挂到vm上
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      //再创建watcher时传入参数computedWatcherOptions: {lazy:true}, 初始化watcher属性dirty:true
      if (watcher.dirty) {
        watcher.evaluate(); // 返回计算属性的初始值,将dirty赋值false
      }
      if (Dep.target) {
        watcher.depend(); // dep收集依赖
      }
      return watcher.value;
    }
  };
}
```

### initWatch

[initWatch](https://github.com/vuejs/vue/tree/v2.6.11/src/core/instance/state.js#L290)

```javascript
function initWatch(vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key];
    // 数组
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
// 创建watcher
function createWatcher(vm: Component, expOrFn: string | Function, handler: any, options?: Object) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
```
