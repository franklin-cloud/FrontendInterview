const catogary = require("./dist/dirInfo");
const allFileNames = require("./dist/allFileNames");

const getData = (allFileNames) => {
  const data = {};
  allFileNames.forEach((filePath) => {
    const pathArr = filePath.split("/");
    console.log(pathArr);
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
  console.log(data);
};

getData(allFileNames);
