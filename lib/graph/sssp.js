function bellmanFord(graph) {
  graph.nodes[0].weight = 0;
  for (let i = 1; i < graph.nodes.length; i++) {
    for (let j = 0; j < graph.edges.length; j++) {
      const edge = graph.edges[j];
      const { weight, nodes } = edge;
      const [node1, node2] = nodes;
      checkWeights(node1, node2, weight);
    }
  }
  for (let i = 0; i < graph.nodes.length; i++) {
    const { name, weight, parent } = graph.nodes[i];
    console.log(`name: ${name}, weight: ${weight}, parent: ${parent}`);
  }
}
function checkWeights(node1, node2, edgeWeight) {
  const newWeight = node1.weight + edgeWeight;
  if (newWeight < node2.weight) {
    node2.weight = newWeight;
    node2.parent = node1.name;
  }
}

module.exports = {
  bellmanFord,
};