// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../../support/pages";

describe('Sticky notes', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        // @ts-ignore
        cy.deleteDatabase('WhiteboardDB')
        multiboardPage.launch()
    });

    it('should not blank out images', () => {
        multiboardPage.brushSizeDisplay.set("40")

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, offsetX: 150, offsetY: 150})
            .trigger('mousemove', {offsetX: 175, offsetY: 175})
            .trigger('mouseup')

        multiboardPage.newBoardButton.click()

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, offsetX: 150, offsetY: 400})
            .trigger('mousemove', {offsetX: 175, offsetY: 200})
            .trigger('mouseup')

        multiboardPage.canvas.getChainer().dblclick(500, 500);

        multiboardPage.previousButton.click()

        multiboardPage.overviewButton.click()

        multiboardPage.overviewItem(0).matches('cypress/expectedImages/thickline-item0.png');
        multiboardPage.overviewItem(1).matches('cypress/expectedImages/thickline-item1.png');
    });
});