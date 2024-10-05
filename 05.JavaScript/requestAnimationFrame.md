<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [渲染几万条数据不卡住页面-requestAnimationFrame](#%E6%B8%B2%E6%9F%93%E5%87%A0%E4%B8%87%E6%9D%A1%E6%95%B0%E6%8D%AE%E4%B8%8D%E5%8D%A1%E4%BD%8F%E9%A1%B5%E9%9D%A2-requestanimationframe)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### 渲染几万条数据不卡住页面-requestAnimationFrame
> 屏幕刷新频率：屏幕每秒出现图像的次数。普通笔记本为60Hz, 16.7ms。
> 动画原理：计算机每16.7ms刷新一次，由于人眼的视觉停留，所以看起来是流畅的移动。
> requestAnimationFrame：由系统决定回调函数的执行时机。60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿。
```javascript
 /**
    功能: 匀速滚动到页面顶部
    @dom: 事件源DOM,
    @speed: 总份数
  */
  function scrollTopHandler(dom, speed = 1000) {
    // 滚动的高度
    let doc_scrollTop
    let i = 0
    // requestAnimationFrame 的执行函数
    const gotoTop = function() {
      // 将滚动高度分为1000份
      const unit = doc_scrollTop / speed
      // 每次执行10份unit的距离
      i += 10
      // 计算每次滚动的高度
      const scrollTop = doc_scrollTop - i * unit > 0 ? doc_scrollTop - i * unit : 0
      // 执行滚定
      document.documentElement.scrollTop = scrollTop
      // 判断执行分数i小于speed 总分数，则继续执行
      if (i <= speed) {
        window.requestAnimationFrame(gotoTop)
      } else {
        // 重置
        i = 0
      }
    }
    // 事件监听
    const handler = function() {
      doc_scrollTop = document.documentElement.scrollTop
      window.requestAnimationFrame(gotoTop)
    }
    dom.addEventListener('click',handler,false)
  }
```
使用
```javascript
// 给DOM绑定方法
const dom = document.querySelector('#gotoTop')
scrollTopHandler(dom)
```