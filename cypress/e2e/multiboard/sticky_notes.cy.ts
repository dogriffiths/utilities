// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Sticky notes', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        // @ts-ignore
        cy.deleteDatabase('WhiteboardDB')
        multiboardPage.launch()
    });

    it('should not blank out images', () => {
        multiboardPage.tools.set("40")
        multiboardPage.canvas.draw(150, 150, 175, 175)

        multiboardPage.navigation.new()
        multiboardPage.canvas.draw(150, 400, 175, 200)

        multiboardPage.canvas.getChainer().dblclick(500, 500);

        multiboardPage.navigation.previous()

        multiboardPage.navigation.overview()

        multiboardPage.overviewContainer.matches(table`
        | name           | image                                      |
        | Whiteboard 1/2 | cypress/expectedImages/thickline-item0.png |
        | Whiteboard 2/2 | cypress/expectedImages/thickline-item1.png |
        `)
    });
});