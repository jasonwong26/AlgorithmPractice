// https://algo.monster/problems/subarray_sum

describe.skip("subArraySum", () => {
  it("scenario 1", () => {
     const array = [1, 3, -3, 8, 5, 7];
     const target = 5;
     const output = subarraySum(array, target);

     const expected = [2, 4];
     expect(output).toEqual(expected);
  });
});

function subarraySum(arr: number[], target: number):number[] {
  const prefixSums = new Map([[0, 0]]);
  let curSum = 0;
  for (let i = 0; i < arr.length; i++) {
      curSum += arr[i];
      const complement = curSum - target;
      if (prefixSums.has(complement)) {
          return [prefixSums.get(complement), i + 1];
      }
      prefixSums.set(curSum, i + 1);
  }

  throw new Error("answer not found!");
}

// https://algo.monster/problems/subarray_sum_divisible
describe.skip("subarraySumDivisible", () => {
  it("scenario 1", () => {
     const array = [3, 1, 2, 5, 1];
     const k = 3;

     let output = subarraySumDivisible(array, k);

     const expected = 6;
     expect(output).toEqual(expected);
  });
  it("scenario 1 using wrong key", () => {
    const array = [3, 1, 2, 5, 1];
    const k = 3;

    let output = subarraySumDivisibleBad(array, k);

    const expected = 6;
    expect(output).not.toEqual(expected);
 });
});

function subarraySumDivisible(nums: number[], k:number): number {
  const map = new Map();
  map.set(0,1);
  
  let count = 0;
  let currSum = 0;
  for(let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    const key = currSum % k;
    const correlary = (k - key) % k;
    count += map.get(correlary) || 0;

    if(!map.has(correlary)) {
        map.set(correlary, 1);           
    } else {
        let curr = map.get(correlary);
        map.set(correlary, curr + 1);
    }
  }

  return count;
}

function subarraySumDivisibleBad(nums: number[], k:number): number {
  const map = new Map();
  map.set(0,1);
  
  let count = 0;
  let currSum = 0;
  for(let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    // a + b == k ==> key + correlary == k
    const key = currSum % k;
    const correlary = (k - key) % k;
    count += map.get(correlary) || 0; // note inconsistency in which value is used for key (correlary)

    if(!map.has(key)) {
        map.set(key, 1); // note inconsistency in which value is used for key (key)          
    } else {
        let curr = map.get(key);
        map.set(key, curr + 1);
    }
  }

  return count;
}