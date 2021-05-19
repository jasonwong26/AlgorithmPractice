// https://algo.monster/problems/binary_search_intro

describe.skip("Binary Search Template", () => {
  it("scenario 1", () => {
    const arr = [1,3,5,7,8];
    const target = 5;
    const isValid = binarySearch(arr, target);

    const expected = 2;
    expect(isValid).toEqual(expected);
  });
  it("scenario 2", () => {
    const arr = [1,2,3,4,5,6,7];
    const target = 0;
    const isValid = binarySearch(arr, target);

    const expected = -1;
    expect(isValid).toEqual(expected);
  });
  it("scenario 3", () => {
    const arr = [2, 8, 89, 120, 1000];
    const target = 120;
    const isValid = binarySearch(arr, target);

    const expected = 3;
    expect(isValid).toEqual(expected);
  });
});

// time: O(log(n)) space O(1)
function binarySearch(arr: number[], target: number): number {
  if(!arr) return -1;
  
  let lBound = 0;
  let uBound = arr.length - 1;
  while(lBound <= uBound) {
      const guess = makeGuess(lBound, uBound);
      const value = arr[guess];
      if(value === target) return guess;
      
      if(value < target) {
          lBound = guess + 1;
      } else {
          uBound = guess - 1;
      }        
  }
  
  return -1;
}

function makeGuess(lBound: number, uBound: number): number {
  return Math.trunc((uBound - lBound) / 2) + lBound;
}
