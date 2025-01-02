<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [monerepo 的实现（推荐 pnpm）](#monerepo-的实现推荐-pnpm)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## monerepo 的实现（推荐 pnpm）

1.  项目根目录下创建一个 `package.json` 文件，并设置`"private": true `以表示该项目是私有的。添加`"workspaces"`字段，并设置为一个包含子项目目录的数组, 如：

    ```json
      "private": true,
      "workspaces": [
        "packages/*"
      ],
    ```

2.  根目录下新建`packages`目录，在`packages`目录下新建子项目目录，每一个子项目目录下都包含一个独立的`package.json`文件，在`package.json`中设置包的名称，例如`reactivity`子项目的`package.json`文件内容如下：

    ```json
    {
      "name": "@vue/reactivity",
      "version": "1.0.0",
      "main": "index.js",
      "license": "MIT",
      "buildOptions": {
        "name": "Reactivity",
        "formats": ["es", "cjs", "iife"]
      }
    }
    ```

3.  上面的`json`中配置了`"name": "@vue/reactivity"`，`reactivity`子项目打包后会软链接到 `node_modules `目录下的`@vue/reactivity`, 其他子项目可以导入使用。

    `import { ** } from "@vue/reactivity"`

4.  `packages`内的子项目直接使用包管理工具来依赖安装：`npm install`，根目录依赖包下载需添加`-W`参数，表示将依赖安装到根目录的`node_modules`中，例如：`npm install -W`
