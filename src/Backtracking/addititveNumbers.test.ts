// https://leetcode.com/problems/additive-number/submissions/

describe.skip("Additive Numbers", () => {
  it("scenario 1", () => {
    const input = "111";
    const output = isAdditiveNumber(input);

    const expected = false;
    expect(output).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = "000";
    const output = isAdditiveNumber(input);

    const expected = true;
    expect(output).toEqual(expected);
  });
  it("scenario 3", () => {
    const input = "112358";
    const output = isAdditiveNumber(input);

    const expected = true;
    expect(output).toEqual(expected);
  });
  it("scenario 4", () => {
    const input = "199100199";
    const output = isAdditiveNumber(input);

    const expected = true;
    expect(output).toEqual(expected);
  });
});

function isAdditiveNumber(num: string): boolean {
  //return setup(num);
  return setup2(num);
};

// My solution
/*

Results:
- broke problem into 2 steps
- Had TONS of issues handling the 'cannot begin with a zero' edge case
- not manipulating the string value made this MUCH harder to implement.  Next time just make new strings!
- Missed optimizations where we can limit loop for setup step
*/

// time: O(n^2), space: O(1)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setup(num: string): boolean {
  for (let i = 0; i < num.length - 2; i++) {
      // edge case: value cannot start w/ zero
      if(num[0] === "0" && i > 0) continue;
      const firstVal = parseInt(num.substring(0, i + 1));
      for(let n = i + 1; n < num.length - 1; n++) {
          // edge case: value cannot start w/ zero
          if(num[i + 1] === "0" && n > i + 1) continue;
          const secondVal = parseInt(num.substring(i + 1, n + 1));
          
          const firstElements = [firstVal, secondVal];
          //console.log("setup: ", {i, n, firstElements, remaining: num.substring(n + 1)});
          if(isAdditive(n + 1, num, firstElements)) return true;            
      }
  }
  
  return false;
}

// time: O(n), space: (1)
function isAdditive(index: number, num: string, previousResults: number[], depth = 0) {
  //console.log("called: ", {depth, index, previousResults});

  // valid state found
  if(index === num.length) return true;
  
  // normal case: testing remaining n elements
  let valEnd = index + 1;
  let val = parseInt(num.substring(index, valEnd));
  const prevSum = previousResults[0] + previousResults[1];
  while (val < prevSum && valEnd <= num.length) {
      valEnd++;
      val = parseInt(num.substring(index, valEnd));
      
      // edge case: value cannot start w/ zero
      if(num[index] === "0") return false;
  }
  if(val !== prevSum) return false;
  return isAdditive(valEnd, num, [previousResults[1], val], depth + 1);    
}

// END: my solution


// Better solution
/*

Notes:
- simpler implementation of 2nd step (note use of two parameters than array parameter)
- adjustment of i, n variables by 1 to eliminate + 1 modifiers
- simpler implementation by creating new strings as needed.
*/

function setup2(num: string): boolean {
  const length = num.length;
  const iRBound = (length - 1) / 2;
  for (let i = 1; i <= iRBound; i++) {
    // edge case: cannot lead with zero
    if(i > 1 && num[0] === "0") break;

    for(let n = i + 1; length - n >= n - i && length - n >= i; n++) {
      // edge case: cannot lead with zero
      if(n > i + 1 && num[i] === "0") break;

      const value1 = parseInt(num.substring(0, i));
      const value2 = parseInt(num.substring(i, n));
      const remaining = num.substring(n);

      if(isAdditive2(remaining, value1, value2)) return true;
    }
  }

  return false;
}

function isAdditive2(num: string, prevVal: number, lastVal: number): boolean {
  if(!num) return true; // end reached

  const sum = prevVal + lastVal;
  const sumString = sum.toString();
  if(!num.startsWith(sumString)) return false;

  const nextNum = num.substring(sumString.length);
  return isAdditive2(nextNum, lastVal, sum);
}