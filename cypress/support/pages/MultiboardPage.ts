import CypressPage from "../relish-cypress/CypressPage";
import CypressWidget from "../relish-cypress/CypressWidget";
import {MenuWidget} from "../components/MenuWidget";
import {multiboardPage} from "./index";
import RoundButtonWidget from "../components/RoundButtonWidget";
import InputText from "../relish-cypress/InputText";
import CanvasWidget from "../components/CanvasWidget";
import InputWidget from "../relish-cypress/InputWidget";
import InputBrushSize from "../components/InputBrushSize";
import ImgWidget from "../components/ImgWidget";

// <reference path="cypress/types/index.d.ts" />

export default class MultiboardPage extends CypressPage {
    constructor() {
        super("/multiboard.html");
    }

    public clearBoards() {
        this.overviewButton.click()
        this.removeAllBoards()
        this.overviewContainer.click()
        this.clearButton.click()
        this.confirmYesButton.click()
    }

    public removeAllBoards(maxAttempts = 10) {
        cy.log('XXXXXX')
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

    get boardInfo() {
        return new CypressWidget('#boardInfo', this);
    }

    get confirmNoButton() {
        return new CypressWidget('#confirmNo', this);
    }

    get confirmYesButton() {
        return new CypressWidget('#confirmYes', this);
    }

    get clearButton() {
        return new CypressWidget('#clearBtn', this);
    }

    get newBoardButton() {
        return new CypressWidget('#newBoardBtn', this);
    }

    get nextButton() {
        return new CypressWidget('#nextBtn', this);
    }

    get previousButton() {
        return new CypressWidget('#prevBtn', this);
    }

    get penButton() {
        return new RoundButtonWidget('#penBtn', this);
    }

    get undoButton() {
        return new RoundButtonWidget('#undoBtn', this);
    }
    get eraserButton() {
        return new RoundButtonWidget('#eraserBtn', this);
    }

    get brushSizeDisplay() {
        return new InputBrushSize('#brushSizeDisplay', this);
    }

    get brushSize() {
        return new InputText('#brushSize', this);
    }

    get highlighterButton() {
        return new RoundButtonWidget('#highlighterBtn', this);
    }

    get overviewButton() {
        return new CypressWidget('#overviewBtn', this);
    }

    get saveButton() {
        return new CypressWidget('#saveBtn', this);
    }

    get overviewContainer() {
        return new CypressWidget('#overviewContainer', this);
    }

    overviewItem(index: Number) {
        return new ImgWidget(`#overviewItem-${index}`, this);
    }
}
