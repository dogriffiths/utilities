// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// @ts-ignore

declare global {
    namespace Cypress {
        interface Chainable {
            compareImages(image1Path: string, image2Path: string, threshold?: number): Chainable;
        }
    }
}

// @ts-ignore
Cypress.Commands.add('compareImages', (image1Path: string, image2Path: string, threshold: number = 0.1): Cypress.Chainable<boolean> => {
    return cy.exec(`magick compare -metric MAE "${image1Path}" "${image2Path}" null:`, { failOnNonZeroExit: false })
        .then((result) => {
            // ImageMagick returns the comparison value in stderr
            const difference = parseFloat(result.stderr.split(' ')[0]);
            return difference <= threshold;
        });
});

export {};