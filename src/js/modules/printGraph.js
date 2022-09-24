function paintGraph(g, groups = []) {
  const nodes = [];
  g.forEach((_, i) =>
    nodes.push({
      id: i,
      label: `${i}`,
      group: groups[i] ? groups[i] : 0,
      shape: "circle",
    })
  );
  const visited = new Array(g.length).fill(0);
  const edges = [];
  for (const i in g) {
    for (const j in g[i]) {
      if (g[i][j] !== 0 && i !== j) {
        if (!visited[j]) {
          edges.push({ from: i, to: j, label: `${g[i][j]}` });
        }
      }
    }
    visited[i] = 1;
  }
  const container = document.getElementById("mynetwork");
  let data = {
    nodes: nodes,
    edges: edges,
  };
  let options = {
    physics: false,
    nodes: {
      shape: "dot",
      size: 15,
      font: {
        size: 22,
      },
      borderWidth: 0,
      shadow: true,
    },
    edges: {
      width: 2,
      shadow: true,
    },
  };
  let network = new vis.Network(container, data, options);
}

export { paintGraph };
