const fs = require("fs");
const path = require("path");

const resolvePath = (filePath) => {
  return path.join(__dirname, filePath);
};
// 目标目录
const targetPath = resolvePath("articles");
// 输出目录
const outputDir = "D:/MySpace/Work/wx_interview/articles";
// 所有文件名
const allFileNames = [];

const giteeUrl = "https://gitee.com/franklin-cloud/FrontendInterview/raw/main/articles";

// 获取目录
const getAllDirs = (dirPath) => {
  const dirs = fs.readdirSync(dirPath);
  const filterDirs = dirs.filter((dirItem) => {
    return /^(\d){2}\./.test(dirItem);
  });
  return filterDirs;
};

// 写入文件
const writeJsFile = (path, content) => {
  const fileContent = `module.exports = ${JSON.stringify(content)}`;
  fs.writeFileSync(path, fileContent, "utf-8");
  console.log("写入成功:", path);
};

// 获取的文件
const getFiles = (dirPath, dirItamPath) => {
  const allFiles = fs.readdirSync(dirPath);
  // 过滤掉images文件夹
  const files = allFiles.filter((file) => {
    return file !== "images";
  });

  files.forEach((file) => {
    const subPath = `${dirPath}/${file}`;
    const fileState = fs.statSync(subPath);
    if (fileState.isFile()) {
      // 移除绝对路径
      const fileName = subPath.replace(`${targetPath}/`, "");
      // console.log("fileName:", fileName);
      allFileNames.push(fileName);
      // 读取文件内容
      let contentStr = fs.readFileSync(subPath, "utf-8");
      // 图片地址替换
      let content = contentStr.replace("./images", `${giteeUrl}/${dirItamPath}/images`);
      // 输出路径: outputDir目录下平铺展示
      const fileOutputPath = outputDir + "/" + fileName.replace(/\//g, "=").replace(/\.(md|html)$/, ".js");
      writeJsFile(fileOutputPath, content);
    } else if (fileState.isDirectory()) {
      console.log("三级目录");
      getFiles(subPath, file);
    }
  });
};

// 获取目录下所有文件
const getAllFiles = (allDirs) => {
  const exitsDist = fs.existsSync(outputDir);
  if (!exitsDist) {
    fs.mkdirSync(outputDir);
  }
  // 读取所有文件内容
  allDirs.forEach((dirItamPath) => {
    const dirPath = `${targetPath}/${dirItamPath}`;
    getFiles(dirPath, dirItamPath);
  });
};

const allDirs = getAllDirs(targetPath);
getAllFiles(allDirs);

// 获取文章列表
const getArticleList = (allFileNames) => {
  const data = {};
  allFileNames.forEach((filePath) => {
    const pathArr = filePath.split("/");
    const dir = pathArr[0];
    const subDir = pathArr[1];
    const fileName = pathArr[pathArr.length - 1];
    if (pathArr.length === 2) {
      if (!data[dir]) {
        data[dir] = [];
      }
      data[dir].push(fileName);
    } else if (pathArr.length === 3) {
      if (!data[dir]) {
        data[dir] = {};
      }
      if (!data[dir][subDir]) {
        data[dir][subDir] = [];
      }
      data[dir][subDir].push(fileName);
    }
  });
  writeJsFile(outputDir + "/articleList.js", data);
};

getArticleList(allFileNames);
