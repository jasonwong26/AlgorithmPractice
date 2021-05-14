// https://algo.monster/problems/flood_fill

describe.skip("Flood Fill", () => {
  it("scenario 1", () => {
    const image = [[ 0, 1, 3, 4, 1],
                   [ 3, 8, 8, 3, 3],
                   [ 6, 7, 8, 8, 3],
                   [12, 2, 8, 9, 1],
                   [12, 3, 1, 3, 2]]
    const start = [2, 2]
    const newColor = 9
    floodFill(image, start, newColor);

    const expected = [[ 0, 1, 3, 4, 1],
                      [ 3, 9, 9, 3, 3],
                      [ 6, 7, 9, 9, 3],
                      [12, 2, 9, 9, 1],
                      [12, 3, 1, 3, 2]]
    expect(image).toEqual(expected);
  });
});

// time: O(rows * cols) space O(rows * cols)
function floodFill(image: number[][], start: number[], newColor: number) {
  const rows = image.length;
  const cols = image[0].length;

  const visited = new Set<string>();
  const queue = [start];
  const oldColor = image[start[0]][start[1]];

  while (queue.length > 0) {
    const [row, col] = queue.shift();
    visited.add(`${row},${col}`);

    image[row][col] = newColor;

    const neighbors = findNeighbors([row, col], rows, cols);
    for(let cell of neighbors) {
      const [r, c] = cell;
      if(visited.has(`${r},${c}`)) continue;
      if(image[r][c] !== oldColor) continue;
      queue.push(cell);
    }
  }
}

// time: O(1) space O(1)
function findNeighbors(cell: number[], rows: number, cols: number): number[][] {
  const rOffset = [-1, -1, -1, 
                    0,      0,
                    1,  1,  1];
  const cOffset = [-1,  0,  1,
                   -1,      1,
                   -1,  0,  1];

  const [row, col] = cell;

  const neighbors: number[][] = [];
  for (let i = 0; i < rOffset.length; i++) {
    const r = row + rOffset[i];
    const c = col + cOffset[i];

    if(r < 0 || r >= rows) continue;
    if(c < 0 || c >= cols) continue;

    neighbors.push([r, c]);
  }

  return neighbors;
}
