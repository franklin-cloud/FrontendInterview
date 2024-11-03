<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [let 和 var 的区别](#let-%E5%92%8C-var-%E7%9A%84%E5%8C%BA%E5%88%AB)
- [const 对象的属性可以修改吗?](#const-%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B1%9E%E6%80%A7%E5%8F%AF%E4%BB%A5%E4%BF%AE%E6%94%B9%E5%90%97)

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
