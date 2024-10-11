// cypress/e2e/whiteboard_spec.js

function deleteAllWhiteboards(maxAttempts = 10) {
    if (maxAttempts <= 0) {
        throw new Error('Max deletion attempts reached');
    }

    cy.get('body').then($body => {
        if ($body.find('.removeWhiteboardBtn').length > 1) {
            cy.get('.removeWhiteboardBtn').first().click()
                .then(() => {
                    cy.get('#removeWhiteboardYes').click();
                    cy.get('.removeWhiteboardBtn').should('have.length.lt', $body.find('.removeWhiteboardBtn').length);
                    deleteAllWhiteboards(maxAttempts - 1);
                });
        }
    });
}

describe('Whiteboard Application', () => {
    beforeEach(() => {
        cy.visit('/multiboard.html'); // Navigate to your app's URL
        cy.get('#overviewBtn').click();
        deleteAllWhiteboards();
        cy.get('#overviewContainer').click();
    });

    it('should create a new whiteboard', () => {
        cy.get('#newBoardBtn').click();
        cy.get('#boardInfo').should('contain', 'Whiteboard 2');
    });

    it('should navigate between whiteboards', () => {
        cy.get('#newBoardBtn').click();
        cy.get('#prevBtn').click();
        cy.get('#boardInfo').should('contain', 'Whiteboard 1');
        cy.get('#nextBtn').click();
        cy.get('#boardInfo').should('contain', 'Whiteboard 2');
    });

    it('should toggle eraser mode', () => {
        cy.get('#eraserBtn').click();
        cy.get('#eraserBtn').should('have.class', 'active');
        cy.get('#eraserBtn').click();
        cy.get('#eraserBtn').should('not.have.class', 'active');
    });

    it('should open and close overview', () => {
        cy.get('#overviewBtn').click();
        cy.get('#overviewContainer').should('be.visible');
        cy.get('#overviewContainer').click();
        cy.get('#overviewContainer').should('not.be.visible');
    });
});