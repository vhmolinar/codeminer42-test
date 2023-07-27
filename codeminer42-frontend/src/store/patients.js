import { defineStore } from 'pinia'

export const patientsStore = defineStore('patientsStore', {
  state: () => ({
    value: [],
    loaded: false
  }),
  getters: {
    patientsList: (state) => state.value,
    getPatient: (state) => {
      return (patientId) => {
        return state.value.find((p) => p.id == patientId)
      }
    }
  },
  actions: {
    async load() {
      if (this.loaded) return

      try {
        const response =  await fetch('https://cm42-medical-dashboard.herokuapp.com/patients')
        this.value = await response.json()
        this.loaded = true
      } catch(e) {
        console.error(e)
      } finally {
        this.loaded = true
      }
    }
  }
})
