import { VALUES } from "../CONSTANTS.js";
import { BinarySearchTree } from ".";

describe("BinarySearchTree", () => {
  let tree;

  beforeEach(() => {
    tree = new BinarySearchTree();

    VALUES.forEach((value) => tree.insert(value));
  });

  it("can insert a value into the tree", () => {
    expect(tree.root.value).toBe(10);
    expect(tree.root.left.value).toBe(6);
    expect(tree.root.right.value).toBe(18);
  });

  it("can find a value in the tree", () => {
    const sixNode = tree.find(6);
    const twentyTwoNode = tree.find(22);

    expect(sixNode.value).toBe(6);
    expect(twentyTwoNode).toBe(null);
  });

  it("can tell you wheter or not a value may be found within the tree", () => {
    expect(tree.contains(6)).toBe(true);
    expect(tree.contains(22)).toBe(false);
  });

  it("can get the minimum node in the tree", () => {
    expect(tree.getMinimumNodeValue()).toBe(4);
  });

  it("can get the maximum node in the tree", () => {
    expect(tree.getMaximumNodeValue()).toBe(21);
  });

  it("can remove a node from the tree", () => {
    tree.remove(6);
    tree.remove(44); // should not remove anything
    const expected = [10, 8, 18, 4, 15, 21];

    const sixNode = tree.find(6);
    const breadthFirst = tree.breadthFirstTraversal();

    expect(sixNode).toBe(null);
    expect(breadthFirst).toEqual(expected);
  });

  it("can tell you its height", () => {
    const expectedHeight = 3;

    const height = tree.getHeight();

    expect(height).toBe(expectedHeight);
  });

  it("can tell you whether it is balanced", () => {
    const expectedBalanced = true;

    const balanced = tree.isBalanced();

    expect(balanced).toBe(expectedBalanced);
  });

  it("can tell you whether it is unbalanced", () => {
    const expectedUnbalanced = false;
    tree.insert(44);

    const unbalanced = tree.isBalanced();

    expect(unbalanced).toBe(expectedUnbalanced);
  });
});
