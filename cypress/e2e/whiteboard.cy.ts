// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../support/pages";

describe('Whiteboard Application', () => {
    beforeEach(() => {
        multiboardPage.launch()
        multiboardPage.clearBoards()
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
        multiboardPage.eraserButton.click();
        cy.get('#eraserBtn').should('have.class', 'active');
        multiboardPage.eraserButton.click();
        cy.get('#eraserBtn').should('not.have.class', 'active');
    });

    it('should open and close overview', () => {
        multiboardPage.overviewButton.click()
        multiboardPage.overviewContainer.assertVisible()
        multiboardPage.overviewContainer.click()
        multiboardPage.overviewContainer.assertInvisible()
    });
});