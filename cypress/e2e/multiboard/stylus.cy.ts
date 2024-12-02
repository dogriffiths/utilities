// cypress/e2e/whiteboard_spec.js

import {multiboardPage} from "../../support/pages";

describe('Stylus functionality', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        // @ts-ignore
        cy.deleteDatabase('WhiteboardDB')
        multiboardPage.launch()
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

        multiboardPage.canvas.draw(150, 150, 300, 380)

        multiboardPage.tools.undo()

        multiboardPage.body.type('2')

        multiboardPage.canvas.draw(150, 150, 300, 380)

        multiboardPage.canvas.matches('cypress/expectedimages/even_width_line.png');
    });

    it('should keep the brush width when switching between stylus and mouse', () => {
        multiboardPage.body.type('3')

        multiboardPage.canvas.draw(150, 150, 300, 380)

        multiboardPage.canvas.drawWithStylus(350, 150, 500, 380, 0.2)

        multiboardPage.canvas.draw(550, 150, 700, 380)

        multiboardPage.canvas.drawWithStylus(750, 150, 900, 380, 0.2)

        multiboardPage.canvas.matches('cypress/expectedimages/brush_width_preserved.png');
    });
});