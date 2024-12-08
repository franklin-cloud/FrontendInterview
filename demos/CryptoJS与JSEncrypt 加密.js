/* crypto-js进行AES加密,安装: npm i --save crypto-js
 * jsencrypt进行RSA加密,安装: npm i --save jsencrypt
 * 官网:https://github.com/travist/jsencrypt
 */
import CryptoJS from "crypto-js";
import { JSEncrypt } from "jsencrypt";

/**
 * 随机生成16位的AES密钥
 */
function getKeyAES() {
  const key = [];
  for (let i = 0; i < 16; i++) {
    const num = Math.floor(Math.random() * 26);
    const charStr = String.fromCharCode(97 + num);
    key.push(charStr.toUpperCase());
  }
  const result = key.join("");
  return result;
}
/**
 * AES加密
 * 转Utf8编码: CryptoJS.enc.Utf8.parse();
 * 转Base64: CryptoJS.enc.Base64.stringify();
 * @param data 需要加密的数据
 * @param key 密钥
 * @returns 加密后的数据
 */
function encodeAES(data, key) {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }
  // AES加密
  const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse("1234567812345678"), // 向量。使用CBC模式时，需要使用向量。
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding, // 偏移量。使用非补码方式时，需要使用ZeroPadding。默认为PKCS5Padding。
  });
  // base64转码
  return CryptoJS.enc.Base64.stringify(result.ciphertext);
}

/**
 * AES解密
 * @param data 需要解密的数据
 * @param key 密钥
 * @returns 解密后的数据
 */
function decodeAES(data, key) {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }
  const result = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse("1234567812345678"), // 向量。使用CBC模式时，需要使用向量。
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding, // 偏移量。使用非补码方式时，需要使用ZeroPadding。默认为PKCS5Padding。
  });
  // 转为utf-8编码
  return CryptoJS.enc.Utf8.stringify(result);
}

/**
 * RSA加密
 * @param data 需要加密的数据
 * @param key 密钥
 * @returns 加密后的数据
 */
function encodeRSA(data, key) {
  const encryptTool = new JSEncrypt();
  encryptTool.setPublicKey(key);
  return encryptTool.encrypt(data);
}

/**
 * RSA解密
 * @param data 需要解密的数据
 * @param key 密钥
 * @returns 解密后的数据
 */
function decodeRSA(data, key) {
  const encryptTool = new JSEncrypt();
  encryptTool.setPrivateKey(key);
  return encryptTool.decrypt(data);
}

/**
 * 签名,支持SHA256签名与SHA1签名
 * @param data 需要签名的数据
 * @param key SHA1签名的密钥
 */
function signature(data, key = "") {
  let params = "";
  // 先对data排序，然后拼接字符串
  Object.keys(data)
    .sort()
    .forEach((item) => {
      params += `${item}=${data[item]}, `;
    });
  params = params.slice(0, -2);
  // SHA256签名：使用CryptoJS.SHA256(),先将SHA256加密,然后转Hex的16进制
  return CryptoJS.SHA256(`{${params}}`).toString(CryptoJS.enc.Hex);
}

// 加解密工具
const Tool = {
  secret: "d70469c6-d8d7-4134-994e-5b84693a1b9c", // 私钥，用于防止别人冒充签名
  RSA_KEY: "", // RSA公钥，后端接口获取, 储存在前端
  AES_KEY: getKeyAES(), // AES密钥，在前端生成
  /**
   * 加密
   * @param data 接口请求参数
   * 说明：请求参数data + 公共参数、AES加密、RSA加密、SHA签名
   * 另外密码等敏感参数, 需要提前单独加密
   */
  encode(data) {
    const { secret, AES_KEY, RSA_KEY } = this;
    const requestDataEnc = encodeAES(data, AES_KEY); // 所有请求参数进行AES加密
    const encodeKey = encodeRSA(AES_KEY, RSA_KEY); // AES的密钥进行RSA加密
    const timestamp = new Date().getValue(); // 当前时间戳
    const result = {
      secret,
      encodeKey,
      requestDataEnc,
      timestamp,
    };
    // 签名
    result.sign = signature(result);
    // 防止私钥泄露移除。
    delete result.secret;
    return result;
  },
  /**
   * 解密
   * @param 返回josn数据
   */
  decode(json) {
    const { AES_KEY } = this;
    let result = decodeAES(json, AES_KEY);
    result = JSON.parse(result);
    return result;
  },
  // 加密密码
  encodePwd(data) {
    const { RSA_KEY } = this;
    return encodeRSA(data, RSA_KEY);
  },
};

export default Tool;
