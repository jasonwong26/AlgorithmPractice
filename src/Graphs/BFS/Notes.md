BFS for Graphs
======

# Optimization: combine steps: build adjacency list, perform search
For some problems (such as the word ladder) you can identify neighbors without prebuilding an adjacency list.
In this example, you can generate loop over the alphabet and replace single characters with each possible value.
Useful when dealing extremely large sets as this would be a smaller test case than looping over the full set.

