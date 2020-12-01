<template>
  <section id="offerTable">
    <ul>
      <template v-for="(offer, key) in this.$store.state.GameModel._offers">
        <offer-item :offer="offer" :key="key"></offer-item>
      </template>
    </ul>
  </section>
</template>

<script>
import OfferItem from "@/components/OfferItem";
export default {
  name: "Offers",
  components: {
    OfferItem
  }
};
</script>

<style scoped>
#offerTable {
}
</style>
