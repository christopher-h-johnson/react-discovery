/* global cy */
// @ts-nocheck
const testCollection = Cypress.env('test-collection')

describe('React Discovery Base', (): void => {
  beforeEach((): void => {
    cy.visit(`/search/${testCollection}`)
  })

  it('enters text in standard search box, submits form, and clears text', (): void => {
    cy.get('input#standard-full-width').type('Astana')
    cy.get('input#standard-full-width').should('have.value', 'Astana')
    cy.get('[data-testid=clear-searchbox]').should('have.length', 1)
    cy.get('[data-testid=standard-searchform]').submit()
    cy.get('[data-testid=clear-searchbox]').click()
    cy.get('input#standard-full-width').should('have.value', '')
  })
  it('resets query state', (): void => {
    cy.get('[data-testid=reset]').click()
  })
})
