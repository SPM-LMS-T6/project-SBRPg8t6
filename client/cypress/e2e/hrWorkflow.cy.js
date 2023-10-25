describe('HR Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('should display the login page', () => {
    cy.get('.login').should('exist')
  })

  it('should log in as an HR and redirect to the role listings page', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
  })

  it('should filter roles by skill successfully', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('select.form-select').select('Python Programming')
    cy.get('.job-role-item').should('have.length.greaterThan', 0)
  })

  it('should display all relevant details in a job role item', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().should('exist')
    cy.get('.card-title').should('exist') // role name
    cy.get('#rstatus').should('exist') // role status
    cy.get('#rmanage').should('exist') // role manage button
    cy.get('.fw-bold.badge.rounded-pill').should('exist') // skill match percentage
    cy.get('.badge.rounded-pill.bg-light.text-dark').should('exist') // skills
    cy.get('.card-text').should('exist') // description
    cy.get('#rPubDate').should('exist').contains('Published Date') // publish date
    cy.get('small').should('exist').contains('Closing Date') // expiry date
  })

  it('should display expanded role details when a role header is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.card-text').should('exist')
  })

  it('should display all relevant elements in the expanded role details', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    // Assuming there's at least one job role item
    cy.get('.job-role-item').first().click()
    cy.get('.roleDetails').should('exist')
    cy.get('.my-auto').should('exist') // role name
    cy.get('.fw-bold').should('exist').contains('Posted On:') // posted on label
    cy.get('.check').should('exist') // posted on date and deadline
    cy.get('.fw-bold.isPosted').should('exist') // posted by or updated by label
    cy.get('.fw-bold').should('exist').contains('Deadline:') // deadline label
    cy.get('.skills-container').should('exist') // skills container
    cy.get('.artdeco-button__text').should('exist').contains('Apply') // apply button
    cy.get('.artdeco-button__text').should('exist').contains('Update') // update button
    cy.get('.description').should('exist') // description
  })

  it('should display update role listing page when update button is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.artdeco-button__text').should('exist').contains('Update').click()
    cy.get('.updateRoleListing').should('exist')
  })

  it('should return to role listings page when back button is clicked', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.artdeco-button__text').should('exist').contains('Update').click()
    cy.get('.back').should('exist').click()
    cy.get('.job-role-item').should('exist')
  })

  it('should return an error message when update button is clicked with close date that is not later than or equal to the current date', () => {
    cy.get('#dropdown').select('HR')
    cy.get('.defaultBtn').click()
    cy.get('.job-role-item').first().click()
    cy.get('.artdeco-button__text').contains(' Update ').click()
    cy.get('#update').should('exist').click()
    cy.get('.my-auto')
      .should('exist')
      .contains('Role Listing Close date must be a date later than or equal to the Current date')
  })

  // TODO continue test date mismatch error
})
