// https://algo.monster/problems/palindrome_partitioning

describe.skip("Palindrome Partitioning", () => {
  it("scenario 1", () => {
    const input = "aab";
    const output = [];
    partition(input, output);

    const expected = [["aa", "b"], ["a", "a", "b"]];
    expect(output.sort()).toEqual(expected.sort());
  });
  it("scenario 2", () => {
    const input = "aba";
    const output = [];
    partition(input, output);

    const expected = [["aba"], ["a", "b", "a"]];
    expect(output.sort()).toEqual(expected.sort());
  });
});

// time: O(log(n!)) space O(n!)
function partition(input: string, output: string[][], current: string[] = [], depth = 0) {
  //console.log("call ", {depth, input, current, output});
  // match found
  if(input.length === 0) {
    output.push([...current]);
    return;
  }
  
  for(let i = 1; i <= input.length; i++) {
      // check if palindrome
      const value = input.substring(0, i);
      const remaining = input.substring(i);
      const isValid = isPalindrome(value);
      //console.log("validate ", {depth, value, isValid, remaining});
      if(!isValid) continue;
      
      // palindrome found, proceed
      current.push(value);
      partition(remaining, output, current, depth + 1);
      current.pop();
  }
}

function isPalindrome(input: string) {
  let i = 0;
  let n = input.length - 1;
  
  while(i < n) {
      if(input[i] !== input[n]) return false;
      
      i++;
      n--;
  }
  
  return true;
}