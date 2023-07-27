import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { DateTime } from 'luxon'

import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

import CalendarDayColumn from '@/views/dashboard/CalendarDayColumn.vue'

describe('CalendarDayColumn', () => {
  expect(CalendarDayColumn).toBeTruthy()

  it('render two appointments', () => {
    const wrapper = mountComponent({
      appointmentsOfTheWeek: buildAppointmentsParam(),
      dayOfWeek: 0,
      slotHeight: 80,
      workingSlots: buildWorkingSlots()
    })

    const appoinmentCards = wrapper.findAll('div.v-card.appointment')
    expect(appoinmentCards).toHaveLength(2)
    expect(wrapper.text()).toContain('Mon')
  })
})

const mountComponent = (props) => mount(CalendarDayColumn, {
  props,
  global: {
    plugins: [i18n, vuetify]
  }
})

const buildWorkingSlots = () => ([
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
  '17:00', '17:30',
])

const buildAppointmentsParam = () => {
  const monday = DateTime.now().setZone('utc').startOf('week')
  return [
    {
      "id": 8,
      "patientId": 4,
      "patientName": "Julia",
      "specialty": "neurology",
      "type": "checkUp",
      "description": "Awe obmuzuk liug daaja hihjo obke muvozom wekana meb num raceg zos tum.",
      "notes": "Meve ginukiotu joosu fuutu dozojahiv ropo cigumke lep neacal iwo jet zo coscafvuk fom omfijfa wiiw.",
      "status": "completed",
      "startTime": `${monday.toFormat('yyyy-MM-dd')}T09:00:00.977Z`,
      "endTime": `${monday.toFormat('yyyy-MM-dd')}T09:30:00.977Z`
    },
    {
      "id": 8,
      "patientId": 4,
      "patientName": "Julia",
      "specialty": "neurology",
      "type": "checkUp",
      "description": "Awe obmuzuk liug daaja hihjo obke muvozom wekana meb num raceg zos tum.",
      "notes": "Meve ginukiotu joosu fuutu dozojahiv ropo cigumke lep neacal iwo jet zo coscafvuk fom omfijfa wiiw.",
      "status": "completed",
      "startTime": `${monday.toFormat('yyyy-MM-dd')}T11:00:00.977Z`,
      "endTime": `${monday.toFormat('yyyy-MM-dd')}T12:00:00.977Z`
    },
  ]
}
