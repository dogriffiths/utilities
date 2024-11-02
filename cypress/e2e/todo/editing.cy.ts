// cypress/e2e/todo.cy.ts

import {toDoPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Editing todos', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        const now = new Date(2024, 0, 1, 23, 30);  // Jan 1, 2024, 23:30
        cy.clock(now);
        cy.visit("/")
        // @ts-ignore
        cy.deleteDatabase('TodoDB')
        toDoPage.launch()
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
});