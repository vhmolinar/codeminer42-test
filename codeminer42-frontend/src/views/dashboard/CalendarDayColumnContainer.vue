<template>
  <calendar-day-column
    v-if="!loading"
    :day-of-week="dayOfWeek"
    :working-slots="workingSlots"
    :slot-height="slotHeight"
    :appointments-of-the-week="appointmentsOfTheWeek"/>
  <calendar-day-column-loading
    v-else
    :day-of-week="dayOfWeek"
    :working-slots="workingSlots"
    :slot-height="slotHeight"/>
</template>
<script>
import CalendarDayColumn from './CalendarDayColumn.vue'
import CalendarDayColumnLoading from './CalendarDayColumnLoading.vue'

export default {
  components:  { CalendarDayColumn, CalendarDayColumnLoading },
  props: {
    dayOfWeek: Number,
    workingSlots: Array,
    slotHeight: Number,
    loading: Boolean,
    appointmentsOfTheWeek: Array
  }
}
</script>
