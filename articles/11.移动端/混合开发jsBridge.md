## H5 与 IOS 交互——WKWebView

### OC 调用 JS

封装一个原生调用 js 的方法**callJS**，**callJS** 为 H5 注入到 window 上的方法，供 native 调用实现 js 回调

```javascript
/*
 Evaluates the given JavaScript string.
 The completionHandler is passed the result of the script evaluation or an error.
 @param javaScriptString The JavaScript string to evaluate.
 @param completionHandler A block to invoke when script evaluation completes or fails.
*/
- (void)evaluateJavaScript:(NSString *)javaScriptString completionHandler:(void (^ _Nullable)(_Nullable id, NSError * _Nullable error))completionHandler;

//js回调
- (void)jsCallBackWith:(NSDictionary *)json
{
    NSLog(@"native-call-js:%@", json);
    // 防空
    if (!json || ![json isKindOfClass:[NSDictionary class]]) {
        return;
    }
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:json options:NSJSONWritingPrettyPrinted error:nil];
    NSString *jsonstring = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    [self.webView evaluateJavaScript:[NSString stringWithFormat:@"callJS(%@);", jsonstring] completionHandler:^(id result, NSError * error) {
        NSLog(@"result==%@,error==%@",result,error);
    }];
}
```

### JS 调用 OC

1. iOS 原生拦截 URL, 这种方式从早期就存在，兼容性很好，但是由于是基于 URL 的方式，长度受到限制而且不太直观，数据格式有限制，而且建立请求有时间耗时。
2. WKScriptMessageHandler 实现
   WKWebView 初始化时，有一个参数叫 configuration，它是 WKWebViewConfiguration 类型的参数，而 WKWebViewConfiguration 的属性 userContentController， 它又是 WKUserContentController 类型的参数。
   WKUserContentController 对象有一个方法- addScriptMessageHandler:name:，以下定义了 name 为**IOSBridge**的 MessageHandler

```javascript
-(void)initWKWebView
{
    WKUserContentController* userContentController = [[WKUserContentController alloc] init];
    WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
    configuration.userContentController = userContentController;
    configuration.preferences = [NSClassFromString(@"WKPreferences") new];
    configuration.preferences.javaScriptEnabled = true;
    // 默认是不能通过JS自动打开窗口的，必须通过用户交互才能打开
    configuration.preferences.javaScriptCanOpenWindowsAutomatically = false;
    configuration.allowsInlineMediaPlayback = YES; // 允许非全屏视频
    configuration.allowsPictureInPictureMediaPlayback = YES; // 画中画
    configuration.mediaTypesRequiringUserActionForPlayback = WKAudiovisualMediaTypeAll;
    //js发送消息过来
    [configuration.userContentController addScriptMessageHandler:self name:@"IOSBridge"];
    WKWebView* webView = [[NSClassFromString(@"WKWebView") alloc] initWithFrame:self.bounds configuration:configuration];
    webView.UIDelegate = self;
    webView.navigationDelegate = self;
    webView.backgroundColor = [UIColor whiteColor];
    webView.opaque = NO;

    [webView addObserver:self forKeyPath:@"estimatedProgress" options:NSKeyValueObservingOptionNew context:nil];
    [webView addObserver:self forKeyPath:@"title" options:NSKeyValueObservingOptionNew context:nil];
    //修改webview 的userAent
    [webView evaluateJavaScript:@"navigator.userAgent" completionHandler:^(id __nullable userAgent, NSError * __nullable error) {
        NSString *language = [[MSALanguageManager manager] getLanguageFullName];//中文 zh-CN /日文 ja-JP / 英文 en-US
        NSString *hideNav = self.hideNativeNavigator ? @" isHiddenNativeNavigator" : @""; // 隐藏原生导航头
        NSString *customUserAgent = [userAgent stringByAppendingFormat:@" avalon %@ app/msa:%@", hideNav, language];
        webView.customUserAgent = customUserAgent;
        NSLog(@">>>>>当前webview UA:%@", customUserAgent);
    }];
    _realWebView = webView;
}
```

3. H5 端调用

```javascript
window.webkit.messageHandlers.IOSBridge.postMessage({ method: "getUserInfo", param: args });
```

## H5 与 Android 交互

待补充

## H5 对 android 和 Ios 两端的封装——jsBridge.js

```javascript
(function (window) {
  window.NativeBridge = {};
  var ua = navigator.userAgent.toUpperCase();
  NativeBridge.IS_ANDROID = ua.indexOf("ANDROID") != -1; //当前环境是否为Android平台
  NativeBridge.IS_IOS = ua.indexOf("IPHONE") != -1 || ua.indexOf("IPAD") != -1; // 当前环境是否为IOS平台
  //--------------------------------------------------------
  //JS调用Native
  //--------------------------------------------------------
  NativeBridge.callNative = function (method) {
    var args = Array.prototype.slice.call(arguments, 1); //参数（非必填）
    var iosParam = { method: method, param: args };
    try {
      if (NativeBridge.IS_ANDROID) {
        console.log("call android native:", method, arguments);
        window.AndroidBridge.service.postMessage(iosParam);
      } else if (NativeBridge.IS_IOS) {
        console.log("call ios native:", method, arguments);
        window.webkit.messageHandlers.IOSBridge.postMessage(iosParam);
      } else {
        console.log("not in native:", method, arguments);
        throw new error("没有在移动环境");
      }
      return true;
    } catch (e) {
      console.log("call native err:", e);
      if (method == "toast" || method == "alert") {
        alert(args[0]);
      }
      return false;
    }
  };
  //--------------------------------------------------------
  //Native调用JS
  //--------------------------------------------------------

  NativeBridge.nativeHandlerList = [];

  NativeBridge.registerNativeListener = function (method, handler) {
    var has = false;
    for (var i = 0; i < NativeBridge.nativeHandlerList.length; i++) {
      if (NativeBridge.nativeHandlerList[i].method == method && NativeBridge.nativeHandlerList[i].handler == handler) {
        //has = true;
        throw new Error("已经注册过同一个方法");
        //NativeBridge.nativeHandlerList[i].handler = handler;
      }
    }
    if (!has) {
      NativeBridge.nativeHandlerList.push({ method: method, handler: handler });
    }
  };

  NativeBridge.removeNativeListener = function (method) {
    for (var i = NativeBridge.nativeHandlerList.length - 1; i >= 0; i--) {
      if (NativeBridge.nativeHandlerList[i].method == method) {
        NativeBridge.nativeHandlerList.splice(i, 1);
      }
    }
  };
  callJS = function (data) {
    console.log("native call js src data:" + data);
    eval(data);
    console.log("native call js:" + data.method + ",参数:" + data.data);
    for (var i = 0; i < NativeBridge.nativeHandlerList.length; i++) {
      if (NativeBridge.nativeHandlerList[i].method == data.method) {
        NativeBridge.nativeHandlerList[i].handler(data.data);
      }
    }
  };
})(window);
```

## 使用

1. 单页项目在 index.html 文件引用以上 nativeBridge.js

2. JS 调用 Native

```javascript
/**
 * @params method方法名，string 类型
 * @params param参数，任意类型
 */
window.NativeBridge.callNative("setNativeTitle", to.meta.title);
```

3. Native 调用 JS

```javascript
  mounted() {
    window.NativeBridge.registerNativeListener('notifyDataCallBack', data => {
      if (data) {
        console.log('notifyDataCallBack:mounted')
        // Toast('重新加载')
        this.getRes('')
      }
    })
  },
  beforeDestroy() {
    window.NativeBridge.removeNativeListener('notifyDataCallBack')
  }
```

## 开源的 JSBridge

- DSBridge 主要通过注入 API 的形式，[DSBridge for Android](https://link.zhihu.com/?target=https%3A//github.com/wendux/DSBridge-Android)、[DSBridge for IOS](https://link.zhihu.com/?target=https%3A//github.com/wendux/DSBridge-IOS)
- JsBridge 主要通过拦截 URL Schema，[JsBridge](https://link.zhihu.com/?target=https%3A//github.com/lzyzsd/JsBridge)

## 参考

[H5 与 IOS 交互](https://www.cnblogs.com/lijianyi/p/14581030.html)
[深入浅出 JSBridge：从原理到使用](https://zhuanlan.zhihu.com/p/438763800)
