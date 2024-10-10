describe('App Component E2E Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); // Adjust the URL if needed
  });

  it('displays the game board', () => {
    cy.get('[data-testid="game-board"]').should('be.visible');
  });

  it('starts the game when play button is clicked', () => {
    cy.get('[data-testid="play-button"]', { timeout: 10000 }) // Wait up to 10 seconds
      .should('be.visible')
      .click();
    cy.get('[data-testid="score"]').should('contain', '0');
  });

  it('displays hint when the hint button is clicked', () => {
    // Click the play button to start the game
    cy.get('[data-testid="play-button"]').click();
    
    // Wait for the game to start, you might need to wait for the API response
    cy.intercept('https://api.urbandictionary.com/v0/random').as('fetchWords');
    
    // Wait for the words to be fetched
    cy.wait('@fetchWords');
  
    // Now, the hint button should be enabled, click the hint button
    cy.get('[data-testid="hint-button"]')
      .should('not.be.disabled') // Ensure the button is enabled
      .click();
  
    // Check if the hint modal is displayed
    cy.get('[data-testid="hint-modal"]').should('be.visible');
  });

  it('increments score after entering correct word', () => {
    // Mock the Urban Dictionary API response to return a predefined word
    cy.intercept('https://api.urbandictionary.com/v0/random', {
      body: {
        list: [{ word: 'test', definition: 'a sample' }]
      }
    }).as('fetchWord');
  
    // Start the game
    cy.get('[data-testid="play-button"]').click();
  
    // Wait for the word to be fetched
    cy.wait('@fetchWord', { timeout: 10000 });
  
    // Type each character into the corresponding input
    cy.get('input[type="text"]').each(($el, index) => {
      const word = 'test';
      cy.wrap($el).type(word[index]); // Type the corresponding character
    });
  
    // Verify the score increment after entering the correct word
    cy.get('[data-testid="score"]').should('contain', '1');
  });
  
  it('pauses the game when the pause button is clicked', () => {
    // cy.get('[data-testid="play-button"]').click(); // Start the game
    cy.get('[data-testid="play-button"]', { timeout: 10000 }) // Wait up to 10 seconds
    .should('be.visible')
    .click();
    cy.get('[data-testid="play-pause-button"]').click(); // Click the pause button
    cy.get('[data-testid="menu-pop-up"]').should('be.visible'); // Ensure the menu is visible
  });

});
