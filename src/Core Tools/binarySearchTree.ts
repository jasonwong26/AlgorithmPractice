
interface BstNode {
  val: unknown,
  parent?: BstNode,
  left?: BstNode,
  right?: BstNode
}

interface IBinarySearchTree<T> {
  add: (value: T) => void,
  inOrder: () => T[]
}

export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  _root: BstNode | null;
  _size: number;

  constructor() {
    this._root = null;
    this._size = 0;
  }

  add = (value: T) => {
    const node: BstNode = {
      val: value
    }

    if(this._size === 0) {
      this._root = node
      this._size++;
      return;
    }

    let loop = true;
    let parent = this._root;
    while(loop) {
      if(parent.val <= node.val && parent.right) {
        parent = parent.right;
        continue;
      }
      if(parent.val <= node.val) {
        parent.right = node;
        loop = false;
      }
      if(parent.val > node.val && parent.left) {
        parent = parent.left;
        continue;
      }
      if(parent.val > node.val) {
        parent.left = node;
        loop = false;
      }
    }

    node.parent = parent;
    this._size++; 
  }

  inOrder = (): T[] => {
    const output = [];

    const inOrder = (curr: BstNode, output: unknown[]) => {
      if(!curr) return;
  
      inOrder(curr.left, output);
      output.push(curr.val);
      inOrder(curr.right, output);
    }

    inOrder(this._root, output);

    return output;
  }
}