/**
 * 基础跳台阶
 * n个台阶，每次跳1个格或者2格，求跳到n个台阶的组合数。
 * dp[n] = dp[n-1] + dp[n-2]
*/

function stepSum(n) {
    if(n < 1) {
        return 0;
    }
    const dp = new Array(n).fill(0);
    for (let i = 1; i <= n; i++){
        if(i === 1 || i === 2) {
            dp[i] = i;
        } else {
            dp[i] = dp[i-1] + dp[i-2];
        }
        
    }
    return dp[n];
}
console.log(1, stepSum(1))
console.log(2, stepSum(2))
console.log(3, stepSum(3))
console.log(4, stepSum(4))
console.log(5, stepSum(5))
