<template>
  <div id="game">
    <div id="head">
      <h1 v-if="$store.state.selectedRoundId <= 2">
        Round {{ $store.state.selectedRoundId }} : Practice
      </h1>
      <h1 v-else>Round {{ $store.state.selectedRoundId }}: Actual</h1>
    </div>

    <div id="upperGameUI">
      <div id="Offers">
        <span>Offers</span>
        <offers></offers>
      </div>
      <div id="yourFirm">
        <span>Your Firm</span>
        <template v-for="firm in $store.state.selectedRoundFirms">
          <firm
            :key="firm.id"
            :firm="firm"
            v-if="firm.name === 'Your Firm'"
          ></firm>
        </template>

        <div id="proposeOffer">
          <button
            v-if="$store.state.GameModel._monthLeft > 0"
            @click="showModal = true"
          >
            Propose Offer
          </button>
          <button v-else @click="endRound">Finish</button>

          <transition name="fade" appear>
            <div class="modal-overlay" v-if="showModal"></div>
          </transition>
          <transition name="slide" appear>
            <div class="offerOptions" v-if="showModal">
              <propose-offer
                @close="showModal = false"
                :firms="$store.state.selectedRoundFirms"
              ></propose-offer>
            </div>
          </transition>
          {{ months[$store.state.GameModel._monthLeft - 1] }}
          <div>Month Left: {{ $store.state.GameModel._monthLeft }}</div>
        </div>
      </div>
    </div>

    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showReport"></div>
    </transition>
    <transition name="slide" appear>
      <div class="report" v-if="showReport">
        <annual-report @close="showReport = false"></annual-report>
      </div>
    </transition>

    <div id="lowerGameUI">
      <firm-list :firms="$store.state.selectedRoundFirms"></firm-list>
    </div>
  </div>
</template>

<script>
import Offers from "@/components/Offers";
import FirmList from "@/components/FirmList";
import Firm from "@/components/Firm";
import ProposeOffer from "@/components/ProposeOffer";
import ApiService from "@/services/ApiService";
import AnnualReport from "@/components/AnnualReport";

export default {
  name: "game",
  components: {
    ProposeOffer,
    Offers,
    FirmList,
    Firm,
    AnnualReport
  },
  data: function() {
    return {
      showModal: false,
      showReport: false,
      playerIndex: 1,
      months: [
        "December",
        "November",
        "October",
        "September",
        "August",
        "July",
        "June",
        "May",
        "April",
        "March",
        "February",
        "January"
      ]
    };
  },
  created() {
    this.$store.dispatch("selectedRoundId", this.$route.params.name);
    this.$store.dispatch("fetchSelectedRound", this.$route.params.name);
    this.$store.dispatch("fetchSelectedRoundFirms");
  },
  methods: {
    fetchPlayerIndex(roundId) {
      const vm = this;
      ApiService.fetchPlayerIndex(roundId)
        .then(data => {
          console.log("Data" + data);
          vm.playerIndex = data;
        })
        .catch(reason => {
          console.log("Error " + reason);
        });
    },
    endRound() {
      this.$store.dispatch("completeGameWithoutSign");
      this.showReport = true;
    }
  }
};
</script>

<style scoped>
#game {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

#upperGameUI {
  border: 1px solid black;
  display: flex;
  flex-direction: row;
}

#Offers {
  border: 1px solid black;
  padding-right: 20px;
  margin: 15px;
  padding: 10px;

  max-height: 400px;
  width: 800px;
  overflow-y: scroll;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.offerOptions {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 100%;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 10px;

  padding: 25px;
}

.report {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 10px;

  padding: 25px;
}

#proposeOffer {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}

#Offers span {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0px 0px 20px;
}

#yourFirm {
  padding: 30px 10px 10px 50px;
  margin-left: 50px;
}

#yourFirm span {
  font-size: 20px;
  font-weight: bold;
  margin-left: -50px;
}

#yourFirm button {
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  display: inline-block;
  padding: 8px 20px;
  background-color: #ccc;

  color: #1a1a1a;
  font-size: 17px;
}

#yourFirm button:hover {
  background-color: black;
  color: white;
}
</style>
