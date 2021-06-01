// https://algo.monster/problems/word_break

describe.skip("Break Word", () => {
  it("scenario 1", () => {
     const s = "algomonster";
     const list = "go mons alter".split(" ");

     const output = wordBreak(s, list);

     const expected = false;
     expect(output).toEqual(expected);
  });
  it("scenario 2", () => {
    const s = "abcd";
    const list = "a abc b cd".split(" ");

    const output = wordBreak(s, list);

    const expected = true;
    expect(output).toEqual(expected);
  });
  it("scenario 3", () => {
  const s = "aaaaaab";
  const list = "a aa aaab".split(" ");

  const output = wordBreak(s, list);

  const expected = true;
  expect(output).toEqual(expected);
  });
  it("scenario 4", () => {
    const s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab";
    const list = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]
        
    const output = wordBreak(s, list);
  
    const expected = false;
    expect(output).toEqual(expected);
    });
});

function wordBreak(s: string, words: string[]) {
  //return memo("", s, words, 0);
  //return memo2(0, s, words, 0);
  return memoizedBackTrack(0, s, words);
}

/*
memo stores:
- key: index in target string compared to words collection
- value: true: a word exists that can match that index, false: no words exist that match.

This is used to avoid re-solving a sub-problem (in this case identifying when there is no matching word and there is no point in proceeding further down a stack)
see this video for details: https://www.youtube.com/watch?v=1U4jQusbeJc (minute 7)

example problem:

'abcdefgh'
['ab', 'cd', 'abcd', 'h']

*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function memoizedBackTrack(index: number, target: string, words: string[], guess = "", memo: Map<number, boolean> = new Map(), depth = 0) {
//  console.log({index, guess, depth});
  
  if(index === target.length) return true;

  const memoVal = memo.get(index);
  if (memoVal != undefined) {
    // console.log("found in memo:", {index, memoVal, depth});
    return memoVal;
  }

  for (const w of words) {
    const partial = target.substring(index, index + w.length);
    if(w !== partial) continue;

    if(memoizedBackTrack(index + w.length, target, words, w, memo, depth + 1)) {
      // console.log("match found, adding to memo:", {index, memoVal: true, depth});
      // memo.set(index, false); -- NOTE: Never used
      return true;
    }
  }

  // console.log("no match found, adding to memo:", {index, memoVal: false, depth});
  memo.set(index, false);
  return false;
}
