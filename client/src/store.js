import Vue from "vue";
import Vuex from "vuex";
import ApiService from "@/services/ApiService";
import { GameModel } from "@/models/GameModel";
// import { Round } from "@/models/Round";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rounds: [],
    selectedRound: null,
    selectedRoundId: 1,
    selectedRoundFirms: [],
    GameModel: new GameModel()
  },
  mutations: {
    SET_ROUNDS(state, rounds) {
      state.rounds = rounds;
    },
    SET_SELECTED_ROUND(state, selectedRound) {
      state.selectedRound = selectedRound;
    },
    SELECTED_ROUND_ID(state, roundId) {
      state.selectedRoundId = roundId;
    },
    SET_SELECTED_ROUND_FIRMS(state, firms) {
      state.selectedRoundFirms = firms;
    },
    SET_ROUND_DATA(state, selectedRound) {
      state.GameModel.setRound(selectedRound);
    },
    ADD_FIRMS(state, firms) {
      state.GameModel.addFirms(firms);
    },
    SET_OBJECTIVE_FUNCTION(state) {
      state.GameModel.setObjectiveFunctions();
    },
    SET_FIRM_VALUE(state) {
      state.GameModel.setFirmValue();
    },
    GET_COALITION_REVENUE(state, coalitions) {
      state.GameModel._objectiveFunctions(coalitions);
    },
    PROPOSE_OFFER(state, offer) {
      state.GameModel.createOffer(offer);
    },
    SIGN_OFFER(state, offer) {
      state.GameModel.signOffer(offer);
    },
    COMPLETE_GAME_WITHOUT_SIGN(state) {
      state.GameModel.completeGameWithoutSign();
    }
  },
  actions: {
    fetchRounds: context => {
      ApiService.fetchRounds()
        .then(json => context.commit("SET_ROUNDS", json))
        .catch(reason => console.log("Error: ", +reason));
    },
    selectedRoundId(context, roundId) {
      context.commit("SELECTED_ROUND_ID", roundId);
    },
    fetchSelectedRound: context => {
      ApiService.fetchSelectedRound(context.state.selectedRoundId)
        .then(json => {
          context.commit("SET_SELECTED_ROUND", json);
          context.commit("SET_ROUND_DATA", json);
        })
        .catch(reason => console.log("Error: ", +reason));
    },
    fetchSelectedRoundFirms: context => {
      ApiService.fetchSelectedRoundFirms(context.state.selectedRoundId)
        .then(json => {
          context.commit("SET_SELECTED_ROUND_FIRMS", json);
          context.commit("ADD_FIRMS", json);
          context.commit("SET_FIRM_VALUE");
          context.commit("SET_OBJECTIVE_FUNCTION");
        })
        .catch(reason => console.log("Error: " + reason));
    },
    getCoalitionRevenue(context, coalition) {
      context.commit("GET_COALITION_REVENUE", coalition);
    },
    proposeOffer(context, offer) {
      context.commit("PROPOSE_OFFER", offer);
    },
    signOffer(context, offer) {
      context.commit("SIGN_OFFER", offer);
    },
    completeGameWithoutSign(context) {
      context.commit("COMPLETE_GAME_WITHOUT_SIGN");
    }
  }
});
