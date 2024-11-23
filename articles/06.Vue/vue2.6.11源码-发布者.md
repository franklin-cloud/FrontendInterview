<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [发布者 Dep](#%E5%8F%91%E5%B8%83%E8%80%85-dep)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### 发布者 Dep

主要是为了收集依赖，依赖更新时通知所有订阅者 watcher 进行更新。
[发布者 Dep](./https://github.com/vuejs/vue/tree/v2.6.11/src/core/observer/dep.js)

```javascript
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++;
    // 订阅队列
    this.subs = [];
  }
  // 添加订阅
  addSub(sub: Watcher) {
    this.subs.push(sub);
  }
  // 移除订阅
  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  // 通知订阅者进行更新
  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    if (process.env.NODE_ENV !== "production" && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id);
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
const targetStack = [];

export function pushTarget(target: ?Watcher) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
```
