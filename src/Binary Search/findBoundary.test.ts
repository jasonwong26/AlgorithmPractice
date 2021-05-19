// https://algo.monster/problems/binary_search_boundary

describe.skip("Find Boundary", () => {
  it("scenario 1", () => {
    const arr = [false, false, true, true, true];
    const isValid = findBoundary2(arr);

    const expected = 2;
    expect(isValid).toEqual(expected);
  });
  it("scenario 2", () => {
    const arr = [true];
    const isValid = findBoundary2(arr);

    const expected = 0;
    expect(isValid).toEqual(expected);
  });
  it("scenario 3", () => {
    const arr = [false, false, false];
    const isValid = findBoundary2(arr);

    const expected = -1;
    expect(isValid).toEqual(expected);
  });
  it("scenario 4", () => {
    const arr = [true, true, true, true];
    const isValid = findBoundary2(arr);

    const expected = 0;
    expect(isValid).toEqual(expected);
  });
  it("scenario 5", () => {
    const arr = [false, true];
    const isValid = findBoundary2(arr);

    const expected = 1;
    expect(isValid).toEqual(expected);
  });
});

// time: O(log(n)) space O(1)
function findBoundary(arr: boolean[]): number {
  if(!arr) return -1;
  
  let left = 0;
  let right = arr.length - 1;
  while(left <= right) {
      const guess = makeGuess(left, right);
      const value = arr[guess];
      
      if(value && (guess === 0 || !arr[guess - 1])) return guess;
      
      if(!value) {
          left = guess + 1;
      } else {
          right = guess - 1;
      }
  }    
  
  return -1;
}

function makeGuess(lBound: number, uBound: number): number {
  return Math.trunc((uBound - lBound) / 2) + lBound;
}

// time: O(log(n)) space O(1)
function findBoundary2(arr: boolean[]): number {
  if(!arr) return -1;
  
  let left = 0;
  let right = arr.length - 1;
  let boundary = -1; // cache boundary line
  while(left <= right) {
      const guess = makeGuess(left, right);
      const value = arr[guess];
      
      if(value) {
        boundary = guess;
        right = guess - 1;
      } else {
          left = guess + 1;
      }
  }    
  
  return boundary;
}