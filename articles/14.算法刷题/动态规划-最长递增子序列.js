/*
最长递增子序列算法思路分析
nums:[2, 3, 5, 1, 2, 8]
dp 值: 1 2 3 3 3 4

遍历 nums
第 1 项 1  
第 2 项 2
第 3 项 3  
第 4 项 3
第 5 项 3
第 6 项 4
状态转移方程: 
如果nums[j] > nums[i], dp[i] = max(dp[j]) + 1 
*/

const nums = [2, 3, 5, 1, 2, 8];

function LIS(nums) {
  const length = nums.length;
  // 默认每一项的长度为1
  const dp = new Array(length).fill(1);
  for (let i = 1; i < length; i++) {
    // 找到i项以前的项中最长的子序列长度
    for (let j = 0; j < i; j++) {
      // 后一项大于前一项才需要比较，后一项小于前一项时没有影响
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return dp[length - 1];
}
LIS(nums)