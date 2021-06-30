//https://algo.monster/problems/partition_equal_subset_sum

describe.skip("Partition Equal Subset", () => {
  it("scenario 1", () => {
    const input = [3, 4, 7];
    const max = canPartition2(input);

    const expected = true;
    expect(max).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = [1, 5, 11, 5];
    const max = canPartition2(input);

    const expected = true;
    expect(max).toEqual(expected);
  });
  it("scenario 3", () => {
    const input = [4, 5, 10, 7];
    const max = canPartition2(input);

    const expected = false;
    expect(max).toEqual(expected);
  });  
  it("scenario 4", () => {
    const input = [0, 0, 0, 0];
    const max = canPartition2(input);

    const expected = true;
    expect(max).toEqual(expected);
  });
});

/*
Notes:
- was rusty with dfs implementation, need to practice more???
*/

// DFS w/ memoization
// target = sum(nums) / {2 = e.g. partition groups}
function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b, 0);
  const target = sum / 2;
  
  return dfs(nums, target);
}
function dfs(nums: number[], target: number, index = -1, sum = 0, depth = 0) {
  //console.log("call", {depth, target, index, sum, val: nums[index]});
  if(sum === target) return true;

  if(sum > target) return false;
  if(index === nums.length) return false;

  for(let i = index + 1; i < nums.length; i++) {
      const val = nums[i];
      //console.log("sub", {depth, index, i, sum, val });
      const result = dfs(nums, target, i, sum + val, depth + 1);
      if(result) return true;        
  }
  
  return false;
}

/*
Notes:
- similar to coin change problem
- cache = array of values from 0 to target (boolean)
*/

// recurrence relation: dp[i] = dp[i] || dp[i-1]
function canPartition2(nums: number[]): boolean {
  if (nums === null || nums.length < 2) {
      return false;
  }
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 === 1) return false;
  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // initialize first result
  for (const num of nums) { // loop over all of array
      for (let value = target; value >= num; value--) { // calculate using prior values
          const priorValue = value - num;
          dp[value] = dp[value] || dp[priorValue];
      }
  }
  return dp[target];
}