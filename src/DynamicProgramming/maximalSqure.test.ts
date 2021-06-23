//https://algo.monster/problems/maximal_square

describe.skip("Maximal Square", () => {
  it("scenario 1", () => {
    const input = ["1 0 1 0 0",
                   "1 0 1 1 1",
                   "1 1 1 1 0",
                   "1 0 0 0 1"];
    const parsed = input.map(x => x.split(" ").map(y => Number.parseInt(y)));
    const sum = maximalSquare(parsed);

    const expected = 4;
    expect(sum).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = ["1 0 1 1 1",
                   "1 0 1 1 1",
                   "1 0 1 1 1",
                   "1 0 0 0 1"];
    const parsed = input.map(x => x.split(" ").map(y => Number.parseInt(y)));
    const sum = maximalSquare(parsed);

    const expected = 9;
    expect(sum).toEqual(expected);
  });
});

// note: struggled to implement this, had to look at the answer to solve.
//       tip for future: when working with grids and graphs, look at the neighbors (in this case the 3 component pieces of the square) as the prior sub problems.

// recurrence relation: isValid([r,c]) = min(isValid([r - 1,c - 1]), isValid([r,c - 1]), isValid([r - 1,c]) + 1
function maximalSquare(matrix) {
  // edge case
  if(!matrix || matrix.length === 0 || matrix[0].length == 0) return 0;

  const totalRows = matrix.length;
  const totalCols = matrix[0].length;
      
  // build cache
  const cache = [];
  for(let r = 0; r < totalRows; r++) {
      cache.push(new Array(totalCols));
  }
  
  //perform calculation
  let maxSize = 0;
  for(let r = 0; r < totalRows; r++) {
      for(let c = 0; c < totalCols; c++) {
          const isCellValid         = isValid(matrix, r, c) ? 1 : 0;
          const isAboveCellValid    = fetchFromCache(cache, r - 1, c    );
          const isLeftCellValid     = fetchFromCache(cache, r    , c - 1);
          const isDiagonalCellValid = fetchFromCache(cache, r - 1, c - 1);
          
          const value = Math.min(isAboveCellValid, isLeftCellValid, isDiagonalCellValid) + isCellValid;
          cache[r][c] = value;
          
          maxSize = Math.max(maxSize, value);
      }
  }
  
  const maxArea = Math.pow(maxSize, 2);
  return maxArea;
}
// generic isValid function to illustrate that this can be used for other scenarios...
function isValid(matrix, row, col) {
  if(row < 0 || row > matrix.length) return false;
  if(col < 0 || col > matrix[0].length) return false;
  
  return matrix[row][col] === 1;
}
function fetchFromCache(cache, row, col) {
  if(row < 0 || row > cache.length) return null;
  if(col < 0 || col > cache[0].length) return null;
  
  return cache[row][col];
}