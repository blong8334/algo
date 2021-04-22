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

class Queue {
  constructor(size) {
    this.size = size;
    this.queue = new Array(size);
    this.front = null;
    this.back = null;
  }
  length() {
    if (this.front === null) {
      return 0;
    }
    if (this.front <= this.back) {
      return this.back - this.front + 1;
    }
    return this.back + 1 + this.size - this.front;
  }
  enqueue(item) {
    if (this.front === null) {
      this.queue[0] = item;
      this.front = this.back = 0;
      return;
    }
    let nextSpot = this.back + 1;
    if (nextSpot === this.size) {
      nextSpot = 0;
    }
    if (nextSpot === this.front) {
      throw new Error('Queue is full');
    }
    this.queue[nextSpot] = item;
    this.back = nextSpot;
  }
  dequeue() {
    if (this.front === null) {
      return;
    }
    if (this.front === this.back) {
      const item = this.queue[this.front];
      this.front = this.back = null;
      return item;
    }
    let nextSpot = this.front + 1;
    if (nextSpot === this.size) {
      nextSpot = 0;
    }
    const item = this.queue[this.front];
    this.front = nextSpot;
    return item;
  }
}

module.exports = {
  fillArray,
  isSortedAsc: isSorted.bind(null, (a, b) => a < b),
  isSortedDesc: isSorted.bind(null, (a, b) => a > b),
  logArrayStats,
  swap,
  Queue,
};