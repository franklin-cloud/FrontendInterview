<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [HTML5 的新特性](#html5-%E7%9A%84%E6%96%B0%E7%89%B9%E6%80%A7)
- [DOCTYPE 的作用是什么](#doctype-%E7%9A%84%E4%BD%9C%E7%94%A8%E6%98%AF%E4%BB%80%E4%B9%88)
- [语义化标签的作用](#%E8%AF%AD%E4%B9%89%E5%8C%96%E6%A0%87%E7%AD%BE%E7%9A%84%E4%BD%9C%E7%94%A8)
- [行内元素 块级元素](#%E8%A1%8C%E5%86%85%E5%85%83%E7%B4%A0-%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0)
- [canvas 与 SVG](#canvas-%E4%B8%8E-svg)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## HTML5 的新特性

[参考链接](https://www.cnblogs.com/ainyi/p/9777841.html)

1. 语义化标签:header、footer、section、nav、aside、article
2. 增强型表单：input 的多个 type(color, date, datetime, email, month, number, range, search, tel, time, url, week)
3. 新增表单元素：datalist、keygen、output
4. 新增表单属性：placehoder, required, min 和 max, step, height 和 width, autofocus, multiple
5. 音频视频：audio、video
6. canvas
7. 地理定位：
8. 拖拽：drag
9. 本地存储：localStorage、sessionStorage
10. 新事件：onresize、ondrag、onscroll、onmousewheel、onerror、onplay、onpause
11. WebSocket

## DOCTYPE 的作用是什么

```js
(1) <!DOCTYPE>声明一般位于第一行，处于 <html> 标签前。作用：告诉浏览器以什么样的模式来解析文档。DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。
(2) 一般指定了之后会以标准模式来进行文档解析，否则就以兼容模式进行解析。在标准模式下，浏览器的解析规则都是按照最新的标准进行解析的;在兼容模式下，浏览器会以向后兼容的方式来模拟老式浏览器的行为，以保证一些老的网站的正确访问。
```

## 语义化标签的作用

- 即使在没有 CSS 样式的条件下，也能很好地呈现出内容结构、代码结构。
- 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页
- 语义化标签会使 HTML 页面的内容结构更加清晰，有利于维护代码和添加样式
- 有利于 SEO
- 便于团队开发和维护，遵循 W3C 标准，可以减少差异化

## 行内元素 块级元素

```js
HTML4中，元素被分成两大类：inline （内联元素）与 block （块级元素）。
（1） 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
（2） 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
（3） 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。
（4）常见的行内元素有 a b span img strong sub sup button input label select textarea
（5）常见的块级元素有  div p ul ol li dl dt dd h1 h2 h3 h4 h5 h6

```

## canvas 与 SVG

- canvas 与 svg 都是可以在浏览器上创建图形
- HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，您可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像、动画的方法
- canvas 绘制位图,绘制出来的每一个图形的元素都是独立的 DOM 节点，能够方便的绑定事件或用来修改。canvas 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）。canvas 输出的是一整幅画布，就像一张图片一样，放大会失真。canvas 不适合游戏应用。
- svg 输出的图形是矢量图形，后期可以修改参数来自由放大缩小，SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失。svg 最适合图像密集型的游戏，其中的许多对象会被频繁重绘
