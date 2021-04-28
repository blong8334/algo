const { quickSort } = require('../sorting');
const { LinkedList, swap } = require('../utils');
const { heapify } = require('../sorting');
const compareNodes = (node1, node2) => node1.weight < node2.weight;

function prim(graph) {
  const { nodes } = graph;
  const mstEdges = [];
  while (mstEdges.length < nodes.length - 1) {
    nodes[0].seen = true;
    const { edges, weight } = nodes[0];
    let minEdge;
    for (const edge of edges) {
      if (edge.weight === weight) {
        minEdge = edge;
      }
      for (const node of edge.nodes) {
        if (node.seen) {
          continue;
        }
        if (node.weight > edge.weight) {
          node.weight = edge.weight;
        }
      }
    }
    if (minEdge) {
      mstEdges.push(minEdge);
    }
    const idx = nodes.length - mstEdges.length - 1;
    swap(nodes, 0, idx);
    heapify(compareNodes, nodes, idx);
  }
  return mstEdges;
}

function initComponents(nodes) {
  return nodes.reduce((components, node) => {
    const id = node.id;
    node.component = id;
    components[id] = new LinkedList(id).add(node);
    return components;
  }, {});
}

function kruskal(graph) {
  const components = initComponents(graph.nodes);
  quickSort(graph.edges, (a, b) => a.weight <= b.weight);
  const mstEdges = [];
  for (const edge of graph.edges) {
    const [{ component: compName1 }, { component: compName2 }] = edge.nodes;
    if (compName1 === compName2) {
      continue;
    }
    const helper = (bigCompName, smallCompName) => {
      components[bigCompName]
        .merge(components[smallCompName], (node) => node.component = bigCompName);
      components[smallCompName] = undefined;
    };
    if (components[compName1].length > components[compName2].length) {
      helper(compName1, compName2);
    } else {
      helper(compName2, compName1);
    }
    mstEdges.push(edge);
    if (mstEdges.length === (graph.nodes.length - 1)) {
      break;
    }
  }
  return mstEdges;
}

module.exports = {
  kruskal,
  prim,
};