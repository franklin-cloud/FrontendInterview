<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [JavaScript 有哪些数据类型，它们的区别？](#javascript-%E6%9C%89%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E5%AE%83%E4%BB%AC%E7%9A%84%E5%8C%BA%E5%88%AB)
- [数据类型检测的方式有哪些？](#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%B5%8B%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9C%89%E5%93%AA%E4%BA%9B)
- [intanceof 操作符的实现原理及实现](#intanceof-%E6%93%8D%E4%BD%9C%E7%AC%A6%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86%E5%8F%8A%E5%AE%9E%E7%8E%B0)
- [什么情况下会发生布尔值的隐式强制类型转换](#%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E4%BC%9A%E5%8F%91%E7%94%9F%E5%B8%83%E5%B0%94%E5%80%BC%E7%9A%84%E9%9A%90%E5%BC%8F%E5%BC%BA%E5%88%B6%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2)
- [字符的转换规则](#%E5%AD%97%E7%AC%A6%E7%9A%84%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)
- [数值的转换规则](#%E6%95%B0%E5%80%BC%E7%9A%84%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)
- [布尔的转换规则](#%E5%B8%83%E5%B0%94%E7%9A%84%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)
- [{} 和 [] 的 valueOf 和 toString 的结果是什么](#-%E5%92%8C--%E7%9A%84-valueof-%E5%92%8C-tostring-%E7%9A%84%E7%BB%93%E6%9E%9C%E6%98%AF%E4%BB%80%E4%B9%88)
- [null 和 undefined 区别](#null-%E5%92%8C-undefined-%E5%8C%BA%E5%88%AB)
- [|| 和 && 操作符的返回值](#-%E5%92%8C--%E6%93%8D%E4%BD%9C%E7%AC%A6%E7%9A%84%E8%BF%94%E5%9B%9E%E5%80%BC)
- [== 操作符的强制类型转换规则](#-%E6%93%8D%E4%BD%9C%E7%AC%A6%E7%9A%84%E5%BC%BA%E5%88%B6%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)
- [如何将字符串转化为数字，例如 '12.3b'](#%E5%A6%82%E4%BD%95%E5%B0%86%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E5%8C%96%E4%B8%BA%E6%95%B0%E5%AD%97%E4%BE%8B%E5%A6%82-123b)
- [JS 作用域](#js-%E4%BD%9C%E7%94%A8%E5%9F%9F)
- [闭包的特性以及优缺点](#%E9%97%AD%E5%8C%85%E7%9A%84%E7%89%B9%E6%80%A7%E4%BB%A5%E5%8F%8A%E4%BC%98%E7%BC%BA%E7%82%B9)
- [JSON.parse(JSON.stringify(obj)) 实现深拷贝需要注意的问题](#jsonparsejsonstringifyobj-%E5%AE%9E%E7%8E%B0%E6%B7%B1%E6%8B%B7%E8%B4%9D%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E7%9A%84%E9%97%AE%E9%A2%98)
- [arguments 怎么转化成真数组](#arguments-%E6%80%8E%E4%B9%88%E8%BD%AC%E5%8C%96%E6%88%90%E7%9C%9F%E6%95%B0%E7%BB%84)
- [js 的对象的常用的方法](#js-%E7%9A%84%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B8%B8%E7%94%A8%E7%9A%84%E6%96%B9%E6%B3%95)
- [js 的字符串的常用的方法](#js-%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E5%B8%B8%E7%94%A8%E7%9A%84%E6%96%B9%E6%B3%95)
- [js 的数组的常用的方法](#js-%E7%9A%84%E6%95%B0%E7%BB%84%E7%9A%84%E5%B8%B8%E7%94%A8%E7%9A%84%E6%96%B9%E6%B3%95)
- [js 遍历对象和遍历数组的方式](#js-%E9%81%8D%E5%8E%86%E5%AF%B9%E8%B1%A1%E5%92%8C%E9%81%8D%E5%8E%86%E6%95%B0%E7%BB%84%E7%9A%84%E6%96%B9%E5%BC%8F)
  - [遍历对象](#%E9%81%8D%E5%8E%86%E5%AF%B9%E8%B1%A1)
  - [遍历数组](#%E9%81%8D%E5%8E%86%E6%95%B0%E7%BB%84)
- [for...in for...of 区别](#forin-forof-%E5%8C%BA%E5%88%AB)
- [Ajax 基本流程](#ajax-%E5%9F%BA%E6%9C%AC%E6%B5%81%E7%A8%8B)
- [Ajax 的 readyState 的几种状态分别代表什么](#ajax-%E7%9A%84-readystate-%E7%9A%84%E5%87%A0%E7%A7%8D%E7%8A%B6%E6%80%81%E5%88%86%E5%88%AB%E4%BB%A3%E8%A1%A8%E4%BB%80%E4%B9%88)
- [Ajax 禁用浏览器的缓存功能](#ajax-%E7%A6%81%E7%94%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E7%BC%93%E5%AD%98%E5%8A%9F%E8%83%BD)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript 有哪些数据类型，它们的区别？

JavaScript 共有八种数据类型，分别是 Undefined、Null、Boolean、
Number、String、Object、Symbol、BigInt。

其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了
  解决可能出现的全局变量冲突的问题。

- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，
  使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了
  Number 能够表示的安全整数范围。

这些数据可以分为原始数据类型和引用数据类型：

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组、函数等）

两种类型的区别在于存储位置的不同：

- 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间
  小、大小固定，属于被频繁使用数据，所以放入栈中存储；

- 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；**引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。**

堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：

- 在数据结构中，栈中数据的存取方式为先进后出。
- 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大
  小来规定。

在操作系统中，内存被分为栈区和堆区：

- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的
  值等。其操作方式类似于数据结构中的栈。
- 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可
  能由垃圾回收机制回收。

## 数据类型检测的方式有哪些？

- typeof
  可以判断基础数据类型，无法判断引用类型（其中数组、对象、null 都会被判断为 object）

  ![typeof](./images/zhuawa/typeof.png)

- instanceof
  instanceof 操作符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，返回布尔值。instanceof 只能正确判断引用数据类型，而不能判断基本数据类型。

  ![instanceof](./images/zhuawa/instanceof.png)

- constructor
  constructor 有两个作用，一是判断数据的类型，二是对象实例通过 constrcutor 对象访问它的构造函数。
  ![constructor](./images/zhuawa/constructor.png)

  需要注意，如果创建一个对象来改变它的原型，constructor 就不能用来判断数据类型了

  ![constructor](./images/zhuawa/constructor2.png)

- Object.prototype.toString.call()
  Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型：
  ![Object.prototype.toString](./images/zhuawa/Object.prototype.toString.png)

  同样是检测对象 obj 调用 toString 方法，obj.toString()的结果和 Object.prototype.toString.call(obj)的结果不一样，这是为什么？

  这是因为 toString 是 Object 的原型方法，而数组函数等类
  型作为 Object 的实例，都重写了 toString 方法。不同的对象类型调
  用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法（function 类型返回内容为函数体的字符串，array
  类型返回元素组成的字符串…），而不会去调用 Object 上原型
  toString 方法（返回对象的具体类型），所以采用 obj.toString()
  不能得到其对象类型，只能将 obj 转换为字符串类型；因此，在想要
  得到对象的具体类型时，应该调用 Object 原型上的 toString 方法。

## intanceof 操作符的实现原理及实现

instanceof 操作符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上，返回布尔值

如果 a instanceof B ，那么 a 必须要是个对象，而 B 必须是一个合法的函数。在这两个条件都满足的情况下：判断 B 的 prototype 属性指向的原型对象（ B.prototype ）是否在对象 a 的原型链上。如果在，则返回 true；如果不在，则返回 false。简而言之， instanceof 的原理其实就是一个查找原型链的过程。

```js
// 构造函数right的原型是否出现在实例left的原型链上
function _instanceof(left, right) {
  if (typeof left !== "object") return false;
  if (typeof right !== "function") return false;

  const proto_r = right.prototype;
  let proto_l = Object.getPrototypeOf(left);

  while (true) {
    if (!proto_l) return false;
    if (proto_l === proto_r) return true;
    proto_l = Object.getPrototypeOf(proto_l);
  }
}
```

## 什么情况下会发生布尔值的隐式强制类型转换

1. if (..) 语句中的条件判断表达式。
2. for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
3. while (..) 和 do..while(..) 循环中的条件判断表达式。
4. 三目运算中的条件判断表达式。
5. 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数（作为条件判断表达式）。

## 字符的转换规则

规范的 9.8 节中定义了抽象操作 ToString ，它负责处理非字符串到字符串的强制类型转换。

1. null 和 undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"

2. Boolean 类型，true 转换为 "true"，false 转换为 "false"。

3. Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。

4. Symbol 类型的值直接转换，Symbol('a') => "Symbol('a')", 但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。

5. 对普通对象来说，除非自行定义 `toString()` 方法，否则会调用 `Object.prototype.toString()`
   来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会
   调用该方法并使用其返回值。

## 数值的转换规则

有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作 ToNumber。

1. undefined 类型的值转换为 NaN。

2. null 类型的值转换为 0。

3. Boolean 类型的值，true 转换为 1，false 转换为 0。

4. String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。

5. Symbol 类型的值不能转换为数字，报错。

6. 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有 valueOf() 方法。
如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。
如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

## 布尔的转换规则

ES5 规范 9.2 节中定义了抽象操作 ToBoolean，列举了布尔强制类型转换所有可能出现的结果。
以下这些是假值：
• undefined
• null
• false
• +0、-0 和 NaN
• ""

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

## {} 和 [] 的 valueOf 和 toString 的结果是什么

{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"

[] 的 valueOf 结果为 [] ，toString 的结果为 ""

## null 和 undefined 区别

- undefined 和 null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。
- undefined 代表的含义是未定义，null 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 undefined，null 主要用于赋值给一些可能会返回对象的变量，作为初始化。
- undefined 在 js 中不是一个保留字，这意味着我们可以使用 undefined 来作为一个变量名，这样的做法是非常危险的，它会影响我们对 undefined 值的判断。但是我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。
- 当我们对两种类型使用 typeof 进行判断的时候，null 类型化会返回 “object”，这是一个历史遗留的问题。
- `undefined == null(true)` `undefined === null(false)`

## || 和 && 操作符的返回值

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行 ToBoolean 强制类型转换，然后再执行条件判断。

对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。

&& 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果

## == 操作符的强制类型转换规则

1. 字符串和数字之间的相等比较，将字符串转换为数字之后再进行比较。

2. 其他类型和布尔类型之间的相等比较，先将布尔值转换为数字后，再应用其他规则进行比较。

3. null 和 undefined 之间的相等比较，结果为真。其他值和它们进行比较都返回假值。

4. 对象和非对象之间的相等比较，对象先调用 ToPrimitive 抽象操作后，再进行比较。

5. 如果一个操作值为 NaN ，则相等比较返回 false（ NaN 本身也不等于 NaN ）。

6. 如果两个操作值都是对象，则比较它们是不是指向同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true，否则，返回 false。

## 如何将字符串转化为数字，例如 '12.3b'

1. 使用 Number() 方法，前提是所包含的字符串不包含不合法字符。

2. 使用 parseInt() 方法，parseInt() 函数可解析一个字符串，并返回一个整数。还可以设置要解析的数字的基数。当基数的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。

3. 使用 parseFloat() 方法，该函数解析一个字符串参数并返回一个浮点数。

## JS 作用域

ES5 只有全局作用域和函数作用域

- 全局作用域：代码在程序的任何地方都能被访问，window 对象的内置属性都存在全局作用域
- 函数作用域：在固定的代码片段才能被访问

ES6 有块级作用域

## 闭包的特性以及优缺点

闭包：其实就是函数嵌套函数，当一个函数返回了引用类型

```js
function test() {
  var age = 18;
  function addAge() {
    age++;
    alert(age);
  }
  return addAge;
}
```

闭包有三个特性：

- 函数嵌套函数；
- 内部函数使用外部函数的参数和变量；
- 参数和变量不会被垃圾回收机制回收。

闭包的优/缺点

- 优点-保护：因为函数会形成私有作用域，不收外部干扰，非常适用于模块化。
- 缺点-保存：变量能长期保存内存中，函数返回一个引用类型，当这个引用类型被引用时，就会不销毁的作用域，一直存在内存中，造成内存泄漏。

## JSON.parse(JSON.stringify(obj)) 实现深拷贝需要注意的问题

1. 如果 obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果，时间将只是字符串的形式,而不是时间对象；
2. 如果 obj 里有 RegExp、Error 对象，则序列化的结果将只得到空对象；
3. 如果 obj 里有函数，undefined，则序列化的结果会把函数或 undefined 丢失；
4. 如果 obj 里有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null
5. JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果 obj 中的对象是有构造函数生成的， 则使用 JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的 constructor；
6. 如果对象中存在循环引用的情况也无法正确实现深拷贝；

## arguments 怎么转化成真数组

- arguments 是一个伪数组，是当前函数的内置对象，存储所有的形参，有 length 属性，但是不能用数组的方法。
- [...arguments] 扩展运算符的方式，拿取剩余参数
- Array.prototype.slice.call(arguments);使用 call 一个对象调用另一个函数的方法，slice 切割数组并返回一个新的数组
- [].slice.call() 因为[].slice === Array.prototype.slice
- 遍历：arguments 有 length 属性，所以，可以遍历 arguments 取出每一个元素，并放进新的数组中

## js 的对象的常用的方法

```js
Object.assign(); // 复制对象，创建一个新的对象
Object.entries(); //返回自身可枚举的[key,value]
Object.keys(); // 返回自身可枚举的key
Object.values(); // 返回自身可枚举的value
Object.hasOwnProperty(key); // 是否有这个属性 true/false
Object.getOwnPropertyNames(); // 取得对象自身可枚举的属性名
//for in 对对象进行遍历，可以拿到自身以及原型链上的可枚举的属性
Object.freeze(); // 冻结一个对象，不可修改，不可删除。不可添加新的属性
Object.prototype.toString(); // 返回数组[object,object/array/function等]
//判断是数组还是对象就是用的这个方法
Object.defineProerty(obj, attr, descriptor);
//可以对对象属性进行修改添加，删除等的操作
//参数1，要操作的对象
//参数2：要操作的属性名字
//参数3：属性描述符：是否可枚举，是否可读，可写，他的值等
```

## js 的字符串的常用的方法

```js
var str1 = "wwww";
var str2 = "jjjj";
var str3 = "kkkk";

str.concat(); // 拼接，返回新的字符串
str.includes(); // 判断字符串是否包含在另外一个字符串中, 返回布尔值
str.indexOf(); // 查找字符串，从左向右，找不到返回-1， 返回第一个匹配的字符串的索引
str.lastIndexOf(); // 查找字符串，从右向左，找不到返回-1，返回第一个匹配的字符串的索引
str.split(); // 按特定的符号分割成字符串数组
str.toLowerCase(); //转换成小写的形式
str.toUpperCase(); //转换成大写的形式
str.trim(); // 去除字符串两端的空格
str.substring(start, end); // 截取字符串，含开始，不含结束，返回新的字符串
str.slice(); //截取字串，含开始，含结束，end不可以小于start
str.substr(start, length); //截取指定长度的字符串
```

## js 的数组的常用的方法

```js
var arr = [0, 1, 2, 3, 4];

arr.push(); // 添加元素，在数组的末尾添加元素，返回数组的长度
arr.pop(); // 删除数组末尾的元素，返回删除的元素
arr.shift(); // 删除数组开头的元素，返回删除的元素
arr.unshift(); // 添加元素到数组的开头，返回数组的长度
arr.reverse(); // 反转数组，返回反转后的数组
arr.every(); // 判断数组中所有的元素是否满足条件，返回布尔值
arr.some(); // 判断数组中是否有元素满足条件，返回布尔值
arr.forEach();
arr.filter();
arr.includes();
arr.map();
arr.reduce();
arr.indexOf(); // 查找元素，从左向右，找不到返回-1，返回第一个匹配的元素的索引
arr.lastIndexOf(); // 查找元素，从右向左，找不到返回-1，返回第一个匹配的元素的索引
arr.findIndex(); // 查找元素，从左向右，找不到返回-1，返回第一个匹配的元素的索引
arr.find(); // 查找元素，从左向右，找不到返回undefined，返回第一个匹配的元素
arr.join(); // 数组转字符串，用指定的符号连接数组，返回字符串
arr.join(" "); // 无缝链接 将数组元素拼接成字符串
arr.slice(1, 2); // 截取数组，含开始，不含结束，返回新的数组
arr.splice(1, 4); // 删除数组，从索引1开始，删除4个，返回删除的元素
arr.splice(2, 0, "i"); // 从索引2开始，删除0个，加入一个i
arr.splice(3, 1, "o", "i"); // 从索引3开始，删除1个，添加两个字符串
arr.flat(); // 数组扁平化，返回一个新数组，将多维数组变成一维数组
arr.flat(1);
arr.flat(Infinity);
arr.entries(); // 将数组返回一个对象，包含对象索引的键值对
```

## js 遍历对象和遍历数组的方式

### 遍历对象

- Object.keys()

> 返回一个数组,**包括对象自身的所有可枚举属性(不含继承的, 不含 Symbol 属性)**

```js
let obj = {
  name: "lee",
  sex: "male",
  age: 18,
};
Object.keys(obj).forEach((key) => {
  console.log(key, obj[key]);
});

// name lee
// sex male
// age 18
```

- for...in

> **循环遍历对象自身的和原型上继承的可枚举属性(不含 Symbol 属性).**

```js
let obj = {
  name: "lee",
  sex: "male",
  age: 18,
};
for (let key in obj) {
  console.log(key, obj[key]);
}

// name lee
// sex male
// age 18
```

- Object.getOwnPropertyNames()

> 返回一个数组,**包含对象自身的所有属性(包括不可枚举属性, 不含 Symbol 属性).**

```js
let obj = {
  name: "lee",
  sex: "male",
  age: 18,
};
Object.getOwnPropertyNames(obj).forEach((key) => {
  console.log(key, obj[key]);
});

// name lee
// 17 sex male
// 17 age 18
```

- Reflect.ownKeys()

> 返回一个数组,**包含对象所有属性(包括 Symbol 属性和不可枚举属性).**

```js
let obj = {
  name: "lee",
  sex: "male",
  age: 18,
};
Reflect.ownKeys(obj).forEach((key) => {
  console.log(key, obj[key]);
});

// name lee
// 17 sex male
// 17 age 18
```

### 遍历数组

- forEach()

```js
let arr = [1, 2, 3];
arr.forEach((e) => {
  console.log(e);
});

// 1
// 2
// 3
```

- for...in

> 注意 for...in 遍历的是索引

```js
let arr = [1, 2, 3];
for (let index in arr) {
  console.log(arr[index]);
}

// 1
// 2
// 3
```

- for...of

```js
let arr = [1, 2, 3];
for (let ele of arr) {
  console.log(ele);
}

// 1
// 2
// 3
```

## for...in for...of 区别

- for...in 会遍历对象或者数组的可枚举属性，包括原型，如果不想遍历原型的方法和属性，可以在循环内部判断一下，然后使用 hasOwnProperty()方法判断某属性是否是该对象的属性
- for...of 会遍历数/数组/字符串/map/set 等拥有迭代器对象（iterator）的集合，但是不能遍历对象，因为对象没有迭代器对象。

总结：for in 遍历的是数组的索引（即键名），而 for of 遍历的是数组元素值；for in 总是得到对象的 key 或数组、字符串的下标；for of 总是得到对象的 value 或数组、字符串的值

## Ajax 基本流程

> 原生 js 代码实现与基于 promise 实现请传送至专栏：[面试高频手撕代码题](./../08.面试高频手撕代码题/面试高频手撕代码题.md)

Ajax 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。我对 ajax 的理解是，它是一种异步通信的方法，通过直接由 js 脚本向服务器发起 http 通信，然后根据服务器返回的数据，更新网页的相应部分，而不用刷新整个页面的一种方法。

创建一个 ajax 有这样几个步骤:

- 首先是创建一个 XMLHttpRequest 对象。

- 然后在这个对象上使用 open 方法创建一个 http 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。

- 在发起请求前，我们可以为这个对象添加一些信息和监听函数。比如说我们可以通过 setRequestHeader 方法来为请求添加头信息。我们还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发 onreadystatechange 事件，我们可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候我们可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候我们就可以通过 response 中的数据来对页面进行更新了。

- 当对象的属性和监听函数设置完成后，最后我们调用 sent 方法来向服务器发起请求，可以传入参数作为发送的数据体。

## Ajax 的 readyState 的几种状态分别代表什么

| 状态值 |           含义           |
| :----: | :----------------------: |
|   0    |       请求未初始化       |
|   1    |     服务器连接已建立     |
|   2    |        请求已接收        |
|   3    |        请求处理中        |
|   4    | 请求已完成，且响应已就绪 |

## Ajax 禁用浏览器的缓存功能

> 项目中，一般提交请求都会通过 ajax 来提交，我们都知道 ajax 能提高页面载入的速度主要的原因是通过 ajax 减少了重复数据的载入，也就是说在载入数据的同时将数据缓存到内存中，一旦数据被加载其中，只要我们没有刷新页面，这些数据就会一直被缓存在内存中，当我们提交 的 URL 与历史的 URL 一致时，就不需要提交给服务器，也就是不需要从服务器上面去获取数据，虽然这样降低了服务器的负载提高了用户的体验，但是我们不能获取最新的数据。为了保证我们读取的信息都是最新的，我们就需要禁止他的缓存功能。

解决的方法有：

1. 在 ajax 发送请求前加上 `xhr.setRequestHeader("If-Modified-Since","0")`。
2. 在 ajax 发送请求前加上 `xhr.setRequestHeader("Cache-Control","no-cache")`。
3. 在 URL 后面加上一个随机数： `"fresh=" + Math.random()`;。
4. 在 URL 后面加上时间搓：`"nowtime=" + new Date().getTime()`;。
5. 如果是使用 jQuery，直接这样就可以了`$.ajaxSetup({cache:false})`。这样页面的所有 ajax 都会执行这条语句就是不需要保存缓存记录。
