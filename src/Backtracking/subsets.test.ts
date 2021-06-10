// https://algo.monster/problems/subsets_backtracking

describe.skip("subsets", () => {
  it("scenario 1", () => {
     const input = [1,2,3];
     const output = subsets(input);

     const expected = ["", "123", "12", "13", "1", "23", "2", "3"].map(x => x.split("").map(y => parseInt(y)));
     expect(output.sort()).toEqual(expected.sort());
  });
});

function subsets(nums: number[]) {
  const output = [];
  backtrack(nums, output);
  
  return output;
}

function backtrack(nums: number[], output: number[][], current: number[] = [], index = 0, depth = 0) {
  output.push([...current]);
  if(index === nums.length) {
      return;
  }
  
  for(let i = index; i < nums.length; i++) {
      const val = nums[i];
      
      current.push(val);
      backtrack(nums, output, current, i + 1, depth + 1);
      current.pop();
  }
}