class Car {
  constructor(x, y, alpha) {
    this.brain = new Neuronal();
    this.isRolling = true;
    this.x = x;
    this.y = y;
    this.alpha = alpha;
    this.speed = 1;
  }

  next() {
    this.x += this.speed * Math.cos(this.alpha);
    this.y += this.speed * Math.sin(this.alpha);
  }

  speedUp() {
    this.speed += 0.02;
  }

  speedDown() {
    if (this.speed > 1) this.speed -= 0.02;
  }

  turnLeft() {
    this.alpha -= 0.02;
    if (this.alpha > 2 * Math.PI || this.alpha < 0) {
      this.alpha = (this.alpha + 2 * Math.PI) % (Math.PI * 2);
    }
  }
  turnRight() {
    this.alpha += 0.02;
    if (this.alpha > 2 * Math.PI || this.alpha < 0) {
      this.alpha = (this.alpha + 2 * Math.PI) % (Math.PI * 2);
    }
  }

  clone() {
    const clone = new Car(410, 450, (Math.PI * 3) / 2);
    clone.brain = this.brain.clone();
    return clone;
  }
}
