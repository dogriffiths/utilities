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

    it('should draw a vertical line if you go down and hold shift', () => {
        multiboardPage.body
            .type('{shift}', {release: false})

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, clientX: 150, clientY: 150})
            .trigger('mousemove', {clientX: 160, clientY: 200})

        multiboardPage.body
            .type('{shift}', {release: true});

        multiboardPage.canvas
            .trigger('mousemove', {clientX: 170, clientY: 300})
            .trigger('mouseup')

        multiboardPage.canvas.matches('cypress/expectedimages/vertical_line.png');
    });

    it('should draw a horizontal line if you go down and hold shift', () => {
        multiboardPage.body
            .type('{shift}', {release: false})

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, clientX: 150, clientY: 150})
            .trigger('mousemove', {clientX: 220, clientY: 170})

        multiboardPage.body
            .type('{shift}', {release: true});

        multiboardPage.canvas
            .trigger('mousemove', {clientX: 300, clientY: 380})
            .trigger('mouseup')

        multiboardPage.canvas.matches('cypress/expectedimages/horizontal_line.png');
    });

    it('should not carry over old brush width', () => {
        multiboardPage.body.type('3')

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, clientX: 150, clientY: 150})
            .trigger('mousemove', {clientX: 300, clientY: 380})
            .trigger('mouseup')

        multiboardPage.undoButton.click()

        multiboardPage.body.type('2')

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, clientX: 150, clientY: 150})
            .trigger('mousemove', {clientX: 300, clientY: 380})
            .trigger('mouseup')

        multiboardPage.canvas.matches('cypress/expectedimages/even_width_line.png');
    });
});