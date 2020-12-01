class FirmPlayer {
  constructor(firm) {
    this._firm = firm;
    this._value = 0;
    this._bestValue = 0;
    this._signed = false;
  }

  get firm() {
    return this._firm;
  }

  get value() {
    return this._value;
  }

  get response() {
    return this._response;
  }

  setValue(value) {
    this._value = value;
    this._bestValue = value;
  }

  updateBestValue(value) {
    this._bestValue = value;
  }

  get firmId() {
    return this._firm.firmId;
  }

  get name() {
    return this._firm.name;
  }

  get isUpstream() {
    return this._firm.upstream;
  }

  get quantity() {
    return this._firm.quantity;
  }

  get tech() {
    return this._firm.tech;
  }
  get cost() {
    return this._firm.cost;
  }

  get market() {
    return this._firm.market;
  }

  get coalition() {
    return this._firm.coalition;
  }

  updateCoalition(coalition) {
    this._firm.coalition = coalition;
  }

  toJson() {
    return {
      firm: this._firm,
      value: this._value,
      bestValue: this._bestValue
    };
  }
}

export { FirmPlayer };
