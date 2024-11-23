<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [useImperativeHandle](#useimperativehandle)
- [例子](#%E4%BE%8B%E5%AD%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## useImperativeHandle

```javascript
useImperativeHandle(ref, createHandle, [deps]);
```

## 例子

useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用。

```javascript
import React, { forwardRef, useRef, useImperativeHandle } from "react";
// 父组件
const ParentCom = () => {
  const childRef = useRef();
  const onClick = () => {
    childRef.current.childClick("函数式组件：父组件通过ref调用子组件的事件");
  };
  return (
    <div>
      <div onClick={onClick}>父组件</div>
      <ChildCom ref={childRef} />
    </div>
  );
};

// 子组件
let ChildCom = (props, ref) => {
  const onClick = (val) => {
    console.log(val);
  };
  useImperativeHandle(ref, () => ({
    childClick: (val) => onClick(val),
  }));
  return <div>子组件</div>;
};
ChildCom = forwardRef(ChildCom);
```
