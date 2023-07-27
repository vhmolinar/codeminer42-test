import { defineStore } from 'pinia'

export const appointmentsStore = defineStore('appointmentsStore', {
  state: () => ({
    rawValue: [],
    mergedValue: [],
    loaded: false
  }),
  getters: {
    appointmentsList: (state) => state.mergedValue
  },
  actions: {
    async load() {
      if (this.loaded) return
      try {
        const response =  await fetch('https://cm42-medical-dashboard.herokuapp.com/appointments')
        this.rawValue = await response.json()
      } catch(e) {
        console.error(e)
      } finally {
        this.loaded = true
      }
    },
    mergeWithPatients(patientsList) {
      const mapOfPatients = {}
      patientsList.forEach((p) => {
        mapOfPatients[p.id] = p.name
      })

      this.mergedValue = this.rawValue.map((ap) => {
        ap.patientName = mapOfPatients[ap.patientId]
        return {...ap}
      })
    }
  }
})
