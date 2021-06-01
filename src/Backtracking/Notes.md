Backtracking
=====

## Three steps to conquer combinatorial search problems

- Identify the state(s).
- Draw the state-space tree.
- DFS/backtrack on the state-space tree.

### Identify the state(s)
We need to answer the following questions:

1. What state do we need to know whether we have reached a solution (and using it to construct a solution if the problem asks for it). In the above permutation example, we need to keep track of the letters we have already selected when we do DFS.
1. What state do we need to decide which child nodes should be visited next and which ones should be pruned.

### Draw the state-space tree


## Altorithm Templates

### test all possible permutations:
```
/*
 current: current value being constructed
 output:  output collection
 letters: possible letters
 used: used to track which letters have been used.  NOTE: uses Set based on index to account for multiple entries of the same letter
 depth: stack depth
*/
function permutationsB(current: string[], output: string[][], letters: string[], used: Set<number>, depth: number) {
  //console.log({current, output, used, depth});
  
  if(current.length === letters.length) {
      output.push([...current]);
      return;
  }
  
  for(let i = 0; i < letters.length; i++) {
      // letter already used
      if(used.has(i)) continue;
      
      const letter = letters[i];
      current.push(letter);
      used.add(i);
      permutationsB(current, output, letters, used, depth + 1);
      
      // remove from current
      current.pop();
      used.delete(i);
  }    
}
```

### Count Permutations
identify # of ways to parse a string of integers representing letters:
- example: "123" => [1, 2, 3], [12, 3], [1, 23] => ["ABC", "LC", "AW"]

```
/*
 index: current index
 digits:  string to process
 depth: stack depth (not needed to output result)
 display: representation of permutation (not needed to output result)
*/
function memoParse(index: number, digits: string, depth = 0, display: number[] = []) {
  console.log("call", {index, depth, display});
  if(index === digits.length) return 1;
  
  if(memo[index] != undefined) 
      return memo[index];

  const offsets = [1, 2];
  let sum = 0;
  for (const o of offsets) {
      if(index + o > digits.length) continue;
      
      const key = digits.substring(index, index + o);
      const val = parseInt(key);
      
      if(val < 1 || val > 26) continue;
      display.push(val);
      const recurseVal = memoParse(index + o, digits, memo, depth + 1, display);
      sum += recurseVal;
      display.pop();
  }
  
  //console.log("output:", {index, sum, depth});
  memo[index] = sum;
  return sum;
}
```

## Memoization

Steps to leverage memoization:

1. Identify what the memo data structure should look like.
1. 

```
/*
memo stores:
- key: index in target string compared to words collection
- value: true: words collection contains a combination that results in string matching target.substring(index, {end of string}). (NOTE: not used in example below)
        false: no combination exists in words collection.

Existence of a memo === false, acts as a shortcut to prevent recalculation steps.
      
*/

function memo_example(index: number, target: string, words: string[], memo: Map<number, boolean> = new Map(), depth = 0) {
  // backtrack step: stop if satisfied
  if(index === target.length) return true;

  // memoization step: retrieve memo if one exists. (Note use of `!= undefined` to retrieve both true and false values)
  const memoVal = memo.get(index);
  if (memoVal != undefined) {
    return memoVal;
  }

  // backtrack step: loop over possible next nodes
  for (const w of words) {
    const partial = target.substring(index, index + w.length);
    if(w !== partial) continue;

    // backtrack step: recursive call
    if(memoizedBackTrack(index + w.length, target, words, w, memo, depth + 1)) {
      // memoization step: add result to memo.  NOTE: some problems only leverage memoization in specific cases.
      // console.log("match found, adding to memo:", {index, memoVal: true, depth});
      // memo.set(index, false); -- NOTE: Never used in this algorithm
      return true;
    }
  }

  // memoization step: add result to memo.
  // console.log("no match found, adding to memo:", {index, memoVal: false, depth});
  memo.set(index, false);
  return false;
}


```