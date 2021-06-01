// https://algo.monster/problems/decode_ways

describe.skip("Decode Ways", () => {
  it("scenario 1", () => {
     const input = "12";

     const output = decodeWays(input);

     const expected = 2;
     expect(output).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = "123";

    const output = decodeWays(input);

    const expected = 3;
   expect(output).toEqual(expected);
  });
  it("scenario 3", () => {
    const input = "11223";

    const output = decodeWays(input);

    const expected = 8;
    expect(output).toEqual(expected);
  });
});

function decodeWays(digits: string) {
  return memoParse(0, digits);
}

/*
memo:
- key: index
- value: count of ways to parse 
*/

function memoParse(index: number, digits: string, memo: Record<number,number> = {}, depth = 0, display: number[] = []) {
  //console.log("call", {index, count, depth, display});
  if(index === digits.length) return 1;
  
  if(memo[index] != undefined) 
      return memo[index];

  const offsets = [1, 2];
  let sum = 0;
  for (const o of offsets) {
      if(index + o > digits.length) continue;
      
      const key = digits.substring(index, index + o);
      const val = parseInt(key);
      
      if(val < 1 || val > 26) continue;
      display.push(val);
      const recurseVal = memoParse(index + o, digits, memo, depth + 1, display);
      sum += recurseVal;
      display.pop();
  }
  
  //console.log("output:", {index, sum, depth});
  memo[index] = sum;
  return sum;
}