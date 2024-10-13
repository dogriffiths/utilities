// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../../support/pages";

describe('Whiteboard Application', () => {
    beforeEach(() => {
        multiboardPage.launch()
        multiboardPage.clearBoards()
    });

    it('should create a new whiteboard', () => {
        multiboardPage.newBoardButton.click()
        multiboardPage.boardInfo.matches('Whiteboard 2 / 2')
    });

    it('should navigate between whiteboards', () => {
        multiboardPage.newBoardButton.click()
        multiboardPage.previousButton.click()
        multiboardPage.boardInfo.matches('Whiteboard 1 / 2')
        multiboardPage.nextButton.click()
        multiboardPage.boardInfo.matches('Whiteboard 2 / 2')
    });

    it('should navigate between whiteboards using arrow keys', () => {
        multiboardPage.newBoardButton.click()
        multiboardPage.type("{leftarrow}")
        multiboardPage.boardInfo.matches('Whiteboard 1 / 2')
        multiboardPage.type("{rightarrow}")
        multiboardPage.boardInfo.matches('Whiteboard 2 / 2')
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

    it('should be able to draw a simple line', () => {
        multiboardPage.canvas.getChainer()
            .trigger('mousedown', {clientX: 150, clientY: 150})
            .trigger('mousemove', {clientX: 200, clientY: 200})
            .trigger('mouseup');
        multiboardPage.canvas.matches('cypress/expectedimages/simple_line.png');
    });
});