var GraphModel = require('./graph.jsx');

var GobanModel = function(size) {
  this.size = size
  nodes = [].concat.apply([],
      Array.apply(null, Array(size)).map(function(v, rowIdx) {
      return Array.apply(null, Array(size)).map(function(v, colIdx) {
        return { name: toNodeName([colIdx, rowIdx]), value: 0 };
      });
    })
  );
  edges = [].concat.apply([],
    nodes.map(function(n) {
      var coords = fromNodeName(n.name);
      var colIdx = coords[0], rowIdx = coords[1];
      var west  = ((colIdx != 0     ) ? toNodeName([colIdx-1, rowIdx  ]) : null);
      var east  = ((colIdx != size-1) ? toNodeName([colIdx+1, rowIdx  ]) : null);
      var north = ((rowIdx != 0     ) ? toNodeName([colIdx,   rowIdx-1]) : null);
      var south = ((rowIdx != size-1) ? toNodeName([colIdx,   rowIdx+1]) : null);
      var targets = ([west,east,north,south]).filter(function(t) { return t != null; });
      return targets.map(function(t) { return [n.name, t]});
    })
  );
  this._board = new GraphModel(nodes, edges);
}

var toNodeName = function(coords) {
  return coords[0] + "-" + coords[1];
}

var fromNodeName = function(node_name) {
  return node_name.split("-").map(function(idx) { return parseInt(idx); });
}

var checkInBounds = function(x, y, size) {
  if (!(x >= 0 && x < size && y >= 0 && y < size)) {
    throw("Invalid coordinates!");
  }
}

GobanModel.prototype.clone = function() {
  var clone = new GobanModel(this.size);
  clone._board = this._board.clone();
  return clone;
}

GobanModel.prototype.get = function(x,y) {
  checkInBounds(x,y,this.size);

  return this._board.node(toNodeName([x,y])).value;
}

GobanModel.prototype.set = function(x,y,value) {
  checkInBounds(x,y,this.size);

  var clone = this.clone();
  clone._board.updateNode(toNodeName([x,y]), { value: value });
  return clone;
}

module.exports = GobanModel;