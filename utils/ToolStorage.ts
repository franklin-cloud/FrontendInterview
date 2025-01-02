type StorageType = "0" | "1";

const storageObj = {
  "0": localStorage,
  "1": sessionStorage
};
const defaultType = '0'
const storagePrefix = `${process.env.REACT_APP_STORAGE_PREFIX}iicSeaUmsWeb-`;

/**
 * 读取缓存
 * @param key 保存时的key
 * @param type "1" | "0"  缓存类型
 */
export function getItem(key: string, type: StorageType = defaultType) {
  const setKey = storagePrefix + key;
  const setValStr = storageObj[type].getItem(setKey);
  let result = ''
  if (setValStr) {
    const setVal = JSON.parse(setValStr);
    result = setVal.__storageType === "string" ? setVal.value : setVal;
  }
  return result;
}

/**
 * 设置缓存
 * @param key key
 * @param value 目前支持字符串跟对象
 * @param type 缓存类型
 */
export function setItem(key: string, value = {}, type: StorageType = defaultType) {
  const setKey = storagePrefix + key;
  let setVal
  if (typeof value === "string") {
    setVal = {
      __storageType: "string",
      value
    };
  }
  const setValStr = JSON.stringify(value);
  storageObj[type].setItem(setKey, setValStr);
}

/**
 * 删除缓存
 * @param key key
 * @param type 缓存类型
 */
export function removeItem(key: string, type: StorageType = defaultType) {
  const setKey = storagePrefix + key;
  storageObj[type].removeItem(setKey);
}

/**
 * 删除全部缓存
 * @param type 缓存类型
 */
export function clearAllItem(type: StorageType = defaultType) {
  storageObj[type].clear()
}

