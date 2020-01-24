# kraken-brigade

## Description

Kraken-Brigade is a game where the player has to move ships horizontally and shoot up incoming tentacles that appear from the top of the screen and move to the bottom. The game ends where either tentacles arrive to the bottom or the ships are destroyed. After that, a score is calculated based on tentacle destroyed and the amount of time the game lasted.

## MVP (DOM - CANVAS)

- game has one ship that moves horizontally
- ship shoots cannonballs up
- tentacles appear randomly from the top of the screen
- one tentacle colliding with the bottom of the screen will end game
- cannonballs destroy tentacles

## Backlog

- add score
- ability to add move ships on different lines
- reload time for shooting cannonballs
- Scoreboard
- Increasing dificulty
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

- Ship () {}
- draw () {}
- move () {}
- shoot () {}

# tentacle.js 

- Tentacle () {}
- draw () {}
- move () {}

# cannonball.js 

- Cannonball () {}
- draw () {}
- move () {}

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameOverScreen

## Task

main - buildDom
main - buildSplashScreen
main - addEventListener
main - buildGameScreen
main - buildGameOverScreen
game - startLoop
game - addShip
game - addTentacle
game - buildCanvas
game - updateCanvas
game - drawCanvas
tentacle - draw
tentacle - move
ship - draw
ship - move
ship - shoot
cannonball - draw
cannonball - move
game - checkCollision
game - GameOver
game - addEventListener

## Links

### Trello
[Link url](https://trello.com/b/CWviY2zv/kraken-brigade-project)


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/jorgeberrizbeitia/kraken-brigade)
[Link Deploy]()

### Slides
URls for the project presentation (slides)
[Link Slides.com]()
