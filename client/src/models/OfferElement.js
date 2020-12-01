class OfferElement {
  constructor(firm, value) {
    this._targetFirm = firm;
    this._value = value;
    this._response = "THINKING";
  }

  getResponse() {
    return this._response;
  }

  getValue() {
    return this._value;
  }

  targetFirm() {
    return this._targetFirm;
  }

  updateResponse(response) {
    this._response = response;
  }
}

export { OfferElement };
