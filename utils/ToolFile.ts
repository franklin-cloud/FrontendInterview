/**
 * @descrition file to blob
 * @param { String } file
 * @return 文件流
 * */
function fileToBlob(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type });
      resolve(blob);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
}


/**
 * @descrition base64 to 文件流
 * @param { String } fileByte  base64
 * @return 文件流
 * */ 
export function base64ToStream(fileByte: string) {
  if(!fileByte) {
    throw Error('fileByte不能为空')
  }
  const bstr = atob(fileByte);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return  u8arr
}

/**
 * @descrition base64 to file
 * @param base64Url
 * @param filename
 * @returns 文件
 */
export const base64UrlToFile = (base64Url: string, filename: string): File => {
  const arr = base64Url.split(",");
  const mime = (arr[0].match(/:(.*?);/) as RegExpMatchArray)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * @descrition 接口响应为blob类型转JSON
 * @param blobData blob数据
 * @param filename
 * @returns 文件
 */
export const blob2JSON = (blobData: Blob): Promise<string | Record<string, any>> => {
  const result = new Promise<string | Record<string, any>>((resolve) => {
    const reader = new FileReader();
    reader.readAsText(blobData, "utf-8");
    reader.onload = (e: ProgressEvent<FileReader>) => {
      let dataSource: string | Record<string, any> = e.target!.result as string;
      // 文件流的话没有{}
      if (dataSource?.indexOf("{") !== -1 && dataSource.indexOf("}") !== -1) {
        dataSource = JSON.parse(dataSource);
      }
      return resolve(dataSource);
    };
  });
  return result;
};

/**
 * @descrition 文件下载
 * @param fileName 文件名称
 * @param data 文件内容
 * @param mimeType MimeTypes
 * 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
 */
export const downloadFile = (fileName: string, data: BlobPart, mimeType?: string) => {
  const blob = new Blob([data], { type: mimeType });
  // 创建a链接下载文件
  const a = document.createElement("a"); 
  if ("download" in document.createElement("a")) {
    a.download = fileName;
    a.style.display = "none";
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    }, 500);
  } else {
    // IE浏览器下载文件
    navigator?.msSaveBlob(blob, fileName); 
  }
}
