/**
 * 可作为webpack 插件使用，或者单独的脚本
 * */ 
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { exec, execSync } = require("child_process");

const appPackageJsonPath = path.resolve("package.json")
const appPackageJson = require(appPackageJsonPath);
const scriptName = process.env.npm_lifecycle_event;


const branchMap = {
  "build:qa": {
    targetBranch: "aws-release",
    sourceBranch: "release-2.0.0"
  },
  "build:blue": {
    targetBranch: "aws-blue",
    sourceBranch: "aws-release"
  },
  "build:prod": {
    targetBranch: "aws-green",
    sourceBranch: "aws-blue"
  }
};

class BuildInfoPlugin {
  constructor() {
    // 检查本地代码是否是最新的
    this.checkCodeIsUpToDate();
    // 是否要检测组件库是否匹配
    this.checkVersion();
    // 比对分支，确认合并情况
    this.compareBranches();
  }

  // 检查本地代码是否是最新的
  checkCodeIsUpToDate() {
    const targetBranch = branchMap[scriptName].targetBranch
    const localLogBuffer = execSync(`git log ${targetBranch} -1 --pretty=format:"%h"`);
    const localLogHash = localLogBuffer.toString()
    const remoteLogBuffer = execSync(`git log origin/${targetBranch} -1 --pretty=format:"%h"`)
    const remoteLogHash = remoteLogBuffer.toString();
    if(localLogHash !== remoteLogHash) {
      throw Error(chalk.red(`${targetBranch} 分支的代码有差异，本地代码位于: ${localLogHash}, 远端代码位于: ${remoteLogHash}`))
    }
  }
  checkVersion() {
    // 检查组件库依赖是否匹配
    const getComponentsVersion = path.resolve(process.cwd(), "node_modules", "om-design-react", "package.json");
    const componentsPackageJson = fs.readFileSync(getComponentsVersion, { encoding: "utf-8" });
    this.componentVersionIsEqual = JSON.parse(componentsPackageJson).version === appPackageJson.dependencies["om-design-react"];
    if (!this.componentVersionIsEqual) {
      throw Error(chalk.red("组件库依赖不是最新的，请安装最新的依赖.\n"));
    }
  }

  compareBranches = async () => {
    const targetBranch = branchMap[scriptName].targetBranch // 目标分支：aws-release
    const sourceBranch = branchMap[scriptName].sourceBranch // 源分支：release-2.0.0
    const targetBranchLog = execSync(`git log ${targetBranch} --pretty=format:"%h" -n 3`)
          .toString()
    const sourceBranchLog = execSync(`git log ${sourceBranch} --pretty=format:"%h" -n 2`)
      .toString()
      
    if (targetBranchLog.indexOf(sourceBranchLog) === -1) {
      throw Error(chalk.red(`${sourceBranch} 分支代码没有合并到 ${targetBranch}`));
    }
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync(BuildInfoPlugin.name, (stats, callback) => {
      // do something
      callback();
    });
  }
}

module.exports = BuildInfoPlugin;
