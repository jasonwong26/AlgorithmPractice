# Trees
-----

## Terms

- Balanced: depth of subtrees do not vary more than X (may be 0, may be a greater value)
- Unbalanced: does not meet definition of Balanced tree
- Full: All nodes with at least one child has both children (no null nodes in the middle of the tree)
- Complete: each depth of the tree is completely full (no null nodes)

## Traversals
- InOrder: left, parent, right
- PreOrder: parent, left, right
- PostOrder: left, right, parent

## Tips
Tree traversals are often recursive in nature.
If pulling data up the tree - recurse first then analyze.
If pulling data down the tree - act first then recurse.

Many problems require closely analyzing the relationship of the current node to its immediate children.

If memory space is an issue, use iterative approach instead of recursive.  This is rarely faster, but generally uses less memory.
Iterative approach requires either a Stack or Queue.



## Approaches
### Traverse, Convert, Analyze
Traverse tree using one of the traversal approaches to convert to a different data structure (such as an ordered array).
#### Use for:
- comparing trees

## Problems
check if a tree exists as a subtree in another ([example](https://leetcode.com/problems/subtree-of-another-tree/)).
