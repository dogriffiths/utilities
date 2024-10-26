import Component from "../relish-core/Component";
import CypressWidget from "../relish-cypress/CypressWidget";
import InputText from "../relish-cypress/InputText";

export default class TaskEditDialog extends CypressWidget {
    constructor(selector: string | HTMLElement, parent: Component) {
        super(selector, parent);
    }

    get text() {
        return new InputText('#editTaskText', this);
    }

    get description() {
        return new InputText('#editTaskDescription', this);
    }

    get cancelButton() {
        return new CypressWidget('.cancel', this);
    }

    get saveButton() {
        return new CypressWidget('button:not(.cancel)', this);
    }
}
