<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [es5 构造函数实现 class](#es5-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E5%AE%9E%E7%8E%B0-class)
  - [class 特点](#class-%E7%89%B9%E7%82%B9)
  - [构造函数实现 class](#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E5%AE%9E%E7%8E%B0-class)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 构造函数实现 class

**首先分析 class 特点**

- class 必须使用`new`关键字执行，但是构造函数没有`new`也可以直接执行，会造成使用上的误解;
- 类的属性和方法除非显式定义绑定在`this`上, 否则都是定义在原型上；
- 类的方法不可枚举；
- 静态方法(static)：父类静态方法可以被子类继承，但是不能被实例继承，只能通过类名调用;
- 私有属性与方法(#)：只能在类的内部访问，不能被实例访问, 也不能被继承，只能通过类名调用；

```javascript
class Person1 {
  constructor(name) {
    this.name = name;
    this.getAge = function () {
      return 18;
    };
  }
  #money = 100;
  static getGender() {
    return "male";
  }
  getName() {
    return "name:" + this.name;
  }
  #getMoney() {
    return this.#money;
  }
}
class Person2 extends Person1 {
  constructor(name, age) {
    super(name);
  }
}

const p1 = new Person1("p1");
const p2 = new Person2("p2");

console.log(p1.getName()); // p1
console.log(p1.__proto__.getName()); // constructor getName在原型上
console.log(p1.getAge()); // 18
// console.log(p1.__proto__.getAge()); // 报错 getAge 不在原型上
console.log(Object.keys(p1)); // 只打印绑定在this上的属性 ["name", "getAge"]
// console.log(p1.getGender()); // 报错
console.log(Person2.getGender()); // male
```

**构造函数实现 class**

```javascript
function Person3(name) {
  // 1. new 关键字限制
  if (!(this instanceof Person3)) {
    throw Error("这是一个构造函数，请使用new关键字进行实例化");
  }
  // 2. 属性绑定
  this.name = name;
}
// 3. 方法绑定
Person3.prototype.getName = function () {
  console.log(this.name);
};

const p3 = new Person3("Franklin"); // 构造函数内的this指向实例p3
p3.getName(); // Franklin
console.log(p3.name); // Franklin
Person3("Franklin"); // 构造函数内的this指向Window
```

[如何确保你的构造函数只能被 new 调用，而不能被普通调用？](https://developer.aliyun.com/article/904939)
