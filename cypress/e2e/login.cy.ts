describe('test login page', () => {
  beforeEach(()=>{
    cy.visit("http://localhost:5173/login")
  });
  it('checks the form submission process and navigation', () => {
   
    cy.getByData('cypress-inputUserName').type('Yasmine Elnadi')
    cy.getByData('cypress-inputPassword').type("123456789")
    cy.getByData('cypress-loginbtn').click()
    cy.url().should('eq','http://localhost:5173/')
  })
})
