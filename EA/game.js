class Game {
  constructor() {
    this.land = new Land();
    this.cars = [];
  }

  next() {
    this.updateCars();
  }

  loop(inputmanager) {
    window.setTimeout(() => {
      this.next();
      this.collisionForAllCars();
      this.playerInput(inputmanager);
      this.EAprocess();
      this.loop(inputmanager);
    }, 1);
  }

  initGame() {
    this.initCars();
  }

  initCars() {
    this.cars.push(new Car(410, 450, (Math.PI * 3) / 2));
    this.cars[0].brain.initAll();
    this.cars.push(new Car(410, 450, (Math.PI * 3) / 2));
    this.cars[1].brain.initAll();
    this.cars.push(new Car(410, 450, (Math.PI * 3) / 2));
    this.cars[2].brain.initAll(); //
  }

  collisionForAllCars() {
    for (const car of this.cars) {
      if (car.isRolling) {
        if (this.collisionDetectionForElem(car)) {
          car.isRolling = false;
        }
      }
    }
  }

  collisionDetectionForElem(elem) {
    for (const square of this.land.tab) {
      if (square.isInside(elem)) return true;
    }
    return false;
  }

  deleteCar(index) {
    this.cars.splice(index, 1);
  }

  updateCars() {
    for (const car of this.cars) {
      if (car.isRolling) car.next();
    }
  }

  carDistanceLeft(elem, distance) {
    if (this.collisionDetectionForElem(elem)) return distance;
    distance += 1;
    if (distance > 300) return distance;
    const elemInner = {
      x: elem.x + Math.sin(elem.alpha),
      y: elem.y - Math.cos(elem.alpha),
      alpha: elem.alpha,
    };
    return this.carDistanceLeft(elemInner, distance);
  }

  carDistanceRight(elem, distance) {
    if (this.collisionDetectionForElem(elem)) return distance;
    distance += 1;
    if (distance > 300) return distance;
    const elemInner = {
      x: elem.x - Math.sin(elem.alpha),
      y: elem.y + Math.cos(elem.alpha),
      alpha: elem.alpha,
    };
    return this.carDistanceRight(elemInner, distance);
  }

  carDistanceInFront(elem, distance) {
    if (this.collisionDetectionForElem(elem)) return distance;
    distance += 1;
    if (distance > 300) return distance;
    const elemInner = {
      x: elem.x + Math.cos(elem.alpha),
      y: elem.y + Math.sin(elem.alpha),
      alpha: elem.alpha,
    };
    return this.carDistanceInFront(elemInner, distance);
  }

  carDistanceTopRight(elem, distance) {
    if (this.collisionDetectionForElem(elem)) return distance;
    distance += 1;
    if (distance > 300) return distance;
    const elemInner = {
      x: elem.x + Math.cos(elem.alpha + Math.PI / 4),
      y: elem.y + Math.sin(elem.alpha + Math.PI / 4),
      alpha: elem.alpha,
    };
    return this.carDistanceTopRight(elemInner, distance);
  }

  carDistanceTopLeft(elem, distance) {
    if (this.collisionDetectionForElem(elem)) return distance;
    distance += 1;
    if (distance > 300) return distance;
    const elemInner = {
      x: elem.x + Math.cos(elem.alpha - Math.PI / 4),
      y: elem.y + Math.sin(elem.alpha - Math.PI / 4),
      alpha: elem.alpha,
    };
    return this.carDistanceTopLeft(elemInner, distance);
  }

  playerInput(inputmanager) {
    if (inputmanager.tick() === "left") this.cars[0].turnLeft();
    if (inputmanager.tick() === "right") this.cars[0].turnRight();
    if (inputmanager.tick() === "up") this.cars[0].speedUp();
    if (inputmanager.tick() === "down") this.cars[0].speedDown();
  }

  EAprocess() {
    for (const car of this.cars) {
      if (car.isRolling) {
        car.brain.setValue(
          this.carDistanceLeft(car, 0),
          this.carDistanceRight(car, 0),
          this.carDistanceInFront(car, 0),
          this.carDistanceTopRight(car, 0),
          this.carDistanceTopLeft(car, 0),
          car.speed
        );
        car.brain.processAll();
        const resultDirection = car.brain.getResultDirection();
        const resultSpeed = car.brain.getResultSpeed();
        if (resultDirection === 1) car.turnLeft();
        if (resultDirection === 2) car.turnRight();
        if (resultSpeed === 1) car.speedUp();
        if (resultSpeed === 2) car.speedDown();
      }
    }
  }
}
