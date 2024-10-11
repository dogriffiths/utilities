// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../support/pages";

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

    it('should toggle eraser mode', () => {
        multiboardPage.eraserButton.click();
        multiboardPage.eraserButton.assertActive()
        multiboardPage.eraserButton.click();
        multiboardPage.eraserButton.assertInactive()
    });

    it('should toggle highlighter mode', () => {
        multiboardPage.highlighterButton.click();
        multiboardPage.highlighterButton.assertActive()
        multiboardPage.highlighterButton.click();
        multiboardPage.highlighterButton.assertInactive()
    });

    it('should be able to select brush by key press', () => {
        multiboardPage.brushSizeDisplay.matches("2");
        multiboardPage.type("1")
        multiboardPage.brushSizeDisplay.matches("16");
        multiboardPage.type("2")
        multiboardPage.brushSizeDisplay.matches("28");
        multiboardPage.type("3")
        multiboardPage.brushSizeDisplay.matches("40");
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
});