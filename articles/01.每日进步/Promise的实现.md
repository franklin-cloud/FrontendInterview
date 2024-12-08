## Promise 实现思路分析

- 实例化会执行 promise2 的构造函数，构造函数的参数是一个包含 resolve 和 reject 函数参数的函数 excutor，构造函数内调用 excutor 实现参数绑定，实例可以根据情况调用 resolve 和 reject。
- 异步操作完成前调用 then(实例化后直接调用 then):
  此时状态为 pending, 用两个数组分别保存 then 传入的两个回调 resolve 和 reject, 异步操作完成后成功则调用 resolve，改变 pending 状态为 fulfilled, 从数组中取出成功的回调并执行；要不操作异常则调用 reject, 改变 pending 状态为 rejected, 从缓存数组中取出拒绝的回调并执行。
  异常操作完成后调用 then(先实例化，在调用 then):
  异步操作完成后, 成功则将状态 pending 改为 resolve,异常则将状态 pending 改为 rejected, 当调动 then 时，根据当前状态执行对应的回调即可。
- then 的链式调用，调用 then 方法返回一个新的 Promise, 新 Promise 的状态由上一个 Promise 的状态来控制。

## 代码实现

```javascript
const statusMap = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

export default class Promise2 {
  constructor(excutor) {
    // 立即执行
    try {
      excutor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  status = "pending"; // 状态

  fulfilledCallbacks = []; // 成功的回调, 可以一直调用

  value = null; // 成功的值

  rejectedCallbacks = []; // 拒绝的回调

  errorInfo = null; // 失败信息

  /*
    在异步操作成功时调用，状态 pending -> fulfilled
    并将异步操作的结果，作为参数传递出去
  */
  resolve = (data) => {
    if (this.status === statusMap.PENDING) {
      this.status = statusMap.FULFILLED;
      this.value = data;
      while (this.fulfilledCallbacks.length) {
        const handler = this.fulfilledCallbacks.shift();
        handler(data);
      }
    }
  };

  /*
    在异步操作失败时调用，状态 pending -> rejected
    并将异步操作的结果，作为参数传递出去
  */
  reject = (data) => {
    if (this.status === statusMap.PENDING) {
      this.status = statusMap.REJECTED;
      this.errorInfo = data;
      while (this.rejectedCallbacks.length) {
        const handler = this.rejectedCallbacks.shift();
        handler(data);
      }
    }
  };

  /*
    then方法可以接受两个回调函数作为参数。
    第一个回调函数是Promise对象的状态变为resolved时调用，
    第二个回调函数是Promise对象的状态变为rejected时调用。
    这两个函数都是可选的，不一定要提供。
    它们都接受Promise对象传出的值作为参数。
  */
  then = (onFulfilled, onRejected) => {
    // 成功的回调
    // 判断是否传入了回调参数与
    const __onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    const __onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (error) => {
            throw error;
          };

    // 链式调用，返回一个Promise2实例
    const nextPromise = new Promise2((nextResolve, nextReject) => {
      const onResolveHandler = () => {
        try {
          const result = __onFulfilled(this.value);
          this.statusHandler(result, nextResolve, nextReject);
        } catch (e) {
          nextReject(e);
        }
      };
      // 拒绝的回调
      const onRejectHandler = () => {
        try {
          const result = __onRejected(this.errorInfo);
          this.statusHandler(result, nextResolve, nextReject);
        } catch (e) {
          nextReject(e);
        }
      };
      // 成功后调用
      if (this.status === statusMap.FULFILLED) {
        onResolveHandler();
      } else if (this.status === statusMap.REJECTED) {
        // 失败后调用
        onRejectHandler();
      } else if (this.status === statusMap.PENDING) {
        this.fulfilledCallbacks.push(onResolveHandler);
        this.rejectedCallbacks.push(onRejectHandler);
      }
    });
    return nextPromise;
  };
  // 改变链式调用返回实例的状态
  statusHandler = (next, resolve, reject) => {
    // 判断是不是Promise2实例对象
    if (next instanceof Promise2) {
      // 目的是将其状态变为 fulfilled 或者 rejected
      // x.then(
      //   (val) => resolve(val),
      //   (error) => reject(error)
      // );
      // 简化之后
      next.then(resolve, reject);
    } else {
      resolve(next);
    }
  };

  // resolve 静态方法
  static resolve(value) {
    // 如果传入Promise2就直接返回
    if (value instanceof Promise2) {
      return value;
    }
    return new Promise2((resolve) => {
      resolve(value);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new Promise2((resolve, reject) => {
      reject(reason);
    });
  }
}
```

## 测试

```javascript
const promise = new Promise2((resolve) => {
  setTimeout(() => {
    // throw new Error("执行器错误");
    resolve("123");
  }, 2000);
});
function other() {
  return new Promise2((resolve, reject) => {
    resolve("other");
  });
}
promise
  .then(
    (value) => {
      console.log(1);
      console.log("resolve", value);
      return other();
    },
    (error) => {
      console.log(error);
    }
  )
  .then((value) => {
    console.log(2);
    console.log("resolve", value);
    throw new Error("then error");
  })
  .then(
    () => {
      console.log(3);
    },
    (error) => {
      console.log(error);
    }
  );
```
