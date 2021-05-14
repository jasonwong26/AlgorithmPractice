// https://algo.monster/problems/word_ladder

describe.skip("Word Ladder", () => {
  it("scenario 1", () => {
    const start = "COLD"
    const end = "WARM"
    const wordList = ["COLD", "GOLD", "CORD", "SOLD", "CARD", "WARD", "WARM", "TARD"]
    const output = wordLadder(start, end, wordList);

    const expected = 4;
    expect(output).toEqual(expected);
  });
});

// time: O(n^2 + |V|*|E|) space: O(|V|*|E|)
function wordLadder(begin: string, end: string, wordList: string[]): number {
  const adjList = buildAdjacencyList(wordList);

  const visited = new Set<string>();
  const queue = [begin];
  let distance = 0;
  while (queue.length > 0) {
    const length = queue.length;
    for(let i = 0; i < length; i++) {
      const curr = queue.shift();

      // result found
      if(curr === end) return distance;

      // continue search
      const neighbors = adjList.get(curr);
      for(let node of neighbors) {
        if(visited.has(node)) continue;
        visited.add(node);
        queue.push(node);
      }
    }

    // increase distance
    distance++;
  }

  return -1;
}

// time: O(n^2) space: O(|V|*|E|)
function buildAdjacencyList(wordList: string[]): Map<string,string[]>
{
  const output = new Map<string,string[]>();

  for(var i = 0; i < wordList.length; i++) {
    const set = [];
    for(var n = 0; n < wordList.length; n++) {
      if(n == i) continue;
      if(!isNeighbor(wordList[i], wordList[n])) continue;
      set.push(wordList[n]);
    }

    output.set(wordList[i], set);
  }

  return output;
}

// time: O(n) space: O(1)
function isNeighbor(wordA: string, wordB: string): boolean {
  const charsA = wordA.split("");
  const charsB = wordB.split("");

  if(charsA.length !== charsB.length) return false;

  let different = 0;
  for(let i = 0; i < charsA.length; i++) {
    if(charsA[i] === charsB[i]) continue;
    different++;
  }

  return different === 1;
}
