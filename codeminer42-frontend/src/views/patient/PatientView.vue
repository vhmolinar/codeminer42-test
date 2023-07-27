<template>
  <v-container fluid>
    <v-row class="ma-0">
      <v-btn density="compact" icon="mdi-arrow-left"
        @click="$router.push({ name: 'dashboard' })"
        elevation="0"
        color="transparent"/>
      <h3 class="pl-5">{{ $t("labels.patient_view") }}</h3>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-card :loading="patientsList.length === 0">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                {{ $t("labels.patient_info") }}
              </div>
              <div class="text-h6 mb-1">
                {{patientData.name}}
              </div>
              <v-row class="ma-0">
                <div class="text-caption">{{ patientDoc }}</div>
                <v-spacer />
                <div class="text-caption">{{ patientAge }} {{ $t("labels.yo") }}</div>
              </v-row>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card :loading="patientsList.length === 0">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                {{ $t("labels.plan_info") }}
              </div>
              <div class="text-h6 mb-1">
                {{ patientData.insurancePlan }}
              </div>
              <div class="text-caption">{{ patientHealthId }}</div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card :loading="patientsList.length === 0">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                {{ $t("labels.latest_app") }}
              </div>
              <div class="text-h6 mb-1" style="text-transform:capitalize!important">
                {{ latestAppointmentSpecialty }}
              </div>
              <div class="text-caption">{{ latestAppointmentDate }}</div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab">
            <v-tab :value="1">{{ $t("labels.upcoming") }}</v-tab>
            <v-tab :value="2">{{ $t("labels.history") }}</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item class="px-4" :value="1">
              <patient-appointments :appointments="upcomingAppointments"
                class="upcoming-appointments"/>
            </v-window-item>
            <v-window-item class="px-4" :value="2">
              <patient-appointments :appointments="historicalAppointments"
                class="historical-appointments"/>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { DateTime } from 'luxon'
import { patientsStore } from '@/store/patients'
import StoreLoader from '@/mixins/store_loader'
import PatientAppointments from "./PatientAppointments.vue"

export default {
  mixins: [
    StoreLoader
  ],
  components: { PatientAppointments },
  computed: {
    patientData() {
      if (this.patientsList.length === 0) return {}
      const { getPatient } = patientsStore()
      const { patientId } = this.$route.params
      return getPatient(patientId)
    },
    patientAge() {
      const { birthday } = this.patientData
      if (!birthday) return '-'
      const dtBirthday = DateTime.fromISO(birthday).setZone('utc')
      const age = DateTime.now().diff(dtBirthday).as('years')
      return parseInt(age)
    },
    patientDoc() {
      const { document } = this.patientData
      if (!document) return '-'
      return `${document.slice(0, 3)}.${document.slice(3, 6)}.${document.slice(6, 9)}-${document.slice(9, 11)}`
    },
    patientHealthId() {
      const { healthSystemId } = this.patientData
      if (!healthSystemId) return '-'
      return `${healthSystemId.slice(0, 3)}.${healthSystemId.slice(3, 6)}/${healthSystemId.slice(6, 10)}`
    },
    patientAppointments() {
      const { patientId } = this.$route.params
      return this.appointmentsList.filter((appointment) => {
        return appointment.patientId == patientId
      })
    },
    upcomingAppointments() {
      const currentDt = DateTime.now().setZone('utc')

      return this.patientAppointments.filter((appointment) => {
        const { startTime } = appointment
        const appointmentDt = DateTime.fromISO(startTime)
          .setZone('utc')
        return currentDt < appointmentDt
      })
    },
    historicalAppointments() {
      const currentDt = DateTime.now().setZone('utc')

      return this.patientAppointments.filter((appointment) => {
        const { startTime } = appointment
        const appointmentDt = DateTime.fromISO(startTime)
          .setZone('utc')
        return currentDt > appointmentDt
      })
    },
    latestAppointment() {
      const currentDt = DateTime.now().setZone('utc')
      let latestApp = null

      this.patientAppointments.forEach((appointment) => {
        const { startTime } = appointment
        const appointmentDt = DateTime.fromISO(startTime)
          .setZone('utc')
        if (appointmentDt > currentDt) return
        if (latestApp === null) {
          latestApp = appointment
          return
        }

        const latestAppointmentDt = DateTime.fromISO(latestApp.startTime)
          .setZone('utc')
        if (latestAppointmentDt < appointmentDt) {
          latestApp = appointment
        }
      })
      return latestApp
    },
    latestAppointmentSpecialty() {
      if (!this.latestAppointment) return '-'
      return this.latestAppointment.specialty
    },
    latestAppointmentDate() {
      if (!this.latestAppointment) return '-'
      const { startTime } = this.latestAppointment
      const appointmentDt = DateTime.fromISO(startTime)
        .setZone('utc')
      return appointmentDt.toLocaleString(DateTime.DATE_SHORT)
    }
  },
  data: () => ({ tab: 1 }),
  mounted() {
    this.fetchPatientsAndAppointments()
  }
}
</script>
