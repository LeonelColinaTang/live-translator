describe('Message Container - Chat Selected', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("http://localhost:5173/login");
  });

  it('should log in successfully', () => {
    cy.getByData('cypress-inputUserName').type('Yasmine Elnadi');
    cy.getByData('cypress-inputPassword').type('123456789');
    cy.getByData('cypress-loginbtn').click();

    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should select a conversation and display recipient name', () => {
    // Mock conversation selection after logging in
    cy.getByData('cypress-inputUserName').type('Yasmine Elnadi');
    cy.getByData('cypress-inputPassword').type('123456789');
    cy.getByData('cypress-loginbtn').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.window().then((win) => {
      win.useConversation.setState({
        selectedConversation: { username: 'JohnDoe', id: '1' },
      });
    });

    cy.getByData('cy-recipientName')
      .should('be.visible')
      .and('contain.text', 'JohnDoe');
  });

  it('should send a message and display it', () => {
    cy.getByData('cypress-inputUserName').type('Yasmine Elnadi');
    cy.getByData('cypress-inputPassword').type('123456789');
    cy.getByData('cypress-loginbtn').click();
    cy.window().then((win) => {
      win.useConversation.setState({
        selectedConversation: { username: 'JohnDoe', id: '1' },
      });
    });

    cy.url().should('eq', 'http://localhost:5173/');
    cy.getByData('cy-sendMessage').type('Hello!');
    cy.getByData('cy-submit').click();

    cy.contains('Hello!').should('be.visible');
  });

  it('should display messages in the message container', () => {
    cy.getByData('cypress-inputUserName').type('Yasmine Elnadi');
    cy.getByData('cypress-inputPassword').type('123456789');
    cy.getByData('cypress-loginbtn').click();
    cy.window().then((win) => {
      win.useConversation.setState({
        selectedConversation: { username: 'JohnDoe', id: '1' },
      });
    });
    cy.getByData("cy-getMessages").should('have.length.greaterThan', 0);
  });
});
