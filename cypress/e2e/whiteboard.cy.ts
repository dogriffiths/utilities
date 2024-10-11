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
        multiboardPage.eraserButton.assertHasClass('active')
        multiboardPage.eraserButton.click();
        multiboardPage.eraserButton.assertDoesNotHaveClass('active')
    });

    it('should open and close overview', () => {
        multiboardPage.overviewButton.click()
        multiboardPage.overviewContainer.assertVisible()
        multiboardPage.overviewContainer.click()
        multiboardPage.overviewContainer.assertInvisible()
    });
});