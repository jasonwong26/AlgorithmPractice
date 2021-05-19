# Binary Search

## Binary Search Template
use left and right pointers
set guess = midpoint between pointers
tighten search by moving pointers closer together
- value < target, increment left pointer
- value > target, decrement right pointer
- end loop when left > right
if target found, return
otherwise, set relevant pointer to guess +/- 1

```
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
```

## Using Binary Search to find a boundary
example: `[false, false, false, true, true, true]`
Use Binary Search Template, but add a caching variable `boundary`.
This variable is updated each time the right side of the boundary is found.
We still want to reduce the left & right pointers the same way.
The search will settle around the boundary, but the left/right pointers may be swapped.
the caching variable will ALWAYS be the closest index of the right side of the boundary.

> This technique is useful for lots of search problems.
> Convert the search criteria to a boolean value, then find boundary.

Examples:
- Find 1st element >= to target value
- Find 1st element in array w/ duplicates
- Calculate rough Square Root of a number

### IMPORTANT NOTE
The boundary index can be set to be on either left or right side of the boundary.
Choose which side makes sense for the problem.
For example:
- when calculating rough square root, it makes sense to use left side of the boundary.
- when calculating first element that matches a criteria, use right side of the boundary.
