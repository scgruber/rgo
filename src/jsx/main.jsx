var React = require('react');

var GameView = require('./views/game.jsx');

React.render(
  <GameView size={9}/>,
  document.getElementById('entry-point')
);