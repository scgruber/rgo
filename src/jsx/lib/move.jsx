var Move = {
  move: function(node, value, in_graph) {
    // Check that the position is on the board
    if (!this.isOnBoard(node, in_graph)) {
      return null;
    }

    // Check that the position is currently empty
    if (in_graph.node(node).value != 0) {
      return null;
    }

    var out_graph = in_graph.clone();
    out_graph.updateNode(node, { value: value });
    return out_graph;
  },

  isOnBoard: function(node, graph) {
    return graph.node(node) != null;
  }
};

module.exports = Move;