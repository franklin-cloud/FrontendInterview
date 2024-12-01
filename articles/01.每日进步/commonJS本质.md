## 1. CommonJS 的本质

CommonJS 的本质是一种模块化规范，它定义了模块的加载和导出的方式。在 Node.js 中，CommonJS 是默认的模块化规范。

CommonJS 的模块化规范主要包含以下内容：

1. 每个文件都是一个模块，模块内部定义的变量和函数默认是私有的，不会对外暴露。
2. 模块可以通过 `module.exports` 对象来导出变量和函数，其他模块可以通过 `require` 函数来引入这些变量和函数。
3. 模块加载是同步的，即加载模块时会阻塞代码的执行，直到模块加载完成。
4. 模块加载的顺序按照代码中出现的顺序，即先加载的模块会先执行。
5. 模块加载的结果会被缓存，即多次加载同一个模块只会执行一次，后续加载会直接读取缓存的结果。

## 2. require 函数的实现

```js
function getModuleId(path) {}

function getDirname(path) {}
// 缓存
var moduleCache = {};

function require(path) {
  //  1. 根据传递的模块路径得到模块完整的绝对路径, 作为模块的id
  var moduleId = getModuleId(path);
  //  2. 判断模块是否已经加载过
  if (moduleCache[moduleId]) {
    return moduleCache[moduleId].exports;
  }
  //  3. 执行模块的代码，将模块的导出内容挂载到module.exports上
  function _require(exports, require, module, __filename, __dirname) {
    // 获取模块的代码，放在这里
    this.a = 1;
    exports.b = 2;
    exports = {
      c: 3,
    };
    modules.exports = {
      d: 4,
    };

    this.e = 5;
    exports.f = 6;
    modules.exports.e = 7;
    // 获取模块的代码，放在这里
  }
  //  4.准备_require函数需要的参数
  var module = {
    id: moduleId,
    exports: {}, //  模块导出的内容
  };
  var exports = module.exports;
  // 文件绝对路径
  var __filename = moduleId;
  // 文件目录绝对路径
  var __dirname = getDirname(__filename);
  // 执行_require 函数，给模块赋值，使用call 绑定函数中的this 为exports
  _require.call(exports, exports, require, module, __filename, __dirname);
  //  5. 将模块缓存起来
  moduleCache[moduleId] = module;
  //  6. 返回模块的导出内容
  return module.exports;
}
```

## 3. require 函数-分别输出什么？

```js
console.log(1, this, this === module.exports, this === exports);
// {} true true

this.a = 1;
exports.b = 2;

console.log(2, this, module.exports, exports);
// { a: 1, b: 2 } { a: 1, b: 2 } { a: 1, b: 2 }

exports = {
  c: 3,
};
// exports指向的内存地址发生了改变，但是module.exports指向的内存地址没有发生改变
console.log(3, this, module.exports, exports);
// { a: 1, b: 2 } { a: 1, b: 2 } { c: 3 }

// module.exports指向的内存地址没有发生改变
module.exports = {
  d: 4,
};

console.log(4, this, module.exports, exports);
// { a: 1, b: 2 } { d: 4 } { c: 3 }

this.e = 5;

console.log(5, this, module.exports, exports);
// { a: 1, b: 2,e: 5 } { d: 4 } { c: 3 }
```
