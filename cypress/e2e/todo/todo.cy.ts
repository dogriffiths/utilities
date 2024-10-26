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
});