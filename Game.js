class Game {
	constructor() {
		// how fast the walls move (change to any number between 1-10)
		this.speed = 5;

		this.score = 0;
		this.isScoreVisible = false;

		// how big the walls are (change to any number between 1-20)
		this.difficulty = 15;

		// these variables will store the player and walls
		this.helicopter;
		this.walls = [];

		// these variables will store any images we add for the player and the walls
		this.playerImage;
		this.wallImage;

		// these are important for when the game starts and ends
		this.gameOver = false;
		this.isFirstGo = true;

		// these are important for making the walls work
		this.framesElapsed = 0;
		this.wallWidth = 50;
		this.bigWallCounter = 0;
	}


	addPlayerImage(myImage){
		this.helicopter.playerImage = loadImage(myImage);
	}

	addWallImage(myImage){
		this.wallImage = loadImage(myImage);
	}

	addPlayer(){
		this.helicopter = new Helicopter();
	}

	addWalls(){
		// if we have a wallImage, pass it in!
		if (this.wallImage){
			let wh = random(20, 10 * this.difficulty); // wall height
			if (this.bigWallCounter % 11 === 0){
				wh = random(2,2.5);
			}
			//top walls
			this.walls.push(new Wall(this.speed, width, 0, this.wallWidth, wh, this.wallImage));
			//bottom walls
			wh = random(20, 10 * this.difficulty);
			if (this.bigWallCounter % 17 === 0){
				wh *= random(2,2.5);
			}
			this.walls.push(new Wall(this.speed, width, height - wh, this.wallWidth, wh, this.wallImage));
		} else {
			let wh = random(20, 10 * this.difficulty); // wall height
			if (this.bigWallCounter % 13 === 0){
				wh = random(2,2.5);
			}
			//top walls
			this.walls.push(new Wall(this.speed, width, 0, this.wallWidth, wh));

			//bottom walls
			wh = random(20, 10 * this.difficulty);
			if (this.bigWallCounter % 17 === 0){
				wh *= random(2,2.5);
			}
			this.walls.push(new Wall(this.speed, width, height - wh, this.wallWidth, wh));
		}
		this.bigWallCounter ++;
	}

	display() {
		if (this.isFirstGo) { //splash screen
			//text box
			fill(119, 151, 198);
			rectMode(CENTER);
			rect(width / 2, height / 2, width, height);

			// text
			textSize(50);
			textAlign(CENTER, CENTER);
			fill(255);
			text("HELICOPTER", width / 2, height / 2 - 10);
			textSize(20);
			text("press spacebar to play", width / 2, height / 2 + 30);
		} else if (this.gameOver) {
			//text box
			fill(0);
			rectMode(CENTER);
			rect(width / 2, height / 2, width, 100);

			//text
			textSize(50);
			textAlign(CENTER, CENTER);
			fill(255);
			text("GAME OVER", width / 2, height / 2 - 10);
			textSize(20);
			text("space to resume", width / 2, height / 2 + 30);
		} else { //play state

			background(119, 151, 198);
			//display the helicopter every frame
			this.helicopter.display();
			for (let i = 0; i< this.walls.length; i++){
				this.walls[i].display();
			}

			if (this.isScoreVisible) {
				fill(0);
				rectMode(CORNER);
				rect(0,0,40,40);
				fill(255);
				text(this.score, 20, 20);
			}
		}
	}

	showScore(){
		this.isScoreVisible = true;
	}

	update() {
		//check if the game is over:
		this.checkIfGameOver();

		if (this.isFirstGo || this.gameOver) {
			if (keyIsDown(32)) { //spacebar
				this.resetGame();
			}
		} else { // play mode
			if (frameCount  % 25 === 0){this.score ++;}

			//game is not over!
			// add a new wall on right of window every time a wall...
			if (this.framesElapsed * this.speed >= this.wallWidth) {
				this.addWalls();
				this.framesElapsed = 0;
			}

			//iterate through walls list backwards
			for (let i = this.walls.length - 1; i >= 0; i--) {
				//run the walls
				this.walls[i].run();
				//splice from the array those walls which are out of the screen
				if (this.walls[i].isOut()) {
					this.walls.splice(i, 1);
				}
			}

			// helicopter stuff:
			this.helicopter.update();
			//check for keypresses!
			if (keyIsDown(32)) { // spacebar
				this.helicopter.yspeed -= 0.6;
			}

			//move frame marker:
			this.framesElapsed += 1;
		}
	}


	checkIfGameOver() {
		// iterate throug walls list backwards, checking if ball is in each wall
		for (let i = this.walls.length - 1; i >= 0; i--) {
			if (this.helicopter.isIn(this.walls[i])) {
				this.gameOver = true;
			}
		}

		if (this.helicopter.isOut()){
			this.gameOver = true;
		}
	}


	resetGame() {
		this.score = 0;
		this.gameOver = false;
		this.isFirstGo = false;
		this.walls.splice(0, this.walls.length); // remove all walls
		this.helicopter.reset();
	}

}
