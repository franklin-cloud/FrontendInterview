<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [JavaScript 继承的几种实现方式](#javascript-%E7%BB%A7%E6%89%BF%E7%9A%84%E5%87%A0%E7%A7%8D%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript 继承的几种实现方式

- 第一种是以原型链的方式来实现继承。
  但是这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。

- 第二种方式是使用借用构造函数的方式。
  这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。

- 第三种方式是组合继承，将原型链和借用构造函数组合起来使用的一种方式。
  通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性。

- 第四种方式是原型式继承。
  原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的 `Object.create()` 方法就是原型式继承的实现。缺点与原型链方式相同。

- 第五种方式是寄生式继承。
  寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是没有办法实现函数的复用。

- 第六种方式是寄生式组合继承。
  组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。

  ## ES5 继承

### 借助构造函数继承(call, apply)

> 无法继承父级原型上属性和方法

```js
function Animal(hobby) {
  this.type = "基类";
  this.hobby = hobby;
  this.say = function () {
    console.log("say function");
  };
}

Animal.prototype.getHobby = function () {
  console.log("Animal原型上的getHobby:", this, this.hobby);
};

function Cat(name) {
  this.type = "衍生类";
  this.name = name;
  Animal.call(this, "抓蝴蝶");
}

const cat1 = new Cat("Tom");
console.log(cat1.hobby); // 抓蝴蝶
cat1.say(); // say function
cat1.getHobby(); // 报错：cat1.getHobby is not a function, 无法继承原型上的方法和属性
```

### 原型继承

> 父级与子级无法动态传参,改变原型会导致所有实例都发生改变

```js
function Animal(hobby) {
  this.type = "基类";
  this.hobby = hobby;
  this.say = function () {
    console.log("say function");
  };
}

Animal.prototype.getHobby = function () {
  console.log("Animal原型上的getHobby:", this, this.hobby);
};

function Cat(name) {
  this.type = "衍生类";
  this.name = name;
}

const animal = new Animal("swiming");
Cat.prototype = animal;
// 缺点:衍生类实例化时无法给基类传参
const cat2 = new Cat("Tom2");
console.log(cat2.hobby); // swiming
cat2.say(); // say function
cat2.getHobby(); // Animal原型上的getHobby: Animal, swiming
```

### 组合继承

> 借助构造函数继承 + 原型链继承; 两次调用父类的构造函数（耗内存）

```js
function Animal(hobby) {
  this.type = "基类";
  this.hobby = hobby;
  this.say = function () {
    console.log("say function");
  };
}

Animal.prototype.getHobby = function () {
  console.log("Animal原型上的getHobby:", this, this.hobby);
};

function Cat(name, hobby) {
  this.type = "衍生类";
  this.name = name;
  Animal.call(this, hobby);
}
const animal = new Animal("swiming");
Cat.prototype = animal;
const cat3 = new Cat("Tom3", "抓蝴蝶");

console.log(cat3.hobby); // 抓蝴蝶
cat3.say(); // say function
cat3.getHobby(); // Animal原型上的getHobby: Animal, 抓蝴蝶
```

### 寄生组合继承

> 借助构造函数继承 + 原型链继承(不进行实例化，原型对象赋值)

```js
function Animal(hobby) {
  this.type = "基类";
  this.hobby = hobby;
  this.say = function () {
    console.log("say function");
  };
}

Animal.prototype.getHobby = function () {
  console.log("Animal原型上的getHobby:", this, this.hobby);
};

function Cat(name, hobby) {
  this.type = "衍生类";
  this.name = name;
  Animal.call(this, hobby);
}

Cat.prototype = Object.create(Animal.prototype);
const cat3 = new Cat("Tom3", "抓蝴蝶");

console.log(cat3.hobby); // 抓蝴蝶
cat3.say(); // say function
cat3.getHobby(); // Animal原型上的getHobby: Animal, 抓蝴蝶
```

## Class 继承

### Class 继承中，为什么子类要先调用 super()才能使用 this 对象？

在 ES6 中，‌ 通过 extends 关键字实现类的继承。‌ 子类在构造函数中必须首先调用 super()，‌ 这是因为子类没有自己的 this 对象，‌ 而是继承父类的 this 对象，‌ 然后对其进行加工。‌ 如果不调用 super()方法，‌ 子类就得不到 this 对象，‌ 因此在子类的构造函数中，‌ 只有调用 super()之后，‌ 才能使用 this 关键字，‌ 否则会报错。‌ 这是因为 this.name 等属性可能在 super()调用之前并未定义，‌ 如果直接访问这些属性会导致错误。‌ 因此，‌ 为了避免这种陷阱，‌JavaScript 强制要求在构造函数中使用 this 之前，‌ 必须先调用 super()。‌

此外，‌ES6 的继承机制与 ES5 的构造函数不同，‌ES6 的子类实例对象必须先通过父类的构造函数创建，‌ 得到与父类相同的实例属性和方法后，‌ 再添加子类自己的实例属性和方法。‌ 这意味着，‌ 如果不先调用父类的构造函数（‌ 即 super()）‌，‌ 子类将无法正确地继承父类的属性和方法，‌ 也无法正确地初始化自己的 this 对象

### 核心概念

- 私有的属性(#[prototyName])和方法(#[functionName])不能继承。
- 父类的静态属性和静态方法能被子类继承, 但是不能被实例继承。
- super 作为函数调用时，代表父类的构造函数。
- super 作为对象时，在普通方法中指向父类的原型对象；在静态方法中指向父类。
- 子类中不管有没有显式定义 constructor，任何一个子类都有 constructor 方法。

```js
class Parent {
  constructor(name) {
    this.name = name;
  }

  #getName() {
    console.log("私有方法：", this.name);
  }

  static st_fn() {
    console.log("静态方法可被子类继承，不能被实例继承");
  }

  say() {
    this.#getName();
    console.log("say something:", this);
  }
}

class Child extends Parent {
  constructor(name) {
    super(name); // 调用父类的构造函数，为了将Parent的this对象指向Child
  }
}

const parent = new Parent("parent");
const child = new Child("child");

Child.st_fn(); // 静态方法能被衍生类继承
// parent.st_fn(); // 报错: 静态方法不能被实例继承

parent.say(); // 私有方法： parent
// parent.#getName(); // SyntaxError: Private field '#getName' must be declared in an enclosing class
```
