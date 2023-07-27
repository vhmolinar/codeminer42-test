<template>
  <v-container fluid>
    <h3 class="pa-0 mb-8">{{ $t("labels.dashboard") }}</h3>
    <v-row>
      <v-col cols="2">
        <v-autocomplete
          :label="$tc('labels.patient', 2)"
          :items="patientsList"
          :loading="!patientsLoaded"
          item-value="id"
          item-title="name"
          id="patients-list-select"
          @update:modelValue="patientSelected"/>
      </v-col>
      <v-col cols="10">
        <calendar-week :loading="!appointmentsLoaded"
          :appointments="appointmentsList"/>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12">
        <appointments-history :loading="!appointmentsLoaded"
          :appointments="appointmentsList"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import StoreLoader from '@/mixins/store_loader'
import AppointmentsHistory from './AppointmentsHistory.vue'
import CalendarWeek from './CalendarWeek.vue'

export default {
  mixins: [
    StoreLoader
  ],
  components: {
    CalendarWeek,
    AppointmentsHistory,
  },
  methods: {
    patientSelected(patientId) {
      this.$router.push({ name: 'patient', params: { patientId }})
    }
  },
  mounted() {
    this.fetchPatientsAndAppointments()
  }
}
</script>
