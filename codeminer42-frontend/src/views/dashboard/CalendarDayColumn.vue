<style scoped>
.day-column {
  max-width: 20%;
  text-align: center;
}
.appointment {
  width:100%;
}
.appointment .v-card-title {
  font-size: 1rem;
}
.appointment:hover {
  background-color: #719ec2 !important;
  cursor: pointer;
}
.slot-available {
  width:100%;
  border:1px dashed darkgrey;
}
.description {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
      <v-row v-for="(schedule, i) in dailySchedule" :key="i"
        class="ma-0 pb-2 px-1">
        <v-card
          v-if="schedule.available"
          :height="slotHeight"
          variant="plain"
          class="slot-available">
        </v-card>
        <v-card
          v-else
          :height="schedule.longAppointment ? (slotHeight * 2 + 6) : slotHeight"
          color="blue"
          elevation="2"
          class="appointment"
          @click="patientSelected(schedule.patientId)">
          <v-card-title class="py-0">
            [{{ schedule.patientName }}]
          </v-card-title>
          <v-card-text class="description">
            {{ schedule.description }}
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-col>
</template>
<script>
import { DateTime } from 'luxon'

export default {
  props: {
    dayOfWeek: Number,
    workingSlots: Array,
    slotHeight: Number,
    appointmentsOfTheWeek: Array
  },
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
    appointmentsOfTheDay() {
      if (this.appointmentsOfTheWeek.length === 0) return []

      const monday = DateTime.now().setZone('utc').startOf('week')
      const formattedDay = monday.plus({ days: this.dayOfWeek })
        .toLocaleString(DateTime.DATE_SHORT)

      return this.appointmentsOfTheWeek.filter((appointment) => {
        const { startTime } = appointment
        const appointmentDt = DateTime.fromISO(startTime)
          .setZone('utc')
          .toLocaleString(DateTime.DATE_SHORT)

        return appointmentDt === formattedDay
      })
    },
    dailySchedule() {
      const commitedSlots = {}
      this.appointmentsOfTheDay.forEach((appointment) => {
        const {
          startTime,
          endTime,
        } = appointment

        const dtStartTime = DateTime.fromISO(startTime).setZone('utc')
        const dtEndTime = endTime != null
          ? DateTime.fromISO(endTime).setZone('utc')
          : dtStartTime.plus({ minutes: 30 })

        const slotKey = dtStartTime.toLocaleString(DateTime.TIME_24_SIMPLE)
        const appointmentDuration = dtEndTime.diff(dtStartTime).as('minutes')
        commitedSlots[slotKey] = {
          ...appointment,
          longAppointment: appointmentDuration > 30,
          endTimeKey: dtEndTime.toLocaleString(DateTime.TIME_24_SIMPLE)
        }
      })

      let [schedulePointer] = this.workingSlots
      const schedule = []

      while (schedulePointer != null) {
        const appointment = commitedSlots[schedulePointer]
        let pointerIdx = null

        if (appointment != null) {
          schedule.push(appointment)
          schedulePointer = appointment.endTimeKey
          pointerIdx = this.workingSlots.indexOf(schedulePointer)
        } else {
          schedule.push({ available: true })
          pointerIdx = this.workingSlots.indexOf(schedulePointer)
          const newIndex = pointerIdx + 1
          schedulePointer = this.workingSlots[newIndex]
        }
        if (pointerIdx < 0 || pointerIdx === this.workingSlots.length - 1) {
          schedulePointer = null;
        }
      }

      return schedule
    },
  },
  methods: {
    patientSelected(patientId) {
      this.$router.push({ name: 'patient', params: { patientId }})
    }
  },
}
</script>
