// https://algo.monster/problems/letter_combinations_of_phone_number

describe.skip("Letter Combinations of Phone Number", () => {
  it("scenario 1", () => {
    const input = "56";
    const output = letterCombinationsOfPhoneNumber(input);

    const expected = "jm jn jo km kn ko lm ln lo".split(" ");
    expect(output.sort()).toEqual(expected.sort());
  });
  it("scenario 2", () => {
    const input = "235";
    const output = letterCombinationsOfPhoneNumber(input);

    const expected = "adj adk adl aej aek ael afj afk afl bdj bdk bdl bej bek bel bfj bfk bfl cdj cdk cdl cej cek cel cfj cfk cfl".split(" ");
    expect(output.sort()).toEqual(expected.sort());
  });
});

// time: O(log(n!)) space O(n!)
function letterCombinationsOfPhoneNumber(digits: string) {
  const output = [];
  const map = new Map<string, string[]>();
  map.set("2", "abc".split(""));
  map.set("3", "def".split(""));
  map.set("4", "ghi".split(""));
  map.set("5", "jkl".split(""));
  map.set("6", "mno".split(""));
  map.set("7", "pqrs".split(""));
  map.set("8", "tuv".split(""));
  map.set("9", "wxyz".split(""));
  
  backtrack(0, digits.split(""), [], output, map, 0);
  
  return output.map(o => o.join(""));
}

function backtrack(index: number, input: string[], current: string[], output: string[][], options: Map<string, string[]>, depth: number) {
  if(index === input.length) {
      output.push([...current]);
      return;
  }
  
  const key = input[index];
  const letters = options.get(key);
  
  for(let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      current.push(letter);
      
      backtrack(index + 1, input, current, output, options, depth + 1);
      
      current.pop();
  }
}