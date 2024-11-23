<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [var 和 let const 的区别](#var-%E5%92%8C-let-const-%E7%9A%84%E5%8C%BA%E5%88%AB)
- [const 对象的属性可以修改吗?](#const-%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B1%9E%E6%80%A7%E5%8F%AF%E4%BB%A5%E4%BF%AE%E6%94%B9%E5%90%97)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## var 和 let const 的区别

在 JavaScript 中，`var`、`let`和`const`是三种不同的声明方式，它们在**作用域和提升行为**上有显著区别：

1. ‌ **作用域差异** ‌

- ‌var‌：var 声明的变量具有函数作用域或全局作用域，这意味着在函数外部声明的变量可以在函数内部访问，且 var 声明的变量会提升到其作用域的顶部，因此可以在声明前访问。
- ‌let 和 const‌：let 和 const 声明的变量具有块级作用域（block scope），这意味着它们只能在声明它们的代码块内访问。尝试在声明之前访问这些变量会抛出错误，因为它们处于“暂时性死区”（Temporal Dead Zone，TDZ）‌12。

2. ‌ **提升行为差异**

- ‌var‌：var 声明的变量会被提升到其作用域的顶部，但在提升时不会初始化，直到实际使用时才会赋值。因此，可以在声明之前访问这些变量，但它们的值是未定义的。
- ‌let 和 const‌：let 和 const 声明的变量不会被提升到其作用域的顶部。尝试在声明之前访问这些变量会抛出错误，因为它们处于暂时性死区。

3. ‌**全局作用域中的表现**

- 在 ES5 中，全局变量直接挂载到全局对象 window 的属性上，因此可以通过 window 访问。
- 在 ES6 中，全局变量从全局对象 window 中脱离，但为了保持兼容性，var 和函数声明的全局变量仍然可以通过 window 访问。然而，let 和 const 声明的全局变量不会挂载到 window 上，因此在全局作用域中无法通过 window 访问这些变量 ‌

```js
var a1 = 1; // var 全局变量直接挂载到全局对象 window 的属性上
let a2 = 2; // let 全局变量从全局对象 window 中脱离, 不会挂载到 window 上
console.log(this.a1); // 1
console.log(this.a2); // undefined

// var length = 10;
// let length = 10;

function fn() {
  return this.length + 1;
}

var obj = {
  length: 5,
  test1: function () {
    return fn();
  },
};

obj.test2 = fn;
console.log(obj.test1()); // var 定义length打印11，let定义length打印6
console.log(obj.test2()); // 6
```

## const 对象的属性可以修改吗?

`const` 保证的并不是变量的值不能改动，而是变量指向的那个内存地
址不能改动。

对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，const 只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。
