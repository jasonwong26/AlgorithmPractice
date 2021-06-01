// https://algo.monster/problems/number_of_islands

describe.skip("Number of Islands", () => {
  it("scenario 1", () => {
    const image = [[ 1, 1, 1, 0, 0, 0 ],
                   [ 1, 1, 1, 1, 0, 0 ],
                   [ 1, 1, 1, 0, 0, 0 ],
                   [ 0, 1, 0, 0, 0, 0 ],
                   [ 0, 0, 0, 0, 1, 0 ],
                   [ 0, 0, 0, 0, 0, 0 ]]
    const output = numberOfIslands(image);

    const expected = 2
    expect(output).toEqual(expected);
  });
});


// track visited by adding 10 to value of cell

// time: O(rows * cols) space O(1)
function numberOfIslands(image: number[][]) {
  const rows = image.length;
  const cols = image[0].length;
  
  let count = 0;
  for(let r = 0; r < rows; r++) {
    for(let c = 0; c < cols; c++) {
      if(!checkForIsland(image, [r, c], rows, cols)) continue;
      count++;
    }
  }

  return count;
}

function checkForIsland(image: number[][], cell: number[], rows: number, cols: number) : boolean {
  const [row, col] = cell;

  // ocean (0, 10) or already checked (11)
  if(image[row][col] !== 1) return false;

  // new island found, mark all relevant cells as visited
  image[row][col] += 10;
  const queue = [cell];
  while(queue.length > 0) {
    const curr = queue.shift();

    const neighbors = findNeighbors(curr, rows, cols);
    for(const n of neighbors) {
      const [r, c] = n;
      if(image[r][c] !== 1) continue;
      image[r][c] += 10;
      queue.push(n);
    }
  }

  return true;
}

// time: O(1) space O(1)
function findNeighbors(cell: number[], rows: number, cols: number): number[][] {
  const rOffset = [    -1,   
                    0,      0,
                        1    ];
  const cOffset = [     0,    
                   -1,      1,
                        0    ];

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
