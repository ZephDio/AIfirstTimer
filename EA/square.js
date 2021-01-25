class Square {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.p1 = { x: x1, y: y1 };
    this.p2 = { x: x2, y: y2 };
    this.p3 = { x: x3, y: y3 };
    this.p4 = { x: x4, y: y4 };
    this.area = this.calculateAreaOfTriangle(x1, y1, x2, y2, x3, y3) + this.calculateAreaOfTriangle(x1, y1, x3, y3, x4, y4);
  }

  calculateAreaOfTriangle(x1, y1, x2, y2, x3, y3) {
    const side1 = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    const side2 = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
    const side3 = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));
    const s = (side1 + side2 + side3) / 2;
    return Math.sqrt(s * ((s - side1) * (s - side2) * (s - side3)));
  }

  isInside(elem) {
    const tri1 = this.calculateAreaOfTriangle(elem.x, elem.y, this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    if (tri1 > this.area) return false;
    const tri2 = this.calculateAreaOfTriangle(elem.x, elem.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    if (tri2 + tri1 > this.area) return false;
    const tri3 = this.calculateAreaOfTriangle(elem.x, elem.y, this.p4.x, this.p4.y, this.p3.x, this.p3.y);
    if (tri1 + tri2 + tri3 > this.area) return false;
    const tri4 = this.calculateAreaOfTriangle(elem.x, elem.y, this.p4.x, this.p4.y, this.p1.x, this.p1.y);
    if (tri1 + tri2 + tri3 + tri4 > this.area * 0.99 && tri1 + tri2 + tri3 + tri4 < this.area * 1.01) return true;
    return false;
  }
}
