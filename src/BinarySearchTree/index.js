import { Node } from "../Node/index.js";

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * Takes a value and inserts it into the tree.
   * @param {number} value - Value to be inserted into the tree.
   */
  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
    } else {
      let current = this.root;

      while (true) {
        if (value === current.value) {
          throw new Error("Value already exists in tree.");
        }
        // if the value is greater than the current node's value
        if (value > current.value) {
          // and there is no right node present,
          if (current.right === null) {
            current.right = new Node(value); // insert the value as the right node
            break;
          } else {
            current = current.right; // otherwise, append the new right node to root
          }
        } // if the value is less than the current node's value
        else if (value < current.value) {
          // and there is no left node present,
          if (current.left === null) {
            current.left = new Node(value); // insert the value as the left node
            break;
          } else {
            current = current.left; // otherwise, append the new left node to root
          }
        }
      }
    }
  }

  /**
   * Takes a value to find in the tree, Binary-Search style.
   * @param {number} value - Value to be found into the tree.
   */
  find(value) {
    const traverse = (node) => {
      // nullcheck for style (exit criteria)
      if (node === null || node.value === value) {
        return node;
      }
      // otherwise, do a binary search
      else if (value < node.value) {
        return traverse(node.left);
      } else {
        return traverse(node.right);
      }
    };

    return traverse(this.root);
  }

  /**
   * Takes a value to find in the tree, Binary-Search style.
   * @param {boolean} value - Is it there? Is it not? Let's find out!
   */
  contains(value) {
    return Boolean(this.find(value));
  }

  /**
   * Get minimum node value from the tree.
   * @param {Node} node - Node to start the search from. (defaults to root)
   *
   * @returns {number} - Minimum node value.
   */
  getMinimumNodeValue(node = this.root) {
    // Literally just iterate through the tree until you find the leftmost node.
    while (node.left) {
      node = node.left;
    }

    return node.value;
  }

  /**
   * Get maximum node value from the tree.
   * @param {Node} node - Node to start the search from. (defaults to root)
   *
   * @returns {number} - Maximum node value.
   */
  getMaximumNodeValue(node = this.root) {
    // Literally just iterate through the tree until you find the rightmost node.
    while (node.right) {
      node = node.right;
    }

    return node.value;
  }

  /**
   * Finds and returns the height of the tree.
   *
   * @param {*} root the root node of the tree
   * @returns height of the tree
   */
  getHeight(root = this.root) {
    /**
     * Recursive function to find the height of the tree.
     * @param {Node} node - Node to start the search from. (defaults to root)
     *
     * @returns {number} - Height of the tree.
     */
    const height = (node) => {
      // nullcheck for style
      if (node === null) {
        return 0;
      }

      // recursively call the function on the left and right nodes to find the height of each
      const leftHeight = height(node.left);
      const rightHeight = height(node.right);

      // return the greater of the two heights, plus one for the current node
      return 1 + Math.max(leftHeight, rightHeight);
    };

    return height(root);
  }

  /**
   * Takes a value and removes it from the tree.
   * @param {number} value - Value to be removed from the tree.
   * @param {Node} node - Node to start the search from. (defaults to root)
   *
   * @returns {Node} - The removed node.
   */
  remove(value, node = this.root) {
    // Cheeky null check
    if (!node) {
      return null;
    }
    // If the value is less than the current node's value
    else if (value < node.value) {
      // set the current node's left node to the result of the recursive call
      node.left = this.remove(value, node.left);
    }
    // alternatively, if the value is greater than the current node's value
    else if (value > node.value) {
      // set the current node's right node to the result of the recursive call
      node.right = this.remove(value, node.right);
    } else {
      // if the value is equal to the current node's value,
      if (!node.left) {
        // and if there is no left node, return the right node...
        return node.right;
      } else if (!node.right) {
        // or if there is no right node, return the left node
        return node.left;
      } else {
        // otherwise, set the current node's value to the minimum value of the right node
        node.value = this.getMinimumNodeValue(node.right);
        // and set the current node's right node to the result of the recursive call
        node.right = this.remove(node.value, node.right);
      }
    }

    // finally, return the current node
    return node;
  }

  /**
   * Traverses the tree in breadth-first order, beginning at the root.
   *
   * @returns {Array<number>} - Array of values in the tree by breadth from root.
   */
  breadthFirstTraversal() {
    let result = []; // initialize array of resulting values
    let queue = [this.root]; // initialize queue with root node

    while (queue.length > 0) {
      let node = queue.shift(); // dequeue the first node and store its value

      result.push(node.value);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    return result;
  }

  /**
   * Depth first (preorder) search utilizing recursion.
   * Lists the vertices in the order that they were first visited by the algorithm (root, left, right).
   *
   * Steps:
   * 1. Visit the root node.
   * 2. Recursively traverse the current node's left subtree.
   * 3. Recursively traverse the current node's right subtree.
   *
   * @param {Node} process - Callback to apply to node. Defaults as console.log.
   */
  preOrderTraversal(process = console.log) {
    const preOrder = (node) => {
      process.call(this, node);

      if (node.left !== null) {
        preOrder(node.left); // if there's a left node, recurse on it
      }

      if (node.right !== null) {
        preOrder(node.right); // if there's a right node, recurse on it next
      }
    };

    preOrder(this.root); // start the recursion at the root, where it should.
  }

  /**
   * Depth first (in-order) search utilizing recursion.
   * Lists the vertices in the non-decreasing order that they were first visited by the algorithm (left, root, right).
   *
   * Steps:
   * 1. Recursively traverse the current node's left subtree.
   * 2. Visit the root node.
   * 3. Recursively traverse the current node's right subtree.
   *
   * param {Node} process - Callback to apply to node. Defaults as console.log.
   */
  inOrderTraversal(process = console.log) {
    const inOrder = (node) => {
      if (node.left !== null) {
        inOrder(node.left); // if there's a left node, recurse on it
      }

      process.call(this, node); // otherwise, process the node

      if (node.right !== null) {
        inOrder(node.right); // if there's a right node, queitly proceed recursion
      }
    };

    inOrder(this.root); // recurse on the root
  }

  /**
   * Depth first (postorder) search utilizing recursion.
   * Lists the vertices in the order that they were last visited by the algorithm (left, right, root).
   *
   * Steps:
   * 1. Recursively traverse the current node's left subtree.
   * 2. Recursively traverse the current node's right subtree.
   * 3. Visit the root node.
   *
   * param {Node} process - Callback to apply to node. Defaults as console.log.
   */
  postOrderTraversal(process = console.log) {
    const postOrder = (node) => {
      if (node.left !== null) {
        postOrder(node.left); // if there's a left node, recurse on it
      }

      if (node.right !== null) {
        postOrder(node.right); // if there's a right node, recurse on it next
      }

      process.call(this, node);
    };

    postOrder(this.root); // finally, recurse on the root
  }
}
