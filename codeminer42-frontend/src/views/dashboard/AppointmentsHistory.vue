<template>
  <v-card class="mb-5 history">
    <v-card-title>
      {{ $t("labels.history") }}
    </v-card-title>
    <v-card-text>
      <appointments-list :appointments="appointments" />
    </v-card-text>
  </v-card>
</template>
<script>
import AppointmentsList from '../../components/AppointmentsList.vue'

export default {
  components: { AppointmentsList },
  props: {
    appointments: Array,
  },
}
</script>
