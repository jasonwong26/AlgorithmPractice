interface INode {
  val: number,
  left: INode,
  right: INode
}
export class TreeNode implements INode {
  val: number;
  left: TreeNode;
  right: TreeNode;

  constructor(val: number, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
  }
}

export function buildTree(nodes: Iterator<string>, f: (s: string) => number): INode {
  const val = nodes.next().value;
  if (val === "x") return null;
  const left = buildTree(nodes, f);
  const right = buildTree(nodes, f);
  return new TreeNode(f(val), left, right);
}

export function splitWords(s: string): string[]  {
  return s == "" ? [] : s.split(" ");
}
