/*
 * Include all the calculations, include each firm value, coalition revenue, shapley value.
 */

class ObjectiveFunction {
  constructor(round, firms) {
    this._round = round;
    this._firms = firms;
  }

  get id() {
    return this._round.roundId;
  }

  get gamma() {
    return this._round.gamma;
  }

  get delta() {
    return this._round.delta;
  }

  get upstreamFirms() {
    let upstreamFirms = [];
    this._firms.forEach(firm => {
      if (firm.isUpstream) {
        upstreamFirms.push(firm);
      }
    });
    return upstreamFirms;
  }

  get downstreamFirms() {
    let downstreamFirms = [];
    this._firms.forEach(firm => {
      if (!firm.isUpstream) {
        downstreamFirms.push(firm);
      }
    });
    return downstreamFirms;
  }

  /*
   * Calculate the total revenue for a coalition.
   */
  coalitionRevenue(coalition) {
    let coalitionRevenue = 0;
    let loss = Math.pow(this.delta, coalition.length - 1);

    if (this.downstreamCoalition(coalition).length === 0) {
      coalitionRevenue =
        this.maxTech(this.upstreamCoalition(coalition)) *
        this.sumQuantity(this.upstreamCoalition(coalition)) *
        this.averageCost(this.downstreamCoalition(coalition)) *
        (this.averageMarket * this.upstreamCoalition(coalition).length) *
        loss;
      return Math.round(coalitionRevenue);
    } else if (this.upstreamCoalition(coalition).length === 0) {
      coalitionRevenue =
        this.maxCost(this.downstreamCoalition(coalition)) *
        this.sumMarket(this.downstreamCoalition(coalition)) *
        this.averageTech(this.upstreamCoalition(coalition)) *
        (this.averageQuantity * this.downstreamCoalition(coalition).length) *
        loss;
      return Math.round(coalitionRevenue);
    } else {
      coalitionRevenue =
        this.maxTech(this.upstreamCoalition(coalition)) *
        this.sumQuantity(this.upstreamCoalition(coalition)) *
        this.maxCost(this.downstreamCoalition(coalition)) *
        this.sumMarket(this.downstreamCoalition(coalition)) *
        (1 + this.gamma) *
        loss;
      return Math.round(coalitionRevenue);
    }
  }

  upstreamCoalition(coalition) {
    let upstreamCoalition = [];
    coalition.forEach(firm => {
      if (firm.upstream) {
        upstreamCoalition.push(firm);
      }
    });
    return upstreamCoalition;
  }

  downstreamCoalition(coalition) {
    let downstreamCoalition = [];
    coalition.forEach(firm => {
      if (!firm.upstream) {
        downstreamCoalition.push(firm);
      }
    });
    return downstreamCoalition;
  }

  sumQuantity(upstreamCoalition) {
    let sumQuantity = 0;
    upstreamCoalition.forEach(coalition => {
      sumQuantity = coalition.quantity + sumQuantity;
    });
    return sumQuantity;
  }

  sumMarket(downstreamCoalition) {
    let sumMarket = 0;
    downstreamCoalition.forEach(coalition => {
      sumMarket = coalition.market + sumMarket;
    });
    return sumMarket;
  }

  maxCost(downstreamCoalition) {
    let maxCost = 0;
    downstreamCoalition.forEach(coalition => {
      maxCost = Math.max(maxCost, coalition.cost);
    });
    return maxCost;
  }

  maxTech(upstreamCoalition) {
    let maxTech = 0;
    upstreamCoalition.forEach(coalition => {
      maxTech = Math.max(maxTech, coalition.tech);
    });
    return maxTech;
  }

  get averageQuantity() {
    let sumQuantity = 0;
    let count = 0;
    this.upstreamFirms.forEach(firm => {
      sumQuantity += firm.quantity;
      count++;
    });
    return sumQuantity / count;
  }

  averageTech(upstreamCoalition) {
    let sumTech = 0;
    let count = 0;

    if (upstreamCoalition.length === 0) {
      this._firms.forEach(firm => {
        if (firm.isUpstream) {
          sumTech += firm.tech;
          count++;
        }
      });
      return sumTech / count;
    } else {
      let tmp1 = upstreamCoalition.length / 3;
      let tmp2 = (3 - upstreamCoalition) / 3;
      let maxTech = 0;
      upstreamCoalition.forEach(coalition => {
        maxTech = Math.max(coalition.tech, maxTech);
      });
      let singleFirm = this.upstreamFirms.find(
        firm => !upstreamCoalition.includes(firm._firm)
      );

      sumTech = tmp1 * maxTech + tmp2 * singleFirm.tech;
      return sumTech;
    }
  }

  get averageMarket() {
    let sumMarket = 0;
    let count = 0;
    this.downstreamFirms.forEach(firm => {
      sumMarket += firm.market;
      count++;
    });
    return sumMarket / count;
  }

  averageCost(downstreamCoalition) {
    let sumCost = 0;

    if (downstreamCoalition.length === 0) {
      this._firms.forEach(firm => {
        if (!firm.isUpstream) {
          sumCost = firm.cost + sumCost;
        }
      });
      return sumCost / 3;
    } else {
      let tmp1 = downstreamCoalition.length / 3;
      let tmp2 = (3 - downstreamCoalition) / 3;
      let maxCost = 0;
      downstreamCoalition.forEach(coalition => {
        maxCost = Math.max(coalition.cost, maxCost);
      });
      let singleFirm = this.downstreamFirms.find(
        firm => !downstreamCoalition.includes(firm._firm)
      );

      sumCost = tmp1 * maxCost + tmp2 * singleFirm.cost;
      return sumCost;
    }
  }

  /*
   * All the functions related to get shapley Value
   */

  getShapleyValue(Firms, player) {
    if (Firms.length === 1) {
      return this.coalitionRevenue(Firms);
    } else {
      let sum = 0;
      let coalitions = this.getAllSubsetsWithoutPlayer(Firms, player); //get a set of coalitions without player
      coalitions.forEach(subset => {
        let term = this.shapleyTerm(Firms, subset, player);
        sum = sum + term;
      });
      return sum;
    }
  }

  shapleyTerm(coalition, subset, player) {
    //coalition:array of FirmPlayer object, subset: array of FirmPlayer object, player: FirmPlayer Object
    let S = subset.length;
    let n = coalition.length;

    let scale = (this.fact(S) * this.fact(Math.abs(n - S - 1))) / this.fact(n);

    let augmentSet = [...subset];
    // subset.forEach(firm => {
    //   augmentSet.push(firm);
    // });
    augmentSet.push(player);

    let augment = this.coalitionRevenue(augmentSet);
    let base = this.coalitionRevenue(subset);

    let functionTerm = augment - base;
    return scale * functionTerm;
  }

  getAllSubsetsWithoutPlayer(Firms, player) {
    let playerIndex = Firms.findIndex(firm => firm.firmId === player.firmId);
    let newFirms = [...Firms];
    if (playerIndex !== -1) {
      newFirms.splice(playerIndex, 1);
    }
    return this.getCombinations(newFirms);
  }

  getThreshold(Firms, firm) {
    return this.getBestScoreAnySize(Firms, firm);
  }

  getBestScoreAnySize(Firms, firm) {
    let s = this.getSortedShapleys(Firms, firm);
    return this.getShapleyValue(s[s.length - 1], firm);
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

  getAllSubsetsAllSizes(AllFirms, firm) {
    let allSubset = [];
    for (let i = 0; i < AllFirms.length; i++) {
      let x = this.getAllSubsets(AllFirms, firm, i);
      x.forEach(firmset => {
        // let score = this.getShapleyTotal(firmset);
        allSubset.push(firmset);
      });
    }
    return allSubset;
  }

  /**
   * Return all possible subsets of the specified size that contain the specified firm
   */
  getAllSubsets(Firms, firm, size) {
    let x = this.getCombinations(Firms);
    let out = [];
    x.forEach(coalition => {
      if (coalition.includes(firm) && coalition.length === size) {
        out.push(coalition);
      }
    });
    return out;
  }

  getShapleyTotal(coalition) {
    let sum = 0;
    coalition.forEach(firm => {
      sum = sum + this.getShapleyValue(coalition, firm);
    });
    return sum;
  }

  fact(n) {
    if (n == 0 || n == 1) {
      return 1;
    } else {
      return n * this.fact(n - 1);
    }
  }

  getCombinations(Firms) {
    let all = [];
    for (var i = 0; i < Firms.length; i++) {
      this.fn(i, Firms, [], all);
    }
    all.push(Firms);
    all.push([]);
    return all;
  }

  fn(n, src, got, all) {
    if (n === 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (let j = 0; j < src.length; j++) {
      this.fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  }
}

export { ObjectiveFunction };
