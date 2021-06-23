//https://algo.monster/problems/minimal_path_sum

describe.skip("Minimal Path Sum", () => {
  it("scenario 1", () => {
    const input = [[1, 3, 1],
                   [1, 5, 1],
                   [4, 2, 1]];
    const sum = minPathSum(input);

    const expected = 7;
    expect(sum).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = [[1, 3, 6],
                   [1, 5, 6],
                   [4, 2, 1]];
    const sum = minPathSum(input);

    const expected = 9;
    expect(sum).toEqual(expected);
  });
});

// note: implemented this well - 2 minor typing issues, otherwise all tests passed on first try!

// recurrence relation: minPath = Math.min(belowCell.value, rightCell.value)
function minPathSum(grid) {
  const maxRow = grid.length - 1;
  const maxCol = grid[0].length - 1;
  
  //edge case
  if(maxRow < 0 || maxCol === 0) return 0;
  
  // prepare cache
  let cache = []; // cache will be in reverse order.
  let sum = 0;
  for(let c = maxCol; c >= 0; c--){
      sum += grid[maxRow][c];
      cache.push(sum);
  }
  
  // edge case
  if(maxRow === 0) return sum;
  
  // perform dp
  for(let r = maxRow - 1; r >= 0; r--) {
      const row = grid[r];
      const curr = [];
      for(let c = maxCol; c >= 0; c--) {
          const i = maxCol - c; // pointer for cache index
          const val = row[c];
          const belowVal = cache[i];
          const rightVal = c === maxCol 
              ? null 
              : curr[i - 1];
          const minPath = rightVal == null 
              ? belowVal 
              : Math.min(belowVal, rightVal);            
          curr.push(val + minPath);
      }
          
      cache = curr;
  }
  
  return cache[maxCol];
}