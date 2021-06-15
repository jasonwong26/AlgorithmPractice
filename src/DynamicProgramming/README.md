# Dynamic Programming
-----

Look for problems where:
- the result is the aggregate of smaller sub-problems.
- the sub-problems are dependent on each other.
  - Example: Fibonacci, Google maps (route from San Diego => San Franciso can be solved as San Diego => Los Angeles => San Francisco)

Two types of DP
- Top Down: recursive approach that adds a data cache.  The goal is to avoid re-calculating the same step multiple times
- Bottom Up: solve smaller problems first, then use those to solve larger problems
  - Example: Fibonacci

Very easy to mistake DP for backtracking or DFS problems.  Maybe think of this as an optimization on top of these??

## Examples using Fibonnaci sequence
**Naive Recursion approach**
```
// Time: O(2^n) Space: O(n)
const fibonaive = n => {
 if (n == 0 || n == 1) {
   return n;
 }
 
 return fibonaive(n - 1) + fibonaive(n - 2);
};
```
**Top Down approach**
```
// Time: O(n) Space: O(n)
const fibDown = (n, memo=[]) => {
if (n == 0 || n == 1) {
           return n;
     }
     if (memo[n] == undefined) {
           memo[n] = fibDown(n - 1, memo) + fibDown(n - 2, memo);
     }
     return memo[n];
}
```

Note the use of the `memo` array for storing values once calculated.
Time is reduced to linear due to eliminating redundent calls.
Space remains linear due to recursive approach.

**Bottom Up approach**
```
// Time: O(n) Space: O(1)
const fibottomUp = n => {
if (n === 0) {
           return 0;
     }
     let x = 0;
     let y = 1;
     for (let i = 2; i < n; i++) {
           let tmp = x + y;
           x = y;
           y = tmp;
     }
     return x + y;
}
```
Time is reduced to linear due to eliminating redundent calls by referencing prior results.
Space becomse constant due to use of loop and just 2 prior calculation variables.

## When to use
- The problems is about optimal way to play a game.
- Calculating number of ways to do something. This is often well-suited for a top-down approach.
- Partitioning a collection into into sub-sequences so that certain condition is met. This is often well-suited for a top-down approach.
- The problem asks for the maximum/longest, minimal/shortest value/cost/profit you can get from doing operations on a sequence.
- You've tried greedy but it sometimes it gives the wrong solution. This often means you have to consider subproblems for an optimal solution.


TODO: complete problem - https://leetcode.com/problems/predict-the-winner/solution/

## How to do

1. Identify that it is a DP problem
1. Find the recurrence relation 
1. ???
1. profit!