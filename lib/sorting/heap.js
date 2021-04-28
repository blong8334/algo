const { swap } = require('../utils');

const maxCompare = (el1, el2) => el1 > el2;
const minCompare = (el1, el2) => el1 < el2;

function heapify(compareFn, arr, upTo = arr.length) {
  for (let i = 1; i < upTo; i++) {
    checkOrSwap(arr, i, compareFn);
  }
}

function sortHeap(compareFn, heap) {
  let end = heap.length - 1;
  while (end) {
    swap(heap, 0, end);
    moveDown(heap, end, compareFn);
    end -= 1;
  }
}

function moveDown(heap, end, compareFn) {
  let idx = 0;
  while (true) {
    let compareChild;
    const l = getLeftChildIdx(idx);
    const r = getRightChildIdx(idx);
    if (l >= end) return;
    if (r >= end) compareChild = l;
    else compareChild = compareFn(heap[l], heap[r]) ? l : r;
    if (compareFn(heap[idx], heap[compareChild])) {
      return;
    }
    swap(heap, idx, compareChild);
    idx = compareChild;
  }
}

function checkOrSwap(arr, i, compareFn) {
  let parentIdx = getParentIdx(i);
  while (i) {
    if (compareFn(arr[i], arr[parentIdx])) {
      swap(arr, parentIdx, i);
      i = parentIdx;
      parentIdx = getParentIdx(i);
    } else {
      return;
    }
  }
}

function getLeftChildIdx(idx) {
  return idx * 2 + 1;
}
function getRightChildIdx(idx) {
  return idx * 2 + 2;
}
function getParentIdx(idx) {
  return Math.floor((idx - 1) / 2);
}

module.exports = {
  heapify,
  maxHeapify: heapify.bind(null, maxCompare),
  minHeapify: heapify.bind(null, minCompare),
  sortMaxHeap: sortHeap.bind(null, maxCompare),
  sortMinHeap: sortHeap.bind(null, minCompare),
};