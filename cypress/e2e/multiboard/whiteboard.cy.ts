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
        multiboardPage.tools.penButton.assertActive()
        multiboardPage.tools.highlighterButton.assertInactive()
        multiboardPage.tools.eraserButton.assertInactive()

        multiboardPage.tools.highlighter();
        multiboardPage.tools.penButton.assertInactive()
        multiboardPage.tools.highlighterButton.assertActive()
        multiboardPage.tools.eraserButton.assertInactive()

        multiboardPage.tools.eraser();
        multiboardPage.tools.penButton.assertInactive()
        multiboardPage.tools.highlighterButton.assertInactive()
        multiboardPage.tools.eraserButton.assertActive()

        multiboardPage.tools.pen();
        multiboardPage.tools.penButton.assertActive()
        multiboardPage.tools.highlighterButton.assertInactive()
        multiboardPage.tools.eraserButton.assertInactive()
    });

    it('should be able to select brush by key press', () => {
        multiboardPage.matches("2");
        multiboardPage.type("1")
        multiboardPage.matches("8");
        multiboardPage.type("2")
        multiboardPage.matches("16");
        multiboardPage.type("3")
        multiboardPage.matches("30");
        multiboardPage.type("4")
        multiboardPage.matches("50");
        multiboardPage.type("0")
        multiboardPage.matches("2");
    });

    it('should be able to draw a simple line', () => {
        multiboardPage.canvas.draw(150, 150, 200, 200)
        multiboardPage.canvas.matches('cypress/expectedimages/simple_line.png');
    });
});