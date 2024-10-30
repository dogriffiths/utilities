// cypress/e2e/todo.cy.ts

import {toDoPage, multiboardPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Todo Application', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("/")
        // @ts-ignore
        cy.deleteDatabase('TodoDB')
        toDoPage.launch()
    });

    it('should be able to drag boards around', () => {
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

    it.only('should reset resettable tasks the next day', () => {
        toDoPage.newTask.set("Buy fish")
        toDoPage.saveButton.click()
        toDoPage.tasks.item(0).click()
        toDoPage.editDialog.reset.check()
        toDoPage.editDialog.saveButton.click()
        toDoPage.tasks.item(0).checkbox.check()
        toDoPage.tasks.assertEmpty()
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 1, 0, 0);
        cy.clock(tomorrow.getTime());
        cy.reload()
        toDoPage.tasks.matches(table`
        | text         |
        | Buy fish     |
        `)
    });
});