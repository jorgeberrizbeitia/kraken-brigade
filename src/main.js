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
  var gameScreen;
  var gameOverScreen;

  // SETTING GAME SPLASH SCREEN
  function createSplashScreen() {
    splashScreen = buildDom(`
        <main>
            <h1>Kraken Brigade</h1>
            <div id="instructions">
                <h2>Instructions...</h2>
            </div>
            <button id="start-btn">Start</button>
        </main>`);

    document.body.appendChild(splashScreen);

    var startButton = splashScreen.querySelector("#start-btn");

    startButton.addEventListener("click", function() {
      createGameScreen();
      startGame();
    });
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  // SETTING GAME SCREEN
  function createGameScreen() {
    removeSplashScreen();

    gameScreen = buildDom(`
    <main class="game container">
    <header>
      <div class="lives">
        <span class="label">Lives:</span>
        <span class="value"></span>
      </div>
      <div class="score">
        <span class="label">Score:</span>
        <span class="value"></span>
      </div>
    </header>
    <div class="canvas-container">
      <canvas></canvas>
    </div>
  </main>
    `);

    document.body.appendChild(gameScreen);
  }

  function removeGameScreen() {}

  // SETTING GAME OVER SCREEN
  function createGameOverScreen() {}

  function removeGameOverScreen() {}

  // SETTING THE GAME STATE

  function startGame() {
      game = new Game();
      game.gameScreen = createGameScreen();

      game.start();
  }

  function gamerOver() {}

  // to initialize the splash creen on first page load
  createSplashScreen();
}

// to load main function on first page load
window.addEventListener("load", main);
