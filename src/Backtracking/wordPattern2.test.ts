// https://algo.monster/problems/word_pattern_ii

describe("Word Pattern 2", () => {
  it("scenario 1", () => {
     const pattern = "aaaa";
     const s = "asdasdasdasd";

     const output = wordPatternMatch(pattern, s);

     const expected = true
     expect(output).toEqual(expected);
  });
  it("scenario 2", () => {
    const pattern = "aabb";
    const s = "xyzabcxzyabc";

    const output = wordPatternMatch(pattern, s);

    const expected = false
    expect(output).toEqual(expected);
 });
 it("scenario 3", () => {
  const pattern = "abab";
  const s = "redblueredblue";

  const output = wordPatternMatch(pattern, s);

  const expected = true
  expect(output).toEqual(expected);
});
});

function wordPatternMatch(pattern: string, s: string) {
  const isMatch = backtrack(s, pattern);
  
  return isMatch;
}

function backtrack(s: string, pattern: string, map: Record<string, string> = {}, index = 0, depth = 0): boolean {
  // match found
  if(s === "") return true;

  const key = pattern.substring(index, index + 1);
  const value = map[key];

  // pattern one: expand current pattern definition
  if(!value) {
    for(let n = 1; n < s.length; n++) {
      map[key] = s.substring(0, n);
      
      if(backtrack(s, pattern, map, index, depth + 1)) return true;

      map[key] = null;
    }  

    // path 2: pattern matches, check next pattern
  } else {
    const expected = map[key];
    if(!s.startsWith(expected)) return false;

    const remainder = s.substring(expected.length);
    if (backtrack(remainder, pattern, map, index + 1, depth + 1)) return true;
  }
    
  return false;
}
