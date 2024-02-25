<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [HTTP 请求的方式](#http-%E8%AF%B7%E6%B1%82%E7%9A%84%E6%96%B9%E5%BC%8F)
- [localStorage，sessionStorage，cookie 的区别](#localstoragesessionstoragecookie-%E7%9A%84%E5%8C%BA%E5%88%AB)
- [cookie 和 session 的区别](#cookie-%E5%92%8C-session-%E7%9A%84%E5%8C%BA%E5%88%AB)
- [能设置或读取子域的 cookie 吗?](#%E8%83%BD%E8%AE%BE%E7%BD%AE%E6%88%96%E8%AF%BB%E5%8F%96%E5%AD%90%E5%9F%9F%E7%9A%84-cookie-%E5%90%97)
- [客户端设置 cookie 与服务端设置 cookie 有什么区别?](#%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AE%BE%E7%BD%AE-cookie-%E4%B8%8E%E6%9C%8D%E5%8A%A1%E7%AB%AF%E8%AE%BE%E7%BD%AE-cookie-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB)
- [同域/跨域 ajax 请求到底会不会带上 cookie?](#%E5%90%8C%E5%9F%9F%E8%B7%A8%E5%9F%9F-ajax-%E8%AF%B7%E6%B1%82%E5%88%B0%E5%BA%95%E4%BC%9A%E4%B8%8D%E4%BC%9A%E5%B8%A6%E4%B8%8A-cookie)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## HTTP 请求的方式

1. GET：请求指定的页面信息，并返回实体主体。
2. HEAD：类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头
3. POST：向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。
4. PUT：从客户端向服务器传送的数据取代指定的文档的内容。
5. DELETE：请求服务器删除指定的页面。
6. CONNECT：HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。
7. OPTIONS：允许客户端查看服务器的支持的通信方式；CORS 中的预检请求（检测某个接口是否支持跨域）。
8. TRACE：回显服务器收到的请求，主要用于测试或诊断。

## localStorage，sessionStorage，cookie 的区别

共同点：都是保存在浏览器端。

区别：

(1) cookie 数据始终在同源的 http 请求中携带（即使不需要）

    即cookie在浏览器和服务器间来回传递
    sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存

(2) 存储大小限制也不同

    cookie数据不能超过4k
    sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大

(3) 数据有效期不同

    sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；
    localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；
    cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭;

(4) 作用域不同

    sessionStorage不同的浏览器窗口中不共享，即使是同一个页面；
    localStorage 在所有同源窗口中都是共享的；
    cookie也是在所有同源窗口中都是共享的

## cookie 和 session 的区别

1. 存储位置不同：

   > cookie 存放在客户的浏览器
   >
   > session 存放在服务器上。

2. 存储容量不同：

   > 单个 cookie 保存的数据不能超过 4K，一个站点最多保存 20 个 cookie。
   > 对于 session 来说并没有上限，但出于对服务器端的性能考虑，session 内不要存放过多的东西，并且设置 session 删除机制。

3. 存储方式不同：

   > cookie 中只能保管 ASCII 字符串，并需要通过编码方式存储为 Unicode 字符或者二进制数据。
   >
   > session 中能够存储任何类型的数据，包括且不限于 string，integer，list，map 等。

4. 隐私策略不同

   > cookie 对客户端是可见的，别有用心的人可以分析存放在本地的 cookie 并进行 cookie 欺骗，所以它是不安全的。
   > session 存储在服务器上，不存在敏感信息泄漏的风险。

5. 有效期不同

   > cookie 保管在客户端，不占用服务器资源。对于并发用户十分多的网站，cookie 是很好的选择。cookie 的有效期（expire/max-age）
   > session 是保管在服务器端的，每个用户都会产生一个 session。假如并发访问的用户十分多，会产生十分多的 session，耗费大量的内存。

## 能设置或读取子域的 cookie 吗?

> 不行! 只能向当前域或者更高级域设置 cookie
>
> 例如 client.com 不能向 a.client.com 设置 cookie, 而 a.client.com 可以向 client.com 设置 cookie
>
> 读取 cookie 情况同上

## 客户端设置 cookie 与服务端设置 cookie 有什么区别?

> 无论是客户端还是服务端, 都只能向自己的域或者更高级域设置 cookie，例如 client.com 不能向 server.com 设置 cookie, 同样 server.com 也不能向 client.com 设置 cookie
>
> 服务端可以设置 `httpOnly: true`, 带有该属性的 cookie 客户端无法读取
>
> 客户端只会带上与请求同域的 cookie, 例如 client.com/index.html 会带上 client.com 的 cookie，server.com/app.js 会带上 server.com 的 cookie, 并且也会带上 httpOnly 的 cookie

## 同域/跨域 ajax 请求到底会不会带上 cookie?

fetch 在默认情况下, 不管是同域还是跨域 ajax 请求都不会带上 cookie, 只有当设置了 credentials 时才会带上该 ajax 请求所在域的 cookie, 服务端需要设置响应头`Access-Control-Allow-Credentials: true`, 否则浏览器会因为安全限制而报错, 拿不到响应

axios 和 jQuery 在同域 ajax 请求时会带上 cookie, 跨域请求不会, 跨域请求需要设置 `withCredentials` 和服务端响应头`Access-Control-Allow-Credentials`

- fetch 设置 credentials 使 fetch 带上 cookie

  ```js
  fetch(url, {
    credentials: "include", // include, same-origin, omit
  });
  ```

- axios 设置 withCredentials 使 axios 带上 cookie

  ```js
  axios.get("http://server.com", { withCredentials: true });
  ```

- jQuery 设置 withCredentials

  ```js
  $.ajax({
    method: "get",
    url: "http://server.com",
    xhrFields: {
      withCredentials: true,
    },
  });
  ```
