const fs = require("fs");
const path = require("path");

const resolvePath = (filePath) => {
  return path.join(__dirname, filePath);
};

const targetPath = resolvePath("src");
const outputDirInfoPath = resolvePath("dist/dirInfo.js");
const allFileNames = [];

// 获取目录
const getTargetDir = (dirPath) => {
  const dirs = fs.readdirSync(dirPath);
  const filterDirs = dirs.filter((dirItem) => {
    return /^(\d){2}\./.test(dirItem);
  });
  return filterDirs;
};
// 写入文件
const writeJsFile = (path, content) => {
  const fileContent = `export default ${JSON.stringify(content)}`;
  fs.writeFile(path, fileContent, (err, data) => {
    console.log("写入成功:", path);
  });
};

// 获取的文件
const getFiles = (dirPath) => {
  // src/01.浏览器/所有文件
  const allFiles = fs.readdirSync(dirPath);
  // 过滤掉images文件夹
  const files = allFiles.filter((file) => {
    return file !== "images";
  });

  files.forEach((file) => {
    const subPath = dirPath + `/${file}`;
    const fileState = fs.statSync(subPath);
    if (fileState.isFile()) {
      allFileNames.push(subPath.replace(resolvePath("src") + "\\", ""));
      // 输出文件内容
      const contentStr = fs.readFileSync(subPath, "utf-8");
      // 获取输出路径
      const subPathArr = subPath.split("src\\");
      let outputPath = subPathArr[0] + "src\\" + subPathArr[1].replace(/\//g, "=");
      outputPath = outputPath.replace("src", "dist").replace(/\.(md|html)$/, ".js");
      writeJsFile(outputPath, contentStr);
    } else if (fileState.isDirectory()) {
      getFiles(subPath);
    } else {
      console.log("未知类型");
    }
  });
};

// 获取目录下所有文件
const getAllFiles = (targetDirs) => {
  const exitsDist = fs.existsSync(resolvePath("/dist"));
  if (!exitsDist) {
    fs.mkdirSync(resolvePath("/dist"));
  }
  // 写入一级目录信息
  writeJsFile(outputDirInfoPath, targetDirs);

  // 读取所有文件内容
  targetDirs.forEach((dirItamPath) => {
    const dirPath = resolvePath("/src/" + dirItamPath);
    getFiles(dirPath);
  });
};

const targetDirs = getTargetDir(targetPath);

getAllFiles(targetDirs);

writeJsFile(resolvePath("/dist/allFileNames.js"), allFileNames);
