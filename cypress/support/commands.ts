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

// commands.js or support/commands.js

// @ts-ignore
Cypress.Commands.add('deleteDatabase', (dbName) => {
    cy.window().then((win) => {
        // Check if indexedDB exists in window
        if (win.indexedDB) {
            return new Cypress.Promise((resolve, reject) => {
                // @ts-ignore
                const req = win.indexedDB.deleteDatabase(dbName);

                req.onerror = () => {
                    reject(new Error(`Failed to delete IndexedDB: ${dbName}`));
                };

                req.onsuccess = () => {
                    resolve();
                };

                req.onblocked = () => {
                    // Handle case where database is still in use
                    cy.log('Database deletion blocked - closing connections');
                    // Force close any open connections
                    win.indexedDB.databases().then((databases) => {
                        databases.forEach((db) => {
                            if (db.name === dbName) {
                                // @ts-ignore
                                const closeRequest = win.indexedDB.open(db.name);
                                closeRequest.onsuccess = (event) => {
                                    // @ts-ignore
                                    const db = event.target.result;
                                    db.close();
                                };
                            }
                        });
                    });
                };
            });
        }
    });
});

// @ts-ignore
// Cypress.Commands.add('deleteDatabase', (dbName: string) => {
//     cy.window().then((win) => {
//         const deleteRequest = win.indexedDB.deleteDatabase('dbName');
//
//         deleteRequest.onerror = (event) => {
//             console.error("Error deleting database:", event);
//         };
//
//         deleteRequest.onsuccess = (event) => {
//             console.log("Database deleted successfully");
//         };
//     });
// });

export {};