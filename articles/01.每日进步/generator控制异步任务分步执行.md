假如有三个异步任务 f1、f2、f3，要求同步执行，即 f1 执行完再执行 f2，f2 执行完再执行 f3，如何实现？

```js
function f1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("1");
      resolve("1");
    }, 500);
  });
}

function f2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("2");
      resolve("2");
    }, 400);
  });
}

function f3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("3");
      resolve("3");
    }, 100);
  });
}
```

## 使用 async/await

将异步任务写成 Promise，然后使用 async/await 进行同步执行。

```js
async function fn() {
  await f1();
  await f2();
  await f3();
}

fn();
```

## 使用 Generator

```js
function* asyncTask(tasks) {
  for (let itemFn of tasks) {
    yield itemFn;
  }
}

function run() {
  const generator = asyncTask([f1, f2, f3]);

  const handler = (generatorResult) => {
    if (generatorResult.done) {
      console.log("任务全部完成");
      return;
    }
    // 任务执行
    const value = generatorResult.value();
    if (typeof value.then === "function") {
      // 异步任务，执行下一个任务
      value.then((res) => {
        handler(generator.next(res));
      });
    } else {
      // 同步任务试，执行下一个任务
      handler(generator.next(value));
    }
  };

  handler(generator.next());
}

run();
```
