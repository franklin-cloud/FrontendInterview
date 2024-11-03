## ES6 箭头函数 this 的指向

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
