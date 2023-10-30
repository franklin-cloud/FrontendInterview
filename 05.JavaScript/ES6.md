<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [ES6 新特性](#es6-%E6%96%B0%E7%89%B9%E6%80%A7)
- [let 和 var 的区别](#let-%E5%92%8C-var-%E7%9A%84%E5%8C%BA%E5%88%AB)
- [const 对象的属性可以修改吗?](#const-%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B1%9E%E6%80%A7%E5%8F%AF%E4%BB%A5%E4%BF%AE%E6%94%B9%E5%90%97)
- [箭头函数与普通函数的区别](#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E4%B8%8E%E6%99%AE%E9%80%9A%E5%87%BD%E6%95%B0%E7%9A%84%E5%8C%BA%E5%88%AB)
- [ES6 中箭头函数 VS 普通函数的 this 指向](#es6-%E4%B8%AD%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0-vs-%E6%99%AE%E9%80%9A%E5%87%BD%E6%95%B0%E7%9A%84-this-%E6%8C%87%E5%90%91)
- [如果 new 一个箭头函数的会怎么样?](#%E5%A6%82%E6%9E%9C-new-%E4%B8%80%E4%B8%AA%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E7%9A%84%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7)
- [扩展运算符的作用及使用场景](#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6%E7%9A%84%E4%BD%9C%E7%94%A8%E5%8F%8A%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
- [Proxy 可以实现什么功能？](#proxy-%E5%8F%AF%E4%BB%A5%E5%AE%9E%E7%8E%B0%E4%BB%80%E4%B9%88%E5%8A%9F%E8%83%BD)
- [map weakMap set weakSet 区别](#map-weakmap-set-weakset-%E5%8C%BA%E5%88%AB)
- [异步编程的实现方式？](#%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F)
- [Generator 函数](#generator-%E5%87%BD%E6%95%B0)
- [对 Promise 的理解](#%E5%AF%B9-promise-%E7%9A%84%E7%90%86%E8%A7%A3)
- [对 async/await 的理解](#%E5%AF%B9-asyncawait-%E7%9A%84%E7%90%86%E8%A7%A3)
- [Promise 是做什么的，有哪些 API](#promise-%E6%98%AF%E5%81%9A%E4%BB%80%E4%B9%88%E7%9A%84%E6%9C%89%E5%93%AA%E4%BA%9B-api)
  - [Promise 用法](#promise-%E7%94%A8%E6%B3%95)
  - [Promise.prototype.then()](#promiseprototypethen)
  - [Promise.prototype.catch()](#promiseprototypecatch)
  - [Promise.all()](#promiseall)
  - [Promise.race()](#promiserace)
  - [Promise.resolve()](#promiseresolve)
  - [Promise.reject()](#promisereject)
- [Promise 不兼容怎么解决](#promise-%E4%B8%8D%E5%85%BC%E5%AE%B9%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ES6 新特性

- let const 块级作用域
- 模板字符串
- 解构赋值
- 箭头函数，函数参数默认值
- 扩展运算符（...）
- forEach for...of for...in
- 数组方法 map reduce includes
- map 和 set
- 模块化
- promise
- proxy
- async
- class

## let 和 var 的区别

- let 是块级作用域，var 是函数作用域
- var 存在变量提升，而 let 没有
- 在代码块内使用 let 命令声明变量之前该变量不可用的。这在语法上，称为“暂时性死区” (TDZ)
- let 在同一块级作用域不可重复定义，var 可以

  ```js
  if (true) {
    // TDZ开始
    tmp = "abc"; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
  }
  ```

上面代码中，在 let 命令声明变量 tmp 之前，都属于变量 tmp 的“死区”。

## const 对象的属性可以修改吗?

`const` 保证的并不是变量的值不能改动，而是变量指向的那个内存地
址不能改动。

对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，const 只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

## 箭头函数与普通函数的区别

1. 箭头函数是匿名函数，不能作为构造函数，不能使用 new
2. 箭头函数不能绑定 arguments，取而代之用 rest 参数...解决

   ```js
   function A(a) {
     console.log(arguments);
   }
   A(1, 2, 3, 4, 5, 8);
   // [1, 2, 3, 4, 5, 8, callee: ƒ, Symbol(Symbol.iterator): ƒ]
   let C = (...c) => {
     console.log(c);
   };
   C(3, 82, 32, 11323);
   // [3, 82, 32, 11323]
   ```

3. 箭头函数没有原型属性
4. 箭头函数的 this 永远指向其上下文的 this，没有办改变其指向，
   普通函数的 this 指向调用它的对象
5. 箭头函数不绑定 this，会捕获其所在的上下文的 this 值，作为自己的 this 值

## ES6 中箭头函数 VS 普通函数的 this 指向

```js
普通函数中 this

1.  总是指向它的直接调用者，如 obj.fn，fn 里的最外层 this 就是指向 obj
2.  默认情况下，没有直接调用者，fn()，匿名函数自调this 指向 window
3.  严格模式下（设置了'use strict'），this 为 undefined
4.  当使用 call，apply，bind（ES5 新增）绑定的，this 指向绑定对象；
5.  DOM事件的处理函数中的this指向当前的DOM元素对象，button.onclick=function(){}、button.addEventListener(“click”,function(){…})
6.  new一个构造函数，this指向new出来的新对象
```

```js
ES6 箭头函数中 this

1.  默认指向定义它时指向当前箭头函数之外最近的函数作用域this；
    即 ES6 箭头函数里 this 的指向就是上下文里对象 this 指向，偶尔没有上下文对象，this 就指向 window
```

下面使用例子来加深一下印象：

```js
// 例1
function hello() {
  console.log(this); // window
}
hello();

// 例2
function hello() {
  "use strict";
  console.log(this); // undefined
}
hello();

// 例3
const obj = {
  num: 10,
  hello: function () {
    console.log(this); // obj
    setTimeout(function () {
      console.log(this); // 匿名函数中，this指向window
    });
  },
};
obj.hello();

// 例4
const obj = {
  num: 10,
  hello: function () {
    console.log(this); // obj
    setTimeout(() => {
      console.log(this); // 箭头函数中， 指向上下文obj
    });
  },
};
obj.hello();

// 例5
/*
diameter是普通函数，里面的this指向直接调用它的对象obj。
perimeter是箭头函数，this应该指向上下文函数this的指向，
这里上下文没有函数对象，就默认为window，而window里面没有radius这个属性，就返回为NaN。
*/
const obj = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};
console.log(obj.diameter()); // 20
console.log(obj.perimeter()); // NaN
```

## 如果 new 一个箭头函数的会怎么样?

箭头函数是 ES6 中的提出来的，它没有 prototype，也没有自己的 this
指向，更不可以使用 arguments 参数，所以不能 New 一个箭头函数。
new 操作符的实现步骤如下：

- 1.创建一个对象
- 2.将构造函数的作用域赋给新对象（也就是将对象的**proto**属性
  指向构造函数的 prototype 属性）
- 3.指向构造函数中的代码，构造函数中的 this 指向该对象（也就是
  为这个对象添加属性和方法）
- 4.返回新的对象
  所以，上面的第二、三步，箭头函数都是没有办法执行的。

## 扩展运算符的作用及使用场景

**对象扩展运算符**

对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当 前对象之中。 Object.assign 方法用于对象的合并，将源对象（source）的所有可
枚举属性，复制到目标对象（target）。Object.assign 方法的第一
个参数是目标对象，后面的参数都是源对象。(如果目标对象与源对
象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面
的属性)。同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符
内部的同名属性会被覆盖掉。

```js
const target = { a: 1, b: 2 };
const source = { ...target };
console.log(source); // { a: 1, b: 2 }
```

需要注意：扩展运算符对对象实例的拷贝属于浅拷贝。

**数组扩展运算符**  
数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每
次只能展开一层数组。
扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中，这里参数对象是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中。
合并数组

```js
const target = [1, 2, 3];
const source = [...target, 4, 5];
console.log(source); //[1,2,3,4,5]
```

需要注意：如果将扩展运算符用于数组赋值，只能放在参数的最后一
位，否则会报错。

任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组

```js
const target = "hello";
const source = [...target];
console.log(source); // [ 'h', 'e', 'l', 'l', 'o' ]
```

## Proxy 可以实现什么功能？

在 Vue3.0 中通过 Proxy 来替换原本的 Object.defineProperty
来实现数据响应式。
Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

`let p = new Proxy(target, handler)`

代表需要添加代理的对象，handler 用来自定义对象中的操作，比如
可以用来自定义 set 或者 get 函数。
下面来通过 Proxy 来实现一个数据响应式

```js
// 待更新
```

在上述代码中，通过自定义 `set` 和 `get` 函数的方式，在原本的逻辑
中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出
通知。
当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，
需要在 get 中收集依赖，在 set 派发更新，之所以 Vue3.0 要使用
Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属
性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现
有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式
的数据改变，唯一缺陷就是浏览器的兼容性不好。

## map weakMap set weakSet 区别

Set

Set 本身是一个构造函数，接受具有 iterable 接口的其他数据结构作为参数

1. Set 类似数组, 成员的值都是唯一，没有重复的值。
2. Set 用于去重，获取集合的交集，差集非常方便。
3. Set 原型方法: add(), delete(), has(), clear()
4. Set 遍历操作方法：keys(), values(), entries(), forEach()

WeakSet

1. 不重复的值的集合,WeakSet 的成员只能是对象，而不能是其他类型的值
2. 不可遍历

Map

Map 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

1. Map 的键可以是任意类型
2. Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
3. Map 可以被遍历
4. Map 的原型方法 set(),get(),has(),clear(),delete()
5. Map 的遍历方法：keys(), values(), entries(), forEach()
6. Map 类似对象

WeakMap

1. weakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
2. weakMap 键名引用的对象是弱引用，即垃圾回收机制不会将该引用考虑在内。但是只要所引用对对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是，一旦一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
3. weakMap 不可遍历，WeakMap 对键名所引用的对象是弱引用关系，因此 WeakMap 内部成员是会却决于垃圾回收机制有没有执行，运行前后成员个数很可能是不一样的，而垃圾回收机制的执行又是不可预测的，因此不可遍历

## 异步编程的实现方式？

1. 回调函数的方式，使用回调函数的方式有一个缺点是，多个回调函
   数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦
   合度太高，不利于代码的可维护。
2. `Promise` 的方式，使用 Promise 的方式可以将嵌套的回调函数作为
   链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，
   可能会造成代码的语义不够明确。
3. `generator` 的方式，它可以在函数的执行过程中，将函数的执行权转
   移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行
   的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权
   给转移回来。因此在 generator 内部对于异步操作的方式，可以以
   同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控
   制权转移回来，因此需要有一个自动执行 generator 的机制，比如
   说 co 模块等方式来实现 generator 的自动执行
4. `async` 函数的方式，async 函数是 generator 和 promise 实现的
   一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个
   await 语句的时候，如果语句返回一个 promise 对象，那么函数将
   会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此
   可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动
   执行

## Generator 函数

`Generator` 函数是 ES6 提供的一种异步编程解决方案。

执行 `Generator` 函数会返回一个`遍历器对象`，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

Generator 函数是一个普通函数，但是有两个特征。

一是 function 关键字与函数名之间有一个星号；

二是函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

var hw = helloWorldGenerator();

hw.next();
// { value: 'hello', done: false }

hw.next();
// { value: 'world', done: false }

hw.next();
// { value: 'ending', done: true }

hw.next();
// { value: undefined, done: true }
```

每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。换言之，Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行。

## 对 Promise 的理解

1. Promise 的实例有三个状态: Pending（进行中）,Resolved（已完成）,Rejected（已拒绝）
   当把一件事情交给 promise 时，它的状态就是 Pending，任务完成了
   状态就变成了 Resolved、没有完成失败了就变成了 Rejected。
2. Promise 的实例有两个过程：

   pending -> fulfilled : Resolved（已完成）

   pending -> rejected：Rejected（已拒绝）

   注意：一旦从进行状态变成为其他状态就永远不能更改状态了。

Promise 的特点：

1.  对象的状态不受外界影响。
2.  一旦状态改变就不会再变，任何时候都可以得到这个结果。
3.  一旦使用 then 方法注册回调函数，就会立即执行。

Promise 的缺点：

1.  无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
2.  如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
3.  当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始
    还是即将完成）。

## 对 async/await 的理解

ES2017 标准引入了 async 函数，它就是 Generator 函数的语法糖。

```js
const fs = require("fs");

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

// Generator 函数
const gen = function* () {
  const f1 = yield readFile("/etc/fstab");
  const f2 = yield readFile("/etc/shells");
  console.log(f1.toString());
  console.log(f2.toString());
};
// 函数gen可以写成async函数
const asyncReadFile = async function () {
  const f1 = await readFile("/etc/fstab");
  const f2 = await readFile("/etc/shells");
  console.log(f1.toString());
  console.log(f2.toString());
};
```

比较就会发现，async 函数就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await，仅此而已。

async 函数对 Generator 函数的改进，体现在以下四点：

（1）内置执行器。

Generator 函数的执行必须靠执行器，所以才有了 co 模块，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。

`asyncReadFile();`

上面的代码调用了 asyncReadFile 函数，然后它就会自动执行，输出最后结果。这完全不像 Generator 函数，需要调用 next 方法，或者用 co 模块，才能真正执行，得到最后结果。

（2）更好的语义。

async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

（3）更广的适用性。

co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

（4）返回值是 Promise。

async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用 then 方法指定下一步的操作。

进一步说，async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖。

## Promise 是做什么的，有哪些 API

> Promise 是异步编程的一种解决方案

### Promise 用法

> Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
>
> resolve 函数的作用是，将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

### Promise.prototype.then()

> Promise 实例具有 then 方法，也就是说，then 方法是定义在原型对象 Promise.prototype 上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。
>
> **then 方法返回的是一个新的 Promise 实例**（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。

```js
getJSON("/posts.json")
  .then(function (json) {
    return json.post;
  })
  .then(function (post) {
    // ...
  });
```

### Promise.prototype.catch()

> Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

```js
getJSON("/posts.json")
  .then(function (posts) {
    // ...
  })
  .catch(function (error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log("发生错误！", error);
  });
```

> 上面代码中，getJSON()方法返回一个 Promise 对象，如果该对象状态变为 resolved，则会调用 then()方法指定的回调函数；如果异步操作抛出错误，状态就会变为 rejected，就会调用 catch()方法指定的回调函数，处理这个错误。另外，then()方法指定的回调函数，如果运行中抛出错误，也会被 catch()方法捕获。

### Promise.all()

> Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

> 上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
>
> p 的状态由 p1、p2、p3 决定，分成两种情况:
>
> （1）只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。
>
> （2）只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

### Promise.race()

> Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

> 上面代码中，只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

### Promise.resolve()

> 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
>
> Promise.resolve()等价于下面的写法。

```js
Promise.resolve("foo");
// 等价于
new Promise((resolve) => resolve("foo"));
```

### Promise.reject()

> Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。

```js
const p = Promise.reject("出错了");
// 等同于
const p = new Promise((resolve, reject) => reject("出错了"));

p.then(null, function (s) {
  console.log(s);
});
// 出错了
```

> 上面代码生成一个 Promise 对象的实例 p，状态为 rejected，回调函数会立即执行。

## Promise 不兼容怎么解决

用一些第三方的库来解决兼容性问题：

1. babel-polyfill
2. ES6-Promise
3. bluebird
