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

    // Capture enemy stones
    var captured = this.performCaptures(value*-1, out_graph);

    // Check that none of our stones would be captured
    if (this.performCaptures(value, out_graph).length > 0) {
      return null;
    }

    return out_graph;
  },

  isOnBoard: function(node, graph) {
    return graph.node(node) != null;
  },

  performCaptures: function(target_color, graph) {
    function sameColor(a,b) {
      return a.value === b.value;
    }

    var groups = graph.undirectedComponents(sameColor).filter(function(component) {
      return graph.node(component[0]).value === target_color;
    });

    var annotated_groups = groups.map(function(group) {
      return { group: group, liberties: graph.neighbors(group).filter(function(neighbor) {
        return graph.node(neighbor).value === 0;
      }).length };
    });

    var captured = [];
    annotated_groups.forEach(function(annotated_group) {
      if (annotated_group.liberties === 0) {
        annotated_group.group.forEach(function(node) {
          graph.updateNode(node, { value: 0 });
          captured.push(node);
        });
      }
    });

    return captured;
  }
};

module.exports = Move;