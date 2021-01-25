class Neurone {
  constructor(value) {
    this.value = value;
  }

  set(x) {
    this.value = x;
  }

  addValue(x) {
    this.value += x;
  }

  clone() {
    return new Neurone(this.value);
  }
}
