// https://algo.monster/problems/knight_shortest_path

describe.skip("Knight Minimum Moves", () => {
  it("scenario 1", () => {
    const output = getKnightShortestPath(2, 1);

    const expected = 1;
    expect(output).toEqual(expected);
  });
});


// time: O(n) space O(1)
function getKnightShortestPath(x: number, y: number) {
  const visited = new Set<string>();
  const queue = [[0, 0]];

  let distance = 0;
  while(queue.length > 0) {
    const length = queue.length;
    for(let i = 0; i < length; i++) {
      const curr = queue.shift();
      const [row, col] = curr;

      // match found
      if(row === x && col === y) return distance;

      // search neighbors
      const neighbors = findNeighbors(curr);
      for(const cell of neighbors) {
        const [r, c] = cell;
        visited.add(`${r},${c}`);
        queue.push(cell);
      }
    }
    distance++;
  }

  return -1;
}

// time: O(1) space O(1)
function findNeighbors(cell: number[]): number[][] {
  const [x, y] = cell;
  const xOffset = [2, 1,  2,  1, -2, -1,  -2,  -1];
  const yOffset = [1, 2, -1, -2,  1,  2,  -1,  -2];

  const neighbors = [];
  for(let i = 0; i < xOffset.length; i++) {
    const n = [x + xOffset[i], y + yOffset[i]];
    neighbors.push(n);
  }

  return neighbors;
}
