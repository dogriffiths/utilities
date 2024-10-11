import CypressPage from "../relish-cypress/CypressPage";
import CypressWidget from "../relish-cypress/CypressWidget";
import {MenuWidget} from "../components/MenuWidget";
import {multiboardPage} from "./index";

// <reference path="cypress/types/index.d.ts" />

export default class MultiboardPage extends CypressPage {
    constructor() {
        super("/multiboard.html");
    }

    public clearBoards() {
        this.overviewButton.click()
        this.removeAllBoards()
        this.overviewContainer.click()
    }

    public removeAllBoards(maxAttempts = 10) {
        if (maxAttempts <= 0) {
            throw new Error('Max deletion attempts reached');
        }

        cy.get('body').then($body => {
            if ($body.find('.removeWhiteboardBtn').length > 1) {
                cy.get('.removeWhiteboardBtn').first().click()
                    .then(() => {
                        cy.get('#removeWhiteboardYes').click();
                        cy.get('.removeWhiteboardBtn').should('have.length.lt', $body.find('.removeWhiteboardBtn').length);
                        this.removeAllBoards(maxAttempts - 1);
                    });
            }
        });
    }

    get eraserButton() {
        return new CypressWidget('#eraserBtn', this);
    }

    get overviewButton() {
        return new CypressWidget('#overviewBtn', this);
    }

    get overviewContainer() {
        return new CypressWidget('#overviewContainer', this);
    }
}
