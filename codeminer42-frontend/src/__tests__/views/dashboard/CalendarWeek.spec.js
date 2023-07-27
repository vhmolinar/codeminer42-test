import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { DateTime } from 'luxon'

import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

import CalendarWeek from '@/views/dashboard/CalendarWeek.vue'

describe('CalendarWeek', () => {
  expect(CalendarWeek).toBeTruthy()

  it('calculate and renders all 18 working slots', () => {
    const wrapper = mountComponent({
      appointments: [],
      loading: false
    })

    const slots = wrapper.findAll('div.working-slots.v-container div.v-row div.v-col span')
    expect(slots).toHaveLength(18)
  })

  it('renders only two appointments from current week out of four', () => {
    const wrapper = mountComponent({
      appointments: buildAppointmentsParam(),
      loading: false
    })

    const appoinmentCards = wrapper.findAll('div.v-card.appointment')
    expect(appoinmentCards).toHaveLength(2)
  })
})

const mountComponent = (props) => mount(CalendarWeek, {
  props,
  global: {
    plugins: [i18n, vuetify]
  }
})


const buildAppointmentsParam = () => {
  const monday = DateTime.now().setZone('utc').startOf('week')
  const lastWeekMonday = monday.minus({ weeks: 1})
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
    {
      "id": 8,
      "patientId": 4,
      "patientName": "Julia",
      "specialty": "neurology",
      "type": "checkUp",
      "description": "Awe obmuzuk liug daaja hihjo obke muvozom wekana meb num raceg zos tum.",
      "notes": "Meve ginukiotu joosu fuutu dozojahiv ropo cigumke lep neacal iwo jet zo coscafvuk fom omfijfa wiiw.",
      "status": "completed",
      "startTime": `${lastWeekMonday.toFormat('yyyy-MM-dd')}T09:00:00.977Z`,
      "endTime": `${lastWeekMonday.toFormat('yyyy-MM-dd')}T09:30:00.977Z`
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
      "startTime": `${lastWeekMonday.toFormat('yyyy-MM-dd')}T11:00:00.977Z`,
      "endTime": `${lastWeekMonday.toFormat('yyyy-MM-dd')}T12:00:00.977Z`
    },
  ]
}
