// https://leetcode.com/problems/validate-binary-search-tree/

import { TreeNode, buildTree, splitWords } from "./bfs/shared";

describe.skip("binaryTreeDistance", () => {
  it("scenario 1", () => {
    const input = "3 1 0 x x 2 x x 5 4 x x 6 x x";
    const root = buildTree(splitWords(input)[Symbol.iterator](), parseInt);
    const output = isValidBST(root);

    expect(output).toEqual(true);
  });
  it("scenario 2", () => {
    const input = "5 1 x x 4 3 x x 6 x x";
    const root = buildTree(splitWords(input)[Symbol.iterator](), parseInt);
    const output = isValidBST(root);

    expect(output).toEqual(false);
  });
});

/*
NOTES:
- struggled to wrap my head around the problem (recursing up is just calling the recursing method first!
- struggled with aggregation logic (required multiple approaches to lock down behaviors).  Need to think /plan things through MORE before starting to code.

Ultimately this COULD be solved from top down.  I just didn't think it through enough.
*/

function isValidBST(root: TreeNode | null): boolean {
  //    if(root == null) return false;
  //    const result = bottomUp(root);
  //    return result.isValid;
      
      return topDown(root);
  };
  
  function topDown(root: TreeNode | null, min = -Infinity, max = Infinity): boolean {
      if(root == null) return true;
      
      if(root.val <= min || root.val >= max) return false;
      
      return topDown(root.left, min, root.val) && topDown(root.right, root.val, max);
  }
  
  interface Result {
      isValid: boolean,
      max?: number,
      min?: number
  }
  
  function bottomUp(root: TreeNode | null, depth = 0): Result {
      if(root == null)
          return { 
              isValid: true,
              max: null,
              min: null
          };
      
      const left = bottomUp(root.left, depth + 1);
      const right = bottomUp(root.right, depth + 1);
      
      const isValid = left.isValid && 
                      right.isValid &&
                      (left.max ?? -Infinity) < root.val &&
                      (right.min ?? Infinity) > root.val;
      
      const vals = [root.val, left.max, left.min, right.max, right.min].filter(x => !!x);
      const max = vals.reduce((output, current) => output = current > output ? current : output, root.val);
      const min = vals.reduce((output, current) => output = current < output ? current : output, root.val);
      
      //console.log({depth, vals, isValid, max, min});
          
      return {
          isValid,
          max,
          min
      }
  }
