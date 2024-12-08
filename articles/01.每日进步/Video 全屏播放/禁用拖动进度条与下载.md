​

## 全屏播放

ios：默认全屏播放模式，不做处理；
安卓：默认小屏播放模式，特殊处理，以下是实现代码；

```javascript
/**
 * @description 安卓全屏播放模式
 * @video DOM节点
 */
function fullscreen(video) {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else {
    console.log("Fullscreen API is not supported");
  }
}
```

## 屏蔽全屏模式

安卓：默认小屏播放模式，不做处理；
ios：默认全屏播放模式，特殊处理，以下是实现代码；

添加"webkit-playsinline"、"playsinlin" 这两个属性即可

```javascript
<video
  ref="video"
  :src="videoSrc"
  :poster="bgImg"
  webkit-playsinline
  playsinlin
  controls="controls"
  preload="meta"
  x-webkit-airplay="allow"
  x5-video-player-type="h5"
  x5-video-player-fullscreen="true"
  x5-video-orientation="landscape|portrait"
  currentTime="0">
  your browser does not support the video tag
</video>
```

## 禁止拖动进度条

方法 1：每隔 500 毫秒记录一次视频播放的时间节点，如果是当前播放时间与上一次记录的播放时间大于 1 秒，说明有拖动非正常播放速度，这时候设置播放时间为上一次记录的播放时间。这个方法有缺陷就是如果我们长时间按住进度条然后拖动仍然可以拖动，需要改进方法。
方法 2: 模拟一个视频播放的控制栏 controls，最佳。
方法 3：用一个蒙层遮住，不太实用，全屏播放立马就失效了
以下是方法 1 的代码实现：

```javascript
// 禁止拖动进度条
const timer = setInterval(function () {
  const currentTime = video.currentTime;
  // console.log(currentTime, originTime)
  if (currentTime - originTime > 1) {
    video.currentTime = originTime;
  }
  originTime = currentTime;
}, 500);
```

## 禁止下载

添加属性 controlslist="nodownload"

```javascript
<video
  ref="video"
  :src="videoSrc"
   :poster="bgImg"
   controls="controls"
   controlslist="nodownload"
   preload
   autoplay>
   your browser does not support the video tag
</video>
```

​
