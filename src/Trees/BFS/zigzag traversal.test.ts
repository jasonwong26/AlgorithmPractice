// https://algo.monster/problems/binary_tree_zig_zag_traversal

import { TreeNode, buildTree, splitWords } from "./shared";

describe.skip("zig zag traversal", () => {
  it("scenario 1", () => {
    const input = "1 2 4 x 7 x x 5 x 8 x x 3 x 6 x x";
    const root = buildTree(splitWords(input)[Symbol.iterator](), parseInt);
    const output = zigZagTraversal(root);

    const expected = [[1], [3, 2], [4, 5, 6], [8, 7]];
    expect(output).toEqual(expected);
  });
});


function zigZagTraversal(root) {
  if(!root) return [];
  
  const queue: TreeNode[] = [root, null];
  
  const output: number[][] = [];
  let readLeftToRight = true;
  let row = [];
  while(queue.length > 0) {
    const curr = queue.shift();
    // end of row
    if(!curr) {
        // append row to output
        if(queue.length > 0) queue.push(null);

        if(!readLeftToRight) row.reverse()
        output.push(row);
        readLeftToRight = !readLeftToRight;
        row = [];            
        continue;
    }
    
    row.push(curr.val);
    if(curr.left) queue.push(curr.left);
    if(curr.right) queue.push(curr.right);
  }
  
  return output;  
}