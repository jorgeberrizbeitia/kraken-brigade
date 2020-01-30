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
              Shoot the tentacles and avoid getting them stacked after the dotted line<br>
              <br>
              Arrow Left --> Move Ship Left<br>
              Arrow Right --> Move Ship Right<br>
              Arrow Up --> Shoot Those Darn Tentacles!<br>
              Arrow Down --> Anchor the Ship!<br>
              Q --> Toogle Between Ships<br>
              P --> PIRATE POWAH! *use it wisely*
              </p>
          </div>
          <div class="input-container">
            <label for="name" >Name: </label>
            <input type="text" id="name" maxlength="24">
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
        <div class="dificulty-message score">
          <span class="label">Dificulty:</span>
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
  function createGameOverScreen(totalScore) {
    var scoreRanking = JSON.parse(localStorage.getItem("score"));

    if (scoreRanking[0]) {
      var scoreStr1 = `${scoreRanking[0].name} : ${scoreRanking[0].score}`;
    } else {
      var scoreStr1 = "filty landlubber : 0";
    }

    if (scoreRanking[1]) {
      var scoreStr2 = `${scoreRanking[1].name} : ${scoreRanking[1].score}`;
    } else {
      var scoreStr2 = "filty landlubber : 0";
    }

    if (scoreRanking[2]) {
      var scoreStr3 = `${scoreRanking[2].name} : ${scoreRanking[2].score}`;
    } else {
      var scoreStr3 = "filty landlubber : 0";
    }

    if (scoreRanking[3]) {
      var scoreStr4 = `${scoreRanking[3].name} : ${scoreRanking[3].score}`;
    } else {
      var scoreStr4 = "filty landlubber : 0";
    }

    if (scoreRanking[4]) {
      var scoreStr5 = `${scoreRanking[4].name} : ${scoreRanking[4].score}`;
    } else {
      var scoreStr5 = "filty landlubber : 0";
    }

    gameOverScreen = buildDom(`
    <main>
        <div class="container">
            <div>
                <h1>YARR!!</h1>
            </div>
            <div id="score">
                <h2>your score is... ${totalScore}</h2>
            </div>
            <div id="scoreboard">
            <h2> High Score: </h2>
              <ul>
                <li> ${scoreStr1} </li>
                <li> ${scoreStr2} </li>
                <li> ${scoreStr3} </li>
                <li> ${scoreStr4} </li>
                <li> ${scoreStr5} </li>
              </ul>
            </div class="input-container">
            <label for="name" >Name: </label>
            <input type="text" id="name" maxlength="24">
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
    if (!document.querySelector("input").value) {
      inputNameMain = "filty landlubber"
    } else {
      var inputNameMain = document.querySelector("input").value;
    }

    removeSplashScreen();
    removeGameOverScreen();

    game = new Game(inputNameMain);
    game.gameScreen = createGameScreen();

    // function that starts the game loop
    game.start();

    // after the game loop inside game.start ends, below callback function will run
    game.passGameOverCallback(gameOver);
  }

  function gameOver() {
    removeGameScreen();
    createGameOverScreen(this.totalScore);
  }

  // to initialize the splash creen on first page load
  createSplashScreen();
}

// to load main function on first page load
window.addEventListener("load", main);
