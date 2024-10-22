// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Overview', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        // @ts-ignore
        cy.deleteDatabase('WhiteboardDB')
        multiboardPage.launch()
        multiboardPage.set(table`
        | name        |
        | Whiteboard1 |
        | Whiteboard2 |
        | Whiteboard3 |
        `)
        multiboardPage.navigation.overview()
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)

    });

    it('should open and close overview', () => {
        multiboardPage.overviewContainer.click()
        multiboardPage.overviewContainer.assertInvisible()
    });

    it('should be able to drag in the overview 0', () => {
        multiboardPage.overviewContainer.drag(2, 0, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard3 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard2 3/3 |
        `)

        multiboardPage.overviewContainer.drag(0, 1, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard3 2/3 |
        | Whiteboard2 3/3 |
        `)
    });

    it('should be able to drag in the overview 1', () => {
        multiboardPage.overviewContainer.drag(1, 0, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 2', () => {
        multiboardPage.overviewContainer.drag(0, 2, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard3 2/3 |
        | Whiteboard1 3/3 |
        `)
    });

    it('should be able to drag in the overview 3', () => {
        multiboardPage.overviewContainer.drag(0, 1, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 4', () => {
        multiboardPage.overviewContainer.drag(0, 2, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 5', () => {
        multiboardPage.overviewContainer.drag(1, 0, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 6', () => {
        multiboardPage.overviewContainer.drag(1, 2, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard3 2/3 |
        | Whiteboard2 3/3 |
        `)
    });

    it('should be able to drag in the overview 7', () => {
        multiboardPage.overviewContainer.drag(1, 2, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 8', () => {
        multiboardPage.overviewContainer.drag(1, 1, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 9', () => {
        multiboardPage.overviewContainer.drag(1, 1, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 10', () => {
        multiboardPage.overviewContainer.drag(2, 0, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard3 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard2 3/3 |
        `)
    });

    it('should be able to drag in the overview 11', () => {
        multiboardPage.overviewContainer.drag(2, 0, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard3 2/3 |
        | Whiteboard2 3/3 |
        `)
    });

    it('should be able to drag in the overview 12', () => {
        multiboardPage.overviewContainer.drag(2, 1, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard3 2/3 |
        | Whiteboard2 3/3 |
        `)
    });

    it('should be able to drag in the overview 13', () => {
        multiboardPage.overviewContainer.drag(2, 1, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 14', () => {
        multiboardPage.overviewContainer.drag(2, 2, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should be able to drag in the overview 15', () => {
        multiboardPage.overviewContainer.drag(2, 2, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)
    });

    it('should not mess up current board position', () => {
        multiboardPage.overviewContainer.click()
        multiboardPage.navigation.previous()
        multiboardPage.navigation.overview()
        multiboardPage.overviewContainer.drag(1, 0, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard3 3/3 |
        `)
        multiboardPage.overviewContainer.drag(1, 2, 10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard3 2/3 |
        | Whiteboard1 3/3 |
        `)
        multiboardPage.overviewContainer.click()
        multiboardPage.navigation.matches("Whiteboard2 1 / 3")
    });

    it('should go to the right thing when clicked', () => {
        multiboardPage.overviewContainer.click()
        multiboardPage.navigation.previous()
        multiboardPage.navigation.overview()
        multiboardPage.overviewContainer.drag(1, 0, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard3 3/3 |
        `)
        multiboardPage.overviewContainer.item(0).click()
        multiboardPage.navigation.matches("Whiteboard2 1 / 3")
    });

    it('should go to the right thing when the user removes it', () => {
        multiboardPage.overviewContainer.click()
        multiboardPage.navigation.previous()
        multiboardPage.navigation.overview()
        multiboardPage.overviewContainer.drag(1, 0, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard3 3/3 |
        `)
        multiboardPage.overviewContainer.item(0).removeButton.click()
        multiboardPage.removeYesButton.click()
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/2 |
        | Whiteboard3 2/2 |
        `)
    });

    it('should not blend images', () => {
        multiboardPage.overviewContainer.click()
        multiboardPage.navigation.previous()
        multiboardPage.navigation.previous()
        multiboardPage.canvas.draw(150, 150, 200, 200)
        multiboardPage.navigation.next()
        multiboardPage.body.type('2')
        multiboardPage.canvas.draw(150, 150, 300, 380)
        multiboardPage.navigation.overview()
        multiboardPage.overviewContainer.drag(1, 0, -10)
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard2 1/3 |
        | Whiteboard1 2/3 |
        | Whiteboard3 3/3 |
        `)
        multiboardPage.overviewContainer.item(0).click()
        multiboardPage.navigation.matches("Whiteboard2 1 / 3")
        multiboardPage.canvas.matches('cypress/expectedimages/even_width_line.png');
        multiboardPage.navigation.next()
        multiboardPage.canvas.matches('cypress/expectedimages/simple_line.png');
    });
});