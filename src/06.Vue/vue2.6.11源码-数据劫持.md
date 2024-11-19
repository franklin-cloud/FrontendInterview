<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [observe 函数](#observe-%E5%87%BD%E6%95%B0)
- [defineReactive 数据劫持函数](#definereactive-%E6%95%B0%E6%8D%AE%E5%8A%AB%E6%8C%81%E5%87%BD%E6%95%B0)
- [数组的监听](#%E6%95%B0%E7%BB%84%E7%9A%84%E7%9B%91%E5%90%AC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### observe 函数

[observe](./https://github.com/vuejs/vue/tree/v2.6.11/src/core/observer/index.js#L110) 函数的作用是给对象添加一个观察者实例，返回观察者实例。

```js
export function observe(value: any, asRootData: ?boolean): Observer | void {
  // value 判断
  // ...
  ob = new Observer(value);
  // 返回观察者实例
  return ob;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, "__ob__", this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj: Object) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}
/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment(target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}
```

### defineReactive 数据劫持函数

[defineReactive](./https://github.com/vuejs/vue/tree/v2.6.11/src/core/observer/index.js#L135) 函数是数据劫持的核心函数，它通过 Object.defineProperty() 方法给对象添加 getter 和 setter，从而实现数据的劫持。具体实现如下：

```javascript
export function defineReactive(obj: Object, key: string, val: any, customSetter?: ?Function, shallow?: boolean) {
  // 实例化发布者
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  // cater for pre-defined getter/setters
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  // 递归劫持，对val值监听
  let childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true, // 是否可枚举
    configurable: true, // 是否可配置
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      // 当我们在模板中使用data或者props等即会注册一个订阅者，Dep.target就会存在
      if (Dep.target) {
        // 发布者收集依赖（watcher）
        dep.depend();
        if (childOb) {
          //	子集使用子集的发布者进行依赖收集
          childOb.dep.depend();
          if (Array.isArray(value)) {
            // 数组依赖收集
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== "production" && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return;
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      // 重新设置新值的监听
      childOb = !shallow && observe(newVal);
      // 发布者通知所有的订阅者调用update进行更新
      dep.notify();
    },
  });
}
```

### 数组的监听

[methodsToPatch](./https://github.com/vuejs/vue/tree/v2.6.11/src/core/observer/array.js) 对象内的数组操作方法都会改变原数组，在这里对这几个方法进行改写

```javascript
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result;
  });
});
```
