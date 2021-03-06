const crypto = require('crypto');

function generateId(length = 16) {
  return crypto.randomBytes(16).toString("hex");
}
function logArrayStats(n) {
  const logN = Math.log2(n);
  console.log('logN', logN);
  console.log('n', n);
  console.log('nlogn', logN * n);
  console.log('n^2', Math.pow(n, 2));
}

function swap(arr, idx1, idx2) {
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function isSorted(cf, arr) {
  for (let i = 1; i < arr.length; i++) {
    if (cf(arr[i], arr[i - 1])) {
      throw new Error(`Array is not sorted, ${i} is less than ${i - 1}`);
    }
  }
  console.log('Array is sorted');
  return true;
}

function fillArray(count, lower, upper, isInt) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    let number = Math.random() * (upper - lower + 1) + lower;
    if (isInt) number = Math.floor(number);
    arr.push(number);
  }
  return arr;
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
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

class Queue {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  enqueue(value) {
    this.length++;
    const entry = {
      value,
      previous: null,
    };
    if (this.tail) {
      this.tail.previous = entry;
    }
    this.tail = entry;
    if (this.length === 1) {
      this.head = entry;
    }
  }
  dequeue() {
    if (!this.length) {
      return;
    }
    const entry = this.head;
    this.head = entry.previous;
    this.length--;
    return entry.value;
  }
}

module.exports = {
  fillArray,
  isSortedAsc: isSorted.bind(null, (a, b) => a < b),
  isSortedDesc: isSorted.bind(null, (a, b) => a > b),
  logArrayStats,
  swap,
  Queue,
  LinkedList,
  generateId,
};