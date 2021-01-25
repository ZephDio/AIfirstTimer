const canvasDom = document.querySelector("#canvas");
const ctx = canvasDom.getContext("2d");

function loop(looping) {
  const innerloop = () => {
    looping();
    requestAnimationFrame(innerloop);
  };
  innerloop();
}

class Render {
  constructor() {
    this.game = new Game();
    this.inputManager = new InputManager();
  }

  render() {
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
    this.drawLand();
    this.drawCars();
  }

  drawLand() {
    for (const square of this.game.land.tab) {
      ctx.beginPath();
      ctx.moveTo(square.p1.x, square.p1.y);
      ctx.lineTo(square.p2.x, square.p2.y);
      ctx.lineTo(square.p3.x, square.p3.y);
      ctx.lineTo(square.p4.x, square.p4.y);
      ctx.lineTo(square.p1.x, square.p1.y);
      ctx.stroke();
    }
  }

  drawCars() {
    let i = 0;
    for (const car of this.game.cars) {
      ctx.beginPath();
      ctx.strokeText("" + i, car.x, car.y);
      ctx.stroke();
      i++;
    }
  }
}
function N(index, number) {
  for (let i = 0; i < number; i++) {
    render.game.cars.push(render.game.cars[index].clone());
    render.game.cars[render.game.cars.length - 1].brain.mutate(9, 2);
  }
}

function C(i) {
  render.game.cars = render.game.cars.slice(i);
}

const render = new Render();
render.game.initGame();
render.game.loop(render.inputManager);
loop(() => {
  render.render();
});
