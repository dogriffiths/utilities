const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": "http://localhost:8080",
    "specPattern": 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    "supportFile": 'cypress/support/e2e.ts',
    "chromeWebSecurity": false,
    "chromeBrowser": {
      "args": ["--no-sandbox", "--disable-cache"]
    },

  },
});
