// cypress/e2e/todo.cy.ts

import {toDoPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Journal tab', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        const now = new Date(2024, 0, 1, 23, 30);  // Jan 1, 2024, 23:30
        cy.clock(now);
        cy.visit("/")
        // @ts-ignore
        cy.deleteDatabase('TodoDB')
        toDoPage.launch()
    });

    it('should show completions on the journal', () => {
        toDoPage.newTask.set("Buy fish [daily]")
        toDoPage.saveButton.click()
        cy.tick(24 * 60 * 60 * 1000); // Advance a day
        toDoPage.tasks.item(0).checkbox.check()
        cy.tick(24 * 60 * 60 * 1000); // Advance a day
        toDoPage.tasks.item(0).checkbox.check()
        toDoPage.journalTab.click()
        toDoPage.journalDays.matches(table`
        | header    |
        | Today     |
        | Yesterday |
        `)
        toDoPage.journalDays.item(0).journalItems.matches(table`
        | time     | title    |
        | 11:30 PM | Buy fish |
        `)
        toDoPage.journalDays.item(1).journalItems.matches(table`
        | time     | title    |
        | 11:30 PM | Buy fish |
        `)
    });
});