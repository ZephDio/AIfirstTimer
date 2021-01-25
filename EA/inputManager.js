class KeyManager {
  isHolded = false;
  constructor(key) {
    this.key = key;
    document.addEventListener("keydown", (event) => {
      if (event.key === key) {
        this.isHolded = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === key) {
        this.isHolded = false;
      }
    });
  }
}

class InputManager {
  constructor() {
    this.arrowLeft = new KeyManager("ArrowLeft");
    this.arrowRight = new KeyManager("ArrowRight");
    this.arrowUp = new KeyManager("ArrowUp");
    this.arrowDown = new KeyManager("ArrowDown");
  }

  tick() {
    if (this.arrowLeft.isHolded) {
      return "left";
    }
    if (this.arrowRight.isHolded) {
      return "right";
    }
    if (this.arrowUp.isHolded) {
      return "up";
    }
    if (this.arrowDown.isHolded) {
      return "down";
    }
  }
}
