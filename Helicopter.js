// This is a "class" for the helicopter.  A class is a way of putting a bunch of code
// together in one place!


class Helicopter {
	constructor() {
		this.x = width/2;
		this.y = height/2;

		this.yspeed = 0;
		this.size = 50;
		this.col = color(0, 0, 255);

		this.gravity = 0.3;

		this.image;
	}


	// reset the helicopter
	reset(){
		this.x = width / 4;
		this.y = height / 2;
		this.yspeed = 0;
		this.col = color(0, 0, 255);
		this.gravity = 0.3;
	}


	update() {
		this.y += this.yspeed;

		//add to the downward speed of helicopter:
		this.yspeed += this.gravity;
	}

	//function to display the helicopter
	display() {
		if (this.playerImage){
			imageMode(CENTER);
			image(this.playerImage,this.x, this.y, this.size, this.size);
		} else {
			fill(this.col);
			ellipse(this.x, this.y, this.size, this.size);
		}
	}

	isIn(wall) {
		if (this.x + this.size / 2 > wall.topLeftX && this.x - this.size / 2 < wall.topLeftX + wall.width) {
			if (this.y + this.size / 2 > wall.topLeftY && this.y - this.size / 2 < wall.topLeftY + wall.height) {
				return true;
			}
		}
	}

	isOut() {
		if (this.y + this.size/2 > height || this.y - this.size/2 < 0) {
			return true;
		} else {
			return false;
		}
	}

}
