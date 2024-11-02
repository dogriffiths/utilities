// cypress/e2e/todo.cy.ts

import {toDoPage} from "../../support/pages";
import {table} from "../../support/utils";

describe('Kanban tab', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        const now = new Date(2024, 0, 1, 23, 30);  // Jan 1, 2024, 23:30
        cy.clock(now);
        cy.visit("/")
        // @ts-ignore
        cy.deleteDatabase('TodoDB')
        toDoPage.launch()
    });

    it('should be possible to move things on the Kanban board', () => {
        toDoPage.newTask.set("Buy fish")
        toDoPage.saveButton.click()
        toDoPage.newTask.set("Buy bread")
        toDoPage.saveButton.click()
        toDoPage.newTask.set("Check email")
        toDoPage.saveButton.click()
        toDoPage.kanbanTab.click()
        toDoPage.kanbanColumns.matches(table`
        | header      |
        | Todo        |
        | In Progress |
        | Done        |
        `)
        toDoPage.kanbanColumns.item(0).tasks.matches(table`
        | content     |
        | Buy fish    |
        | Buy bread   |
        | Check email |
        `)
        toDoPage.kanbanColumns.item(1).tasks.assertEmpty()
        toDoPage.kanbanColumns.item(2).tasks.assertEmpty()
        toDoPage.kanbanColumns.item(0).tasks.item(1).dragTo(toDoPage.kanbanColumns.item(1))
        toDoPage.kanbanColumns.item(0).tasks.matches(table`
        | content     |
        | Buy fish    |
        | Check email |
        `)
        toDoPage.kanbanColumns.item(1).tasks.matches(table`
        | content     |
        | Buy bread   |
        `)
        toDoPage.kanbanColumns.item(2).tasks.assertEmpty()
        toDoPage.kanbanColumns.item(0).tasks.item(0).dragTo(toDoPage.kanbanColumns.item(2))
        toDoPage.kanbanColumns.item(0).tasks.matches(table`
        | content     |
        | Check email |
        `)
        toDoPage.kanbanColumns.item(1).tasks.matches(table`
        | content     |
        | Buy bread   |
        `)
        toDoPage.kanbanColumns.item(2).tasks.matches(table`
        | content     |
        | Buy fish    |
        `)
        toDoPage.journalTab.click()
        toDoPage.journalDays.matches(table`
        | header    |
        | Today     |
        `)
        toDoPage.journalDays.item(0).journalItems.matches(table`
        | time     | title                      | description              |
        | 11:30 PM | 🔄 Moved task: "Buy bread" | From todo to in progress |
        | 11:30 PM | 🔄 Moved task: "Buy fish"  | From todo to done        |
        `)
    });
});