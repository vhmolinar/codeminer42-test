import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import i18n from '@/plugins/i18n'

import AppointmentsList from '@/components/AppointmentsList.vue'

describe('AppointmentsList', () => {
  expect(AppointmentsList).toBeTruthy()

  it('renders with basic params', () => {
    const wrapper = mountComponent({
      appointments: buildAppointmentsParam(),
    })

    const table = wrapper.find('table')
    const rows = wrapper.findAll('table tr')
    const columns = wrapper.findAll('table tr:nth-of-type(1) td')

    expect(table.exists()).toBe(true)
    expect(rows).toHaveLength(2)
    expect(columns).toHaveLength(4)
  })

  it('renders with special params', () => {
    const wrapper = mountComponent({
      appointments: [buildAppointmentsParam()[0]],
      hideName: true
    })

    const table = wrapper.find('table')
    const rows = wrapper.findAll('table tr')
    const columns = wrapper.findAll('table tr:nth-of-type(1) td')

    expect(table.exists()).toBe(true)
    expect(rows).toHaveLength(1)
    expect(columns).toHaveLength(3)
  })

  it('emmits an event on the click of a row', async () => {
    const wrapper = mountComponent({
      appointments: buildAppointmentsParam(),
      hideName: true,
      enableEvents: true
    })

    const row = wrapper.find('table tr:nth-of-type(1)')
    await row.trigger('click')

    expect(wrapper.emitted().appointmentSelected).toBeTruthy
    expect(wrapper.emitted().appointmentSelected.length).toBe(1)
  })

  it('applies class on the click of a row', async () => {
    const wrapper = mountComponent({
      appointments: buildAppointmentsParam(),
      hideName: true,
      enableEvents: true
    })

    const rows = wrapper.findAll('table tr')
    const [firstRow, secondRow] = rows

    await firstRow.trigger('click')
    expect(firstRow.classes('selected')).toBe(true)

    await secondRow.trigger('click')
    expect(secondRow.classes('selected')).toBe(true)
    expect(firstRow.classes('selected')).toBe(false)
  })

  it('correctly formats appointment date', () => {
    const wrapper = mountComponent({
      appointments: buildAppointmentsParam(),
      hideName: true
    })

    const recordTimeColumn = wrapper.find('table > tbody > tr > td')
    expect(recordTimeColumn.text()).toBe('10/07/2023 09:00 - 09:30')
  })
})

const mountComponent = (props) => mount(AppointmentsList, {
  props,
  global: {
    plugins: [i18n]
  }
})

const buildAppointmentsParam = () => ([
  {
    "id": 8,
    "patientId": 4,
    "patientName": "Julia",
    "specialty": "neurology",
    "type": "checkUp",
    "description": "Awe obmuzuk liug daaja hihjo obke muvozom wekana meb num raceg zos tum.",
    "notes": "Meve ginukiotu joosu fuutu dozojahiv ropo cigumke lep neacal iwo jet zo coscafvuk fom omfijfa wiiw.",
    "status": "completed",
    "startTime": "2023-07-10T09:00:00.977Z",
    "endTime": "2023-07-10T09:30:00.977Z"
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
    "startTime": "2023-07-10T11:00:00.977Z",
    "endTime": "2023-07-10T12:00:00.977Z"
  },
])
