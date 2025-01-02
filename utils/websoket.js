// webSoket2 封装
const wsReadState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};
// 默认参数
const defaultOptions = {
  hearbeatInterval: 1000,
  reconnectCountLimit: 5,
  reconnectInterval: 5000,
};

class WebSocket2 {
  constructor(options) {
    this.WS = null; // 实例
    this.wsUrl = options.wsUrl || ""; // 连接地址
    this.hearbeatTimer = null; // 心跳-定时器
    this.hearbeatInterval = options.hearbeatInterval || defaultOptions.hearbeatInterval; // 心跳-频率
    this.reconnectCountLimit = options.reconnectCountLimit || defaultOptions.reconnectCountLimit; // 重连-次数
    this.reconnectedCount = 0; // 重连-已连接数
    this.reconnectTimer = null; // 重连-定时器
    this.reconnectInterval = options.reconnectInterval || defaultOptions.reconnectInterval; // 重连-频率
    this.isCloseed = false; // 主动关闭不再重连
  }

  /**
   * 初始化连接
   */
  init() {
    if (!("WebSocket" in window)) {
      console.log("当前浏览器不支持WebSocket");
      return;
    }
    if (this.WS) return this.WS;
    // 创建实例
    this.WS = new WebSocket(this.wsUrl);
    // 开启事件
    this.WS.onopen = () => {
      console.log("connection successfully.");
      // 开启心跳
      this.heartbeat();
    };
    // 关闭事件
    this.WS.onclose = (e) => {
      console.log(`connection closed (code: ${e.code})`);
      // 非主动关闭需要重置并重连
      if (!this.isCloseed) {
        this.close();
        this.reconnect();
      }
    };
    // 消息监听
    this.WS.onmessage = (e) => {
      this.onMessage(e);
    };
    // 错误事件
    this.WS.onerror = () => {
      console.log("WebSocket连接发生错误");
      this.close();
      this.reconnect();
    };
  }

  /**
   * 心跳
   */
  heartbeat() {
    console.log("ping");
    if (this.hearbeatTimer) {
      clearInterval(this.hearbeatTimer);
    }
    this.hearbeatTimer = setInterval(() => {
      const data = {
        kind: 0, // 请求参数
      };
      if (this.WS.readyState === wsReadState.OPEN) {
        this.WS.send(JSON.stringify(data));
      }
    }, this.hearbeatInterval);
  }

  /**
   * 接收消息
   * @param {*} message 接收到的消息
   */
  onMessage(res) {
    let dataJSON = JSON.parse(res?.data);
    console.log("收到内容：", dataJSON?.data);
  }

  /**
   * 关闭连接,
   * @param isCloseed 主动关闭
   */
  close(isCloseed) {
    console.log("断开连接");
    // 停止心跳检查
    clearInterval(this.hearbeatTimer);
    this.isCloseed = isCloseed;
    this.WS?.close();
    this.WS = null;
  }

  /**
   * 重新连接
   */
  reconnect() {
    console.log("reconnecting...");
    // 延迟重连，防止频繁重连
    this.reconnectTimer = setTimeout(() => {
      if (this.reconnectedCount > this.reconnectCountLimit) {
        // 超过重连次数不在重连
        clearTimeout(this.reconnectTimer);
        return;
      }
      this.init();
      // 记录重连次数
      this.reconnectedCount++;
    }, this.reconnectInterval);
  }
}

export default WebSocket2;

/*
// 在react中使用
componentDidMount() {
  const ws = new WebSoket2({ wsUrl });
   ws.init();
   this.setState({ ws });
 }
 componentWillUnmount() {
   const { ws } = this.state;
   // 手动关闭
   ws.close(true);
 }
*/
