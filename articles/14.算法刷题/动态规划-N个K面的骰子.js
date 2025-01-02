/**
 * n个骰子，每个骰子k个面,分别为1～k,求所有骰子面朝上的点数和为target的组合数。
 * 每个骰子的点数都是1～k, 那么当第i个骰子掷出的点数可能为 1 ~ k，假设和为j，
 * 那么第 i-1 个骰子需要掷出的点数可能分别为 j-1 ~ j-k
 * dp[i][j] = dp[i-1][j-1] + dp[i-1][j-2] + ... + dp[i-1][j-k]
 *
 * 3个骰子,6个面,和3～18, 假设和为6，10种结果分别为 114，123，132 141；213，222，231；312，321，411
 * dp[3][6] = dp[2][5] + dp[2][4] + dp[2][3] + dp[2][2] + dp[2][1]
 * 20       = 4        + 3        + 2        + 1        + 0
 * dp[2][5] = dp[1][4] + dp[1][3] + dp[1][2] + dp[1][1] = 4
 * dp[2][4] = dp[1][3] + dp[1][2] + dp[1][1] = 3
 * dp[2][3] = dp[1][2] + dp[1][1] = 2
 * dp[2][2] = dp[1][1] = 1
 * dp[2][1] = 0
 */

function dicesSum(num, face, sum) {
  const dp = new Array(num).fill(0).map(() => new Array(sum).fill(0));
  // console.log(JSON.stringify(dp));
  // 骰子数num = 1
  for (let j = 0; j < face; j++) {
    dp[0][j] = 1;
  }
  // 骰子数num > 2
  for (let i = 1; i < num; i++) {
    for (let j = 0; j < sum; j++) {
      for (let k = 1; k <= face && k <= j; k++) {
        dp[i][j] += dp[i - 1][j - k];
        // dp[1][6] = dp[0][5] + dp[0][4] + dp[0][3] + dp[0][2] + dp[0][1];
      }
      // console.log(i, j, dp[i][j]);
    }
  }
  // console.log(JSON.stringify(dp));
  return dp[num - 1][sum -1];
}
console.log(2, 6, 6, dicesSum(2, 6, 6)); //15 24 33 42 51
console.log(10, 6, 40, dicesSum(10, 6, 40)); 
