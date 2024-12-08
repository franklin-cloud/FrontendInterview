### webpack 配置

```javascript
// webpack.config.js
module.exports = {
	resolve: {
	     alias: {
	        '@': resolve('src')
	      }
	 },
    resolveLoader: { // 配置loader加载目录
      modules: [resolve('src/loaders'), 'node_modules']
    }，
    module: {
	    rules: [
	      {
	        test: /\.vue$/,
	        use: [{
                   loader: 'test-loader'，
                   options: {
                       async: false
                   }
               }
	        ]
	      }
	    ]
    }
}
```

### test-loader.js

文件地址：src/loaders/test-loader.js

```javascript
const { getOptions } = require("loader-utils");

module.exports = function (content, map, meta) {
  console.log("content", content);
  const options = getOptions(this);
  // 回调设置
  let callback = this.callback;
  console.log("options", options);
  // 同步设置
  if (options.async) {
    callback = this.async();
  }
  // 对content 进行各种处理, 然后输出
  callback(null, content);
};
```
