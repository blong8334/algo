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
  test('should remove elements', () => {

  });
});