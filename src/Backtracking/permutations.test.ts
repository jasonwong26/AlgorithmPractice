// https://algo.monster/problems/permutations

describe.skip("Permutations of an array", () => {
  it("scenario 1", () => {
    const input = ["a", "b"];
    const output = permutations(input);

    const expected = ["ab", "ba"];
    const expectedFormatted = expected.map(e => e.split(""));
    expect(output.sort()).toEqual(expectedFormatted.sort());
  });
  it("scenario 2", () => {
    const input = ["a", "b", "c"];
    const output = permutations(input);

    const expected = ["abc", "acb", "bac", "bca", "cab", "cba"];
    const expectedFormatted = expected.map(e => e.split(""));
    expect(output.sort()).toEqual(expectedFormatted.sort());
  });
});

// time: O(log(n!)) space O(n!)
function permutations(letters: string[]) {
  const output = [];
  const used = new Set<number>();
  permutationsB([], output, letters, used, 0);
  
  return output;
}
function permutationsB(current: string[], output: string[][], letters: string[], used: Set<number>, depth: number) {
  //console.log({current, output, used, depth});
  
  if(current.length === letters.length) {
      output.push([...current]);
      return;
  }
  
  for(let i = 0; i < letters.length; i++) {
      // letter already used
      if(used.has(i)) continue;
      
      const letter = letters[i];
      current.push(letter);
      used.add(i);
      permutationsB(current, output, letters, used, depth + 1);
      
      // remove from current
      current.pop();
      used.delete(i);
  }    
}