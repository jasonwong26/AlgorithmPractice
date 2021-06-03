// https://leetcode.com/problems/beautiful-arrangement/submissions/

describe.skip("Beautiful Arrangment", () => {
  it("scenario 1", () => {
    const input = 2;

    const output = countArrangement(input);

    const expected = 2;
    expect(output).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = 3;

    const output = countArrangement(input);

    const expected = 3;
    expect(output).toEqual(expected);
  });
  it("scenario 3", () => {
    const input = 4;

    const output = countArrangement(input);

    const expected = 8;
    expect(output).toEqual(expected);
  });
  it("scenario 4", () => {
    const input = 5;

    const output = countArrangement(input);

    const expected = 10;
    expect(output).toEqual(expected);
  });
});

function countArrangement(n: number): number {
  return backtrack(0, n);
};

function backtrack(index: number, n: number, used = {}, memo = {}, depth = 0): number {
  if(index === n) {
      return 1;   
  }
  
  let count = 0;
  for(let i = 1; i <= n; i++) {
      const memoKey = `${index + 1}.${i}`;
      const memoVal = memo[memoKey];
      if(memoVal != undefined) {
          continue;
      }
      
      if(used[i]) continue; // already used.  Cease processing.
      
      const isValid = i % (index + 1) === 0 || (index + 1) % i === 0;

      // not a valid combination.  Cease processing.   
      if(!isValid) {
          memo[memoKey] = 0;
          continue; 
      }
      
      used[i] = true;
      count += backtrack(index + 1, n, used, memo, depth + 1);        
      used[i] = false;        
  }
  
  return count;
}

/*
NOTES:
Was able to implement this well
but ran into issues with the memoization step where I would return rather than continue.
*/