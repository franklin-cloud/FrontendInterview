## 资源描述符(defer async preload prefetch)

JavaScript 是个单线程语言，提前引入 js 文件可能会造成渲染堵塞，影响页面加载出现闪屏等情况。

于是为了解决这种情况可以采用以下几种方式：

- `js` 在 `body` 最后引入；
- 动态创建`script`标签的来引入脚本方式；
- `script` 标签中 `defer` 和 `async` 异步加载的方式。

**defer**：如果 script 标签设置了该属性，则浏览器会异步的下载该文件并且不会影响到后续 DOM 的渲染。如果有多个设置了 defer 的 script 标签存在，则会按照**顺序执行**所有的 script。defer 脚本会在文档渲染完毕后，DOMContentLoaded 事件调用前执行。

**async**：async 浏览器立即异步下载文件，不同于 defer 得是，**下载完成会立即执行**，此时会阻塞 dom 渲染，所以 async 的 script 最好不要操作 dom。因为是下载完立即执行，不能保证多个加载时的先后顺序。

preload 和 prefecth 是 link 标签上的属性

**preload**：让浏览器**提前加载**指定资源(加载后并不执行)，需要执行时再执行

**prefetch**：它告诉浏览器，这段资源将会在未来某个导航或者功能要用到，但是本资源的下载顺序权重比较低。也就是说 prefetch 通常用于加速下一次导航，而不是本次的。被标记为 prefetch 的资源，将会被浏览器在**空闲时间**加载。
