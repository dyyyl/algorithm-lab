/**
 * Lil scratchpad for the funsies
 */
import { BinarySearchTree } from "./src/BinarySearchTree/index.js";
import { VALUES } from "./src/CONSTANTS.js";

const tree = new BinarySearchTree();

VALUES.forEach((value) => tree.insert(value));

tree.remove(6);

console.log(tree.breadthFirstTraversal());
