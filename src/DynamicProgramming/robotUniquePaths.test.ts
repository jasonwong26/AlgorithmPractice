//https://algo.monster/problems/robot_unique_path

describe.skip("Robot Unique Paths", () => {
  it("scenario 1", () => {
    const [m, n] = [3, 2];
    const count = uniquePaths(m, n);

    const expected = 3;
    expect(count).toEqual(expected);
  });
  it("scenario 2", () => {
    const [m, n] = [7, 3];
    const count = uniquePaths(m, n);

    const expected = 28;
    expect(count).toEqual(expected);
  });
  it("scenario 3", () => {
    const [m, n] = [1, 1];
    const count = uniquePaths(m, n);

    const expected = 1;
    expect(count).toEqual(expected);
  });
  
  it("scenario 4", () => {
    const [m, n] = [10, 5];
    const count = uniquePaths(m, n);

    const expected = 715;
    expect(count).toEqual(expected);
  });
});

function uniquePaths(m: number, n: number): number {
  let cache = new Array(n).fill(1);
  
  for (let row = 1; row < m; row++) {
      const curr = [];
      
      for(let col = 0; col < n; col++) {
          const leftPaths = curr[col - 1] ?? 0;
          const upPaths = cache[col];
          curr.push(leftPaths + upPaths);
      }
      
      cache = curr;
  }
  
  return cache[n-1];
}