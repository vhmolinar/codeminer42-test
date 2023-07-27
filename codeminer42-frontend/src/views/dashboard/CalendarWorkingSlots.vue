<style scoped>
.v-col {
  display: table;
}
span {
  font-weight: bold;
  font-size: 14px;
  vertical-align: middle;
  display: table-cell;
}
</style>
<template>
  <v-container class="pa-0 working-slots" style="display: block;">
    <v-row v-for="(slot, i) in workingSlots" :key="i" class="ma-0 pb-2">
      <v-col cols="12" class="pt-0 pb-0 pr-0 pl-4"
         :style="{ height: `${slotHeight}px` }">
        <span>
          {{ slot }}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    workingSlots: Array,
    slotHeight: Number
  }
}
</script>
