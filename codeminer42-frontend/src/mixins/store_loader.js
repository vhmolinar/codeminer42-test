import { nextTick } from 'vue'
import { patientsStore } from '@/store/patients'
import { appointmentsStore } from '@/store/appointments'

export default {
  computed: {
    patientsLoaded() {
      return patientsStore().loaded
    },
    patientsList() {
      return patientsStore().patientsList
    },
    appointmentsLoaded() {
      return appointmentsStore().loaded
    },
    appointmentsList() {
      return appointmentsStore().appointmentsList
    },
  },
  methods: {
    async fetchPatientsAndAppointments() {
      await Promise.all([
        patientsStore().load(),
        appointmentsStore().load()
      ])
      nextTick(() => {
        appointmentsStore().mergeWithPatients(patientsStore().patientsList)
      })
    },
  }
}
