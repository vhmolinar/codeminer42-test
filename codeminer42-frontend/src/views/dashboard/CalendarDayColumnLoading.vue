<style scoped>
.day-column {
  max-width: 20%;
  text-align: center;
}
</style>
<template>
  <v-col class="pa-0 day-column">
    <v-container class="pa-0">
      <v-row class="ma-0">
        <v-col cols="12" class="pa-0">
          <span>{{ dayName }}</span>
        </v-col>
      </v-row>
      <v-row v-for="i in workingSlots.length" :key="i"
        class="ma-0 pb-2 px-1">
        <v-card
          :height="slotHeight"
          width="100%"
          color="#e3e3e3" />
      </v-row>
    </v-container>
  </v-col>
</template>
<script>

export default {
  computed: {
    dayName() {
      return [
        this.$t('labels.days_of_week.mon'),
        this.$t('labels.days_of_week.tue'),
        this.$t('labels.days_of_week.wed'),
        this.$t('labels.days_of_week.thu'),
        this.$t('labels.days_of_week.fri')
      ][this.dayOfWeek]
    },
  },
  props: {
    dayOfWeek: Number,
    workingSlots: Array,
    slotHeight: Number
  },
}
</script>
