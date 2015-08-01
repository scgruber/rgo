var React = require('react');

var GobanModel = require('../models/goban.jsx');
var GobanComponent = require('../components/goban.jsx');

var GameView = React.createClass({
  propTypes: {
    size: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      board: new GobanModel(this.props.size),
      active: -1
    }
  },

  handlePlace: function(x, y) {
    board = this.state.board;
    board.set(x,y,this.state.active);
    this.setState({board: board, active: this.state.active * -1});
  },

  render: function() {
    return (
      <GobanComponent board   = { this.state.board }
                      onPlace = { this.handlePlace } />
    );
  }
});

module.exports = GameView;