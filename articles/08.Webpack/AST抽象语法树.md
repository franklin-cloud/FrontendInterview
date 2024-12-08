## 为什么要了解 AST

如果你想了解 js 编译执行的原理，那么你就得了解 AST，目前前端常用的一些插件或者工具，比如说 javascript 转译、代码压缩、css 预处理器、elint、pretiier 等功能的实现，都是建立在 AST 的基础之上。

## JavaScript 编译执行流程

JS 执行的第一步是读取 js 文件中的字符流，然后通过词法分析生成令牌流 Tokens，之后再通过语法分析生成 AST（Abstract Syntax Tree），最后生成机器码执行。

## 词法分析

词法分析，也称之为扫描（scanner），简单来说就是调用 next() 方法，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字做比较，生成对应的令牌流 Tokens。令牌 Token 是一个不可分割的最小单元，例如 var 这三个字符，它只能作为一个整体，语义上不能再被分解，因此它是一个令牌 Token。词法分析器里，每个关键字是一个令牌 Token ，每个标识符是一个令牌 Token，每个操作符是一个令牌 Token，每个标点符号也都是一个令牌 Token。除此之外，还会过滤掉源程序中的注释和空白字符（换行符、空格、制表符等）。
最终，整个代码将被分割进一个令牌流 Tokens 列表（或者说一维数组）。

```
n * n;

[
  { type: { ... }, value: "n",  loc: { ... } },
  { type: { ... }, value: "*",  loc: { ... } },
  { type: { ... }, value: "n",  loc: { ... } },
  ...
]
```

每一个 type 有一组属性来描述该令牌：

```
{
  type: {
    label: 'name',
    keyword: undefined,
    beforeExpr: false,
    startsExpr: true,
    rightAssociative: false,
    isLoop: false,
    isAssign: false,
    prefix: false,
    postfix: false,
    binop: null,
    updateContext: null
  },
  ...
}
```

## 语法分析

语法分析会将词法分析出来的**令牌流**转化成有语法含义的抽象语法树结构。同时，验证语法，语法如果有错的话，抛出语法错误。

## 什么是 AST（抽象语法树）

抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

```
function square(n) {
  return n * n;
}
```

上面的程序可以被表示成如下的一棵树：

```
- FunctionDeclaration:
  - id:
    - Identifier:
      - name: square
  - params [1]
    - Identifier
      - name: n
  - body:
    - BlockStatement
      - body [1]
        - ReturnStatement
          - argument
            - BinaryExpression
              - operator: *
              - left
                - Identifier
                  - name: n
              - right
                - Identifier
                  - name: n
```

或是如下所示的 JavaScript Object（对象）：

```
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  params: [{
    type: "Identifier",
    name: "n"
  }],
  body: {
    type: "BlockStatement",
    body: [{
      type: "ReturnStatement",
      argument: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "n"
        },
        right: {
          type: "Identifier",
          name: "n"
        }
      }
    }]
  }
}
```

你会留意到 AST 的每一层都拥有相同的结构：

```
{
  type: "FunctionDeclaration",
  id: {...},
  params: [...],
  body: {...}
}
{
  type: "Identifier",
  name: ...
}
{
  type: "BinaryExpression",
  operator: ...,
  left: {...},
  right: {...}
}
```

这样的每一层结构也被叫做 节点（Node）。 一个 AST 可以由单一的节点或是成百上千个节点构成。 它们组合在一起可以描述用于静态分析的程序语法。

每一个节点都有如下所示的接口（Interface）：

```
interface Node {
  type: string;
}
```

字符串形式的 type 字段表示节点的类型（如： “FunctionDeclaration“，”Identifier“，或 “BinaryExpression“）。 每一种类型的节点定义了一些附加属性用来进一步描述该节点类型。

## 兼容插件 Babel

主要分为 解析（parse），转换（transform），生成（generate）
其中解析主要分为： **词法分析（Lexical Analysis ）** 和 **语法分析（Syntactic Analysis）**

[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-asts)
[AST 节点信息介绍](http://www.goyth.com/2018/12/23/AST/)
