"use strict";

// to modify the DOM depending on the screen
function buildDom(htmlString) {
  var div = document.createElement("div");

  div.innerHTML = htmlString;

  return div.children[0];
}

// main game function for page load
function main() {
  var game;
  var splashScreen;
  var gameOverScreen;

  // SETTING GAME SPLASH SCREEN
  function createSplashScreen() {
    splashScreen = buildDom(`
        <main>
            <div class="container">
                <div id="title-box">
                    <h1>Kraken Brigade</h1>
                </div>
                <div id="instructions-box">
                    <h2>Instructions!</h2>
                    <p>
                    Arrow Left -> Move Ship Left<br>
                    Arrow Right -> Move Ship Right<br>
                    Arrow Up -> Shoot Those Darn Tentacles!<br>
                    Q -> Toogle Between Ships<br>
                    </p>
                </div>
                <div>
                    <button id="start-btn" class ="button">START!</button>
                </div>
            </div>
        </main>`);
        

    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector("#start-btn");

    startButton.addEventListener("click", function() {
      startGame();
    });
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  // SETTING GAME SCREEN
  function createGameScreen() {
    var gameScreen = buildDom(`
    <main class="game game-container">
      <header>
        <div class="kill-score score">
          <span class="label">Kill Score:</span>
          <span class="value"></span>
        </div>
        <div class="time-score score">
          <span class="label">Time Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
    `);

    document.body.appendChild(gameScreen);

    // return so we can store page in game as per startGame function
    return gameScreen;
  }

  function removeGameScreen() {
    // gameScreen is stored in game per startGame function
    game.gameScreen.remove();
  }

  // SETTING GAME OVER SCREEN
  function createGameOverScreen(score) {
    gameOverScreen = buildDom(`
    <main>
        <div class="container">
            <div>
                <h1>YARR!!</h1>
            </div>
            <div id="score">
                <h2>your score is... ${score}</h2>
            </div>
            <button id="restart-btn" class="button" >RESTART!</button>
        </div>
    </main>`);

    document.body.appendChild(gameOverScreen);

    var button = gameOverScreen.querySelector("button");

    button.addEventListener("click", startGame);
  }

  function removeGameOverScreen() {
    // by checking we avoid an issue when removing this when game starts on the first time
    if (gameOverScreen !== undefined) {
      gameOverScreen.remove();
    }
  }

  // SETTING THE GAME STATE

  function startGame() {
    removeSplashScreen();
    removeGameOverScreen();

    game = new Game();
    game.gameScreen = createGameScreen();

    // function that starts the game loop
    game.start();

    // after the game loop inside game.start ends, below callback function will run
    game.passGameOverCallback(gameOver);
  }

  function gameOver() {
    removeGameScreen();
    createGameOverScreen(this.score);

    console.log("game over in main");
  }

  // to initialize the splash creen on first page load
  createSplashScreen();
}

// to load main function on first page load
window.addEventListener("load", main);
