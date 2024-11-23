<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [HTTP 报文结构简介](#http-%E6%8A%A5%E6%96%87%E7%BB%93%E6%9E%84%E7%AE%80%E4%BB%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## HTTP 报文结构简介

**请求报文**

1. 请求行：请求方法，请求 URL（不包括域名），HTTP 协议版本
2. 请求头：Accept（accept-encoding, accept-language） ，Content-Type，User-Agent ，cookie, 自定义字段 token
3. 空行：将请求头和请求体隔开
4. 请求体：post put 等请求传输数据

**响应报文**

5. 状态行：服务器 HTTP 协议版本，响应状态码
6. 响应头：内容相关的（content-type，content-encoding），缓存相关的（cache-control,etag,last-modified）
7. 空行：将请求头和请求体隔开
8. 响应体：返回的数据

[HTTP 报文结构](https://www.jianshu.com/p/0015277c6575)
