class Wall {
	constructor(speed, x, y, w, h, wallImage) {
		this.speed = speed;
		this.topLeftX = x;
		this.topLeftY = y;
		this.width = w;
		this.height = h;
		this.wallImage = wallImage;
	}

	display() {
		if (this.wallImage){
			imageMode(CORNER);
			image(this.wallImage,this.topLeftX, this.topLeftY, this.width, this.height);
		} else {
			fill(255, 0,0);
			rectMode(CORNER);
			stroke(0);
			rect(this.topLeftX, this.topLeftY, this.width, this.height);
		}
	}

	isOut() {
		if (this.topLeftX + this.width < 0) {
			return true;
		} else {
			return false;
		}
	}

	run() {
		this.move();
		this.display();
	}

	move() {
		this.topLeftX -= this.speed;
	}
}
