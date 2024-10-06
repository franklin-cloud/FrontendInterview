​
Vue-cli3 多页面配置

实现思路: webpack 配置多入口，根据 url 的地址匹配对应的单页面模块的入口根组件，注册对应的 router、store。
路由地址：http://localhost:8111/module/activety.html?#/engine

### webpack 的打包配置 vue.config.js

```js
const path = require("path");
const glob = require("glob");
const titlemapper = require("./titlemapper");
const FileManagerPlugin = require("filemanager-webpack-plugin");

var buildConfig = {
  outputDir: path.join(__dirname, "./dist"),
  publicPath: process.env.NODE_ENV === "production" ? "../" : "/",
  assetsDir: "static/",
};

// 配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {},
    pageName;
  glob.sync(globPath).forEach(function (entry) {
    pageName = entry.split("/").pop();
    entries[pageName] = {
      entry: `src/module/${pageName}/main.js`, // 入口js
      template: "public/index.html", // 入口模板
      title: titlemapper[pageName] || "同学会", // 页面title
      filename: `module/${pageName}.html`, // 打包后的文件名
    };
  });
  return entries;
}
const pages = getEntry("./src/module/**?");
let configureWebpack = {};
// 如果是打包，则加上打包压缩的插件
if (process.env.NODE_ENV === "production") {
  configureWebpack = {
    output: {
      path: buildConfig.outputDir,
      publicPath: buildConfig.publicPath,
      filename: buildConfig.assetsDir + "js/[name].[contenthash:8].js",
    },
    plugins: [
      new FileManagerPlugin({
        // 初始化filemanager-webpack-plugin 插件实例
        onStart: {
          delete: [
            // 首先需要删除项目根目录下的dist.zip
            "./dist",
          ],
        },
        onEnd: {
          // 为了解决基本当前目录压缩的问题
          copy: [
            { source: "./dist/module", destination: "./dist/moduleCopy/module" },
            { source: "./dist/static", destination: "./dist/staticCopy/static" },
          ],
          archive: [
            // 然后我们选择dist文件夹将之打包成dist.zip并放在根目录
            // { source: './dist/module', destination: './dist/module.zip' },
            { source: "./dist/staticCopy", destination: "./dist/static.zip" },
            { source: "./dist/moduleCopy", destination: "./dist/module.zip" },
          ],
          delete: ["./dist/moduleCopy", "./dist/staticCopy"],
        },
      }),
    ],
  };
}
// 配置
module.exports = {
  publicPath: buildConfig.publicPath,
  productionSourceMap: false,
  outputDir: buildConfig.outputDir,
  assetsDir: buildConfig.assetsDir,
  pages,
  devServer: {
    index: "index.html", // 默认启动serve 打开index页面
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8111,
    https: false,
    proxy: null, // 设置代理
    // before: app => {}
    disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
  },

  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      // less: {
      //   javascriptEnabled: true
      // }
      sass: {
        implementation: require("sass"), // This line must in sass option
      },
    }, // css预设器配置项
    modules: false, // 启用 CSS modules for all css / pre-processor files.
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require("os").cpus().length > 1,
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        // 修改它的选项...
        options.limit = 100;
        return options;
      });
    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .options({
        inline: true,
        fallback: false,
      })
      .end();
    config.resolve.alias
      .set("@", path.resolve("src"))
      .set("api", path.resolve("src/api"))
      .set("assets", path.resolve("src/assets"))
      .set("components", path.resolve("src/components"))
      .set("config", path.resolve("src/config"))
      .set("request", path.resolve("src/request"))
      .set("module", path.resolve("src/module"))
      .set("styles", path.resolve("src/styles"))
      .set("utils", path.resolve("src/utils"))
      .set("lib", path.resolve("src/lib"));

    Object.keys(pages).forEach((entryName) => {
      config.plugins.delete(`prefetch-${entryName}`);
    });
    if (process.env.NODE_ENV === "production") {
      config.plugin("extract-css").tap(() => [
        {
          path: buildConfig.outputDir,
          filename: buildConfig.assetsDir + "css/[name].[contenthash:8].css",
        },
      ]);
    }
  },
  configureWebpack: configureWebpack,
};
```

### 多页面 main.js

主入口 main.js：根据路由匹配当前模块的根组件（app.vue）, 然后进行创建 vue 实例；
模块入口 main.js：直接引用主入口 main.js, 特殊情况可单独写；

```js
try {
  moduleApp = require("module/" + MODULE_NAME + "/app").default;
} catch (e) {
  console.error("require module app error", e);
}

// 创建和挂载根实例
new Vue({
  router,
  store,
  render: (h) => h(moduleApp),
}).$mount("#app");
```

### 多页面 Store

主要借助 store 的 modules 来实现注册不同模块的 store，项目 store 可分为公有 store 和模块的 store，根据路由匹配当前模块的 store, 然后进行合并。

```js
/**
 * @store(vuex)主入口
 */
import Vue from "vue";
import Vuex from "vuex";
import { MODULE_NAME } from "config/index";
import state from "./state";
import mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";
// import plugins from './plugins/plugin-logger'
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
const store = new Vuex.Store({
  modules: {
    common: {
      state,
      mutations,
      actions,
      getters,
    },
  },
  strict: debug,
  // plugins
});
/**
 * 只加载当前模块的store数据
 */
try {
  store.registerModule(`page_${MODULE_NAME}`, require("module/" + MODULE_NAME + "/store/index").default);
} catch (e) {
  console.error("require module store error", e);
}
export default store;
```

### 多页面路由 Router

据路由匹配当前模块的 router, 然后创建路由。

```js
import Vue from "vue";
import VueRouter from "vue-router";
import { MODULE_NAME } from "config/index";
import store from "@/store";
import Native from "utils/native";
let moduleRouter = null;
try {
  moduleRouter = require("module/" + MODULE_NAME + "/router/index.js").default;
} catch (e) {
  console.error("require module router error", e);
}
Vue.use(VueRouter);
const router = new VueRouter({
  // hash、abstract、history
  mode: "hash",
  routes: [moduleRouter],
});

/**
 * 全局钩子
 * @param {Object} to 目标路由
 * @param {Object} from 当前路由
 * @param {Function} next 回调函数
 */
router.beforeEach((to, from, next) => {
  store.dispatch("updatePageLoadingStatus", { pageLoadCompleted: false });
  next();
});

router.afterEach(function (to) {
  Native.loadCompleted(
    {},
    (data) => {
      console.log("Native.loadCompleted success", data, to);
    },
    (data) => {
      console.error("Native.loadCompleted error", data);
    }
  );
  store.dispatch("updatePageLoadingStatus", { pageLoadCompleted: true });
});
export default router;
```

### 项目结构说明

├── dist // 打包后目录
│ ├── favicon.ico
│ ├── module // 每个模块的入口页面
│ │ ├── activity-calendar.html
│ │ ├── activity-engine.html
│ │ ...
│ │ └── welfare-activity.html
│ ├── module.zip
│ ├── static // 静态资源
│ │ ├── cordova
│ │ ├── css
│ │ ├── img
│ │ ├── init-activity.min.js
│ │ ├── init.js
│ │ ├── js
│ │ ├── jsBridge
│ │ ├── media
│ │ └── svga
│ └── static.zip
├── hooks // JS 脚本
│ ├── checkcommitmsg.js
│ ├── checkdistfilesize.js
│ ├── checkfilesize.js
│ └── config.js
├── public // 公共资源直接拷贝到 dist
│ ├── favicon.ico
│ ├── index.html
│ └── static
│ ├── cordova // 与原生交互的插件库
│ ├── img
│ ├── init-activity.min.js
│ ├── init.js
│ ├── jsBridge // 注册全局方法，H5 与原生的交互方法
│ └── svga
├── src
│ ├── api
│ │ └── index.js
│ ├── assets
│ │ ├── area.json
│ │ └── img
│ ├── components // 公有组件
│ │ ├── app-actionSheet.vue
│ │ ├── app-alert
│ │ ...
│ │ ├── app-upLoad.vue
│ │ └── rule.vue
│ ├── config // 环境配置
│ │ ├── env.js
│ │ └── index.js
│ ├── lib
│ │ ├── checker.js
│ │ └── report.js
│ ├── main.js
│ ├── module // 每个模块都是单页面的一套，main.js 复用顶级入口 main.js
│ │ ├── activity-calendar
│ │ │ ├── api
│ │ │ ├── app.vue
│ │ │ ├── css
│ │ │ ├── img
│ │ │ ├── main.js
│ │ │ ├── page.vue
│ │ │ ├── router
│ │ │ ├── service
│ │ │ ├── store
│ │ │ └── view
│ │ ├── sign-con
│ │ └── welfare-activity
│ ├── request
│ │ ├── axios-jsonp.js
│ │ ├── checkTimeout.js
│ │ ├── index.js
│ │ ├── interceptors-changeOrigin.js
│ │ └── interceptors-common.js
│ ├── router // 匹配模块，加载模块中的路由
│ │ └── index.js
│ ├── store // 匹配模块，注册模块中的 store 进行合并
│ │ ├── actions.js
│ │ ├── getters.js
│ │ ├── index.js
│ │ ├── mutation-types.js
│ │ ├── mutations.js
│ │ ├── plugins
│ │ └── state.js
│ ├── styles
│ │ ├── index.scss
│ │ ├── reset.scss
│ └── utils
│ ├── ajax.js
│ ├── checker.js
│ ├── coInfo.js
│ ├── common.js
│ ├── getQuery.js
│ ├── global.js
│ ├── log.js
│ ├── md5.js
│ ├── native.js // 调用原生的全局方法
│ ├── pageUrl.js
│ ├── timeFilter.js
│ ├── util.js
│ ├── wxAuth.js
│ ├── wxAuthDefault.js
│ ├── wxAuthorization.js // 微信授权
│ ├── wxAuthorizeUrl.js
│ └── wxSetSecondShare.js
├── README.md
├── babel.config.js
├── package.json
├── deploy.js // 代码部署脚本,包含登录和文件上传至服务器
├── titlemapper.js // 每个模块对应的 title(内嵌网页可不用)
└── vue.config.js

​
