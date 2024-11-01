import CypressPage from "../relish-cypress/CypressPage";
import CollectionWidget from "../relish-cypress/CollectionWidget";
import TaskItem from "../components/TaskItem";
import InputText from "../relish-cypress/InputText";
import CypressWidget from "../relish-cypress/CypressWidget";
import TaskEditDialog from "../components/TaskEditDialog";
import JournalDay from "../components/JournalDay";

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
        const widget: CollectionWidget<TaskItem> = new CollectionWidget<TaskItem>(
            '#taskList',
            '.task-item',
            e => new TaskItem(e, widget),
            this
        );
        return widget;
    }

    get journalDays() {
        const widget: CollectionWidget<JournalDay> = new CollectionWidget<JournalDay>(
            '#journalList',
            '.journal-day',
            e => new JournalDay(e, widget),
            this
        );
        return widget;
    }
}
