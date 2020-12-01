import { ObjectiveFunction } from "@/models/ObjectiveFunction";
import { FirmPlayer } from "@/models/FirmPlayer";
import { Offer } from "@/models/Offer";

class GameModel {
  constructor() {
    this._firms = [];
    this._allFirms = [];
    this._round = null;
    this._objectiveFunctions = null;
    this._monthLeft = 12; // propose at most 12 offer for each round
    this._offers = []; //array of offer object; contain at most 12 offer.
    this._coalitions = [];
  }

  get yourFirmValue() {
    let index = this._firms.findIndex(firm => firm.name === "Your Firm");
    return this._firms[index]._value;
  }

  get yourFirmCoalition() {
    let coalition = [];

    this._coalitions[0].forEach(name => {
      if (name !== "Your Firm") {
        coalition.push(name);
      }
    });

    return coalition;
  }

  get allFirmValues() {
    let values = {};
    this._firms.forEach(firm => {
      values[firm.name] = firm.value;
    });
    let items = Object.keys(values).map(function(key) {
      return [key, values[key]];
    });
    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    return items;
  }

  /*
   * Experiment setup
   */
  setRound(round) {
    this._round = null;
    this._round = round;
    this._coalitions = [];
    this._offers = [];
    this._monthLeft = 12;
    this._allFirms = [];
  }

  addFirms(firms) {
    this._firms = [];
    this._allFirms = [];
    firms.forEach(firm => {
      this._allFirms.push(firm);
      let newFirm = new FirmPlayer(firm);
      this._firms.push(newFirm);
    });
  }

  setFirmValue() {
    let averageQuantity = 0;
    let averageTech = 0;
    let averageMarket = 0;
    let averageCost = 0;
    this._firms.forEach(firm => {
      if (firm.isUpstream) {
        averageQuantity += firm.quantity;
        averageTech += firm.tech;
      } else {
        averageMarket += firm.market;
        averageCost += firm.cost;
      }
    });

    averageTech = averageTech / 3;
    averageQuantity = averageQuantity / 3;
    averageMarket = averageMarket / 3;
    averageCost = averageCost / 3;

    this._firms.forEach(firm => {
      if (firm.isUpstream) {
        firm.setValue(
          Math.round(averageCost * averageMarket * firm.quantity * firm.tech)
        );
      } else {
        firm.setValue(
          Math.round(averageTech * averageQuantity * firm.market * firm.cost)
        );
      }
    });
  }

  setObjectiveFunctions() {
    this._objectiveFunctions = new ObjectiveFunction(this._round, this._firms);
  }

  updateMonthLeft() {
    if (this._monthLeft > 0) {
      this._monthLeft--;
    }
  }

  getOffers() {
    return this._offers;
  }

  /*
   * Items should be an 2d array, the format is [[firm, value],[firm,value]]
   * The length of this array at least 2
    TODO: 6. Record the user step.
  */

  completeGameWithoutSign() {
    let target = this._firms.findIndex(firm => firm.name === "Your Firm");
    this._firms[target]._signed = true;

    let summary = [];
    summary.push(["Your Firm"]);
    let coalitions = this.getBestRemainingCoalitions();

    coalitions.forEach(coalition => {
      let name = [];
      coalition.forEach(firms => {
        name.push(firms.name);
      });
      summary.push(name);
    });
    this._coalitions = [...summary];
  }

  createOffer(map) {
    this.updateMonthLeft();
    let offer = new Offer();
    offer.createOffer(map);
    let coalition = [];
    offer._offerElements.forEach(element => {
      coalition.push(element._targetFirm.name);
      if (element._targetFirm.name === "Your Firm") {
        setTimeout(function() {
          element._response = "ACCEPT";
        }, 2000);
      } else {
        let threshold = this._objectiveFunctions.getThreshold(
          this._allFirms,
          element._targetFirm
        );
        let targetFirm = this._firms.findIndex(
          firm => firm.name === element._targetFirm.name
        );
        let bestValue = this._firms[targetFirm]._bestValue;
        if (bestValue > threshold) {
          threshold = bestValue;
        }
        if (element._value >= threshold) {
          this._firms[targetFirm]._bestValue = element._value;
          setTimeout(function() {
            element._response = "ACCEPT";
          }, 2000);
        } else {
          setTimeout(function() {
            element._response = "REJECT";
          }, 2000);
        }
      }
    });

    let that = this;
    setTimeout(function() {
      offer._signable = that.isAccepted(offer);
    }, 2000);

    this._offers.push(offer);
    this._coalitions.push(coalition);
  }

  signOffer(offer) {
    let yourCoalition = [];
    let summary = [];
    offer._signed = true;
    offer._offerElements.forEach(element => {
      yourCoalition.push(element._targetFirm.name);
      let index = this._firms.findIndex(
        firm => firm.firmId === element._targetFirm.firmId
      );
      this._firms[index]._signed = true;
      this._firms[index]._value = element._value;
    });

    let coalitions = this.getBestRemainingCoalitions();

    summary.push(yourCoalition);
    coalitions.forEach(coalition => {
      if (coalition.length > 1) {
        coalition.forEach(firm => {
          let idx = this._firms.findIndex(find => find.firmId === firm.firmId);
          this._firms[idx]._value = this._objectiveFunctions.getShapleyValue(
            coalition,
            firm
          );
        });
      }
      let name = [];
      coalition.forEach(firms => {
        name.push(firms.name);
      });
      summary.push(name);
    });
    this._coalitions = [...summary];
    return summary;
  }

  isAccepted(offer) {
    let l = offer._offerElements.length;
    for (let i = 0; i < l; i++) {
      if (offer._offerElements[i]._response !== "ACCEPT") {
        return false;
      }
    }
    let index = this._firms.findIndex(firm => firm.name === "Your Firm");
    if (offer._offerElements[0]._value > this._firms[index]._value) {
      this._firms[index]._value = offer._offerElements[0]._value;
    }
    return true;
  }

  getBestOffer(player) {
    let max = 0;
    let bestOffer = null;
    this._offers.forEach(offer => {
      let tmpValue = offer.getPlayerValue(player);
      if (offer.isAccepted && tmpValue > max) {
        max = player.getValue;
        bestOffer = offer;
      }
    });
    return bestOffer;
  }

  getBestScore(player) {
    return this.getBestOffer().getPlayerValue(player);
  }

  getBestRemainingCoalitions() {
    let remaining = this.getUnsignedPlayers();
    let coalitions = [];
    while (remaining.length > 0) {
      let best = this.getBestRemainingCoalition(remaining);
      coalitions.push(best);

      let newRemaining = [...remaining];
      best.forEach(firm => {
        let index = remaining.findIndex(remain => remain.name === firm.name);
        newRemaining.splice(index, 1);
        remaining = newRemaining;
      });
      remaining = [...newRemaining];
    }
    return coalitions;
  }

  getUnsignedPlayers() {
    let a = [];
    this._firms.forEach(firm => {
      if (firm._signed === false) {
        a.push(firm.firm);
      }
    });
    return a;
  }

  getBestRemainingCoalition(Firms) {
    let x = this._objectiveFunctions.getCombinations(Firms);
    let that = this;
    x.sort(function(o1, o2) {
      let value1 = that.getScorePerFirm(o1);
      let value2 = that.getScorePerFirm(o2);
      return value1 - value2;
    });
    return x[x.length - 1];
  }

  getScorePerFirm(coalition) {
    let score =
      this._objectiveFunctions.coalitionRevenue(coalition) / coalition.length;
    if (coalition.length === 0) {
      score = 0;
    }
    return score;
  }

  getSortedShapleys(Firms, firm) {
    let s = this.getAllSubsetsAllSizes(Firms, firm);
    let that = this;
    s.sort(function(firm1, firm2) {
      let value1 = that.getShapleyValue(firm1, firm);
      let value2 = that.getShapleyValue(firm2, firm);
      return value1 - value2;
    });
    return s;
  }
}

export { GameModel };
