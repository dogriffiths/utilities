import CypressPage from "../relish-cypress/CypressPage";
import TaskItem from "../components/TaskItem";
import InputText from "../relish-cypress/InputText";
import CypressWidget from "../relish-cypress/CypressWidget";
import TaskEditDialog from "../components/TaskEditDialog";
import JournalDay from "../components/JournalDay";
import KanbanColumn from "../components/KanbanColumn";
import HabitItem from "../components/HabitItem";

// <reference path="cypress/types/index.d.ts" />

export default class ToDoPage extends CypressPage {
    constructor() {
        super("/todoyou.html");
    }

    tab(tabId: string) {
        return new CypressWidget(`.tab[data-tab="${tabId}"]`, this)
    }

    get journalTab() {
        return this.tab("journal")
    }

    get tasksTab() {
        return this.tab("tasks")
    }

    get habitsTab() {
        return this.tab("habits")
    }

    get kanbanTab() {
        return this.tab("kanban")
    }

    get calendarTab() {
        return this.tab("calendar")
    }

    get newTask() {
        return new InputText("#newTask", this)
    }

    get saveButton() {
        return new CypressWidget(".input-container button", this)
    }

    get editDialog() {
        return new TaskEditDialog("#editDialog", this)
    }

    get tasks() {
        return this.collection(
            '.task-item',
            e => new TaskItem(e, this),
            '#taskList'
        );
    }

    get habits() {
        return this.collection(
            '.habit-item',
            e => new HabitItem(e, this),
            '#habitsList'
        );
    }

    get journalDays() {
        return this.collection(
            '.journal-day',
            e => new JournalDay(e, this),
            '#journalList'
        );
    }

    get kanbanColumns() {
        return this.collection(
            '.kanban-column',
            e => new KanbanColumn(e, this),
            '.kanban-container'
        );
    }

    importDatabase(testData: {
        kanbanJournal: any[];
        todos: any[];
        completed: any[]
    }) {
        cy.wait(1000); // To make sure the database is initialized
        cy.window().then((win) => {
            // Create a JSON blob
            const blob = new Blob([JSON.stringify(testData)], {type: 'application/json'});
            const testFile = new File([blob], 'test-import.json', {type: 'application/json'});

            // Create a DataTransfer object and add the file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);

            // Trigger the file input change event
            const inputEl = win.document.querySelector('#importInput');
            // @ts-ignore
            inputEl.files = dataTransfer.files;
            // @ts-ignore
            inputEl.dispatchEvent(new Event('change', {bubbles: true}));
        });
    }
}
