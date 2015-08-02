var GraphModel = function(nodes, edges) {
  this._nodes = {};
  this._meta = {};
  nodes.forEach(function(node) {
    this._nodes[node.name] = node;
    this._meta[node.name] = {out_edges : {}};
  }, this);
  edges.forEach(function(edge) {
    this._meta[edge[0]].out_edges[edge[1]] = true;
  }, this);
}

GraphModel.prototype.clone = function() {
  return new GraphModel(this.nodes(), this.edges());
}

GraphModel.prototype.node = function(node) {
  if (this._nodes[node]) {
    return this._nodes[node];
  } else {
    return null;
  }
}

GraphModel.prototype.nodes = function() {
  return Object.keys(this._nodes).map(function(n) {
    return this._nodes[n];
  }, this);
}

GraphModel.prototype.edges = function() {
  var edges = [];
  Object.keys(this._nodes).forEach(function(node) {
    Object.keys(this._meta[node].out_edges).forEach(function(neighbor) {
      edges.push([node, neighbor]);
    }, this);
  }, this);

  return edges;
}

GraphModel.prototype.updateNode = function(node, data) {
  Object.keys(data).forEach(function(datum) {
    this._nodes[node][datum] = data[datum];
  }, this);
}

GraphModel.prototype.dfs = function(node, visitIf) {
  function visitDescendents(n, descendents) {
    descendents.push(n);
    this._meta[n].visited = true;
    Object.keys(this._meta[n].out_edges).forEach(function(neighbor) {
      if ((!this._meta[neighbor].visited) && ((!visitIf) || visitIf(n, neighbor))) {
        visitDescendents.call(this, neighbor, descendents);
      }
    }, this);
  }

  connected_nodes = [];
  visitDescendents.call(this, node, connected_nodes);

  // Clean up
  connected_nodes.forEach(function(n) {
    delete this._meta[n].visited;
  }, this);

  return connected_nodes;
}

GraphModel.prototype.undirectedComponents = function(visitIf) {
  var components = [];

  Object.keys(this._nodes).forEach(function(node) {
    if (!this._meta[node].has_component) {
      component = this.dfs(node, visitIf);
      component.forEach(function(n) {
        this._meta[n].has_component = true;
      }, this);
      components.push(component);
    }
  }, this);

  // Clean up
  Object.keys(this._nodes).forEach(function(node) {
    delete this._meta[node].has_component;
  }, this);

  return components;
}

GraphModel.prototype.forEachNode = function(nodes, fn) {
  return nodes.map(function(node) {
    if (this._nodes[node]) {
      return fn(this._nodes[node]);
    } else {
      return null;
    }
  }, this).filter(function(result) { return result !== null; });
}

module.exports = GraphModel;