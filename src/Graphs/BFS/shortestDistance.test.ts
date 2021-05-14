// https://algo.monster/problems/shortest_path_unweight

describe.skip("graph Shortest Distance", () => {
  it("scenario 1", () => {
    const input = {
      0: [1, 2],
      1: [0, 2, 3],
      2: [0, 1],
      3: [1]
    };
    const output = shortestDistance(input, 0, 3);

    const expected = 2;
    expect(output).toEqual(expected);
  });
});


function shortestDistance(graph: {[key: number]: number[] }, nodeA: number, nodeB: number): number {
  if(!graph) return -1;
  if(!graph[nodeA] || !graph[nodeB]) return -1;

  const visited = new Set<number>();
  const queue = [nodeA, null];
  let distance = 0;
  while(queue.length > 0) {
    const curr = queue.shift();
    if(curr == null) {
      if(queue.length > 0) queue.push(null);

      distance++;
      continue;
    }

    // mark as visited
    visited.add(curr);

    // result found
    if(curr === nodeB) return distance;

    // continue search
    const neighbors = graph[curr];
    for(let node of neighbors) {
      // already visited, skip
      if(visited.has(node)) continue;

      // add to search queue
      queue.push(node);
    }
  }

  // edge case: no path found
  return - 1;
}
