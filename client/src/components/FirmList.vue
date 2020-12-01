<template>
  <div>
    <div id="upstream">
      <ul>
        <template v-for="firm in firms">
          <firm :key="firm.id" :firm="firm" v-show="firm.upstream"></firm>
        </template>
      </ul>
    </div>
    <span style="font-size: 20px; font-weight: bold;"> Upstream</span>
    <hr />
    <span style="font-size: 20px; font-weight: bold;">Downstream </span>
    <div id="downstream">
      <ul>
        <template v-for="firm in firms">
          <firm :key="firm.id" :firm="firm" v-if="!firm.upstream"></firm>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import Firm from "@/components/Firm";

export default {
  name: "FirmList",
  props: {
    firms: {
      type: Array,
      required: true
    }
  },
  components: {
    Firm
  }
};
</script>

<style scoped>
div {
  padding-left: 30px;
}
#upstream > ul {
  display: flex;
  flex-wrap: wrap;
}

#downstream > ul {
  display: flex;
  flex-wrap: wrap;
}
</style>
