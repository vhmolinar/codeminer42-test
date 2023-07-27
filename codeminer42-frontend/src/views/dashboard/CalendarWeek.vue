<template>
  <v-card :loading="loading">
    <v-card-title>
      {{ $t("labels.calendar") }}
    </v-card-title>
    <v-container fluid class="mt-6">
      <v-row>
        <v-col style="max-width: 10%" class="pa-0 mt-6">
          <calendar-working-slots
            :working-slots="workingSlots"
            :slot-height="slotHeight" />
        </v-col>
        <v-col style="width: 90%" class="pa-0">
          <v-container class="pa-0">
            <v-row class="pa-0 ma-0">
              <calendar-day-column-container
                :appointments-of-the-week="appointmentsOfTheWeek"
                :loading="loading"
                :day-of-week="0"
                :working-slots="workingSlots"
                :slot-height="slotHeight"/>
              <calendar-day-column-container
                :appointments-of-the-week="appointmentsOfTheWeek"
                :loading="loading"
                :day-of-week="1"
                :working-slots="workingSlots"
                :slot-height="slotHeight"/>
              <calendar-day-column-container
                :appointments-of-the-week="appointmentsOfTheWeek"
                :loading="loading"
                :day-of-week="2"
                :working-slots="workingSlots"
                :slot-height="slotHeight"/>
              <calendar-day-column-container
                :appointments-of-the-week="appointmentsOfTheWeek"
                :loading="loading"
                :day-of-week="3"
                :working-slots="workingSlots"
                :slot-height="slotHeight"/>
              <calendar-day-column-container
                :appointments-of-the-week="appointmentsOfTheWeek"
                :loading="loading"
                :day-of-week="4"
                :working-slots="workingSlots"
                :slot-height="slotHeight"/>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { DateTime } from 'luxon'
import CalendarDayColumnContainer from './CalendarDayColumnContainer.vue'
import CalendarWorkingSlots from './CalendarWorkingSlots.vue'

export default {
  props: {
    loading: Boolean,
    appointments: Array,
  },
  components: { CalendarDayColumnContainer, CalendarWorkingSlots },
  computed: {
    workingSlots() {
      const slots = []
      const startingWorkShift = DateTime.now().set({
        hour: 9, minutes: 0, seconds: 0, milliseconds: 0
      })
      const endingWorkShift = DateTime.now().set({
        hour: 18, minutes: 0, seconds: 0, milliseconds: 0
      })
      let pointer = startingWorkShift

      do {
        slots.push(pointer.toLocaleString(DateTime.TIME_24_SIMPLE))
        pointer = pointer.plus({ minutes: 30 })
      } while (pointer < endingWorkShift)

      return slots
    },
    appointmentsOfTheWeek() {
      if (this.appointments.length === 0) return []

      const firstDayOfWeek = DateTime.now().setZone('utc').startOf('week')
      const lastDayOfWeek = DateTime.now().setZone('utc').endOf('week')

      return this.appointments.filter((appointment) => {
        const { startTime } = appointment
        const appointmentDt = DateTime.fromISO(startTime).setZone('utc')

        return appointmentDt >= firstDayOfWeek && appointmentDt <= lastDayOfWeek
      })
    }
  },
  data: () => ({
    slotHeight: 80,
  }),
}
</script>
