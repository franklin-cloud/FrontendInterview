<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [JavaScript 脚本延迟加载的方式有哪些？](#javascript-脚本延迟加载的方式有哪些)
- [defer 和 async 的区别](#defer-和-async-的区别)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## JavaScript 脚本延迟加载的方式有哪些？

延迟加载就是等页面加载完成之后再加载 JavaScript 文件。js 延
迟加载有助于提高页面加载速度。

一般有以下几种方式：

1. defer 属性：给 js 脚本添加 defer 属性，这个属性会让脚本的加
   载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文
   件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性
   的脚本按规范来说最后是**顺序执行**的，但是在一些浏览器中可能不是
   这样。
2. async 属性：给 js 脚本添加 async 属性，这个属性会使脚本异步
   加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js
   脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async
   属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次
   执行。
3. 动态创建 DOM 方式：动态创建 DOM 标签的方式，可以对文档的加载
   事件进行监听，当文档加载完成后再动态的创建 script 标签来引入
   js 脚本。
4. 使用 setTimeout 延迟方法：设置一个定时器来延迟加载 js 脚本文
   件
5. 让 JS 最后加载：将 js 脚本放在文档的底部，来使 js 脚本尽可能
   的在最后来加载执行。

## defer 和 async 的区别

- defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。当整个 document 解析完毕后再执行脚本文件，在 DOMContentLoaded 事件触发之前完成。多个脚本按顺序执行。

- async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。

defer

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <title>Hi</title>
    <script>
      console.log("Howdy ~");
    </script>
    <script defer src="https://unpkg.com/vue@3.2.41/dist/vue.global.js"></script>
    <script defer src="https://unpkg.com/vue-router@4.1.5/dist/vue-router.global.js"></script>
  </head>
  <body>
    Hello ~
  </body>
</html>
```

他的执行顺序是：

在控制台打印：Howdy ~
在页面中展示：Hello ~
请求并执行 vue.global.js
请求并执行 vue-router.global.js
触发 DOMContentLoaded 事件

async

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <title>Hi</title>
    <script>
      console.log("Howdy ~");
    </script>
    <script async src="https://google-analytics.com/analytics.js"></script>
    <script async src="https://ads.google.cn/ad.js"></script>
  </head>
  <body>
    Hello ~
  </body>
</html>
```

他的执行顺序是：
在控制台打印：Howdy ~
并行请求 analytics.js 和 ad.js
在页面中展示：Hello ~
根据网络的实际情况，以下几项会**无序执行** 执行 analytics.js（下载完后，立即执行）执行 ad.js（下载完后，立即执行）触发 DOMContentLoaded 事件（可能在在上面 2 个脚本之前，之间，之后触发）
