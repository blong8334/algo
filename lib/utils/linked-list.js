class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SingleLinkedList {
  constructor(name) {
    this.name = name;
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  add(item) {
    const node = new Node(item);
    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    return this;
  }
  merge(list2, mergeFn) {
    let currentNode = list2.head;
    while (currentNode) {
      mergeFn(currentNode.value);
      this.add(currentNode.value);
      currentNode = currentNode.next;
    }
    return this;
  }
}

module.exports = {
  SingleLinkedList,
};