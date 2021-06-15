//https://algo.monster/problems/house_robber

describe.skip("House Robber", () => {
  it("scenario 1", () => {
    const input = [1, 2, 3, 1];
    const max = rob(input);

    const expected = 4;
    expect(max).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = [2, 7, 9, 3, 1];
    const max = rob(input);

    const expected = 12;
    expect(max).toEqual(expected);
  });
});

function rob(nums: number[]): number {
  const cache = {};
  cache[-1] = 0;
  cache[-2] = 0;

  let max = 0;
  for(let i = 0; i < nums.length; i++) {
      const case1 = cache[i - 1];
      const case2 = cache[i - 2] + nums[i];
      
      cache[i] = case2;
      max = Math.max(case1, case2);        
  }
  
  return max;
}