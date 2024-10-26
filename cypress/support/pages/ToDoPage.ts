import CypressPage from "../relish-cypress/CypressPage";
import CollectionWidget from "../relish-cypress/CollectionWidget";
import TaskItem from "../components/TaskItem";
import InputText from "../relish-cypress/InputText";
import CypressWidget from "../relish-cypress/CypressWidget";
import TaskEditDialog from "../components/TaskEditDialog";

// <reference path="cypress/types/index.d.ts" />

export default class ToDoPage extends CypressPage {
    constructor() {
        super("/todo.html");
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
}
