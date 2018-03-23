/*
March 23, 2018

Helicopter Game!

This is a single player game in which you try to fly a helicopter through a cave!

Environment (the cave):
- the cave has top and bottom walls,
- the walls are always moving to the left (so that it look like the player (helicopter) is moving to the right)

Player (the helicopter):
- you (the player) are controlling the helicopter

Goal (the point of the game):
- keep flying as long as you can

Rules (how you play):
- press the spacebar to fly up,
- gravity will move you down,
- avoid the walls of the cave!

*/

let game;

function setup() {
	createCanvas(800, 600);

	game = new Game();

	game.addPlayer();
	game.addWalls();
	game.showScore();

	game.difficulty = 18;
	game.speed = 5;

	game.addPlayerImage('shark.png');
	game.addWallImage('rock.png');
}



function draw() {
	game.update();
	game.display();
}
