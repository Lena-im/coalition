import { OfferElement } from "@/models/OfferElement";

class Offer {
  constructor() {
    this._offerElements = []; //an array of FirmPlayers object.
    this._signable = false;
    this._signed = false;
  }

  offerElements() {
    return this._offerElements;
  }

  /*
   * Items should be an 2d array, the format is [[firm, value],[firm,value]]
   * The length of this array at least 2
   */
  createOffer(map) {
    map.forEach((value, firm) => {
      let element = new OfferElement(firm, value);
      this._offerElements.push(element);
    });
  }

  getPlayerValue(player) {
    let element = this._offerElements.find(
      element => element.targetFirm() === player
    );
    return element.getValue();
  }

  signable() {
    return this._signable;
  }

  // sign() {
  //   this._signed = true;
  // }
}
export { Offer };
