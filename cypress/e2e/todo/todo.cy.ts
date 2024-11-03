// cypress/e2e/todo.cy.ts

import {toDoPage} from "../../support/pages";
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

    it('should be complete tasks after importing a database', () => {
        toDoPage.importDatabase({
            todos: [],
            completed: [
                {
                    id: 1,
                    text: "Set up development environment",
                    description: "Install all required tools",
                    position: 0,
                    section: "done",
                    context: "work",
                    comments: [],
                    created: "2024-01-01T09:00:00.000Z",
                    completedAt: "2024-01-01T15:00:00.000Z"
                }
            ],
            kanbanJournal: []
        });

        toDoPage.newTask.set("Buy fish")
        toDoPage.saveButton.click()
        toDoPage.tasks.item(0).checkbox.check()
        toDoPage.tasks.assertEmpty()
    });

    it('should track completion streaks', () => {
        toDoPage.newTask.set("Buy fish [daily]")
        toDoPage.saveButton.click()
        toDoPage.habitsTab.click()
        toDoPage.habits.matches(table`
        | name     | lastUpdate                  | bestStreak | currentStreak |
        | Buy fish | Last completed: Not started | 0          | 0             |
        `)
        toDoPage.tasksTab.click()
        cy.tick(24 * 60 * 60 * 1000); // Advance a day
        toDoPage.tasks.item(0).checkbox.check()
        toDoPage.habitsTab.click()
        toDoPage.habits.matches(table`
        | name     | lastUpdate               | bestStreak | currentStreak |
        | Buy fish | Last completed: 1/2/2024 | 1          | 1             |
        `)
        toDoPage.tasksTab.click()
        cy.tick(24 * 60 * 60 * 1000); // Advance a day
        toDoPage.tasks.item(0).streak.matches("1")
        toDoPage.habitsTab.click()
        toDoPage.habits.matches(table`
        | name     | lastUpdate               | bestStreak | currentStreak |
        | Buy fish | Last completed: 1/2/2024 | 1          | 1             |
        `)
        toDoPage.tasksTab.click()
        toDoPage.tasks.item(0).checkbox.check()
        toDoPage.habitsTab.click()
        toDoPage.habits.matches(table`
        | name     | lastUpdate               | bestStreak | currentStreak |
        | Buy fish | Last completed: 1/3/2024 | 2          | 2             |
        `)
        toDoPage.tasksTab.click()
        cy.tick(24 * 60 * 60 * 1000); // Advance a day
        toDoPage.tasks.item(0).streak.matches("2")
        cy.tick(24 * 60 * 60 * 1000); // Advance a day
        toDoPage.habitsTab.click()
        toDoPage.habits.matches(table`
        | name     | lastUpdate               | bestStreak | currentStreak |
        | Buy fish | Last completed: 1/3/2024 | 2          | 0             |
        `)
        toDoPage.tasksTab.click()
        toDoPage.tasks.item(0).checkbox.check()
        cy.tick(24 * 60 * 60 * 1000); // Advance a day
        toDoPage.tasks.item(0).streak.matches("1")
        cy.tick(48 * 60 * 60 * 1000); // Advance 2 days
        toDoPage.tasks.item(0).streak.assertInvisible()
        toDoPage.tasks.item(0).checkbox.check()
        cy.tick(24 * 60 * 60 * 1000); // Advance a day
        toDoPage.tasks.item(0).streak.matches("1")
        toDoPage.habitsTab.click()
        toDoPage.habits.matches(table`
        | name     | lastUpdate               | bestStreak | currentStreak |
        | Buy fish | Last completed: 1/8/2024 | 2          | 1             |
        `)
    });
});