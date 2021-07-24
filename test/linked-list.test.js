const { SingleLinkedList } = require('../lib/utils/linked-list');

describe('SingleLinkedList', () => {
  let list;
  beforeEach(() => {
    list = new SingleLinkedList();
  });

  test('should set the first element to head and tail', () => {
    list.add(1);
    expect(list.head.value).toBe(1);
    expect(list.length).toBe(1);
  });
  test('should correctly set elements', () => {
    list.add(1);
    list.add(2);
    list.add(3);
    expect(list.head.value).toBe(1);
    expect(list.tail.value).toBe(3);
    expect(list.length).toBe(3);
  });
  test('should remove middle element', () => {
    list.add(1);
    list.add(2);
    list.add(3);
    list.remove(2);
    expect(list.head.value).toBe(1);
    expect(list.tail.value).toBe(3);
    expect(list.length).toBe(2);
  });
  test('should remove first element', () => {
    list.add(1);
    list.add(2);
    list.add(3);
    list.remove(1);
    expect(list.head.value).toBe(2);
    expect(list.tail.value).toBe(3);
    expect(list.length).toBe(2);
  });
  test('should remove last element', () => {
    list.add(1);
    list.add(2);
    list.add(3);
    list.remove(3);
    expect(list.head.value).toBe(1);
    expect(list.tail.value).toBe(2);
    expect(list.length).toBe(2);
  });
  test('should remove last element from list of two', () => {
    list.add(1);
    list.add(2);
    list.remove(2);
    expect(list.head.value).toBe(1);
    expect(list.tail.value).toBe(1);
    expect(list.length).toBe(1);
  });
  test('should remove first element from list of two', () => {
    list.add(1);
    list.add(2);
    list.remove(1);
    expect(list.head.value).toBe(2);
    expect(list.tail.value).toBe(2);
    expect(list.length).toBe(1);
  });
  test('should remove element from list of 1', () => {
    list.add(1);
    const result = list.remove(1);
    expect(result).toBe(true);
    expect(!!list.head).toBe(false);
    expect(!!list.tail).toBe(false);
    expect(list.length).toBe(0);
  });
  test('should do nothing if the element cannot be found', () => {
    list.add(1);
    list.add(2);
    const result = list.remove(3);
    expect(result).toBe(false);
    expect(list.head.value).toBe(1);
    expect(list.tail.value).toBe(2);
    expect(list.length).toBe(2);
  });
});