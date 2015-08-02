var GraphModel = require('./graph.jsx');
var Move = require('../lib/move.jsx');

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

GobanModel.prototype.read = function(x,y) {
  if (Move.isOnBoard(toNodeName([x,y]), this._board)) {
    return this._board.node(toNodeName([x,y])).value;
  } else {
    return null;
  }
}

GobanModel.prototype.move = function(x,y,value) {
  var next_board = Move.move(toNodeName([x,y]),value,this._board);
  if (next_board) {
    this._board = next_board;
    return true;
  } else {
    return false;
  }
}

module.exports = GobanModel;