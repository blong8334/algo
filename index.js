/*
  we have an upper index and a lower index. 
*/

let qsIts = 0;
let msIts = 0;
let heapifyIts = 0;
let sortHeapIts = 0;
const arr = [];
const arrLength = 100000000;
for (let i = 0; i < arrLength; i++) arr.push(Math.random() * 1000);
// const copy = arr.slice(0);
console.time('heapify');
heapify(arr);
console.timeEnd('heapify');
console.log('heapifyIts', heapifyIts);
console.time('sortHeap');
sortMaxHeap(arr);
console.timeEnd('sortHeap');
// console.log(arr);
console.log('sortHeapIts', sortHeapIts);
// const copy = arr.slice(0);
// console.time('qs');
// quickSort(copy);
// console.timeEnd('qs');
// console.time('ms');
// mergeSort(arr);
// console.timeEnd('ms');
// console.log('qsIts', qsIts);
// console.log('msIts', msIts);
// console.log('DIFFERENCE', qsIts - msIts);
console.log('arr size', arr.length);
console.log('nlogn', Math.log2(arr.length) * arr.length);
console.log('n^2', Math.pow(arr.length, 2));

// add heapify and heap sorts.
// do for min and max heaps
// binary search trees





