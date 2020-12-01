<template>
  <div id="annualReport">
    <slot name="header">
      <div class="modal-header">
        Annual Report:
      </div>
    </slot>

    <slot name="middle">
      <div class="modal-yourFirm">
        <span style="font-weight: bold; ">Your Firm: </span>
        <br />
        <div style="margin-top: 8px;">
          <ul style="list-style: none">
            <li>Value: {{ GameModel.yourFirmValue }}</li>
            <li>
              You made:
              {{ GameModel._offers.length }} offer
            </li>

            <li>
              You joined a coalition with:
              <span style="color: red; font-weight: bold">{{
                GameModel.yourFirmCoalition[0]
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="modal-coalitions">
        <span style="font-weight: bold">Groups Formed:</span>
        <div style="margin-top: 8px;">
          <ul style="list-style: none">
            <li v-for="(group, key) in GameModel._coalitions" :key="key">
              <div v-if="key === 0" style="color: red; font-weight: bold">
                {{ group }}
              </div>
              <div v-else>{{ group }}</div>
            </li>
          </ul>
        </div>
      </div>

      <div class="modal-values">
        <span style="font-weight: bold">Final Values For Firms: </span>
        <div style="margin-top: 8px">
          <ul style="list-style: none">
            <li v-for="(item, key) in GameModel.allFirmValues" :key="key">
              <div
                v-if="item[0] === 'Your Firm'"
                style="color: red; font-weight: bold"
              >
                {{ item[0] }} : {{ item[1] }}
              </div>
              <div v-else>{{ item[0] }} : {{ item[1] }}</div>
            </li>
          </ul>
        </div>
      </div>
    </slot>

    <slot name="foot">
      <router-link
        v-if="parseInt(this.$route.params.name) < 8"
        class="modal-next"
        :to="{
          name: 'round',
          params: { name: parseInt(this.$route.params.name) + 1 }
        }"
      >
        Next Round
      </router-link>

      <router-link v-else class="modal-next" to="/questionnaire">
        Next
      </router-link>
    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AnnualReport.vue",
  computed: {
    ...mapState(["GameModel"])
  }
};
</script>

<style scoped>
#annualReport {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.modal-header {
  color: black;
  font-family: AppleGothic;
  font-size: 25px;
  padding: 10px 10px 10px 10px;
  font-weight: bold;
  border-bottom: #555555 solid 1px;
  width: 320px;
}

.modal-yourFirm {
  font-family: AppleGothic;
  font-size: 17px;
  padding: 20px 10px 10px 10px;
  border-bottom: #555555 solid 1px;
  width: 320px;
}

.modal-values {
  font-family: AppleGothic;
  font-size: 17px;
  padding: 20px 10px 10px 10px;
  border-bottom: #555555 solid 1px;
  width: 320px;
}

.modal-coalitions {
  font-family: AppleGothic;
  font-size: 17px;
  padding: 20px 10px 10px 10px;
  border-bottom: #555555 solid 1px;
  width: 320px;
}

.modal-next {
  margin-top: 20px;
  border: none;
  outline: none;
  text-decoration: none;
  cursor: pointer;

  display: inline-block;
  padding: 5px 12px;
  background-color: #ccc;
  font-size: 20px;
}
</style>
