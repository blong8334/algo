const { Queue } = require('../utils');

class Node {
  constructor(name) {
    this.name = name;
    this.neighbors = [];
  }
  addNeighbor(node) {
    this.neighbors.push(node);
    return this;
  }
  removeNeighbor(targetNode) {
    this.neighbors.filter((node) => {
      return node.name !== targetNode.name;
    });
    return this;
  }
  findNeighbor(name) {
    for (const neighbor in this.neighbors) {
      if (neighbor.name === name) {
        return neighbor;
      }
    }
    return false;
  }
}

class Graph {
  constructor() {
    this.nodes = [];
  }
  addNodeByName(name) {
    const node = new Node(name);
    return this.addNode(node);
  }
  addNode(node) {
    this.nodes.push(node);
    return this;
  }
  getNode(name) {
    return this.nodeMap.get(name);
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
          console.log('We already visited', currentNode.name);
          continue;
        }
        console.log('Visiting', currentNode.name);
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
        console.log('We already visited node', node.name);
        return;
      }
      console.log('Visiting node', node.name);
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
}

module.exports = {
  Graph,
  Node,
};