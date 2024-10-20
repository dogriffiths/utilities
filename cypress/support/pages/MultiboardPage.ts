import CypressPage from "../relish-cypress/CypressPage";
import CypressWidget from "../relish-cypress/CypressWidget";
import CanvasWidget from "../components/CanvasWidget";
import OverviewContainer from "../components/OverviewContainer";
import Navigation from "../components/Navigation";
import Tools from "../components/Tools";
import TableRow from "../relish-core/TableRow";
import Component from "../relish-core/Component";

// <reference path="cypress/types/index.d.ts" />

export default class MultiboardPage extends CypressPage {
    constructor() {
        super("/multiboard.html");
    }

    public clearBoards() {
        this.navigation.overview()
        this.removeAllBoards()
        this.overviewContainer.click()
        this.tools.clear()
        this.confirmYesButton.click()
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

    get canvas() {
        return new CanvasWidget('#canvas', this);
    }

    get tools() {
        return new Tools('#drawing-controls', this);
    }

    get navigation() {
        return new Navigation('#navigation', this);
    }

    get confirmNoButton() {
        return new CypressWidget('#confirmNo', this);
    }

    get confirmYesButton() {
        return new CypressWidget('#confirmYes', this);
    }

    get overviewContainer() {
        return new OverviewContainer('#overviewContainer', this);
    }

    set(rows: TableRow[]): MultiboardPage {
        this.clearBoards()
        rows.forEach((row, index) => {
            this.navigation.set(row.getString("name"))
            if (index !== rows.length - 1) {
                this.navigation.new()
            }
        })
        return this
    }
}
