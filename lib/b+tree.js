class Node {
  constructor(n, type) {
    this.type = type;
    this.length = n * 2 - 1;
    this.arr = new Array(n * 2 - 1);
  }
  checkIfAllValuesAreLess(value) {
    for (let i = this.arr.length - 2; i >= 0; i -= 2) {
      if (!this.arr[i]) {
        continue;
      }
      return this.arr[i] < value;
    }
  }
  findValue(value) {
    let index = -1;
    let result = null;
    for (let i = 1; i < this.arr.length; i += 2) {
      if (this.arr[i] === value) {
        index = i;
        result = this.arr[i];
        break;
      }
    }
    return { index, result };
  }
  findLeastValue(value) {
    let index = -1;
    let result = null;
    for (let i = 1; i < this.arr.length; i += 2) {
      if (value <= this.arr[i]) {
        index = i;
        result = this.arr[i];
        break;
      }
    }
    return { index, result };
  }
  findLastNonNullPointer() {
    let index = -1;
    let result = null;
    for (let i = this.arr.length - 1; i >= 0; i -= 2) {
      if (this.arr[i]) {
        index = i;
        result = this.arr[i];
        break;
      }
    }
    return { index, result };
  }
}

class B_Plus_Tree {
  constructor(n) {
    this.root = new Node(n, 'root');
  }
  search(value) {
    let currentNode = this.root;
    while (currentNode.type !== 'leaf') {
      const { index, result } = currentNode.findLeastValue(value);
      if (index < 0) {
        currentNode = currentNode.findLastNonNullPointer().result;
      } else {
        currentNode = currentNode[index - 1];
      }
    }
    if (currentNode.checkIfAllValuesAreLess(value)) {
      currentNode = currentNode[currentNode.length - 1];
    }
    return currentNode.findValue(value).result;
  }
  insert(value) {
    // find the leaf where if would go
  }
}

module.exports = {
  B_Plus_Tree,
};