// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-xpath'
import 'cypress-axe'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
    namespace Cypress {
        interface Chainable {
            // @ts-ignore
            injectAxe(): void;

            // @ts-ignore
            checkA11y(context?: any,
                      options?: any,
                      violationCallback?: (violations: any[]) => void,
                      skipFailures?: boolean): void;
        }
    }
}
