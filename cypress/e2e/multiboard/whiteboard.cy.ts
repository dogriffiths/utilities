// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Whiteboard Application', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        // @ts-ignore
        cy.deleteDatabase('WhiteboardDB')
        multiboardPage.launch()
    });

    it('should create a new whiteboard', () => {
        multiboardPage.navigation.new()
        multiboardPage.navigation.matches('Whiteboard 2 / 2')
    });

    it('should navigate between whiteboards', () => {
        multiboardPage.navigation.new()
        multiboardPage.navigation.previous()
        multiboardPage.navigation.matches('Whiteboard 1 / 2')
        multiboardPage.navigation.next()
        multiboardPage.navigation.matches('Whiteboard 2 / 2')
    });

    it('should navigate between whiteboards using arrow keys', () => {
        multiboardPage.navigation.new()
        multiboardPage.type("{leftarrow}")
        multiboardPage.navigation.matches('Whiteboard 1 / 2')
        multiboardPage.type("{rightarrow}")
        multiboardPage.navigation.matches('Whiteboard 2 / 2')
    });

    it('should select tools in a group', () => {
        multiboardPage.penButton.assertActive()
        multiboardPage.highlighterButton.assertInactive()
        multiboardPage.eraserButton.assertInactive()

        multiboardPage.highlighterButton.click();
        multiboardPage.penButton.assertInactive()
        multiboardPage.highlighterButton.assertActive()
        multiboardPage.eraserButton.assertInactive()

        multiboardPage.eraserButton.click();
        multiboardPage.penButton.assertInactive()
        multiboardPage.highlighterButton.assertInactive()
        multiboardPage.eraserButton.assertActive()

        multiboardPage.penButton.click();
        multiboardPage.penButton.assertActive()
        multiboardPage.highlighterButton.assertInactive()
        multiboardPage.eraserButton.assertInactive()
    });

    it('should be able to select brush by key press', () => {
        multiboardPage.brushSizeDisplay.matches("2");
        multiboardPage.type("1")
        multiboardPage.brushSizeDisplay.matches("8");
        multiboardPage.type("2")
        multiboardPage.brushSizeDisplay.matches("16");
        multiboardPage.type("3")
        multiboardPage.brushSizeDisplay.matches("30");
        multiboardPage.type("4")
        multiboardPage.brushSizeDisplay.matches("50");
        multiboardPage.type("0")
        multiboardPage.brushSizeDisplay.matches("2");
    });

    it('should open and close overview', () => {
        multiboardPage.overviewButton.click()
        multiboardPage.overviewContainer.assertVisible()
        multiboardPage.overviewContainer.click()
        multiboardPage.overviewContainer.assertInvisible()
    });

    it('should be able to drag in the overview', () => {
        multiboardPage.navigation.set("Whiteboard1")
        multiboardPage.navigation.new()
        multiboardPage.navigation.set("Whiteboard2")
        multiboardPage.navigation.new()
        multiboardPage.navigation.set("Whiteboard3")
        multiboardPage.overviewButton.click()
        multiboardPage.overviewContainer.assertVisible()
        multiboardPage.overviewContainer.matches(table`
        | name            |
        | Whiteboard1 1/3 |
        | Whiteboard2 2/3 |
        | Whiteboard3 3/3 |
        `)

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

    it('should be able to draw a simple line', () => {
        multiboardPage.canvas.getChainer()
            .trigger('mousedown', {offsetX: 150, offsetY: 150})
            .trigger('mousemove', {offsetX: 200, offsetY: 200})
            .trigger('mouseup');
        multiboardPage.canvas.matches('cypress/expectedimages/simple_line.png');
    });
});