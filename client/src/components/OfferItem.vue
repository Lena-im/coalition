<template>
  <div>
    <section id="offerTable">
      <table>
        <tr>
          <td rowspan="4">Proposed by <br />your Firm</td>
          <td
            v-for="element in offer._offerElements"
            :key="element.targetFirm.firmId"
          >
            {{ element._targetFirm.name }}
          </td>
          <td rowspan="3" v-show="offer._signable === true">
            <button @click="signContract(offer)">Sign Contract</button>
          </td>
          <td rowspan="3" v-show="offer._signable === false">
            <button disabled>Sign Contract</button>
          </td>
        </tr>
        <tr>
          <td
            v-for="element in offer._offerElements"
            :key="element.targetFirm.firmId"
          >
            {{ element._value }}
          </td>
        </tr>
        <tr>
          <td
            v-for="element in offer._offerElements"
            :key="element.targetFirm.firmId"
          >
            <img
              class="response"
              :src="
                require('@/assets/images/' +
                  responseImageName(element._response))
              "
              :alt="element._response"
              style="height: 30px"
            />
          </td>
        </tr>
      </table>
    </section>

    <section id="annualReport">
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal"></div>
      </transition>
      <transition name="slide" appear>
        <div class="report" v-if="showModal">
          <annual-report @close="showModal = false"> </annual-report>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AnnualReport from "@/components/AnnualReport";

export default {
  name: "Offers",
  data: function() {
    return {
      showModal: false
    };
  },
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  components: {
    AnnualReport
  },
  methods: {
    responseImageName: function(respone) {
      let name = respone.toLowerCase();
      return `${name}.png`;
    },
    signContract(offer) {
      this.$confirm(
        "Signing the contract will finalize your score and end this round. Are you sure you'd like to sign the contract?"
      ).then(() => {
        // let summary = this.$store.dispatch("signOffer", offer);
        this.$store.dispatch("signOffer", offer);
        this.showModal = true;
      });
    }
  },
  computed: {
    ...mapState(["GameModel"])
  }
};
</script>

<style scoped>
#offerTable {
  display: flex;
  justify-content: center;
  width: 700px;
  height: auto;
  margin: 5px;
  border: black solid 1px;
}

table > tr > td {
  padding-left: 30px;
}

button {
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  display: inline-block;
  padding: 5px 15px;
  background-color: #ccc;

  font-size: 15px;
}

button:hover {
  background-color: black;
  color: white;
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

/*.fade-enter-active,*/
/*.fade-leave-active {*/
/*  transition: opacity 0.5s;*/
/*}*/

/*.fade-enter,*/
/*.fade-leave-to {*/
/*  opacity: 0;*/
/*}*/

/*.slide-enter-active,*/
/*.slide-leave-active {*/
/*  transition: transform 0.5s;*/
/*}*/

/*.slide-enter,*/
/*.slide-leave-to {*/
/*  transform: translateY(-50%) translateX(100vw);*/
/*}*/
</style>
