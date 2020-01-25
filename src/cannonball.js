"use strict"

function Cannonball () {
    this.x = 0;
    this.y = 0
    this.direction = "up"
    this.size = 5;
}

// to add cannonballs when ship shoots
Cannonball.prototype.draw = function () {}

// to set automatic tentacle movement
Cannonball.prototype.move = function () {}
