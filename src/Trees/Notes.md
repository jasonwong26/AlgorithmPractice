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

#### Problems
check if a tree exists as a subtree in another ([example](https://leetcode.com/problems/subtree-of-another-tree/)).

### Recurse and sum results
A method that first recursively calls itself, then aggregates the results

#### Use for:
- pulling data up a tree

#### Problems
Sum of Nodes with Even-Valued Grandparent ([link](https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/))
> Given a binary tree, return the sum of values of nodes with even-valued grandparent.  (A grandparent of a node is the parent of its parent, if it exists.)
```
function sumEvenGrandparent(root: TreeNode | null): number {
    return calcEvenGrandparent2(root, null, null);
};
const calcEvenGrandparent2 = (curr: TreeNode | null, parentVal: number | null, grandVal: number | null): number => {
    if(curr == null) return 0;

    const sumLeft = calcEvenGrandparent2(curr.left, curr.val, parentVal);
    const sumRight = calcEvenGrandparent2(curr.right, curr.val, parentVal);    
    const sumSelf = grandVal && grandVal % 2 === 0 ? curr.val : 0;
    
    return sumLeft + sumRight + sumSelf;        
}
```

### stack of nodes
This allows one to traverse a tree in an iterative fashion.

initialize:
- Create a stack
- populate it with a root and all left children

use:
- pop from stack
- add immediate right child to stack, and all left children of that node
- return result

#### Use for:
- reading part of a binary tree

#### Problems
Binary Search Tree Iterator ([link](https://leetcode.com/problems/binary-search-tree-iterator/))
```
class BSTIterator {
    stack: TreeNode[]
    position: 0;
    
    constructor(root: TreeNode | null) {
        this.stack = [];
        this.position = 0;
        
        this.buildStack(this.stack, root);
    }
    private buildStack = (stack: TreeNode[], root: TreeNode | null): void => {
        let curr = root;
        while(curr) {
            stack.push(curr);
            curr = curr.left;
        }
    }

    next(): number {
        if(this.stack.length === 0) throw new Error();
        
        const root = this.stack.pop();
        this.buildStack(this.stack, root.right);
        
        return root.val;
    }

    hasNext(): boolean {
        return this.stack.length > 0;
    }
}
```