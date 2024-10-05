<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [为什么需要异步更新？](#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0)
- [异步更新机制](#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E6%9C%BA%E5%88%B6)
- [异步更新流程](#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E6%B5%81%E7%A8%8B)
- [update](#update)
- [queueWatcher](#queuewatcher)
- [nextTick](#nexttick)
- [flushCallbacks](#flushcallbacks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### 为什么需要异步更新？

当数据变化时，我们希望视图能尽可能快的更新，但是当数据变化频繁时，视图更新也会变得频繁，导致性能下降。所以我们需要一种机制来控制视图更新的频率，这就是异步更新。

### 异步更新机制

Vue 2.0 中使用了异步更新机制，当数据变化时，Vue 不会立即更新视图，而是将需要更新的视图放入一个队列中，等到下一个事件循环再统一更新。这样可以避免频繁的视图更新，提高性能。

### 异步更新流程

1. 当数据变化时，触发依赖收集，收集依赖的发布者调用 notify 通知订阅者 watcher 执行 update 函数，执行 queueWatcher。
2. queueWatcher 将 watcher 放入一个队列中，如果队列中已经存在相同的 watcher，则不会重复添加（去重的依据是 watcher.id）。
3. nextTick 函数会根据当前环境选择合适的异步方法，nextTick 的入参 flushSchedulerQueue 进行排序，得到 flushCallbacks，flushCallbacks 传入异步方法内部遍历执行。
4. 当异步队列执行时，flushSchedulerQueue 函数内部会遍历队列中的 watcher，执行 watcher.run 函数，更新视图。
5. 在更新视图时，Vue 会通过 diff 算法计算出需要更新的节点，然后更新视图。更新完成后，Vue 会清空队列，等待下一次数据变化。

### update

当依赖更新，收集依赖的发布者调用 notify 通知订阅者 watcher 执行 update 函数，执行 queueWatcher。

```javascript
/**
* Subscriber interface.
 * Will be called when a dependency changes.
 */
update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)
  }
}
```

### queueWatcher

将 watcher 放入一个队列中，如果队列中已经存在相同的 watcher，则不会重复添加（去重的依据是 watcher.id）。

```javascript
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher(watcher: Watcher) {
  const id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (process.env.NODE_ENV !== "production" && !config.async) {
        flushSchedulerQueue();
        return;
      }
      // 如果没有可以同时处理的wathcer，则执行下一次
      nextTick(flushSchedulerQueue);
    }
  }
}
```

### nextTick

flushSchedulerQueue 根据 watcher.id 进行排序，然后保存整个回调 callbacks

```javascript
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  let watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id);

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== "production" && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          "You may have an infinite update loop " +
            (watcher.user ? `in watcher with expression "${watcher.expression}"` : `in a component render function.`),
          watcher.vm
        );
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice();
  const updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit("flush");
  }
}
```

**timerFunc**
借助异步任务来实现异步更新： Promise，MutationObserver，setImmediate，setTimeout
根据不同的环境情况来使用不同的微任务进行更新

```javascript
let timerFunc;
// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== "undefined" && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (
  !isIE &&
  typeof MutationObserver !== "undefined" &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === "[object MutationObserverConstructor]")
) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}
```

### flushCallbacks

遍历更新队列 callbacks 进行更新

```javascript
function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
```
