/// <reference types="cypress" />

describe('Dashboard navigation', () => {
  it('Checks for components', () => {
    cy.visit('/')
    cy.contains('h3', 'Dashboard')
    cy.contains('div.v-card-title', 'Calendar')
    cy.contains('div.v-card-title', 'History')
  })

  it('Checks for appointments being rendered', () => {
    cy.visit('/')
    cy.get('div.day-column div.appointment').should('exist')
    cy.get('div.history table tr').should('exist')
  })

  it('Navigates to patient view', () => {
    cy.visit('/')
    cy.get('div.day-column div.appointment').eq(0).click()
    cy.contains('h3', 'Patient view')

    cy.get('div.v-slide-group__content button').eq(0).click()
    cy.get('div.upcoming-appointments').then(($ref) => {
      if ($ref.find('table tr').length > 0) {
        cy.get('div.upcoming-appointments table tr').eq(0).click()
        cy.contains('h4', 'Appointment Details')
      }
    })

    cy.get('div.v-slide-group__content button').eq(1).click()
    cy.get('div.historical-appointments').then(($ref) => {
      if ($ref.find('table tr').length > 0) {
        cy.get('div.historical-appointments table tr').eq(0).click()
        cy.contains('h4', 'Appointment Details')
      }
    })
  })
})


