
describe('Message Container - No Chat Selected', () => {
  beforeEach(()=>{
    cy.visit("http://localhost:5173/login")
  });
  it('checks the form submission process and navigation', () => {
   
    cy.getByData('cypress-inputUserName').type('Yasmine Elnadi')
    cy.getByData('cypress-inputPassword').type("123456789")
    cy.getByData('cypress-loginbtn').click()
    cy.url().should('eq','http://localhost:5173/')
    cy.contains('Welcome 👋🏼').should('be.visible');
    cy.contains('Select a chat to start messaging 👾').should('be.visible');
   
   
  })


})

