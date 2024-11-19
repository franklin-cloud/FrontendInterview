<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [this 指向](#this-指向)
- [作用域](#作用域)
- [作用域链](#作用域链)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## this 指向

this 指向的是执行上下文，必须执行了代码才能知道 this 指向谁，在函数执行时确定。

假设有个函数叫`method`，不同的调用方式，this 指向不同：
|调用方式|示例|函数中的 this 指向|
|---|---|---|
|直接调用|method()|全局对象，可能是 window 也可能是 global|
|通过 new 调用|new method()|新对象，也就是实例|
|通过对象调用|obj.method()|obj|
|call、apply.bind|method.call(ctx)|第一个参数 ctx|
|箭头函数|method:() => {}|定义当前箭头函数之外**最近的函数作用域**|

**例子分析**

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
    window.setTimeout(function () {
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
      console.log(this); // 箭头函数中， 指向定义当前箭头函数之外最近的函数作用域，也就是hello函数，所以this指向obj
    });
  },
};
obj.hello();

/*
例5
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

## 作用域

分为全局作用域和函数作用域，es6 增加了块级作用域。

1. 全局作用域
   最外层函数和最外层函数外面定义的变量拥有全局作用域，所有未定义直接赋值的变量自动声明为全局作用域，所有 window 对象的属性拥有全局作用域，全局作用域有很大的弊端，过多的全局作用域变量会污染全局命名空间，容易引起命名冲突。

2. 函数作用域
   函数作用域声明在函数内部的变量，一般只有固定的代码片段可以访问到，作用域是分层的，内层作用域可以访问外层作用域，反之不行。

3. 块级作用域
   使用 ES6 中新增的 let 和 const 指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中的创建（由`{ }`包裹的代码片段），let 和 const 声明的变量不会有变量提升，也不可以重复声明在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部。

## 作用域链

在当前作用域中查找所需变量，但是该作用域没有这个变量，那这个变量就是自由变量。如果在自己作用域找不到该变量就去父级作用域查找，依次向上级作用域查找，直到访问到 window 对象就被终止，这一层层的关系就是**作用域链**。

作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，可以访问到外层环境的变量和函数。
作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。当查找一个变量时，如果当前执行环境中没有找到，可以沿着作用域链向后查找。
