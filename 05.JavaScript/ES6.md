<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [let 和 var 的区别](#let-%E5%92%8C-var-%E7%9A%84%E5%8C%BA%E5%88%AB)
- [const 对象的属性可以修改吗?](#const-%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B1%9E%E6%80%A7%E5%8F%AF%E4%BB%A5%E4%BF%AE%E6%94%B9%E5%90%97)
- [箭头函数与普通函数的区别](#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E4%B8%8E%E6%99%AE%E9%80%9A%E5%87%BD%E6%95%B0%E7%9A%84%E5%8C%BA%E5%88%AB)
- [ES6 中箭头函数 VS 普通函数的 this 指向](#es6-%E4%B8%AD%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0-vs-%E6%99%AE%E9%80%9A%E5%87%BD%E6%95%B0%E7%9A%84-this-%E6%8C%87%E5%90%91)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

1. 箭头函数是匿名函数，不能作为构造函数，那么也没有**原型属性**, 不能使用 new；

   ```
      const fn = () => {
        console.log("fn");
      };

      console.log(fn.name); // fn
      console.log(fn.prototype); // 原型属性: undefined
      console.log(fn.__proto__); // 原型对象：f() {[native code]}
   ```

2. 箭头函数不能绑定 arguments，取而代之用 rest 参数...解决

   ```js
   function fn1(a) {
     console.log(arguments);
   }

   const fn2 = (...c) => {
     console.log(c);
   };

   fn1(1, 2, 3, 4, 5, 8);
   // [1, 2, 3, 4, 5, 8, callee: ƒ, Symbol(Symbol.iterator): ƒ]

   fn2(3, 82, 32, 11323);
   // [3, 82, 32, 11323]
   ```

3. 箭头函数不绑定`this`，会捕获其所在的上下文的`this`值，作为自己的`this`值, 没有办改变其指向; 普通函数的`this`指向调用它的对象;

## ES6 中箭头函数 VS 普通函数的 this 指向

**普通函数中 this**

1.  总是指向它的直接调用者，如 obj.fn，fn 里的最外层 this 就是指向 obj；
2.  默认情况下，没有直接调用者，fn()，匿名函数自调 this 指向 window
3.  严格模式下（设置了'use strict'），this 为 undefined
4.  当使用 call，apply，bind（ES5 新增）绑定的，this 指向绑定对象；
5.  DOM 事件的处理函数中的 this 指向当前的 DOM 元素对象，`button.onclick=function(){}`、`button.addEventListener(“click”,function(){…})`
6.  new 一个构造函数，this 指向 new 出来的新对象

**ES6 箭头函数中 this**

默认指向: 定义它时指向当前箭头函数之外**最近的函数作用域**；
即 ES6 箭头函数里 this 的指向就是上下文里对象 this 指向，偶尔没有上下文对象，this 就指向 window

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
