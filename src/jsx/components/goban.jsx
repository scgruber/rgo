var React = require('react');

var GobanModel = require('../models/goban.jsx');
var GobanCellComponent = require('../components/goban_cell.jsx')

var GobanComponent = React.createClass({
  propTypes: {
    board: React.PropTypes.instanceOf(GobanModel).isRequired,
    onPlace: React.PropTypes.func.isRequired
  },

  render: function() {
    var _this = this;

    return (
      <table  className   = "goban"
              cellSpacing = "0">
        { Array.apply(null, Array(_this.props.board.size)).map( function(v, rowIdx) {
          return (
            <tr key = { rowIdx }
                className = "goban-row">
              { Array.apply(null, Array(_this.props.board.size)).map( function(v, colIdx) {
                return (
                  <td key = { colIdx }
                      className = "goban-cell">
                    <GobanCellComponent value       = { _this.props.board.get(colIdx,rowIdx) }
                                        x           = { colIdx }
                                        y           = { rowIdx }
                                        board_size  = { _this.props.board.size }
                                        onPlace     = { _this.props.onPlace } />
                  </td>
                );
              }) }
            </tr>
          );
        }) }
      </table>
    );
  }
});

module.exports = GobanComponent;