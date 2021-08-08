import { BinarySearchTree } from "./binarySearchTree";

describe.skip("BinarySearchTree", () => {
  
  it("sorts integers correctly", () => {
    const input = [5, 3, 4, 8, 6, 0, 2, 7, 9, 1];
    const tree = new BinarySearchTree();

    for(let i of input) {
      tree.add(i);
    }

    const output = tree.inOrder();

    expect(output).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
  it("sorts strings correctly", () => {
    const input = ["e", "a", "g", "h", "b", "d", "f", "c"];

    const tree = new BinarySearchTree();

    for(let i of input) {
      tree.add(i);
    }

    const output = tree.inOrder();

    expect(output).toEqual(["a", "b", "c", "d", "e", "f", "g", "h"]);
  });
});
