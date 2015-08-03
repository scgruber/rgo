# RGo

**RGo** is a [React](https://reactjs.org) implementation of the board game [Go](https://en.wikipedia.org/wiki/Go_(game)).

## How to play

1. Clone the repo to your local machine
1. Run `grunt build` to generate the application files
1. Open `dist/main.html` in your favorite modern web browser

## Features

### What works

* **Playing the game.** RGo allows placing of stones, rotates turns, performs captures, and prevents suicide moves

### What doesn't work, _yet_

* **Game configuration.** Board size, komi, handicap
* **Preventing repeat state.** You can bounce a ko indefinitely
* **Scoring.** Captures are not tracked, and there is no way to score a finished game automatically
* **Termination detection.** RGo will not automatically detect when there are no remaining legal moves
* **Passing.** There is no way to advance the turn without placing a stone
* **Logging.** No way to record the moves in a game
* **Timing.** No way to limit the length of a game

### What would be _awesome_

* **Board analysis:**
  * **Identify safe groups.** Determine when a group is unkillable
  * **Measure influence.** Use heuristics to determine which areas of the board are dominated by a particular color
* **AI**