export const quickSort = (arr: unknown[]): void => {
  if (!arr || arr.length < 2) return;

  internalQs(arr, 0, arr.length - 1);
};
const internalQs = (arr: unknown[], lBound: number, rBound: number): void => {
  if (lBound >= rBound) return;
  if (rBound - lBound === 1) {
    if (arr[lBound] <= arr[rBound]) return;

    swap(arr, lBound, rBound);
    return;
  }

  const midPoint = partition(arr, lBound, rBound);
  internalQs(arr, lBound, midPoint);
  internalQs(arr, midPoint, rBound);
};
const partition = (arr, lBound, rBound) => {
  const p = findPartition(lBound, rBound);
  const pVal = arr[p];

  swap(arr, p, rBound);
  let l = lBound;
  let r = rBound - 1;
  while (l < r) {
    const lVal = arr[l];

    if (lVal <= pVal) {
      l++;
    } else {
      swap(arr, l, r);
      r--;
    }
  }

  let boundary = arr[l] < pVal ? l + 1 : l;
  swap(arr, boundary, rBound);

  return boundary;
};
const findPartition = (lIndex: number, rIndex: number): number => {
  return Math.floor((lIndex + rIndex) / 2);
};
const swap = (arr: unknown[], lIndex: number, rIndex: number): void => {
  const temp = arr[lIndex];
  arr[lIndex] = arr[rIndex];
  arr[rIndex] = temp;
};
