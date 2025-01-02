const ToolHistory = {
  joinUrlParams(url?: string, params?: Record<string, any>) {
    let path = url || window.location.href;
    if (!params) return path;

    let keyValArr: string[] = [];
    Object.keys(params).forEach((key) => {
      let value = params[key];
      if (typeof value === "object" && value != null) {
        value = JSON.stringify(value);
      }
      // 使用encodeURIComponent对参数进行编码,防止特殊字符被转码
      value = encodeURIComponent(value)
      const keyVal = `${key}=${value}`
      keyValArr.push(keyVal);
    });
    if (keyValArr.length) {
      const searchStr = keyValArr.join("&")
      path += path.indexOf('?') === -1 ? `?${searchStr}`: `&${searchStr}`;
    }
    return path;
  },
  getUrlParams(url?: string) {
    const path = url || window.location.href;
    // 使用webpack服务时,url中可能有多个?,选最后的?
    const searchIndex = path.lastIndexOf("?");
    const result: Record<string, any> = {};
    if(searchIndex === -1) return result;
    const searchData = path.substring(searchIndex +1);
    const keyValArr = searchData.split("&");
    // 遍历获取参数 
    keyValArr.forEach((item) => {
      const [key,stringVal] = item.split("=");
      // 参数值,使用decodeURIComponent对encodeURIComponent编码进行解码
      let val = decodeURIComponent(stringVal);
      // 如果是JSON格式,就转为对象
      if (this.checkJson(val)) {
        val = JSON.parse(val); 
      }
      result[key] = val;
    });
    return result;
  },
  checkJson(str: string) {
    const obtStr = str.startsWith('{') && str.endsWith('}')
    const arrStr = str.startsWith('[') && str.endsWith(']')
    return obtStr || arrStr
  }
};

export default ToolHistory;
