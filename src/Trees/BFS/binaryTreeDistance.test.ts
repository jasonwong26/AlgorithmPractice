// https://algo.monster/problems/binary_tree_distance_k_nodes

import { TreeNode, buildTree, splitWords } from "./shared";

describe.skip("binaryTreeDistance", () => {
  it("scenario 1", () => {
    const input = "1 2 4 x 7 x x 5 x 8 x x 3 x 6 x x";
    const root = buildTree(splitWords(input)[Symbol.iterator](), parseInt);
    const target = findNodeByValue(root, 6);
    const output = binaryTreeDistance(root, target, 1);

    const forComparison = output.map(node => node.val).sort();
    const expected = [2, 3, 7, 8];

    expect(forComparison).toEqual(expected);
  });
  it("scenario 2", () => {
    const input = "0 1 x x 2 x x";
    const root = buildTree(splitWords(input)[Symbol.iterator](), parseInt);
    const target = findNodeByValue(root, 2);
    const output = binaryTreeDistance(root, target, 0);

    const forComparison = output.map(node => node.val).sort();
    const expected = [1, 2];
    expect(forComparison).toEqual(expected);
  });
});


function binaryTreeDistance(root: TreeNode, target: TreeNode, k: number): TreeNode[] {
  if(!root || !target) return [];

  const queue: TreeNode[] = [root, null];
  const rows: Map<number, TreeNode[]> = new Map();
  let depth = 0;
  let targetDepth = -1;
  let row: TreeNode[] = [];

  while(queue.length > 0 && (targetDepth === -1 || depth <= targetDepth + k)) {
    const curr = queue.shift();
    // end of row
    if(!curr) {
      if(queue.length > 0) queue.push(null);

      rows.set(depth, row);

      row = []
      depth++;
      continue;
    }

    row.push(curr);
    if(curr === target) {
      targetDepth = depth;
    };

    if(curr.left) queue.push(curr.left);
    if(curr.right) queue.push(curr.right);
  }

  if(targetDepth === -1) return [];
  
  if(k === 0) return rows.get(targetDepth);

  let output: TreeNode[] = [];
  const prevRow = rows.get(targetDepth - k);
  if(prevRow) output = output.concat(prevRow);
  const nextRow = rows.get(targetDepth + k);
  if(nextRow) output = output.concat(nextRow);
  return output;
}

function findNodeByValue(root: TreeNode, val: number): TreeNode {
  if(!root) return null;
  if(root.val == val) return root;
  
  return findNodeByValue(root.left, val) || findNodeByValue(root.right, val);
}