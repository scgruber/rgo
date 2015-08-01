var GobanModel = function(size) {
  this.size = size
  this._board = Array.apply(null, Array(size*size)).map(function() { return 0; });
}

var toLinearIndex = function(coords,size) {
  return coords[0]*size + coords[1];
}

var fromLinearIndex = function(idx, size) {
  return [idx/size, idx%size];
}

var checkInBounds = function(x, y, size) {
  if (!(x >= 0 && x < size && y >= 0 && y < size)) {
    throw("Invalid coordinates!");
  }
}

GobanModel.prototype.clone = function() {
  var clone = new GobanModel(this.size);
  clone._board = this._board;
  return clone;
}

GobanModel.prototype.get = function(x,y) {
  checkInBounds(x,y,this.size);

  return this._board[toLinearIndex([x,y], this.size)];
}

GobanModel.prototype.set = function(x,y,value) {
  checkInBounds(x,y,this.size);

  var clone = this.clone();
  clone._board[toLinearIndex([x,y], this.size)] = value;
  return clone;
}

module.exports = GobanModel;