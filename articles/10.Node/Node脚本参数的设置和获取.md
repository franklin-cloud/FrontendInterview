## 脚本参数设置与获取

设置参数：运行文件空格之后添加参数，多个参数以空格间隔

```javascript
node test.js 1920 1080 https://www.hao123.com
```

获取参数：process.argv

```javascript
console.log("process.argv:", process.argv);
var arguments = process.argv.splice(2);
var params1 = arguments[0];
var params2 = arguments[1];
var params3 = arguments[2];
var params4 = arguments[3];

console.log("arguments:", arguments);
console.log("params1:", params1);
console.log("params2:", params2);
console.log("params3:", params3);
console.log("params4:", params4);
/*
arguments: [ '1920', '1080', 'https://www.hao123.com' ]
params1: 1920
params2: 1080
params3: https://www.hao123.com
params4: undefined
*/
```

## 脚本环境变量的设置与获取

```javascript
// package.json 的脚本命令
script：{
 "dev": "cross-env NODE_ENV=development TARGET=web MODE=dev node scripts/index.js",
 "build": **
}
/*
process.env: {
  npm_config_save_dev: '',
  npm_config_legacy_bundling: '',
  ... //其他的一个环境变量信息
  NODE_ENV: 'development',
  TARGET: 'web',
  MODE: 'dev'
*/
```

在项目中我们可能需要针对不同的运行环境设置环境变量，我们分析一下 dev 这个命令行（npm run dev）

- cross-env: 跨平台环境设置库，主要为了兼容环境变量设置方式在不同平台的差异
- NODE_ENV=development: 环境变量设置，多个环境变量设置以空格隔开（TARGET=web MODE=dev）
- node scripts/index.js: 命令行主体，需要执行的脚本文件。

**参数的设置**：参数以 key=val 的形式拼接，多个参数以空格隔开。
**参数的获取**：process.env 这个对象包含了所有的环境变量。
