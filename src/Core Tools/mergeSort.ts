export const mergeSort = (arr: unknown[]): void => { 
  if(!arr || arr.length < 2) return;

  internalMergeSort(arr, 0, arr.length - 1);
}

const internalMergeSort = (arr: unknown[], lBound: number, rBound: number, temp = []) => {
  if(rBound - lBound < 1) return;

  if(rBound - lBound < 2) {
    const lVal = arr[lBound];
    const rVal = arr[rBound];

    if(lVal > rVal) swap(arr, lBound, rBound);
    return;
  }

  const mid = findMidPoint(lBound, rBound);
  internalMergeSort(arr, lBound, mid, temp);
  internalMergeSort(arr, mid, rBound, temp);
  merge(arr, lBound, mid, rBound, temp);
}

const merge = (arr: unknown[], lBound: number, mid: number, rBound: number, temp = []) => {
  temp.length = 0;
  
  let l = lBound;
  let r = mid;

  while(l < mid && r <= rBound) {
    const lVal = arr[l];
    const rVal = arr[r];
    
    if(lVal < rVal) {
      temp.push(lVal);
      l++;
    } else {
      temp.push(rVal);
      r++;
    }
  }

  while (l < mid && r > rBound) {
    const lVal = arr[l];
    temp.push(lVal)
    l++;
  }
  while (l >= mid && r <= rBound) {
    const rVal = arr[r];
    temp.push(rVal);
    r++;
  }

  for(let i = 0; i < temp.length; i++) {
    const index = lBound + i;
    arr[index] = temp[i];
  }
}

const findMidPoint = (lIndex: number, rIndex: number) => {
  return Math.floor((lIndex + rIndex) / 2);
}

const swap = (arr: unknown[], lIndex: number, rIndex: number) => {
  const temp = arr[lIndex];
  arr[lIndex] = arr[rIndex];
  arr[rIndex] = temp;
}