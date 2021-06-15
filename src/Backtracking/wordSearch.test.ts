// https://algo.monster/problems/word_search

describe.skip("Word Search", () => {
  it("scenario 1", () => {
     const board = [
       "ABCE".split(""),
       "SFCS".split(""),
       "ADEE".split("")
     ];
     const word = "SEE";
     const output = exists(board, word);

     const expected = true;
     expect(output).toEqual(expected);
  });
  it("scenario 2", () => {
    const board = [
      "ABCE".split(""),
      "SFCS".split(""),
      "ADEE".split("")
    ];
    const word = "ABCCED";
    const output = exists(board, word);

    const expected = true;
    expect(output).toEqual(expected);
 });
 it("scenario 3", () => {
  const board = [
    "ABCE".split(""),
    "SFCS".split(""),
    "ADEE".split("")
  ];
  const word = "ABCB";
  const output = exists(board, word);

  const expected = false;
  expect(output).toEqual(expected);
});
});

function exists(board: string[][], word: string): boolean {
  return backtrack(board, word);
}
function backtrack(board: string[][], word: string, row = 0, col = 0, index = 0, visited: Record<string,boolean> = {}, depth = 0) {
  if(index === word.length) {
      return true;
  }

  const maxRow = board.length - 1;
  const maxCol = board[0].length - 1;

  // determine cells to check
  const next = [];
  if(index === 0) { // check entire board        
      for(var i = 0; i <= maxRow; i++) {
          for(var n = 0; n <= maxCol; n++) {
              next.push([i, n]);
          }    
      }
  } else { // check surrounding cells
      next.push([row - 1, col]);
      next.push([row + 1, col]);
      next.push([row, col - 1]);
      next.push([row, col + 1]);
  }
  
  // traverse cells
  const expected = word.charAt(index);
  for(let i = 0; i < next.length; i++){
      const [r, c] = next[i];
     
      // out of bounds
      if(r < 0 || r > maxRow || c < 0 || c > maxCol) continue;
      
      // already visited
      if(visited[`${r},${c}`]) continue;
      
      const val = board[r][c];
      
      // no match
      if(val !== expected) continue;

      // mark visited
      visited[`${r},${c}`] = true;
      
      if(backtrack(board, word, r, c, index + 1, visited, depth + 1)) return true;

      // remove visited
      visited[`${r},${c}`] = undefined;
  }
  
  return false;
}