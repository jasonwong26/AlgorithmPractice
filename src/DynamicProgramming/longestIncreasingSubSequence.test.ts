//https://algo.monster/problems/longest_increasing_subsequence

describe.skip("Longest Increasing Subsequence", () => {
  it("scenario 1", () => {
    const input = [50, 3, 10, 7, 40, 80];    
    const longest = longestSubLenWithOptimization(input);

    const expected = 4;
    expect(longest).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = [10, 22, 9, 33, 21, 50, 41, 60, 80];    
    const longest = longestSubLenWithOptimization(input);

    const expected = 6;
    expect(longest).toEqual(expected);
  });
});

// note: trick is that this relates to a variable number of subproblems
//  added optimization improve performance by  reducing number of subproblems checked

// recurrence relation: dp(n) = Math.max(dp(0), dp(1), ... dp(n - 1)) + 1
function longestSubLen(nums: number[]) : number {
  // edge case
  if(!nums || nums.length === 0) return 0;
  if(nums.length === 1) return 1;
  
  const cache = new Array(nums.length);
  cache[0] = 1;
  let maxLength = 1;
  for (let i = 1; i < nums.length; i++) {
      const value = nums[i];
      let maxPriorLength = 0;
      for(let n = 0; n < i; n++) {
          const priorValue = nums[n];
          const priorLength = cache[n];
          if(priorValue >= value) continue;
          maxPriorLength = Math.max(maxPriorLength, priorLength);
          //console.log("compare", { i, n, value, priorValue, priorLength, maxPriorLength});
      }
      
      const length = maxPriorLength + 1;
      cache[i] = length;
      maxLength= Math.max(maxLength, length);
      
      //console.log("step", { i, value, length });
  }
  
  return maxLength;
}

function longestSubLenWithOptimization(nums: number[]) : number {
  // edge case
  if(!nums || nums.length === 0) return 0;
  if(nums.length === 1) return 1;
  
  const cache = new Array(nums.length);
  cache[0] = 1;
  let maxLength = 1;
  for (let i = 1; i < nums.length; i++) {
      const value = nums[i];
      let maxPriorLength = 0;
      for(let n = i - 1; n >= 0; n--) {
          const priorValue = nums[n];
          const priorLength = cache[n];
          if(priorValue >= value) continue;
          if(priorLength < maxPriorLength) break; // immediately exit inner loop once a prior solution found
          maxPriorLength = Math.max(maxPriorLength, priorLength);
          //console.log("compare", { i, n, value, priorValue });
      }
      
      const length = maxPriorLength + 1;
      cache[i] = length;
      maxLength= Math.max(maxLength, length);
      
      //console.log("step", { i, value, length });
  }
  
  return maxLength;
}
