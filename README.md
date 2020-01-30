# Kraken Brigade

## Description

Kraken-Brigade is a game where the player has to move ships horizontally and shoot up incoming tentacles that appear from the top of the screen and move to the bottom. The game ends when four tentacles get stacked in front of the fort wall. After that, a score is calculated based on tentacle destroyed and the amount of time the game lasted.

## MVP (DOM - CANVAS)

- game has three ship that moves horizontally
- ship shoots cannonballs up
- tentacles appear randomly from the top of the screen
- four tentacles stacking will end the game
- cannonballs destroy tentacles
- reload time for shooting cannonballs
- Increasing dificulty

## Backlog

- add scoreboard
- Ability to start the game on increased dificulty lvl

## Data Structure

# main.js

- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}

# game.js

- Game () {}
- starLoop () {}
- checkCollisions () {}
- addTentacle () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}

# ship.js 

- Ship () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- shoot () {}
- checkScreenCollision () {}

# tentacle.js 

- Tentacle () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkCollisionBotton () {}

# cannonball.js 

- Cannonball () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkCollisionTop () {}

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameOverScreen

## Task

- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- tentacle - draw
- tentacle - move
- game - addTentacle
- ship - draw
- ship - move
- ship - shoot
- game - addShip
- cannonball - draw
- cannonball - move
- game - checkCollision
- game - GameOver
- game - addEventListener

## Links

### Trello
[Link url](https://trello.com/b/CWviY2zv/kraken-brigade-project)

### Git
URls for the project repo and deploy
[Link Repo](https://github.com/jorgeberrizbeitia/kraken-brigade)
[Link Deploy](https://jorgeberrizbeitia.github.io/kraken-brigade/)

### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/138o01hAz-0gXepN78RsDgse12HiiuN7Fz_N_hJnI9_g/edit?usp=sharing)
