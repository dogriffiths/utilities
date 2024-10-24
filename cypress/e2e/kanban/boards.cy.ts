// cypress/e2e/whiteboard_spec.js

import {kanBanPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Whiteboard Application', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        kanBanPage.launch()
    });

    it('should be able to drag boards around', () => {
        kanBanPage.columns.matches(table`
        | title       |
        | To Do       | 
        | In Progress | 
        | Done        | 
        `)
        // kanBanPage.columns.item(0).dragTo(kanBanPage.columns.item(2))
        // kanBanPage.columns.matches(table`
        // | title       |
        // | In Progress |
        // | Done        |
        // | To Do       |
        // `)
        // kanBanPage.columns.item(2).dragTo(kanBanPage.columns.item(0), -10)
        // kanBanPage.columns.matches(table`
        // | title       |
        // | In Progress |
        // | To Do       |
        // | Done        |
        // `)
    });
});