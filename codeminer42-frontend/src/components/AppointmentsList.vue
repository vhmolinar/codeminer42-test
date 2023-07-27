<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
table tr:hover, table tr.selected {
  background-color: lightgray;
}
table.clickable tr:hover {
  cursor: pointer;
}
table td {
  border-bottom: 1px solid lightgrey;
  padding: 4px;
}
table td  span {
  color: white;
  border-radius: 3px;
}

</style>
<template>
  <table style="width:100%" :class="{ 'clickable': enableEvents }">
    <tbody>
      <tr v-for="(appointment, i) in formattedAppointments" :key="i"
        @click="() => enableEvents && selectAppointment(appointment)"
        :class="{ 'selected': appointment.selected }">
        <td :style="{width: columnsWidth.recordTime}">{{ appointment.recordTime }}</td>
        <td :style="{width: columnsWidth.status}">
          <span :style="{'background-color': statusColor[appointment.status]}"
            class="pa-1">
            {{ appointment.statusName }}
          </span>
        </td>
        <td v-if="!hideName" :style="{width: columnsWidth.patientName}">{{ appointment.patientName }}</td>
        <td :style="{width: columnsWidth.type}">{{ appointment.typeName }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { DateTime } from 'luxon'

export default {
  props: {
    appointments: {
      type: Array,
      default: () => ([])
    },
    hideName: Boolean,
    enableEvents: Boolean
  },
  computed: {
    statusColor() {
      return {
        completed: 'green',
        absent: 'red',
        cancelled: 'gray',
        pending: 'lightseagreen'
      }
    },
    columnsWidth() {
      if (!this.hideName) {
        return {
          recordTime: '20%',
          status: '15%',
          patientName: '20%',
          type: '15%'
        }
      }
      return {
          recordTime: '33%',
          status: '33%',
          type: '33%'
      }
    },
    formattedAppointments() {
      return this.appointments.map((appointment) => {
        const { startTime, endTime, status, type } = appointment
        const dtStartTime = DateTime.fromISO(startTime).setZone('utc')
        const dtEndTime = endTime != null
          ? DateTime.fromISO(endTime).setZone('utc')
          : null

        const recordTime = `${dtStartTime.toFormat('dd/MM/yyyy hh:mm')}${dtEndTime ? ' - ' + dtEndTime.toFormat('hh:mm') : ''}`
        return {
          recordTime,
          statusName: this.$t(`labels.appointment_status.${status}`),
          typeName: this.$t(`labels.appointment_types.${type}`),
          ...appointment
        }
      })
    },
  },
  methods: {
    selectAppointment(appointment) {
      this.formattedAppointments.forEach((a) => a.selected = false)
      appointment.selected = true
      this.$emit('appointmentSelected', appointment)
      this.$forceUpdate()
    }
  }
}
</script>
