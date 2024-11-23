```javascript
const person = {
  name: "person",
  genName: function () {
    console.log("this is ", this);
    console.log("arguments is ", [...arguments]);
  },
};

// 实现call
Function.prototype.call2 = function (context) {
  const cxt = context || window;
  const arg = [...arguments].slice(1);
  const fnName = Symbol();
  cxt[fnName] = this;
  cxt[fnName](...arg);
  delete cxt[fnName];
};
person.genName();
person.genName.call2(null, "Franklin", "Fu");
// this is  {name: 'person', genName: ƒ}
// arguments is []
// this is  Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// arguments is ['Franklin', 'Fu']

// 实现apply
Function.prototype.apply2 = function (context) {
  const cxt = context || window;
  const arg = [...arguments].slice(1);
  const fnName = Symbol();
  cxt[fnName] = this;
  cxt[fnName](arg);
  delete cxt[fnName];
};
person.genName();
person.genName.apply2(null, ["Franklin", "Fu"]);
// this is  {name: 'person', genName: ƒ}
// arguments is []
// this is  Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// arguments is  [[Franklin Fu]]

// 实现bind
Function.prototype.bind2 = function (context) {
  const cxt = context || window;
  const arg = [...arguments].slice(1);
  const self = this;
  return function () {
    // 绑定的函数可能有返回值，所以添加return
    return self.apply(cxt, arg.concat([...arguments]));
  };
};
const _genName = person.genName.bind2(null, "Franklin");
person.genName();
_genName("Fu");
// this is  {name: 'person', genName: ƒ}
// arguments is []
// this is  Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// arguments is ['Franklin', 'Fu']
```
