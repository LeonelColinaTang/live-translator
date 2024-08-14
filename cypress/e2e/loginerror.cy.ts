describe("Login page - Non-Existent User", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login"); // Adjust the URL if needed
  });

  it('Login with invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: 'api/auth/login',
      body: {
        username: 'nonexistentuser',
        password: 'wrongpassword'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Invalid credentials');
    });
  });

  // it('Displays an error for non-existent user on UI', () => {
  //   cy.getByData("cypress-inputUserName").type('invalidUsername'); 
  //   cy.getByData("cypress-inputPassword").type('invalidPassword'); 
  //   cy.getByData("cypress-loginbtn").click(); 

  //   cy.contains("Email or password invalid").should("be.visible");
  // });
});
