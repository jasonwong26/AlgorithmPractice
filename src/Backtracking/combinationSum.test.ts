// https://algo.monster/problems/combination_sum

describe.skip("Palindrome Partitioning", () => {
  it("scenario 1", () => {
    const candidates = [2, 3, 6, 7];
    const target = 7;
    const output = combinationSum(candidates, target);

    const expected = [[2, 2, 3], [7]];
    expect(output.sort()).toEqual(expected.sort());
  });
  it("scenario 2", () => {
    const candidates = [2, 3, 5];
    const target = 8;
    const output = combinationSum(candidates, target);

    const expected = [[2, 2, 2, 2], [2, 3, 3], [3, 5]];
    expect(output.sort()).toEqual(expected.sort());
  });
});

// time: O(log(n!)) space O(n!)
function combinationSum(candidates, target) {
  const output = [];
  backtrack(candidates, target, output);
  return output;
}
function backtrack(candidates, target, output, sum = 0, current = [], memo = {}, depth = 0) {
//console.log("call ", {depth, sum, current});

// possible match found
if(sum === target) {
    const sorted = [...current].sort(); // NOTE: had bug in first implementation due to sort() affecting original array rather than creating new.
    const key = sorted.join("");
    // match already used
    if(memo[key] !== undefined) return false; 
    
    // new result found
    memo[key] = true;
    output.push(sorted);
    return true;
}
  
// dead branch
if(sum > target) return false;
  
for(let i = 0; i < candidates.length; i++) {
    const val = candidates[i];
    current.push(val);
    sum += val;
    
    backtrack(candidates, target, output, sum, current, memo, depth + 1);
    
    current.pop();
    sum -= val;
}
} 
