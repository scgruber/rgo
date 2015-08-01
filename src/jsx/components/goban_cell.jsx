var React = require('react');

var CELL_DIM = 49;
var CELL_MID = Math.floor(CELL_DIM/2)+1;
var STONE_RADIUS = Math.floor(CELL_DIM/7*3)

var GobanCellComponent = React.createClass({
  propTypes: {
    board_size: React.PropTypes.number.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    value: React.PropTypes.oneOf([-1,0,1]).isRequired,
    onPlace: React.PropTypes.func.isRequired
  },

  color: function() {
    switch (this.props.value) {
      case 1:  return "white";
      case -1: return "black";
      default: return "empty";
    }
  },

  handleClick: function(ev) {
    if (this.color() == "empty") {
      this.props.onPlace(this.props.x,this.props.y,ev);
    }
  },

  renderStone: function() {
    return (
      <circle className = { ["goban-cell-stone", this.color()].join(' ') }
              cx        = { CELL_MID }
              cy        = { CELL_MID }
              r         = { STONE_RADIUS }
              onClick   = { this.handleClick } />
    );
  },

  render: function() {
    return (
      <svg  className = "goban-cell"
            width     = { CELL_DIM }
            height    = { CELL_DIM }>
        <rect className = "goban-cell-background"
              width     = { CELL_DIM }
              height    = { CELL_DIM }
              x         = { 0 }
              y         = { 0 }/>
        <line className = "goban-cell-hline"
              x1        = { this.props.x == 0 ? CELL_MID : 0 }
              y1        = { CELL_MID }
              x2        = { this.props.x == this.props.board_size-1 ? CELL_MID : CELL_DIM }
              y2        = { CELL_MID } />
        <line className = "goban-cell-vline"
              x1        = { CELL_MID }
              y1        = { this.props.y == 0 ? CELL_MID : 0 }
              x2        = { CELL_MID }
              y2        = { this.props.y == this.props.board_size-1 ? CELL_MID : CELL_DIM } />
        { this.renderStone() }
      </svg>
    );
  }
});

module.exports = GobanCellComponent;