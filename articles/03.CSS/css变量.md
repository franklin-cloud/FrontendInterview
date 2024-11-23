<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [一、变量的声明](#%E4%B8%80%E5%8F%98%E9%87%8F%E7%9A%84%E5%A3%B0%E6%98%8E)
- [二、var() 函数](#%E4%BA%8Cvar-%E5%87%BD%E6%95%B0)
- [三、变量值的类型](#%E4%B8%89%E5%8F%98%E9%87%8F%E5%80%BC%E7%9A%84%E7%B1%BB%E5%9E%8B)
- [四、作用域](#%E5%9B%9B%E4%BD%9C%E7%94%A8%E5%9F%9F)
- [五、响应式布局](#%E4%BA%94%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B8%83%E5%B1%80)
- [六、兼容性处理](#%E5%85%AD%E5%85%BC%E5%AE%B9%E6%80%A7%E5%A4%84%E7%90%86)
- [七、JavaScript 操作](#%E4%B8%83javascript-%E6%93%8D%E4%BD%9C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

CSS 变量（CSS variable）又叫做"CSS 自定义属性"（CSS custom properties），可以通过 JS 动态改变。

## 一、变量的声明

变量名前面要加**两根连词线--**，变量名大小写敏感。

```html
:root { --main-color: #4d4e53; --main-bg: rgb(255, 255, 255); --logo-border-color: rebeccapurple; --header-height: 68px;
--content-padding: 10px 20px; --base-color: var(----main-color); }
```

以上*--main-color*，_--main-bg_，*--logo-border-color*就是设置在根标签 html 下的 css 变量

## 二、var() 函数

var()函数用于**读取变量**。

```html
.box { color: var(--main-color); height: var(--header-height); }
```

var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

```html
.box { color: var(--main-color, #000); height: var(--header-height, 80px); }
```

## 三、变量值的类型

如果变量值是一个字符串，可以与其他字符串拼接。
如果变量是数值，必须使用 calc()函数，将它们连接(添加单位)。

```html
.foo { --gap: 20; margin-top: calc(var(--gap) * 1px); }
```

## 四、作用域

```html
<style>
  :root {
    --color: blue;
  }
  div {
    --color: green;
  }
  #alert {
    --color: red;
  }
  * {
    color: var(--color);
  }
</style>

<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div>
```

三个选择器都声明了--color 变量。不同元素读取这个变量的时候，会采用**优先级最高的规则**，因此三段文字的颜色是不一样的。

## 五、响应式布局

响应式布局的 media 命令里面声明变量，使得不同的屏幕宽度有不同的变量值。

```css
:root {
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
}
body {
}
@media screen and (min-width: 768px) {
  :root {
    --main-color: #ffffff;
    --main-bg: rgb(255, 134, 255);
  }
  body {
  }
}
```

## 六、兼容性处理

使用@support 命令进行检测。

```css
a {
  color: #7f583f;
  color: var(--primary);
}
@supports ((--a: 0)) {
  /* supported */
}
@supports (not (--a: 0)) {
  /*
not supported */
}
```

## 七、JavaScript 操作

```javascript
// 设置变量
document.body.style.setProperty("--primary", "#7F583F");

// 读取变量
document.body.style.getPropertyValue("--primary").trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty("--primary");
```

[阮一峰的网路日志-CSS 变量教程](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)
