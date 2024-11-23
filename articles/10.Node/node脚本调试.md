<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [node 脚本调试](#node-%E8%84%9A%E6%9C%AC%E8%B0%83%E8%AF%95)
- [调试 webpack](#%E8%B0%83%E8%AF%95-webpack)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### node 脚本调试

`node --inspect-brk index.js`  
执行以上命令，然后打开浏览器的控制台会发现有个 node 的 logo

### 调试 webpack

只需要找到 webpack 的执行入口，然后执行以下命令，只要是 node 脚本都可以进行调试。
`node  --inspect-brk node_modules/webpack-cli/bin/cli.js serve`
