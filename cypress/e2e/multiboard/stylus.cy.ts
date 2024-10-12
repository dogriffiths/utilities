// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../../support/pages";

describe('Stylus functionality', () => {
    beforeEach(() => {
        multiboardPage.launch()
        multiboardPage.clearBoards()
    });

    it('should use the highlighter if you hold down CTRL', () => {
        multiboardPage.body
            .type('{ctrl}', {release: false})

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, clientX: 150, clientY: 150})
            .trigger('mousemove', {clientX: 175, clientY: 175})

        multiboardPage.body
            .type('{ctrl}', {release: true});

        multiboardPage.canvas
            .trigger('mousemove', {clientX: 200, clientY: 200})
            .trigger('mouseup')

        multiboardPage.canvas.matches('cypress/expectedimages/highlighter_line.png');
    });
});