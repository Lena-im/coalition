<template xmlns:v-bind="http://www.w3.org/1999/html">
  <div id="proposeOffer">
    <slot name="left">
      <div id="participants">
        <form>
          <template v-for="firm in firms">
            <div v-if="firm.name === 'Your Firm'" :key="firm.firmId">
              <input
                type="checkbox"
                :key="firm.name"
                :firm="firm"
                checked
                disabled
              />
              {{ firm.name }}
            </div>
            <div v-else :key="firm.firmId">
              <input
                v-on:change="stateChange($event, firm)"
                type="checkbox"
                :key="firm.name"
                :firm="firm"
                class="firm.name"
              />
              {{ firm.name }}
            </div>
          </template>
        </form>
      </div>
    </slot>

    <slot name="middle">
      <div id="allocations">
        <form>
          <div>
            <div
              v-if="
                this.checkedFirms.length === 0 || this.checkedFirms.length === 1
              "
            >
              Your Firm
              <input type="number" disabled />
              Million Dollars
            </div>
            <div v-else>
              <template v-for="checkedFirm in this.checkedFirms">
                {{ checkedFirm.name }}
                <input
                  type="number"
                  v-on:change="allocate($event, checkedFirm)"
                  :key="checkedFirm.firmId"
                  v-model="sum[checkedFirm.firmId - 1]"
                  class="checkedFirm"
                  min="0"
                />
                Million Dollars
                <br :key="checkedFirm.name" />
              </template>
            </div>
          </div>
        </form>

        <div v-if="this.checkedFirms.length > 1">
          <span
            >Analysts predict the selected group will have a joint revenue of
            {{ coalitionRevenue }}
            Million Dollars</span
          >
          <br />
          <span>Left to allocate:</span>
          <br />
          <span id="rest" ref="restAllocate">
            {{ leftToAllocate }}
            Million Dollars</span
          >
        </div>
      </div>
    </slot>

    <slot name="right">
      <div id="completeOffer">
        <div v-if="ifAllow">
          <button @click="proposeOffer">Send Proposal</button>
          <button @click="close">Cancel</button>
        </div>
        <div v-else>
          <button disabled>Send Proposal</button>
          <button @click="close">Cancel</button>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProposeOffer",
  data: function() {
    return {
      checkedFirms: [],
      allocation: new Map(),
      allow: false,
      sum: []
    };
  },
  props: {
    firms: {
      type: Array,
      required: true
    }
  },
  methods: {
    close() {
      this.clearFirm();
      this.$emit("close");
    },
    addFirm(firm) {
      if (this.checkedFirms.length === 0) {
        this.$store.state.selectedRoundFirms.forEach(firm => {
          if (firm.name === "Your Firm") {
            this.checkedFirms.push(firm);
          }
        });
      }
      this.checkedFirms.push(firm);
    },
    removeFirm(firm) {
      this.$nextTick(() => {
        let index = this.checkedFirms.findIndex(
          checkedFirm => checkedFirm.firmId === firm.firmId
        );
        this.checkedFirms.splice(index, 1);
      });
    },
    clearFirm() {
      this.checkedFirms = [];
    },
    stateChange: function(event, firm) {
      if (event.target.checked) {
        this.addFirm(firm);
      } else {
        this.removeFirm(firm);
        this.sum = [];
      }
    },
    allocate: function(event, firm) {
      this.allocation.set(firm, event.target.value);
    },
    proposeOffer() {
      if (this.allocation.size !== this.checkedFirms.length) {
        this.$alert(
          "Please allocate gains for all firms.",
          "Warning",
          "warning"
        );
      } else {
        this.$store.dispatch("proposeOffer", this.allocation);
        this.clearFirm();
        this.$emit("close");

        let offer = this.GameModel._offers[this.GameModel._offers.length - 1];
        let that = this;
        setTimeout(function() {
          console.log("waiting for decision...");
          if (offer._signable === true) {
            that.$alert(
              "All Firms have found your term agreeable. You can either sign the contract to finalize it and end this turn or propose another offer",
              "All firms have responded to your offer "
            );
          } else {
            let allResponse = [];
            let num = offer._offerElements.length;
            for (let i = 1; i < num; i++) {
              if (offer._offerElements[i]._response === "ACCEPT") {
                allResponse.push(
                  offer._offerElements[i]._targetFirm.name +
                    " has accepted your offer." +
                    "\n"
                );
              } else {
                allResponse.push(
                  offer._offerElements[i]._targetFirm.name +
                    " has been communicating with other firms, and think it can do better than your offer of " +
                    offer._offerElements[i]._value +
                    " Million Dollars. " +
                    "\n"
                );
              }
            }
            that
              .$alert(
                allResponse.join("\n"),
                "All firms have responded to your offer "
              )
              .then(() => {
                if (that.GameModel._monthLeft === 3) {
                  that.$alert(
                    "There are only 3 months left before the end of the year.",
                    "Warning",
                    "warning"
                  );
                }
                if (that.GameModel._monthLeft === 1) {
                  that.$alert(
                    "This is the final month of the year. It is your last chance to propose an offer.",
                    "Warning",
                    "warning"
                  );
                }
                if (that.GameModel._monthLeft === 0) {
                  that.$alert(
                    "The year is complete; Either sign an existing offer (if any are available), or press Finish to end the year alone.",
                    "Warning",
                    "warning"
                  );
                }
              });
          }
        }, 2000);
      }
    }
  },
  computed: {
    ...mapState(["GameModel"]),
    leftToAllocate: function() {
      let totalAllocate = 0;
      this.sum.forEach(item => {
        if (item < 0) {
          this.$alert(
            "You cannot allocate negative gains",
            "Warning",
            "warning"
          );
        }
        if (item !== "" && item !== null) {
          totalAllocate += parseInt(item);
        }
      });

      return this.coalitionRevenue - totalAllocate;
    },
    coalitionRevenue: function() {
      return this.GameModel._objectiveFunctions.coalitionRevenue(
        this.checkedFirms
      );
    },
    ifAllow: function() {
      if (this.leftToAllocate >= 0 && this.checkedFirms.length > 1) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
#proposeOffer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#participants {
  width: 30%;
  display: flex;
  justify-content: center;
}

#participants > form > div {
  padding-bottom: 10px;
}

#allocations {
  width: 50%;
}

#completeOffer {
  width: 20%;
  margin-left: 20px;
}
#completeOffer > div > button {
  flex-direction: row;
  margin-bottom: 15px;

  border: none;
  outline: none;
  text-decoration: none;
  cursor: pointer;

  display: inline-block;
  padding: 5px 12px;
  background-color: #ccc;
  font-size: 15px;
}

/*#completeOffer > div > button:hover {*/
/*  background-color: black;*/
/*  color: white;*/
/*}*/
</style>
