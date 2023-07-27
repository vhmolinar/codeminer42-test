<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="px-0">
        <appointments-list hide-name enable-events
          :appointments="appointments"
          @appointmentSelected="appointmentSelected"/>
      </v-col>
    </v-row>
    <v-row v-if="appointment">
      <v-col cols="10">
        <h4>
          {{ $t("labels.appointment_details") }}
        </h4>
      </v-col>
      <v-col cols="2"  class="pr-0" style="text-align: right">
        {{ appointment.formattedDate }}
      </v-col>
      <v-col cols="12">
        {{ appointment.notes || '-' }}
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { DateTime } from 'luxon'

import AppointmentsList from '../../components/AppointmentsList.vue'

export default {
  props: {
    appointments: Array,
  },
  components: { AppointmentsList },
  data: () => ({
    appointment: null,
  }),
  methods: {
    appointmentSelected(appointment) {
      const dtTime = DateTime.fromISO(appointment.startTime)
      this.appointment = {
        ...appointment,
        formattedDate: dtTime.toLocaleString(DateTime.DATE_SHORT)
      }
    },
  }
}
</script>
