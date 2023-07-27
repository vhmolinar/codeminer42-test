import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'

import CalendarWorkingSlots from '@/views/dashboard/CalendarWorkingSlots.vue'

describe('CalendarWorkingSlots', () => {
  expect(CalendarWorkingSlots).toBeTruthy()

  it('renders four working slots', () => {
    const wrapper = mountComponent({
      slotHeight: 80,
      workingSlots: ['09:00', '09:30', '10:00', '10:30']
    })

    const slots = wrapper.findAll('div.v-container div.v-row div.v-col span')
    expect(slots).toHaveLength(4)
  })
})

const mountComponent = (props) => mount(CalendarWorkingSlots, {
  props,
  global: {
    plugins: [i18n, vuetify]
  }
})
