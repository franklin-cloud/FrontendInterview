// 实现一个类，每次只能并行*个任务
class ParallelTasks {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount; // 并行数量
    this.tasks = []; // 列表列表
    this.rundingTaskCount = 0; // 正在执行的任务
  }
  // 添加任务
  add(task) {
    return new Promise((resolve, reject) => {
      // 使用Promise是为了任务完成时，调用resolve
      this.tasks.push({ task, resolve, reject });
      this.run();
    });
  }
  // 执行任务
  run() {
    if (this.rundingTaskCount < this.parallelCount && this.tasks.length > 0) {
      this.rundingTaskCount++;
      const { task, resolve, reject } = this.tasks.shift();
      task()
        .then(resolve, reject)
        .finally(() => {
          this.rundingTaskCount--;
          // 任务完成时，继续执行下一个任务
          this.run();
        });
    }
  }
}

// mock 生成任务
function mockTask(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const parallelTasks = new ParallelTasks(3);

function addTask(name, time) {
  // mock 任务
  const task = () => mockTask(time);
  // 添加任务时，返回一个Promise，任务完成时，调用resolve进行打印任务完成
  parallelTasks.add(task).then(() => {
    console.log(`任务${name}完成`);
  });
}

addTask("task1", 10000);
addTask("task2", 5000);
addTask("task3", 3000);
addTask("task4", 4000);
addTask("task5", 5000);

// 0000000000      10s-1
// 00001           5s-2

//      001        8s-3
//         0001    12s-4
//           00001 15s-5
