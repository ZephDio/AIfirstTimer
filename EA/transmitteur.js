class Transmitteur {
  constructor(value) {
    this.value = value;
  }

  setValue(x) {
    this.value = x;
  }

  transmit(x) {
    return this.value * x;
  }

  clone() {
    return new Transmitteur(this.value);
  }
}
