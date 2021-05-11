
// https://algo.monster/problems/binary_tree_min_depth

import { TreeNode, buildTree, splitWords } from "./shared";

describe.skip("shallowestLeaf", () => {
  it("scenario 1", () => {
    const input = "1 2 4 x 7 x x 5 x x 3 x 6 x x";
    const root = buildTree(splitWords(input)[Symbol.iterator](), parseInt);
    const output = shallowestLeaf(root);

    const expected = 2;
    expect(output).toEqual(expected);
  });
});


function shallowestLeaf(root: TreeNode): number {
  if(!root) return -1;

  const queue: TreeNode[] = [root, null];
  let depth = 0;
  while(queue.length > 0) {
    const curr = queue.shift();
    // end of row
    if(!curr) {
      if(queue.length > 0) queue.push(null);
      depth++;
      continue;
    }

    if(!curr.left && !curr.right) {
      return depth;
    }

    if(curr.left) queue.push(curr.left);
    if(curr.right) queue.push(curr.right);
  }

  return -1;
}
