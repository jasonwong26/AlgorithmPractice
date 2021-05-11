// https://algo.monster/problems/binary_tree_right_side_view

import { TreeNode, buildTree, splitWords } from "./shared";

describe.skip("right side view", () => {
  it("scenario 1", () => {
    const input = "1 2 4 x 7 x x 5 x x 3 x 6 x x";
    const root = buildTree(splitWords(input)[Symbol.iterator](), parseInt);
    const output = rightSideView(root);

    const expected = [1, 3, 6, 7];
    expect(output).toEqual(expected);
  });
});


function rightSideView(root: TreeNode): number[] {
  if(!root) return [];

  const queue: TreeNode[] = [root, null];
  const output: number[] = [];
  let lastVal: number;
  while(queue.length > 0) {
    const curr = queue.shift();

    if(!curr) {
      if(queue.length > 0) queue.push(null);
      output.push(lastVal);
      continue;
    }

    lastVal = curr.val;
    if(curr.left) queue.push(curr.left);
    if(curr.right) queue.push(curr.right);
  }

  return output;
}