class Neuronal {
  constructor() {
    this.layer1 = [new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0)];
    this.transmitteurArray1 = [];
    this.layer2 = [new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0)];
    this.transmitteurArray2 = [];
    this.layer3 = [new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0)];
    this.transmitteurArray3 = [];
    this.layer4 = [new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0), new Neurone(0)];
  }

  init(origineLayer, secondeLayer, targetTransmitteur) {
    for (const neurone of origineLayer) {
      const tab = [];
      for (const neurone of secondeLayer) {
        tab.push(new Transmitteur(Math.round(Math.random() * 100) / 10 - 5));
      }
      targetTransmitteur.push(tab);
    }
  }

  initAll() {
    this.init(this.layer2, this.layer1, this.transmitteurArray1);
    this.init(this.layer3, this.layer2, this.transmitteurArray2);
    this.init(this.layer4, this.layer3, this.transmitteurArray3);
  }

  setValue(distanceLeft, distanceRight, distanceInfront, distanceTopRight, distanceTopLeft, speed) {
    this.layer1[0].set(distanceLeft);
    this.layer1[1].set(distanceRight);
    this.layer1[2].set(distanceInfront);
    this.layer1[3].set(distanceTopRight);
    this.layer1[4].set(distanceTopLeft);
    this.layer1[5].set(speed);
  }

  process(origineLayer, transmittors, targetLayer) {
    for (let i = 0; i < transmittors.length; i++) {
      targetLayer[i].set(0);
      for (let j = 0; j < transmittors[i].length; j++) {
        targetLayer[i].addValue(transmittors[i][j].transmit(origineLayer[j].value));
      }
    }
  }

  processAll() {
    this.process(this.layer1, this.transmitteurArray1, this.layer2);
    this.process(this.layer2, this.transmitteurArray2, this.layer3);
    this.process(this.layer3, this.transmitteurArray3, this.layer4);
  }

  getResultDirection() {
    const out = Math.max(...[this.layer4[0].value, this.layer4[1].value, this.layer4[2].value]);
    switch (out) {
      case this.layer4[0].value:
        return 0;
        break;
      case this.layer4[1].value:
        return 1;
        break;
      case this.layer4[2].value:
        return 2;
        break;
      default:
        return 3;
    }
  }

  getResultSpeed() {
    const out = Math.max(...[this.layer4[3].value, this.layer4[4].value, this.layer4[5].value]);
    switch (out) {
      case this.layer4[3].value:
        return 0;
        break;
      case this.layer4[4].value:
        return 1;
        break;
      case this.layer4[5].value:
        return 2;
        break;
      default:
        return 3;
    }
  }

  mutateTransmitteurArray(transmitteurArray, number, variante) {
    for (const transmitteurs of transmitteurArray) {
      for (const transmitteur of transmitteurs) {
        if (number === Math.ceil(Math.random() * number)) {
          transmitteur.setValue(transmitteur.value + (Math.random() * variante - variante / 2));
        }
      }
    }
  }

  mutate(number, variante) {
    this.mutateTransmitteurArray(this.transmitteurArray1, number, variante);
    this.mutateTransmitteurArray(this.transmitteurArray2, number, variante);
    this.mutateTransmitteurArray(this.transmitteurArray3, number, variante);
  }

  cloneArray(array) {
    let clone = [];
    for (let item of array) {
      console.log(item);
      clone.push(item.clone());
    }
    return clone;
  }

  cloneTransmitter(array) {
    let clone = [];
    for (let item of array) {
      clone.push(this.cloneArray(item));
    }
    return clone;
  }

  clone() {
    const clone = new Neuronal();

    clone.layer1 = this.cloneArray(this.layer1);
    clone.layer2 = this.cloneArray(this.layer2);
    clone.layer3 = this.cloneArray(this.layer3);
    clone.layer4 = this.cloneArray(this.layer4);

    clone.transmitteurArray1 = this.cloneTransmitter(this.transmitteurArray1);
    clone.transmitteurArray2 = this.cloneTransmitter(this.transmitteurArray2);
    clone.transmitteurArray3 = this.cloneTransmitter(this.transmitteurArray3);

    return clone;
  }
}
