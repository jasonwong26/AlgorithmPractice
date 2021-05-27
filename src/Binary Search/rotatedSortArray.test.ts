// https://algo.monster/problems/min_in_rotated_sorted_array

describe.skip("rotated sorted array", () => {
  it("scenario 1", () => {
    const arr = [30, 40, 50, 10, 20];
    const index = findMinRotated(arr);

    const expected = 3;
    expect(index).toEqual(expected);
  });
  it("scenario 2", () => {
    const arr = [1, 2, 3, 4, 5];
    const index = findMinRotated(arr);

    const expected = 0;
    expect(index).toEqual(expected);
  });
  it("scenario 3", () => {
    const arr = [0];
    const index = findMinRotated(arr);

    const expected = 0;
    expect(index).toEqual(expected);
  });
});

// time: O(log(n)) space O(1)
function findMinRotated(arr: number[]) {
  if(!arr) return -1;
  
  let left = 0;
  let right = arr.length - 1;
  let boundary = 0;
  const maxVal = arr[right];

  while (left <= right) {
    const mid = left + Math.trunc((right - left) / 2);
    const val = arr[mid];

    if(val <= maxVal) {
      boundary = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return boundary;
}

// time: O(n) space O(1)
function findMinRotatedLinear(arr: number[]) {
  if(!arr) return -1;
  
  let prev = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];

    if(val < prev) return i;
    prev = val;
  }

  return 0;
}