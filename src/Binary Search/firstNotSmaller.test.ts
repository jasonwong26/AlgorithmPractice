// https://algo.monster/problems/binary_search_first_element_not_smaller_than_target


describe.skip("First Element not smaller", () => {
  it("scenario 1", () => {
    const arr = [1, 3, 3, 5, 8, 8, 10];
    const target = 2;
    const isValid = firstNotSmaller(arr, target);

    const expected = 1;
    expect(isValid).toEqual(expected);
  });
  it("scenario 2", () => {
    const arr = [0];
    const target = 0;
    const isValid = firstNotSmaller(arr, target);

    const expected = 0;
    expect(isValid).toEqual(expected);
  });
  it("scenario 3", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const target = 10;
    const isValid = firstNotSmaller(arr, target);

    const expected = 9;
    expect(isValid).toEqual(expected);
  });
  it("scenario 4", () => {
    const arr = [1, 1, 1, 1, 4, 5];
    const target = 3;
    const isValid = firstNotSmaller(arr, target);

    const expected = 4;
    expect(isValid).toEqual(expected);
  });
  it("scenario 5", () => {
    const arr = [1, 1, 1, 1, 4, 5];
    const target = 6;
    const isValid = firstNotSmaller(arr, target);

    const expected = -1;
    expect(isValid).toEqual(expected);
  });
});

// time: O(log(n)) space O(1)
function firstNotSmaller(arr: number[], target: number) : number {
  if(!arr) return -1;
  
  let left = 0;
  let right = arr.length - 1;
  let boundary = -1;
  
  while(left <= right) {
      const mid = left + Math.trunc((right - left) / 2);
      const val = arr[mid];
      
      if(val >= target) {
          boundary = mid;
          right = mid - 1;
      } else {
          left = mid + 1;
      }
  }
  
  return boundary;
}
