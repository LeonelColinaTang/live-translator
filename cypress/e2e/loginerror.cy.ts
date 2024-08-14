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

  it('Displays an error for non-existent user on UI', () => {
    // Mock the server response for login request
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 400,
      body: {
        error: 'Email or password invalid'
      }
    }).as('loginRequest');
  
    // Visit the login page
    cy.visit('http://localhost:5173/login'); // Adjust the URL if needed
  
    // Fill in the form with invalid credentials
    cy.getByData('cypress-inputUserName').type('invalidUsername');
    cy.getByData('cypress-inputPassword').type('invalidPassword');
    
    // Click the login button
    cy.getByData('cypress-loginbtn').click();
    
    // Wait for the request to complete
    cy.wait('@loginRequest');
  
    // Assert that the error message is visible
    cy.contains('Email or password invalid').should('be.visible');
  });
  
});
