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
    did_update = this.state.board.move(x,y,this.state.active);
    if (did_update) {
      this.setState({ active: this.state.active * -1 });
    }
  },

  render: function() {
    return (
      <GobanComponent board   = { this.state.board }
                      onPlace = { this.handlePlace } />
    );
  }
});

module.exports = GameView;