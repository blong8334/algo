const RED = 'red';
const BLACK = 'black';

function isLeftChild(parent, child) {
  return child.key <= parent.key;
}
function isNodeRoot(node) {
  return node.parent === null;
}

function getAncestor(node, levels) {
  let ancestor = node;
  while (levels--) {
    ancestor = ancestor.parent;
  }
  return ancestor;
}

function getUncle(grandparent, parent) {
  if (isLeftChild(grandparent, parent)) return grandparent.rightChild;
  return grandparent.leftChild;
}

class Node {
  constructor(key, color, fake) {
    this.key = key;
    this.color = color;
    this.parent = null;
    this.leftChild = fake;
    this.rightChild = fake;
    this.subtreeSize = this.key ? 1 : 0;
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
    this.fake = new Node(null, BLACK, null);
    this.buildIterations = 0;
  }
  addNode(key) {
    if (!this.root) {
      this.root = new Node(key, BLACK, this.fake);
      this.fake.parent = this.root;
      this.buildIterations = 1;
      return;
    }
    const node = new Node(key, RED, this.fake);
    let currentNode = this.root;
    while (true) {
      this.buildIterations++;
      if (currentNode.key < node.key) {
        if (!currentNode.rightChild.key) {
          return this.setNode(currentNode, node, 'rightChild');
        }
        currentNode = currentNode.rightChild;
      } else {
        if (!currentNode.leftChild.key) {
          return this.setNode(currentNode, node, 'leftChild');
        }
        currentNode = currentNode.leftChild;
      }
    }
  }
  setNode(parent, node, childName) {
    parent[childName] = node;
    node.parent = parent;
    this.updateSubtreeSizes(parent);
    if (node.parent.color === RED) {
      this.balanceTree(node);
    }
  }
  updateSubtreeSizes(parent) {
    while (parent) {
      parent.subtreeSize += 1;
      parent = parent.parent;
    }
  }
  balanceTree(node) {
    this.buildIterations++;
    if (isNodeRoot(node)) {
      node.color = BLACK;
      return;
    }
    if (node.color !== RED || node.parent.color !== RED) {
      return;
    }
    const parent = getAncestor(node, 1);
    const grandparent = getAncestor(parent, 1);
    const uncle = getUncle(grandparent, parent);
    if (uncle.color === RED) {
      return this.case1(grandparent, parent, uncle);
    }
    if (isLeftChild(grandparent, parent) && !isLeftChild(parent, node)) {
      return this.case2('leftChild', 'rightChild', grandparent, parent, node);
    }
    if (!isLeftChild(grandparent, parent) && isLeftChild(parent, node)) {
      return this.case2('rightChild', 'leftChild', grandparent, parent, node);
    }
    if (isLeftChild(grandparent, parent)) {
      return this.case3('leftChild', 'rightChild', grandparent, parent);
    }
    return this.case3('rightChild', 'leftChild', grandparent, parent);
  }
  case1(grandparent, parent, uncle) {
    grandparent.color = RED;
    parent.color = BLACK;
    uncle.color = BLACK;
    return this.balanceTree(grandparent);
  }
  case2(child1Name, child2Name, grandparent, parent, node) {
    grandparent[child1Name] = node;
    node.parent = grandparent;
    parent[child2Name] = node[child1Name];
    parent[child2Name].parent = parent;
    node[child1Name] = parent;
    parent.parent = node;
    parent.subtreeSize = parent.leftChild.subtreeSize + parent.rightChild.subtreeSize + 1;
    node.subtreeSize = node.leftChild.subtreeSize + node.rightChild.subtreeSize + 1;
    return this.balanceTree(grandparent[child1Name][child1Name]);
  }
  case3(child1Name, child2Name, grandparent, parent) {
    parent.parent = grandparent.parent;
    if (parent.parent) {
      if (isLeftChild(parent.parent, parent)) parent.parent.leftChild = parent;
      else parent.parent.rightChild = parent;
    } else {
      this.root = parent;
    }
    grandparent[child1Name] = parent[child2Name];
    grandparent[child1Name].parent = grandparent;
    parent[child2Name] = grandparent;
    grandparent.parent = parent;
    parent.color = BLACK;
    grandparent.color = RED;
    grandparent.subtreeSize =
      grandparent.leftChild.subtreeSize + grandparent.rightChild.subtreeSize + 1;
    parent.subtreeSize =
      parent.leftChild.subtreeSize + parent.rightChild.subtreeSize + 1;
  }
  traverse(currentNode, results) {
    if (!currentNode) {
      currentNode = this.root;
      isRoot = true;
    }
    if (!results) results = [];
    if (currentNode.leftChild.key !== null) {
      this.traverse(currentNode.leftChild, results);
    }
    results.push(currentNode.key);
    if (currentNode.rightChild.key !== null) {
      this.traverse(currentNode.rightChild, results);
    }
    return results;
  }
  maxHeight(node) {
    if (!node) node = this.root;
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.leftChild.key !== null) {
      leftHeight = this.maxHeight(node.leftChild) || 0;
    } if (node.rightChild.key !== null) {
      rightHeight = this.maxHeight(node.rightChild) || 0;
    }
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
  }
  returnRank(number) {
    // only count left if we are coming from right. 
    let currentNode = this.root;
    while (true) {
      if (currentNode.key === number) break;
      if (currentNode.key === null) return -1;
      if (number < currentNode.key) currentNode = currentNode.leftChild;
      else currentNode = currentNode.rightChild;
    }
    let countLeft = true;
    let rank = 0;
    while (currentNode) {
      countLeft && (rank += 1 + currentNode.leftChild.subtreeSize);
      countLeft = currentNode.parent && (currentNode.key >= currentNode.parent.key);
      currentNode = currentNode.parent;
    }
    return rank;
  }
}

function redBlackTree(arr) {
  const rbt = new RedBlackTree();
  for (let i = 0; i < arr.length; i++) {
    rbt.addNode(arr[i]);
  }
  console.log('RBT BUILD ITERATIONS', rbt.buildIterations);
  return rbt;
}

module.exports = {
  redBlackTree,
};