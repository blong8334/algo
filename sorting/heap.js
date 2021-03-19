function heapify(arr) {
  for (let i = 1; i < arr.length; i++) {
    heapifyIts++;
    checkOrSwap(arr, i, getParentIdx(i));
  }
}

function sortMaxHeap(heap) {
  let end = heap.length - 1;
  while (end) {
    sortHeapIts++;
    const temp = heap[0];
    heap[0] = heap[end];
    heap[end] = temp;
    moveDown(heap, end);
    end -= 1;
  }
}

function moveDown(heap, end) {
  let idx = 0;
  while (true) {
    sortHeapIts++;
    let bigChild;
    const l = getLeftChildIdx(idx);
    const r = getRightChildIdx(idx);
    if (l >= end) return;
    if (r >= end) bigChild = l;
    else bigChild = heap[l] > heap[r] ? l : r;
    if (heap[idx] > heap[bigChild]) {
      return;
    }
    const temp = heap[idx];
    heap[idx] = heap[bigChild];
    heap[bigChild] = temp;
    idx = bigChild;
  }
}

function checkOrSwap(arr, i, parentIdx) {
  while (i) {
    heapifyIts++;
    if (arr[i] > arr[parentIdx]) {
      const temp = arr[parentIdx];
      arr[parentIdx] = arr[i];
      arr[i] = temp;
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