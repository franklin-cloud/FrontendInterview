<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [三种事件模型是什么](#%E4%B8%89%E7%A7%8D%E4%BA%8B%E4%BB%B6%E6%A8%A1%E5%9E%8B%E6%98%AF%E4%BB%80%E4%B9%88)
- [如何阻止事件冒泡](#%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1)
- [如何阻止事件默认行为](#%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E4%BA%8B%E4%BB%B6%E9%BB%98%E8%AE%A4%E8%A1%8C%E4%B8%BA)
- [事件代理/事件委托以及优缺点](#%E4%BA%8B%E4%BB%B6%E4%BB%A3%E7%90%86%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98%E4%BB%A5%E5%8F%8A%E4%BC%98%E7%BC%BA%E7%82%B9)
- [load 和 DOMContentLoaded 事件的区别](#load-%E5%92%8C-domcontentloaded-%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%8C%BA%E5%88%AB)
- [判断图片是否加载完毕的方式](#%E5%88%A4%E6%96%AD%E5%9B%BE%E7%89%87%E6%98%AF%E5%90%A6%E5%8A%A0%E8%BD%BD%E5%AE%8C%E6%AF%95%E7%9A%84%E6%96%B9%E5%BC%8F)
- [事件对象中的 clientX offsetX screenX pageX 的区别](#%E4%BA%8B%E4%BB%B6%E5%AF%B9%E8%B1%A1%E4%B8%AD%E7%9A%84-clientx-offsetx-screenx-pagex-%E7%9A%84%E5%8C%BA%E5%88%AB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 三种事件模型是什么

事件是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型。

第一种事件模型是最早的 DOM0 级模型，这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，
它可以在网页中直接定义监听函数，也可以通过 js 属性来指定监听函数。这种方式是所有浏览器都兼容的。

第二种事件模型是 IE 事件模型，在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行
目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，
如果有则执行。这种模型通过 attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。

第三种是 DOM2 级事件模型，在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下
传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，
事件绑定的函数是 addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。默认是 false，在冒泡阶段执行。

## 如何阻止事件冒泡

```js
// w3c
e.stopPropagation();

// IE
e.cancelBubble = true;
```

## 如何阻止事件默认行为

```js
//谷歌及IE8以上
e.preventDefault();

//IE8及以下
window.event.returnValue = false;

//无兼容问题（但不能用于节点直接onclick绑定函数）
return false;
```

## 事件代理/事件委托以及优缺点

> 事件委托本质上是利用了浏览器事件冒泡的机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理。
>
> 使用事件代理我们可以不必要为每一个子元素都绑定一个监听事件，这样减少了内存上的消耗。并且使用事件代理我们还可以实现事件的动态绑定，比如说新增了一个子节点，我们并不需要单独地为它添加一个监听事件，它所发生的事件会交给父元素中的监听函数来处理。

事件委托的优点：

1. 减少内存消耗，不必为大量元素绑定事件
2. 为动态添加的元素绑定事件

事件委托的缺点:

1. 部分事件如 focus、blur 等无冒泡机制，所以无法委托。
2. 事件委托有对子元素的查找过程，委托层级过深，可能会有性能问题
3. 频繁触发的事件如 mousemove、mouseout、mouseover 等，不适合事件委托

## load 和 DOMContentLoaded 事件的区别

- 当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发 load 事件。它与 DOMContentLoaded 不同，后者只要页面 DOM 加载完成就触发，无需等待依赖资源的加载。
- 当纯 HTML 被完全加载以及解析时，DOMContentLoaded 事件会被触发，而不必等待样式表，图片或者子框架完成加载。

## 判断图片是否加载完毕的方式

- load 事件

> 测试，所有浏览器都显示出了“loaded”，说明所有浏览器都支持 img 的 load 事件。

```html
<img
  id="img"
  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=151472226,3497652000&fm=26&gp=0.jpg"
/>
<p id="p">loading...</p>
<script>
  document.getElementById("img").onload = function () {
    document.getElementById("p").innerHTML = "loaded";
  };
</script>
```

- readystatechange 事件

> readyState 为 complete 和 loaded 则表明图片已经加载完毕。测试 IE6-IE10 支持该事件，其它浏览器不支持。

```html
<img
  id="img"
  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=151472226,3497652000&fm=26&gp=0.jpg"
/>
<p id="p">loading...</p>
<script>
  var img = document.getElementById("img");
  img.onreadystatechange = function () {
    if (img.readyState == "complete" || img.readyState == "loaded") {
      document.getElementById("p").innerHTML = "readystatechange:loaded";
    }
  };
</script>
```

- img 的 complete 属性

> 轮询不断监测 img 的 complete 属性，如果为 true 则表明图片已经加载完毕，停止轮询。该属性所有浏览器都支持。

```html
<img
  id="img"
  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=151472226,3497652000&fm=26&gp=0.jpg"
/>
<p id="p">loading...</p>
<script>
  function imgLoad(img, callback) {
    var timer = setInterval(function () {
      if (img.complete) {
        callback(img);
        clearInterval(timer);
      }
    }, 50);
  }
  imgLoad(img, function () {
    document.getElementById("p").innerHTML = "加载完毕";
  });
</script>
```

## 事件对象中的 clientX offsetX screenX pageX 的区别

- [clientX, clientY]

```txt
client直译就是客户端，客户端的窗口就是指游览器的显示页面内容的窗口大小（不包含工具栏、导航栏等等）
[clientX, clientY]就是鼠标距游览器显示窗口的长度

兼容性：IE和主流游览器都支持。
```

- [offsetX, offsetY]

```txt
offset意为偏移量
[offsetX, offsetY]是被点击的元素距左上角为参考原点的长度，而IE、FF和Chrome的参考点有所差异。

Chrome下，offsetX offsetY是包含边框的
IE、FF是不包含边框的，如果鼠标进入到border区域，为返回负值

兼容性：IE9+,chrome,FF都支持此属性。
```

- [screenX, screenY]

```txt
screen顾名思义是屏幕
[screenX, screenY]是用来获取鼠标点击位置到屏幕显示器的距离，距离的最大值需根据屏幕分辨率的尺寸来计算。

兼容性：所有游览器都支持此属性。
```

- [pageX, pageY]

```txt
page为页面的意思，页面的高度一般情况client浏览器显示区域装不下，所以会出现垂直滚动条。

[pageX, pageY]是鼠标距离页面初始page原点的长度。

在IE中没有pageX、pageY取而代之的是event.x、event.y。x和y在webkit内核下也实现了，所以火狐不支持x，y。

兼容性：IE不支持，其他高级游览器支持。
```
