// https://algo.monster/problems/sqrt


describe("First Element not smaller", () => {
  it("scenario 1", () => {
    const input = 10;
    const isValid = squareRoot(input);

    const expected = 3;
    expect(isValid).toEqual(expected);
  });
});

// time: O(log(n)) space O(1)
function squareRoot(n: number) {
  if(n < 1) return 0;
  
  let left = 0;
  let right = n;
  let boundary = 0;
  
  while(left <= right) {
     const mid = left + Math.trunc((right - left) / 2);
     const val = Math.pow(mid, 2);
     
     if(val <= n) {
         boundary = mid;
         left = mid + 1;
     } else {
        right = mid - 1;
     }        
  }
  
  return boundary;
}

