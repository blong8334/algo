const { Queue, generateId } = require('../utils');
const { kruskal, prim } = require('./min-span-tree');

class Edge {
  constructor(weight) {
    this.weight = weight;
    this.nodes = [];
  }
  addNodes(nodes) {
    if (!Array.isArray(nodes)) {
      return this.addNodes([nodes]);
    }
    if (nodes.lenth + this.nodes.length > 2) {
      console.warn('not adding new nodes');
      return this;
    }
    this.nodes.push(...nodes);
    return this;
  }
}

class Node {
  constructor(name) {
    this.id = generateId();
    this.name = name;
    this.edges = [];
    this.neighbors = [];
    this.component = null;
    this.weight = Infinity;
    this.seen = false;
  }
  addHelper(data, propName) {
    if (!Array.isArray(data)) {
      return this.addHelper([data]);
    }
    data.forEach((node) => this[propName].push(node));
    return this;
  }
  addNeighbor(nodes) {
    return this.addHelper(nodes, 'neighbors');
  }
  addEdge(edges) {
    return this.addHelper(edges, 'edges');
  }
}

class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }
  addHelper(data, propName) {
    if (!Array.isArray(data)) {
      return this.addHelper([data]);
    }
    data.forEach((node) => this[propName].push(node));
    return this;
  }
  addNode(nodes) {
    return this.addHelper(nodes, 'nodes');
  }
  addEdge(edges) {
    return this.addHelper(edges, 'edges');
  }
  bfs(name) {
    if (!this.nodes.length) {
      return false;
    }
    const visitedNodes = new Set();
    const queue = new Queue();
    return helper.call(this, 0);
    function helper(idx) {
      if (idx === this.nodes.length) {
        return false;
      }
      queue.enqueue(this.nodes[idx]);
      while (queue.length) {
        const currentNode = queue.dequeue();
        if (visitedNodes.has(currentNode)) {
          continue;
        }
        visitedNodes.add(currentNode);
        if (currentNode.name === name) {
          return currentNode;
        }
        currentNode.neighbors.forEach((neighbor) => queue.enqueue(neighbor));
      }
      return helper.call(this, idx + 1);
    }
  }
  dfs(name) {
    const visitedNodes = new Set();
    let idx = this.nodes.length;
    while (idx--) {
      const result = helper.call(this, this.nodes[idx], true);
      if (result) {
        return result;
      }
    }
    function helper(node) {
      if (visitedNodes.has(node)) {
        return;
      }
      if (node.name === name) {
        return node;
      }
      visitedNodes.add(node);
      for (const neighbor of node.neighbors) {
        const result = helper.call(this, neighbor);
        if (result) {
          return result;
        }
      }
    }
  }
  topologicalSort() {
    const visitedNodes = new Set();
    const arr = new Array(this.nodes.length);
    let arrIdx = this.nodes.length;
    for (let i = 0; i < this.nodes.length; i++) {
      helper.call(this, this.nodes[i], true);
    }
    return arr;
    function helper(node) {
      if (visitedNodes.has(node)) {
        return;
      }
      visitedNodes.add(node);
      for (const neighbor of node.neighbors) {
        helper.call(this, neighbor);
      }
      arr[--arrIdx] = node;
    }
  }
  stronglyConnected() {
    const arr = this.topologicalSort();
    // now you have to reverse the relationships.
    const seen = new Set();
    const results = [];
    for (let i = 0; i < arr.length; i++) {
      if (seen.has(arr[i])) {
        continue;
      }
      const component = this.dfsNode(arr[i]);
      component.forEach((node) => seen.add(node));
      results.push(component);
    }
    return results;
  }
  dfsNode(node) {
    const visitedNodes = new Set();
    helper.call(this, node, true);
    return visitedNodes;
    function helper(node) {
      if (visitedNodes.has(node)) {
        return;
      }
      visitedNodes.add(node);
      for (const neighbor of node.neighbors) {
        helper.call(this, neighbor);
      }
    }
  }
}

module.exports = {
  Graph,
  Node,
  Edge,
  kruskal,
  prim,
};