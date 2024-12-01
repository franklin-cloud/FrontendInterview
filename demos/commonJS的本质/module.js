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
