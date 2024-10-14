// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../../support/pages";

describe('Stylus functionality', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        multiboardPage.launch()
        multiboardPage.clearBoards()
    });

    it('should use the highlighter if you hold down CTRL', () => {
        multiboardPage.body
            .type('{ctrl}', {release: false})

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, offsetX: 150, offsetY: 150})
            .trigger('mousemove', {offsetX: 175, offsetY: 175})

        multiboardPage.body
            .type('{ctrl}', {release: true});

        multiboardPage.canvas
            .trigger('mousemove', {offsetX: 200, offsetY: 200})
            .trigger('mouseup')

        multiboardPage.canvas.matches('cypress/expectedimages/highlighter_line.png');
    });

    it('should draw a vertical line if you go down and hold shift', () => {
        multiboardPage.body
            .type('{shift}', {release: false})

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, offsetX: 150, offsetY: 150})
            .trigger('mousemove', {offsetX: 160, offsetY: 200})

        multiboardPage.body
            .type('{shift}', {release: true});

        multiboardPage.canvas
            .trigger('mousemove', {offsetX: 170, offsetY: 300})
            .trigger('mouseup')

        multiboardPage.canvas.matches('cypress/expectedimages/vertical_line.png');
    });

    it('should draw a horizontal line if you go down and hold shift', () => {
        multiboardPage.body
            .type('{shift}', {release: false})

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, offsetX: 150, offsetY: 150})
            .trigger('mousemove', {offsetX: 220, offsetY: 170})

        multiboardPage.body
            .type('{shift}', {release: true});

        multiboardPage.canvas
            .trigger('mousemove', {offsetX: 300, offsetY: 380})
            .trigger('mouseup')

        multiboardPage.canvas.matches('cypress/expectedimages/horizontal_line.png');
    });

    it('should not carry over old brush width', () => {
        multiboardPage.body.type('3')

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, offsetX: 150, offsetY: 150})
            .trigger('mousemove', {offsetX: 300, offsetY: 380})
            .trigger('mouseup')

        multiboardPage.undoButton.click()

        multiboardPage.body.type('2')

        multiboardPage.canvas
            .trigger('mousedown', {button: 0, offsetX: 150, offsetY: 150})
            .trigger('mousemove', {offsetX: 300, offsetY: 380})
            .trigger('mouseup')

        multiboardPage.canvas.matches('cypress/expectedimages/even_width_line.png');
    });
});