## Tree Shaking

**tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)**。**它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export**。这个术语和概念实际上是由 ES2015 模块打包工具 rollup 普及起来的。

webpack 2 正式版本内置支持 ES2015 模块（也叫做 harmony modules）和未使用模块检测能力。新的 webpack 4 正式版本扩展了此检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

## sideEffects

将文件标记为 side-effect-free.在一个纯粹的 ESM 模块世界中，很容易识别出哪些文件有副作用。然而，我们的项目无法达到这种纯度，所以，此时有必要提示 webpack compiler 哪些代码是“纯粹部分”。

通过 package.json 的 "sideEffects" 属性，来实现这种方式。

```javascript
{
  "name": "your-project",
  "sideEffects": false
}
```

如果你的代码确实有一些副作用，可以改为提供一个数组：

```javascript
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js", "*.css"]
}
```

## 将函数调用标记为无副作用

是可以告诉 webpack 一个函数调用是无副作用的，只要通过 /_#**PURE**_/ 注释。它可以被放到函数调用之前，用来标记它们是无副作用的(pure)。传到函数中的入参是无法被刚才的注释所标记，需要单独每一个标记才可以。如果一个没被使用的变量定义的初始值被认为是无副作用的（pure），它会被标记为死代码，不会被执行且会被压缩工具清除掉。这个行为被会开启当 optimization.innerGraph 被设置成 true。

```javascript
// file.js
/*#__PURE__*/ double(55);
```

## 使用 production 模式

上述其实是描述如何在 development 模式下开启 tree-shaking，但其实在 development 模式下，为了开发和调试方便，我们是不会开启压缩的，而 production 下，会自动为我们开启 tree-shaking。去掉 usedExports 和 uglifyjs-webpack-plugin 相关配置，将 mode 修改为 production。

```javascript
{
  mode: "production";
}
```

[Webpack Tree Shaking](https://webpack.docschina.org/guides/tree-shaking/)
