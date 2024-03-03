<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [js 的对象的常用的方法](#js-%E7%9A%84%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B8%B8%E7%94%A8%E7%9A%84%E6%96%B9%E6%B3%95)
- [js 的字符串的常用的方法](#js-%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84%E5%B8%B8%E7%94%A8%E7%9A%84%E6%96%B9%E6%B3%95)
- [js 的数组的常用的方法](#js-%E7%9A%84%E6%95%B0%E7%BB%84%E7%9A%84%E5%B8%B8%E7%94%A8%E7%9A%84%E6%96%B9%E6%B3%95)
- [js 遍历对象和遍历数组的方式](#js-%E9%81%8D%E5%8E%86%E5%AF%B9%E8%B1%A1%E5%92%8C%E9%81%8D%E5%8E%86%E6%95%B0%E7%BB%84%E7%9A%84%E6%96%B9%E5%BC%8F)
  - [遍历对象](#%E9%81%8D%E5%8E%86%E5%AF%B9%E8%B1%A1)
  - [遍历数组](#%E9%81%8D%E5%8E%86%E6%95%B0%E7%BB%84)
- [for...in for...of 区别](#forin-forof-%E5%8C%BA%E5%88%AB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 对象的常用的方法

```js
Object.assign(); // 复制对象，创建一个新的对象
Object.entries(); //返回自身可枚举的[key,value]
Object.keys(); // 返回自身可枚举的key
Object.values(); // 返回自身可枚举的value
Object.hasOwnProperty(key); // 是否有这个属性 true/false
Object.getOwnPropertyNames(); // 取得对象自身可枚举的属性名，for in 对对象进行遍历，可以拿到自身以及原型链上的可枚举的属性
Object.freeze(); // 冻结一个对象，不可修改，不可删除。不可添加新的属性
Object.prototype.toString(); // 返回数组[object,object/array/function等]，判断是数组还是对象就是用的这个方法
Object.defineProperty(obj, attr, descriptor);
//可以对对象属性进行修改添加，删除等的操作
//参数1，要操作的对象
//参数2：要操作的属性名字
//参数3：属性描述符：是否可枚举，是否可读，可写，他的值等
```

## 字符串的常用的方法

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

## 数组的常用的方法

```js
var arr = [0, 1, 2, 3, 4];

arr.push(); // 添加元素，在数组的末尾添加元素，返回数组的长度
arr.pop(); // 删除数组末尾的元素，返回删除的元素
arr.shift(); // 删除数组开头的元素，返回删除的元素
arr.unshift(); // 添加元素到数组的开头，返回数组的长度
arr.reverse(); // 反转数组，返回反转后的原数组
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
// arr.splice(2, 0, "i"); // 从索引2开始，删除0个，加入一个i
// arr.splice(3, 1, "o", "i"); // 从索引3开始，删除1个，添加两个字符串
// arr.splice(1, 2, "a", "b", "c"); // 从索引1开始，删除2个，添加三个字符串
arr.concat(); // 连接数组，返回一个新的数组
arr.sort(); // 数组排序，返回排序后的原数组，() => 0, -1, 1
// arr.sort((a, b) => a - b); // 升序排序 1
// arr.sort((a, b) => b - a); // 降序排序 -1
arr.flat(); // 数组扁平化，返回一个新数组，将多维数组变成一维数组
// arr.flat(1);
arr.flat(Infinity);
arr.entries(); // 将数组返回一个对象，包含对象索引的键值对
```

## js 遍历对象和遍历数组的方式

```js
const s_p = Symbol("s_p");

const obj = {
  name: "lee",
  sex: "male",
  age: 18,
  [s_p]: "symbol属性",
};

obj.__proto__.p_t_p = "prototype属性";
Object.defineProperty(obj, "define_proerty", {
  value: "Object.defineProerty的属性",
  writable: false,
  enumerable: false,
  configurable: true,
});
```

### 遍历对象

- Object.keys()

> **返回对象所有可枚举属性(不含原型和 Symbol 属性)**

```js
Object.keys(obj).forEach((key) => {
  console.log(key, obj[key]);
});
// name lee
// sex male
// age 18
```

- for...in

> **循环遍历对象自身的和原型上的可枚举属性(不含 Symbol 属性)**

```js
for (let key in obj) {
  console.log(key, obj[key]);
}
// name lee
// sex male
// age 18
// p_t_p prototype属性
```

- Object.getOwnPropertyNames()

> **返回对象自身的所有属性(包括不可枚举属性, 不含 Symbol 属性)**

```js
Object.getOwnPropertyNames(obj).forEach((key) => {
  console.log(key, obj[key]);
});
// name lee
// sex male
// age 18
// define_proerty Object.defineProerty的属性
```

- Reflect.ownKeys()

> **包含对象的所有属性(包括 Symbol 属性和不可枚举属性)**

```js
Reflect.ownKeys(obj).forEach((key) => {
  console.log(key, obj[key]);
});
// name lee
// sex male
// age 18
// define_proerty Object.defineProerty的属性
// Symbol(s_p) 'symbol属性'
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
- for...of 会遍历数/数组/字符串/map/set 等拥有**迭代器对象（iterator）的集合**，但是不能遍历对象，因为对象没有迭代器对象。

总结：for in 遍历的是数组的索引（即键名），而 for of 遍历的是数组元素值；for in 总是得到对象的 key 或数组、字符串的下标；for of 总是得到对象的 value 或数组、字符串的值
