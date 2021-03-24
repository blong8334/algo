class Node {
  constructor(key) {
    this.key = key;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.buildIterations = 0;
  }
  addNode(node) {
    if (!this.root) {
      this.root = node;
      this.buildIterations = 1;
      return;
    }
    let currentNode = this.root;
    while (true) {
      this.buildIterations++;
      if (currentNode.key <= node.key) {
        if (!currentNode.rightChild) {
          currentNode.rightChild = node;
          node.parent = currentNode;
          return;
        }
        currentNode = currentNode.rightChild;
      } else {
        if (!currentNode.leftChild) {
          currentNode.leftChild = node;
          node.parent = currentNode;
          return;
        }
        currentNode = currentNode.leftChild;
      }
    }
  }
  traverse(currentNode, results) {
    if (!currentNode) {
      currentNode = this.root;
    }
    if (!results) results = [];
    if (currentNode.leftChild) {
      this.traverse(currentNode.leftChild, results);
    }
    results.push(currentNode.key);
    if (currentNode.rightChild) {
      this.traverse(currentNode.rightChild, results);
    }
    return results;
  }
  maxHeight(node) {
    if (!node) node = this.root;
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.leftChild) {
      leftHeight = this.maxHeight(node.leftChild) || 0;
    } if (node.rightChild) {
      rightHeight = this.maxHeight(node.rightChild) || 0;
    }
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
  }
}

function binaryTree(arr) {
  const bst = new BinarySearchTree();
  for (let i = 0; i < arr.length; i++) {
    bst.addNode(new Node(arr[i]));
  }
  console.log('BUILD ITERATIONS', bst.buildIterations);
  return bst;
}

module.exports = {
  binaryTree,
};