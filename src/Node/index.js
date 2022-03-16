export class Node {
  /**
   * Just a harmless lil Node constructor
   *
   * @param {number} value - The value of the node.
   * @param {*} left
   * @param {*} right
   */
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
