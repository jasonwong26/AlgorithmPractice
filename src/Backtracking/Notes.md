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

When you want to test all possible permutations:
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
