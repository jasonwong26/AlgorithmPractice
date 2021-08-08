## Quick Sort

### Workflow
1. Calculate possible Partition Index
1. Call Partition function to find actual partition index
1. Recurse to smaller subset
1. When you get to 2 elements, determine whether to swap them

#### Partition Function
1. Find starter partition index, call this `pivot`
1. Swap `pivot` and rightmost element.
1. use 2 runners: `left` and `right`
  1. if leftVal <= partition increase `left`
  1. otherwise swap left and right elements, decrease `right`
1. At end: set `boundary` variable: if leftVal < pVal then `left + 1`, else `left`
1. Swap `pivot` back to correct place

## Merge Sort

### Workflow
1. Break array into left right halves, Recurse down to 2 elements
1. Order the two elements
1. Run Merge function to combine left right halves.
1. Repeat until all recursion layers called.

#### Merge Function
1. Params: `array`, `lBound`, `midpoint`, `rBound`, `tempArray`
1. Create/reset temp array
1. use two runners: `left` and `right`;
1. 3x loops:
   1. While left and right runners are in bound, compare the values and push the lower to the temp array
   1. Once all left values are used, push remaining right values to temp array.
   1. Once all right values are used, push remaining left values to temp array.
1. Copy sorted temp array back to original array.

## Hash Map

### Tips
1. Pick a prime number for the number of buckets in the storage array.
1. Find the appropriate bucket by calling the modulus function on the hash value `hash % array.size`;
1. Use `Array.from({length: size}, () => [])` to initialize array of empty arrays matching desired size.

#### Hash Function
1. convert input to string, 
   1. include type of input for better results (e.g. object, number, string, etc.)
1. set `hash` to 0;
1. loop over key string, extract ansi code values `charCodeAt(index)`;
1. add to Hash
  1. Include a bitshift to represent index of character to avoid collisions between similar words, eg. `god` `dog`
1. OPTIONAL: Add a meaningless bitshift to force it into 32bit format.