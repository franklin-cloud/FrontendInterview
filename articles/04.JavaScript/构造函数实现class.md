## es5 构造函数实现 class

### class 特点

- **class 必须使用 new 执行，但是构造函数没有 new 也可以执行**;
- **类的属性和方法除非显式定义在其本身（定义在 this 对象上）否则都是定义在原型上**；
- **类的方法不可枚举**；
- static 静态方法: 不会被实例继承，而是直接通过类来调用，如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例；
- static 静态方法：父类静态方法可以被子类继承（extends）;
- #前缀私有属性与私有方法, 仅在类的内部可用；

```javascript
class Person1 {
  constructor(name) {
    this.name = name;
    console.log(new.target);
  }
  getName() {
    console.log(this.name);
  }
}
class Person2 extends Person1 {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
const p1 = new Person1("Franklin"); // 会完整打印Person1
p1.getName(); //Franklin
const p2 = new Person2("Tom", 26); // 会完整打印Person2
p2.getName(); // Tom
console.log(p2.name); // Tom
console.log(p2.age); // 26
```

### 构造函数实现 class

```javascript
function Person3(name) {
  if (!(this instanceof Person3)) {
    throw Error("这是一个构造函数，请使用new关键字进行实例化");
  }
  this.name = name;
}
Person3.prototype.getName = function () {
  console.log(this.name);
};
const p3 = new Person3("Franklin"); // 构造函数内的this指向实例p3
p3.getName(); // Franklin
console.log(p3.name); // Franklin
Person3("Franklin"); // 构造函数内的this指向Window
```

[如何确保你的构造函数只能被 new 调用，而不能被普通调用？](https://developer.aliyun.com/article/904939)
