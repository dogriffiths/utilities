// cypress/e2e/todo.cy.ts

import {toDoPage, multiboardPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Todo Application', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        const now = new Date(2024, 0, 1, 23, 30);  // Jan 1, 2024, 23:30
        cy.clock(now);
        cy.visit("/")
        // @ts-ignore
        cy.deleteDatabase('TodoDB')
        toDoPage.launch()
    });

    it('should be able to drag tasks around', () => {
        toDoPage.newTask.set("Buy fish")
        toDoPage.saveButton.click()
        toDoPage.newTask.set("Buy bread")
        toDoPage.saveButton.click()
        toDoPage.tasks.matches(table`
        | text      |
        | Buy fish  | 
        | Buy bread | 
        `)
        toDoPage.tasks.item(1).dragTo(toDoPage.tasks.item(0), {offsetY: -10})
        toDoPage.tasks.matches(table`
        | text      |
        | Buy bread | 
        | Buy fish  | 
        `)
    });

    it('should be able to edit details and add a description', () => {
        toDoPage.newTask.set("Buy fish")
        toDoPage.saveButton.click()
        toDoPage.newTask.set("Buy bread")
        toDoPage.saveButton.click()
        toDoPage.tasks.matches(table`
        | text      |
        | Buy fish  |
        | Buy bread |
        `)
        toDoPage.tasks.item(1).click()
        toDoPage.editDialog.text.set('Buy baguette')
        toDoPage.editDialog.description.set('From that local bakery')
        toDoPage.editDialog.saveButton.click()
        toDoPage.tasks.matches(table`
        | text         | description            |
        | Buy fish     |                        |
        | Buy baguette | From that local bakery |
        `)
    });

    it('should be able to add comments to a task', () => {
        toDoPage.newTask.set("Buy fish")
        toDoPage.saveButton.click()
        toDoPage.tasks.item(0).click()
        toDoPage.editDialog.newComment.set("This looks good!")
        toDoPage.editDialog.saveCommentButton.click()
        toDoPage.editDialog.comments.matches(table`
        | text             |
        | This looks good! |
        `)
        toDoPage.editDialog.saveButton.click()
        toDoPage.tasks.matches(table`
        | text     | comments |
        | Buy fish | 1        |
        `)
    });

    it('should reset resettable tasks the next day', () => {
        toDoPage.newTask.set("Buy fish")
        toDoPage.saveButton.click()
        toDoPage.tasks.item(0).click()
        toDoPage.editDialog.reset.check()
        toDoPage.editDialog.saveButton.click()
        toDoPage.tasks.item(0).checkbox.check()
        toDoPage.tasks.assertEmpty()
        cy.tick(30 * 60 * 1000 + 1); // Advance to 1 millisecond past midnight
        toDoPage.tasks.matches(table`
        | text         |
        | Buy fish     |
        `)
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
        | header               |
        | Today |
        | Yesterday   |
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