describe('Chatbox Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('should display loading spinner when submitting', () => {
    cy.get('input[matInput]').type('test request');
    cy.get('button').contains('确认').click();
    cy.get('.loading-container mat-progress-spinner').should('be.visible');
  });

  it('should display response message after loading', () => {
    cy.get('input[matInput]').type('test request');
    cy.get('button').contains('确认').click();
    cy.intercept('POST', '/api/generateContent', { body: '生成的响应内容' });
    cy.get('.result-card mat-card-content', { timeout: 10000 }).should('exist');
  });

  it('should display appropriate icon', () => {
    cy.get('input[matInput]').type('这是一个测试内容');
    cy.get('button').contains('确认').click();
    cy.get('mat-icon').should('exist');
  });
});
