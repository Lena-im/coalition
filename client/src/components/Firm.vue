<template>
  <div id="firmBlock">
    <div class="image">
      <img
        v-if="firm.coalition === '1'"
        class="firmImage"
        :src="require('@/assets/images/' + firmImage(firm))"
        :alt="firm.name"
        style="height: 80px; width: 80px; border: red solid 5px;"
      />
      <img
        v-else-if="firm.coalition === '2'"
        class="firmImage"
        :src="require('@/assets/images/' + firmImage(firm))"
        :alt="firm.name"
        style="height: 80px; width: 80px; border: blue solid 5px;"
      />
      <img
        v-else-if="firm.coalition === '3'"
        class="firmImage"
        :src="require('@/assets/images/' + firmImage(firm))"
        :alt="firm.name"
        style="height: 80px; width: 80px; border: green solid 5px;"
      />
      <img
        v-else
        class="firmImage"
        :src="require('@/assets/images/' + firmImage(firm))"
        :alt="firm.name"
        style="height: 80px; width: 80px;"
      />

      <div class="barChart">
        <chart :options="chartOptionsBar"></chart>
      </div>
    </div>

    <div class="firmAttributes">
      <div v-if="firm.upstream">
        <span style="font-weight: bold">{{ firm.name }}</span>
        <ul>
          <li>
            Value:
            {{ $store.state.GameModel._firms[(firm.firmId % 6) - 1]._value }}
            Million Dollars
          </li>
          <li>Quantity:{{ firm.quantity }}</li>
          <li>Technology: {{ firm.tech }}</li>
        </ul>
      </div>
      <div v-else>
        <span style="font-weight: bold">{{ firm.name }}</span>
        <ul>
          <li>
            Value:
            {{ $store.state.GameModel._firms[(firm.firmId - 1) % 6]._value }}
            Million Dollars
          </li>
          <li>Marketing:{{ firm.market }}</li>
          <li>Cost Efficiency: {{ firm.cost }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  name: "Firm",
  extends: Bar,
  props: {
    firm: {
      type: Object,
      required: true
    },
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      chartOptionsBar: {
        xAxis: {
          data: ["Q", "T", "M", "E"]
        },
        yAxis: {
          type: "value",
          max: 10,
          labels: {
            minWidth: 30,
            style: {
              fontSize: "12px"
            }
          }
        },
        series: [
          {
            type: "bar",
            data: [
              this.firm.quantity,
              this.firm.tech,
              this.firm.market,
              this.firm.cost
            ]
          }
        ]
      }
    };
  },
  methods: {
    firmImage: function(firm) {
      let name = firm.type.toLowerCase();
      return `${name}.png`;
    }
  }
};
</script>

<style scoped>
#firmBlock {
  padding: 10px 90px;
  position: relative;
  margin-left: 10px;
}

.firmImage {
  position: absolute;
  top: 45px;
  left: 0;
}

.barChart {
  position: absolute;
  top: -35px;
  left: 125px;
  width: 200px;
  height: 220px;
}

.echarts {
  width: 100%;
  height: 100%;
}

.firmAttributes {
  text-align: left;
  padding-top: 135px;
}
</style>
