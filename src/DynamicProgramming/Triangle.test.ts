//https://leetcode.com/problems/triangle/submissions/

describe.skip("Triangle", () => {
  it("scenario 1", () => {
    const input = [[2],[3,4],[6,5,7],[4,1,8,3]];
    const isValid = minimumTotal(input);

    const expected = 11;
    expect(isValid).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = [[-10]];
    const isValid = minimumTotal(input);

    const expected = -10;
    expect(isValid).toEqual(expected);
  });
});

function minimumTotal(triangle: number[][]): number {
  //return viaDfs(triangle);
  return viaDp(triangle);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function viaDfs(triangle: number[][]): number {
  // edge case - invalid input
  if(!triangle || triangle.length === 0) throw new Error();
  
  let min: number = undefined;
  
  // generate outputs
  const maxRow = triangle.length - 1;
  const stack: number[][] = [[0,0,0]]; // [row, column, sum]
  while(stack.length > 0) {
      const [row, col, sum] = stack.pop();

      if(row > maxRow && (min == undefined || sum < min)) {
          min = sum;
      }

      // out of bounds
      if(row > maxRow) continue;
      const maxCol = triangle[row].length - 1;
      if(col > maxCol) continue;
      
      // prepare for next iteration
      const val = triangle[row][col];
      stack.push([row + 1, col, sum + val]);
      stack.push([row + 1, col + 1, sum + val]);
  }

  return min;
}

// time: O(n) space: O(n)
function viaDp(triangle: number[][]): number {
  // edge case - invalid input
  if(!triangle || triangle.length === 0) throw new Error();
  
  let cache = []; // we only ever need to cache the last row of results.
  for(let i = triangle.length - 1; i >= 0; i--) {
      const row = triangle[i];
      const lastCol = row.length - 1;
      const curr  = [];
      for(let n = 0; n <= lastCol; n++) {
          const r = n + 1;
          const val = row[n];
          const minLastVal = Math.min(cache[n] ?? 0, cache[r] ?? 0);
          curr.push(val + minLastVal);
      }
      
      cache = curr;
  }
  
  return cache[0];
}