/*
CancelToken 的工作原理依赖于 Promise 的链式调用和 throw 语句。在 Axios 发起请求时，
会检查请求的 cancelToken 属性，如果存在，就将其添加到当前请求的 cancelToken 列表中。
当调用 cancel 方法时，CancelToken 会抛出一个带有特定 message 的 Cancel 对象。
这个对象会被 Promise 的 catch 方法捕获，从而触发请求的取消逻辑。
*/
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

const pendingReqMap = new Map();

/**
 * @description 根据当前的请求信息，生成请求key
 * @param config
 * @return
 */
export function generateReqKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join("&");
}

/**
 * @description 将当前请求的cancelToken方法存入map中
 * @param config
 */
export function addPendingReq(config: AxiosRequestConfig) {
  // 手动配置是否需要重复请求的拦截
  if (config?.withoutDuplicateRequestInterception) {
    return;
  }
  const requestKey = generateReqKey(config);
  config.cancelToken = new axios.CancelToken((cancel) => {
    if (!pendingReqMap.has(requestKey)) {
      pendingReqMap.set(requestKey, cancel);
    }
  });
}

/**
 * @description 检查是否存在重复请求，存在则取消之前发送的请求
 * @param config
 */
export function cancelPendingReq(config: AxiosRequestConfig) {
  // 手动配置是否需要重复请求的拦截
  if (config?.withoutDuplicateRequestInterception) {
    return;
  }
  const requestKey = generateReqKey(config);
  if (pendingReqMap.has(requestKey)) {
    const cancelToken = pendingReqMap.get(requestKey);
    // 取消之前发送的请求
    cancelToken(requestKey);
    // 删除保存的请求requestKey
    pendingReqMap.delete(requestKey);
  }
}

/*
// 创建axios实例
const httpService = axios.create({});

// request拦截器
httpService.interceptors.request.use(
    config => {
        // 取消重复请求
        cancelRepeatRequest(config)
        // 添加请求到队列
        addPendingRequest(config)
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// response拦截器
httpService.interceptors.response.use(
    response => {
        // 取消请求队列中该请求
        cancelRepeatRequest(response.config);
            
        if (response.status == 200) {
            return response;
        } else {
            return Promise.reject(response);
        }
    },
    // 处理处理
    error => {
        // 取消请求队列中该请求
        cancelRepeatRequest(error.config || {})
        return Promise.reject(error);
    }
)
*/
