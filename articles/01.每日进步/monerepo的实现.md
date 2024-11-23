<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [monerepo 的实现（推荐 pnpm）](#monerepo-%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%8E%A8%E8%8D%90-pnpm)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## monerepo 的实现（推荐 pnpm）

1.  项目根目录下创建一个 `package.json` 文件，并设置`"private": true `以表示该项目是私有的。添加一个`"workspaces"`字段，并设置为一个包含子项目目录的数组, 例如：

    ```
      "private": true,
      "workspaces": [
        "packages/*"
      ],
    ```

2.  根目录下新建`packages`目录，在`packages`目录下新建子项目目录，每一个子项目目录下都包含一个独立的`package.json`文件，在`package.json`中设置包的名称，例如`reactivity`子项目的`package.json`文件内容如下：

    ```
      {

        "name": "@vue/reactivity",
        "version": "1.0.0",
        "main": "index.js",
        "license": "MIT",
        "buildOptions": {
          "name": "Reactivity",
          "formats": [
            "es",
            "cjs",
            "iife"
          ]
        }
      }
    ```

3.  ` "name": "@vue/reactivity"` 设置项，`reactivity`子项目打包后会软链接到 `node_modules `目录下的`@vue/reactivity`, 子项目可以通过来引用共享。

    `import { ** } from "@vue/reactivity"`

4.  子项目使用包管理工具来依赖安装：`npm install`
5.  全局的公共依赖包下载
    `npm install -W`
